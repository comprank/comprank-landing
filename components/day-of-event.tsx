import type { ReactNode } from "react";
import {
  Radio,
  Timer,
  Trophy,
  Tv,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LeadButton } from "@/components/lead-button";
import { cn } from "@/lib/utils";

function OfferBadge({ children }: { children: ReactNode }) {
  return (
    <Badge className="max-w-full whitespace-normal border-amber-400/30 bg-amber-400/10 text-left leading-relaxed text-amber-200">
      <Wrench className="mr-1.5 size-3.5" aria-hidden="true" />
      {children}
    </Badge>
  );
}

function TvLiveMockup() {
  const lanes = [
    { lane: 1, name: "Camille D.", reps: 51 },
    { lane: 2, name: "Antoine L.", reps: 47 },
    { lane: 3, name: "Sarah M.", reps: 44 },
    { lane: 4, name: "Louis P.", reps: 39 },
  ];

  return (
    <div
      aria-hidden="true"
      className="rounded-xl border-4 border-dark-500 bg-black p-1 shadow-2xl shadow-amber-500/5"
    >
      <div className="aspect-video rounded-lg bg-dark-900 p-4">
        <div className="flex items-center justify-between border-b border-dark-600 pb-2">
          <div>
            <p className="font-mono text-[0.625rem] uppercase tracking-widest text-primary-400">
              Vague 12 · Workout 2 · RX
            </p>
            <p className="text-sm font-semibold text-white">AMRAP 12&apos;</p>
          </div>
          <p className="font-mono text-3xl font-bold tabular-nums text-white">
            07:42
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {lanes.map((lane) => (
            <div
              key={lane.lane}
              className="flex items-center justify-between rounded bg-dark-800/80 px-2.5 py-1.5"
            >
              <span className="truncate text-xs text-gray-300">
                <span className="mr-2 font-mono text-[0.625rem] text-gray-500">
                  C{lane.lane}
                </span>
                {lane.name}
              </span>
              <span className="font-mono text-base font-bold tabular-nums text-primary-400">
                {lane.reps}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[0.625rem] text-gray-500">
          <span className="size-1.5 rounded-full bg-green-400" />
          TV live · Vague en cours · reps comptées en direct
        </p>
      </div>
    </div>
  );
}

function HyroxTimingMockup() {
  const results = [
    { label: "Course", value: "36:45" },
    { label: "Stations", value: "35:51" },
    { label: "Temps total", value: "1:12:36" },
  ];

  return (
    <Card
      aria-hidden="true"
      className="border-dark-600 bg-dark-900/70 p-5 shadow-2xl shadow-amber-500/5"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-sm font-semibold text-white">Nora B.</p>
          <p className="text-xs text-gray-500">Sangle cheville détectée</p>
        </div>
        <Badge className="border-green-500/20 bg-green-500/10 text-green-400">
          <Radio className="mr-1 size-3" aria-hidden="true" />
          RFID
        </Badge>
      </div>
      <dl className="divide-y divide-white/10">
        {results.map((result) => (
          <div
            key={result.label}
            className="flex items-center justify-between py-3"
          >
            <dt className="text-xs text-gray-400">{result.label}</dt>
            <dd
              className={cn(
                "font-mono text-sm tabular-nums text-primary-400",
                result.label === "Temps total" && "font-bold text-white",
              )}
            >
              {result.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-dark-800 px-3 py-2">
        <Trophy className="size-4 text-amber-300" aria-hidden="true" />
        <span className="text-xs text-gray-300">12e sur 86 · Division Open</span>
      </div>
    </Card>
  );
}

export function DayOfEventSection() {
  return (
    <section
      id="offre"
      className="section scroll-mt-16 border-y border-amber-400/15 bg-gradient-to-b from-dark-900 via-[#1a1712] to-dark-900"
    >
      <div className="container-custom">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center">
          <OfferBadge>
            Offre à part · matériel + une personne CompRank sur place
          </OfferBadge>
          <h2 className="mt-5 text-3xl font-bold text-balance text-white md:text-4xl lg:text-5xl">
            Le jour J, on vient avec le matériel.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-pretty text-gray-400">
            Le jour de la compétition, CompRank vient sur place avec le
            matériel et une personne de l’équipe. Deux prestations distinctes
            complètent le logiciel : la Régie live + TV live pour vos
            compétitions FUNCTIONAL, et le chronométrage par puces RFID pour
            vos courses HYROX.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-amber-400/20 bg-dark-800/70 p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-white md:text-2xl">
                <Tv className="size-5 text-amber-300" aria-hidden="true" />
                Régie live + TV live
              </h3>
              <Badge variant="outline">FUNCTIONAL</Badge>
            </div>
            <p className="mb-6 text-base text-pretty text-gray-400 sm:text-sm">
              La Régie live + TV live est une prestation sur place pour les
              compétitions FUNCTIONAL. CompRank installe le Kit Régie. Les
              juges comptent sur les téléphones fournis, le Départ et le chrono
              sont partagés sur tous les Couloirs, et la TV live affiche les
              reps pendant chaque Vague. Tout continue sur le réseau local si
              internet coupe.
            </p>
            <TvLiveMockup />
          </Card>

          <Card className="border-amber-400/20 bg-dark-800/70 p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-white md:text-2xl">
                <Timer className="size-5 text-amber-300" aria-hidden="true" />
                Chronométrage par puces RFID
              </h3>
              <Badge variant="outline">HYROX</Badge>
            </div>
            <p className="mb-6 text-base text-pretty text-gray-400 sm:text-sm">
              Le chronométrage par puces RFID est une prestation sur place pour
              les courses HYROX. Chaque athlète porte une puce RFID sur une
              sangle de cheville. Ses passages sont détectés automatiquement ;
              à l’arrivée, CompRank calcule son temps total, le détail Course
              et Stations, et sa position dans sa division.
            </p>
            <HyroxTimingMockup />
          </Card>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-gray-400">
            Prestation sur demande · le logiciel reste gratuit pour
            l’organisateur
          </p>
          <LeadButton label="Parler de votre jour J" size="lg" showArrow />
        </div>
      </div>
    </section>
  );
}

type CompetitionDayOfferProps = {
  format: "functional" | "hyrox";
};

const compactOffers = {
  functional: {
    label: "Offre à part · FUNCTIONAL",
    title: "Ajoutez la Régie live et la TV live à votre jour J.",
    description:
      "CompRank vient sur place avec le Kit Régie et les téléphones des juges. Le Départ, le chrono et les Couloirs restent synchronisés sur un réseau local, pendant que la TV live affiche les reps de la Vague en cours.",
    icon: Tv,
  },
  hyrox: {
    label: "Offre à part · HYROX",
    title: "Automatisez le chronométrage avec des puces RFID.",
    description:
      "CompRank installe les points de détection et reste sur place. Une puce portée à la cheville identifie chaque passage ; à l’arrivée, les temps Course et Stations, le temps total et la position dans la division sont prêts.",
    icon: Timer,
  },
} as const;

export function CompetitionDayOffer({ format }: CompetitionDayOfferProps) {
  const offer = compactOffers[format];
  const Icon = offer.icon;

  return (
    <section className="border-y border-amber-400/15 bg-[#1a1712] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div className="flex flex-col items-start">
          <OfferBadge>{offer.label}</OfferBadge>
          <h2 className="mt-5 max-w-[28ch] text-3xl font-semibold text-balance text-white md:text-4xl">
            {offer.title}
          </h2>
          <p className="mt-4 max-w-[70ch] text-lg text-pretty text-gray-400">
            {offer.description}
          </p>
          <p className="mt-5 text-sm text-gray-400">
            Prestation sur demande · le logiciel reste gratuit pour
            l’organisateur
          </p>
        </div>
        <div className="flex items-center gap-5 lg:flex-col">
          <Icon
            className="hidden size-10 text-amber-300 lg:block"
            aria-hidden="true"
          />
          <LeadButton label="Parler de votre jour J" size="lg" showArrow />
        </div>
      </div>
    </section>
  );
}
