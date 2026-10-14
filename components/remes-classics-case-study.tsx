import { ArrowUpRight } from "lucide-react";
import { APP_URL } from "@/lib/site";

/** Approved event case; qualitative feedback is paraphrased, not a quotation. */
export function RemesClassicsCaseStudy() {
  return (
    <section
      aria-labelledby="remes-classics-title"
      className="bg-dark-800 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-xl border border-primary-500/20 bg-dark-700/50 p-6 sm:p-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-primary-400">
              Retour d’expérience · Inscriptions
            </p>
            <h2
              id="remes-classics-title"
              className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
            >
              REMES CLASSICS : d’Excel à CompRank
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-300">
              60 athlètes · 20 équipes de trois · un week-end de compétition
            </p>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-gray-300">
            <p>
              Pour les REMES CLASSICS 2026, l’organisateur a choisi CompRank après
              avoir géré sa compétition dans des tableaux Excel. Ses priorités :
              un outil simple à utiliser et des informations faciles à retrouver
              pour les athlètes.
            </p>
            <p>
              Les 20 équipes sont inscrites sur CompRank. Dans les retours
              recueillis par l’équipe CompRank, l’organisateur souligne la
              simplicité d’utilisation ; les athlètes apprécient une plateforme
              facile à utiliser et lisible.
            </p>
            <a
              href={`${APP_URL}/comp/Q0QfwrPdgqWzCt8m8VFzL`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm text-primary-400 underline underline-offset-4 hover:text-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-400"
            >
              Voir la compétition sur CompRank
              <span className="sr-only"> (nouvel onglet)</span>
              <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
