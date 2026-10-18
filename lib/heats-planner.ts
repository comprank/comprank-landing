export type BlockInput = {
  division: string;
  workout: string;
  participants: string;
  lanes: string;
  duration: string;
  transition: string;
  pause: string;
};
export type PlannerInput = { startTime: string; blocks: BlockInput[] };
export type Heat = { block: number; division: string; workout: string; heat: number; start: number; end: number; occupiedLanes: number; lanes: number };
export type Plan = { ok: true; heats: Heat[]; start: number; end: number; totalMinutes: number };
export type PlannerResult = Plan | { ok: false; errors: string[] };

/** Format validated plan minutes, retaining the day offset across midnight. */
export function formatPlannerTime(minutes: number): string {
  const day = Math.floor(minutes / 1440);
  const time = `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  return day ? `${time} J+${day}` : time;
}

/** Frozen schedule, not a formula workbook. Pass only a successful calculation. */
export function exportHeatsCsv(plan: Plan): string {
  const cell = (value: string | number): string => {
    const text = String(value);
    // Also guard whitespace-prefixed formulas and control characters.
    const safe = /^\s*[=+@-]/.test(text) || /^[\t\r\n]/.test(text) ? `'${text}` : text;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  const rows: (string | number)[][] = [["Bloc", "Division", "Workout", "Heat", "Début (HH:MM, J+1 si lendemain)", "Fin (HH:MM, J+1 si lendemain)", "Couloirs occupés", "Couloirs disponibles", "Durée heat (min)"]];
  for (const heat of plan.heats) rows.push([heat.block, heat.division, heat.workout, heat.heat, formatPlannerTime(heat.start), formatPlannerTime(heat.end), heat.occupiedLanes, heat.lanes, heat.end - heat.start]);
  return "\uFEFF" + rows.map(row => row.map(cell).join(";")).join("\r\n") + "\r\n";
}

export const MAX_BLOCKS = 12;
export const NUMERIC_FIELDS = {
  participants: { label: "Participants ou équipes", min: 1, max: 1000 },
  lanes: { label: "Couloirs", min: 1, max: 100 },
  duration: { label: "Durée d’un heat (min)", min: 1, max: 180 },
  transition: { label: "Transition entre heats (min)", min: 0, max: 120 },
  pause: { label: "Pause avant le bloc (min)", min: 0, max: 240 },
} as const;

/** Absolute minutes from J0 midnight. Blocks run consecutively on one area. */
export function calculateHeats(input: PlannerInput): PlannerResult {
  const errors: string[] = [];
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(input.startTime)) errors.push("Heure de départ : renseignez une heure entre 00:00 et 23:59.");
  if (input.blocks.length < 1 || input.blocks.length > MAX_BLOCKS) return { ok: false, errors: [`Prévoyez entre 1 et ${MAX_BLOCKS} blocs.`] };
  input.blocks.forEach((block, index) => {
    for (const key of ["division", "workout"] as const) {
      if (!block[key].trim() || block[key].length > 80) errors.push(`Bloc ${index + 1} : ${key === "division" ? "division" : "workout"} requis (80 caractères maximum).`);
    }
    for (const key of Object.keys(NUMERIC_FIELDS) as (keyof typeof NUMERIC_FIELDS)[]) {
      const { label, min, max } = NUMERIC_FIELDS[key];
      const raw = block[key];
      if (!/^\d{1,4}$/.test(raw) || Number(raw) < min || Number(raw) > max) errors.push(`Bloc ${index + 1} — ${label} : entier requis entre ${min} et ${max}.`);
    }
  });
  if (errors.length) return { ok: false, errors };
  const total = input.blocks.reduce((sum, block) => {
    const count = Math.ceil(Number(block.participants) / Number(block.lanes));
    return sum + Number(block.pause) + count * Number(block.duration) + (count - 1) * Number(block.transition);
  }, 0);
  // A minimum one-minute heat and 24-hour cap bound allocation to 1,440 rows.
  if (total > 1440) return { ok: false, errors: ["Le planning dépasse 24 h. Réduisez les blocs ou préparez un planning par journée."] };
  const [hours, minutes] = input.startTime.split(":").map(Number);
  const start = hours * 60 + minutes;
  let cursor = start;
  const heats: Heat[] = [];
  input.blocks.forEach((block, index) => {
    cursor += Number(block.pause);
    const count = Math.ceil(Number(block.participants) / Number(block.lanes));
    for (let heat = 1; heat <= count; heat++) {
      const end = cursor + Number(block.duration);
      heats.push({ block: index + 1, division: block.division, workout: block.workout, heat, start: cursor, end, occupiedLanes: Math.min(Number(block.lanes), Number(block.participants) - (heat - 1) * Number(block.lanes)), lanes: Number(block.lanes) });
      cursor = end + (heat < count ? Number(block.transition) : 0);
    }
  });
  return { ok: true, heats, start, end: cursor, totalMinutes: cursor - start };
}
