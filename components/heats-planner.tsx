"use client";

import { useId, useRef, useState } from "react";
import { calculateHeats, exportHeatsCsv, formatPlannerTime, MAX_BLOCKS, NUMERIC_FIELDS, type BlockInput } from "@/lib/heats-planner";

const initialBlock: BlockInput = { division: "Exemple équipes", workout: "Workout 1", participants: "20", lanes: "6", duration: "12", transition: "3", pause: "0" };
const control = "mt-2 w-full rounded-lg border border-white/20 bg-dark-900 px-3 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";
const button = "rounded-lg border border-white/20 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:cursor-not-allowed disabled:opacity-40";

/** Standalone local calculator; no props, account, analytics or athlete data. */
export function HeatsPlanner() {
  const prefix = useId();
  const nextId = useRef(2);
  const addButton = useRef<HTMLButtonElement>(null);
  const [startTime, setStartTime] = useState("09:00");
  const [blocks, setBlocks] = useState([{ id: 1, values: { ...initialBlock } }]);
  const [downloadError, setDownloadError] = useState("");
  const result = calculateHeats({ startTime, blocks: blocks.map(block => block.values) });

  function update(id: number, field: keyof BlockInput, value: string) {
    setBlocks(current => current.map(block => block.id === id ? { ...block, values: { ...block.values, [field]: value } } : block));
  }

  function download() {
    if (!result.ok) return;
    setDownloadError("");
    try {
      const url = URL.createObjectURL(new Blob([exportHeatsCsv(result)], { type: "text/csv;charset=utf-8;" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "planning-heats.csv";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setDownloadError("Le téléchargement n’a pas abouti. Réessayez depuis un navigateur autorisant les téléchargements.");
    }
  }

  return (
    <section aria-labelledby={`${prefix}-title`} className="rounded-xl border border-primary-500/30 bg-dark-800 p-4 text-gray-300 sm:p-8">
      <h2 id={`${prefix}-title`} className="text-2xl font-semibold text-white">Calculateur de planning des heats</h2>
      <p className="mt-3">Exemple illustratif, sans lien avec un événement client. Un seul espace, des blocs successifs, sans noms d’athlètes. Les changements recalculent immédiatement le planning.</p>
      <p id={`${prefix}-rules`} className="mt-2 text-sm">La pause précède chaque bloc, y compris le premier. La transition s’applique uniquement entre les heats d’un même bloc, jamais après le dernier. Jusqu’à {MAX_BLOCKS} blocs et 24 h au total ; J+1 signifie le lendemain.</p>
      <label className="mt-6 block max-w-xs text-sm font-medium text-white" htmlFor={`${prefix}-start`}>Heure de départ
        <input id={`${prefix}-start`} type="time" required value={startTime} onChange={event => setStartTime(event.target.value)} className={control} aria-describedby={`${prefix}-rules`} />
      </label>
      <div className="mt-6 space-y-5">
        {blocks.map((block, index) => (
          <fieldset key={block.id} className="min-w-0 rounded-xl border border-white/15 p-4">
            <legend className="px-2 font-semibold text-primary-400">Bloc {index + 1}</legend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(["division", "workout"] as const).map(field => (
                <label key={field} className="text-sm" htmlFor={`${prefix}-${block.id}-${field}`}>
                  {field === "division" ? "Division" : "Workout"}
                  <input id={`${prefix}-${block.id}-${field}`} type="text" required maxLength={80} value={block.values[field]} onChange={event => update(block.id, field, event.target.value)} className={control} />
                </label>
              ))}
              {(Object.keys(NUMERIC_FIELDS) as (keyof typeof NUMERIC_FIELDS)[]).map(field => {
                const { label, min, max } = NUMERIC_FIELDS[field];
                return (
                  <label key={field} className="text-sm" htmlFor={`${prefix}-${block.id}-${field}`}>
                    {label} <span className="text-gray-400">({min}–{max})</span>
                    <input id={`${prefix}-${block.id}-${field}`} type="number" inputMode="numeric" required min={min} max={max} step={1} value={block.values[field]} onChange={event => update(block.id, field, event.target.value)} className={control} />
                  </label>
                );
              })}
            </div>
            <button type="button" className={`${button} mt-4`} disabled={blocks.length === 1} onClick={() => { setBlocks(current => current.filter(item => item.id !== block.id)); addButton.current?.focus(); }}>Supprimer le bloc {index + 1}</button>
          </fieldset>
        ))}
      </div>
      <button ref={addButton} type="button" className={`${button} mt-4`} disabled={blocks.length >= MAX_BLOCKS} onClick={() => {
        const id = nextId.current++;
        setBlocks(current => [...current, { id, values: { ...initialBlock, division: `Division ${current.length + 1}`, workout: "Workout 1" } }]);
      }}>Ajouter un bloc ({blocks.length}/{MAX_BLOCKS})</button>

      <div className="mt-6" aria-live="polite" aria-atomic="true">
        {result.ok ? <p className="font-medium text-white">{result.heats.length} heats · Durée totale : {result.totalMinutes} min · Fin : {formatPlannerTime(result.end)}</p> : (
          <div className="rounded-lg border border-red-400/50 bg-red-950/30 p-4 text-red-200">
            <p className="font-semibold">Corrigez les champs suivants pour calculer et exporter :</p>
            <ul className="mt-2 list-disc pl-5">{result.errors.map(error => <li key={error}>{error}</li>)}</ul>
          </div>
        )}
      </div>
      {result.ok && (
        <div className="mt-4 overflow-x-auto rounded-lg border border-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400" tabIndex={0} role="region" aria-label="Planning calculé, tableau défilant horizontalement">
          <table className="w-full min-w-[620px] text-left text-sm">
            <caption className="p-3 text-left text-gray-300">Planning séquentiel — couloirs occupés / disponibles (pas d’affectation nominative)</caption>
            <thead className="bg-dark-900 text-white"><tr>{["Bloc / division", "Workout", "Heat", "Début", "Fin", "Couloirs"].map(title => <th key={title} scope="col" className="px-3 py-3">{title}</th>)}</tr></thead>
            <tbody>{result.heats.map(heat => <tr key={`${heat.block}-${heat.heat}`} className="border-t border-white/10">
              <td className="max-w-52 break-words px-3 py-3">{heat.block} · {heat.division}</td><td className="max-w-52 break-words px-3 py-3">{heat.workout}</td><th scope="row" className="px-3 py-3 font-normal">{heat.heat}</th><td className="whitespace-nowrap px-3 py-3">{formatPlannerTime(heat.start)}</td><td className="whitespace-nowrap px-3 py-3">{formatPlannerTime(heat.end)}</td><td className="px-3 py-3">{heat.occupiedLanes} / {heat.lanes}</td>
            </tr>)}</tbody>
          </table>
        </div>
      )}
      <p className="mt-5 rounded-lg border border-amber-400/30 p-4 text-sm text-amber-100">À vérifier manuellement : récupération des athlètes, disponibilité des juges, matériel partagé et coordination de plusieurs espaces. Ces contraintes ne sont pas planifiées automatiquement. Le total compte les passages de chaque bloc, pas des participants uniques.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" disabled={!result.ok} onClick={download} className={`${button} border-primary-500 bg-primary-500/20`}>Exporter le planning CSV</button>
        <a href="/downloads/modele-planning-heats.csv" download className={button}>Télécharger le modèle CSV</a>
      </div>
      <p className="mt-3 text-sm">L’export est un instantané figé : modifiez le calculateur puis exportez à nouveau pour recalculer. Le modèle est une trame illustrative modifiable, sans formules ni import dans le calculateur. CSV UTF-8, séparateur point-virgule ; dans Excel, utilisez l’import texte/CSV si nécessaire.</p>
      {downloadError && <p role="alert" className="mt-3 text-red-200">{downloadError}</p>}
    </section>
  );
}
