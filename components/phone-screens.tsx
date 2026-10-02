"use client";

import { CloudOff, Check, Medal, RefreshCw, Trophy } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";
import { RankChangeIndicator, type Athlete } from "@/components/hero";

// Écrans à glisser dans <PhoneShell>. Aucun n'est rendu sur le site pour
// l'instant : ils servent aux tickets prototype de la carte #14.

/** Ligne de classement compacte, dimensionnée pour un écran de téléphone. */
function CompactLeaderboardRow({ athlete }: { athlete: Athlete }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="relative flex items-center gap-2 px-3 py-2.5"
    >
      {athlete.highlight && (
        <motion.div
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 ${athlete.delta > 0
            ? "bg-green-400/10"
            : athlete.delta < 0
              ? "bg-red-400/10"
              : "bg-primary-400/10"
            }`}
        />
      )}
      <div className="w-5 shrink-0">
        {athlete.rank <= 3 ? (
          <Medal
            className={`size-4 ${athlete.rank === 1
              ? "text-yellow-400"
              : athlete.rank === 2
                ? "text-gray-300"
                : "text-amber-600"
              }`}
          />
        ) : (
          <span className="font-mono text-xs tabular-nums text-gray-500">
            {athlete.rank}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-medium text-white">
          {athlete.name}
        </div>
        <div className="truncate text-[0.625rem] text-gray-500">
          {athlete.box}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="font-mono text-xs font-bold tabular-nums text-primary-400">
          {athlete.points}
        </span>
        <RankChangeIndicator rankChange={athlete.rankChange} />
      </div>
    </motion.div>
  );
}

/** Écran « classement » tel que l'app le montre à un athlète. */
export function PhoneLeaderboardScreen({ athletes }: { athletes: Athlete[] }) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-dark-600/80 bg-dark-700 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Trophy className="size-3.5 text-primary-500" />
          <span className="text-xs font-semibold text-white">
            Classement général
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-0.5">
          <div className="size-1 animate-pulse rounded-full bg-green-400" />
          <span className="text-[0.625rem] font-medium text-green-400">
            Live
          </span>
        </div>
      </div>
      <LayoutGroup>
        <div className="divide-y divide-dark-500/30">
          {athletes.map((a) => (
            <CompactLeaderboardRow key={a.name} athlete={a} />
          ))}
        </div>
      </LayoutGroup>
      <div className="border-t border-dark-600/60 bg-dark-800/60 px-3 py-2">
        <p className="text-center text-[0.625rem] text-gray-500">
          Actualisation automatique &middot; 5 épreuves
        </p>
      </div>
    </>
  );
}

/** Écran « juge » en situation de coupure réseau : la claim hors-ligne héritée de la carte #5. */
export function PhoneJudgeOfflineScreen() {
  return (
    <>
      <div className="border-b border-dark-600/80 bg-dark-700 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.625rem] font-medium text-gray-400">
              CompRank Judge
            </p>
            <p className="font-mono text-sm font-semibold tabular-nums text-white">
              08:17
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5">
            <CloudOff className="size-3 text-amber-400" />
            <span className="text-[0.625rem] font-medium text-amber-400">
              Hors ligne
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-dark-600/60 px-3 py-3">
        <p className="font-mono text-[0.625rem] uppercase tracking-wide text-primary-400">
          Couloir 4
        </p>
        <p className="mt-0.5 text-sm font-semibold text-white">Camille Dupont</p>
        <p className="text-[0.625rem] text-gray-400">WOD 2 &middot; AMRAP 12&apos;</p>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-dark-900/70 px-2 py-2 text-center ring-1 ring-white/5">
            <p className="font-mono text-lg font-bold tabular-nums text-white">
              47
            </p>
            <p className="text-[0.625rem] text-gray-500">Reps</p>
          </div>
          <div className="rounded-lg bg-dark-900/70 px-2 py-2 text-center ring-1 ring-white/5">
            <p className="font-mono text-lg font-bold tabular-nums text-red-400">
              3
            </p>
            <p className="text-[0.625rem] text-gray-500">No-reps</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-primary-500/10 py-2 ring-1 ring-primary-500/20">
          <Check className="size-3.5 text-primary-400" />
          <span className="text-xs font-semibold text-primary-400">
            Valider le score
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-dark-800/60 px-3 py-2.5">
        <RefreshCw className="size-3 shrink-0 text-gray-500" />
        <p className="text-[0.625rem] leading-tight text-gray-400">
          <span className="font-semibold text-white">3 scores en file</span>
          {" "}&middot; envoyés dès le retour du réseau
        </p>
      </div>
    </>
  );
}
