"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Medal,
  Trophy,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LeadButton } from "@/components/lead-button";
import { AppLink } from "@/components/app-link";

export interface Athlete {
  name: string;
  box: string;
  points: number;
  rank: number;
  rankChange: number;
  delta: number;
  highlight: boolean;
}

const INITIAL_ATHLETES: Athlete[] = [
  { name: "Camille D.", box: "CrossFit Lyon", points: 386, rank: 1, rankChange: 0, delta: 0, highlight: false },
  { name: "Antoine L.", box: "Box Marseille", points: 384, rank: 2, rankChange: 0, delta: 0, highlight: false },
  { name: "Sarah M.", box: "CF Bordeaux", points: 383, rank: 3, rankChange: 0, delta: 0, highlight: false },
  { name: "Louis P.", box: "CF Nantes", points: 381, rank: 4, rankChange: 0, delta: 0, highlight: false },
  { name: "Nora B.", box: "CF Toulouse", points: 379, rank: 5, rankChange: 0, delta: 0, highlight: false },
];

function useAnimatedScores() {
  const [athletes, setAthletes] = useState(INITIAL_ATHLETES);

  useEffect(() => {
    const interval = setInterval(() => {
      setAthletes((prev) => {
        const next = prev.map((a) => {
          const delta = Math.floor(Math.random() * 11) - 3;
          return { ...a, points: a.points + delta, delta, highlight: true };
        });

        const rankMap = new Map(prev.map((a) => [a.name, a.rank]));
        return [...next]
          .sort((a, b) => b.points - a.points)
          .map((a, i) => ({
            ...a,
            rankChange: (rankMap.get(a.name) ?? i + 1) - (i + 1),
            rank: i + 1,
          }));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return athletes;
}

function AnimatedPoints({
  value,
  delta,
  highlight,
}: {
  value: number;
  delta: number;
  highlight: boolean;
}) {
  return (
    <motion.span
      key={value}
      initial={
        highlight && delta !== 0
          ? { scale: 1.25, color: delta > 0 ? "#4ade80" : "#f87171" }
          : false
      }
      animate={{ scale: 1, color: "#ffad4a" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="font-mono font-bold tabular-nums"
    >
      {value}
    </motion.span>
  );
}

function PointsDelta({ delta }: { delta: number }) {
  if (delta === 0) return null;
  const positive = delta > 0;

  return (
    <motion.span
      initial={{ opacity: 0, y: positive ? 6 : -6, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.35 }}
      className={`text-xs font-mono font-semibold tabular-nums ${positive ? "text-green-400" : "text-red-400"}`}
    >
      {positive ? "+" : ""}
      {delta}
    </motion.span>
  );
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease },
  }),
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.4, duration: 0.6, ease },
  },
};

export function RankChangeIndicator({ rankChange }: { rankChange: number }) {
  if (rankChange > 0) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        <TrendingUp className="size-3.5 text-green-400" />
      </motion.div>
    );
  }
  if (rankChange < 0) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        <TrendingDown className="size-3.5 text-red-400" />
      </motion.div>
    );
  }
  return <Minus className="size-3.5 text-gray-500" />;
}

function LeaderboardRow({ athlete }: { athlete: Athlete }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="relative flex items-center px-5 py-3.5"
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

      <div className="flex items-center gap-3 w-10">
        {athlete.rank <= 3 ? (
          <Medal
            className={`size-5 ${athlete.rank === 1
              ? "text-yellow-400"
              : athlete.rank === 2
                ? "text-gray-300"
                : "text-amber-600"
              }`}
          />
        ) : (
          <span className="text-sm text-gray-500 font-mono tabular-nums">
            {athlete.rank}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white">{athlete.name}</div>
        <div className="text-xs text-gray-500">{athlete.box}</div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5">
          <AnimatedPoints
            value={athlete.points}
            delta={athlete.delta}
            highlight={athlete.highlight}
          />
          <AnimatePresence mode="popLayout">
            {athlete.highlight && athlete.delta !== 0 && (
              <PointsDelta key={`${athlete.name}-${athlete.points}`} delta={athlete.delta} />
            )}
          </AnimatePresence>
        </div>
        <RankChangeIndicator rankChange={athlete.rankChange} />
      </div>
    </motion.div>
  );
}

/** La carte de classement animée d'origine. */
function LeaderboardCard({ athletes }: { athletes: Athlete[] }) {
  return (
    <div className="relative bg-dark-700/60 backdrop-blur-xl border border-dark-400/60 rounded-2xl overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-dark-400/40 bg-dark-800/40">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center size-7 rounded-lg bg-primary-500/10">
            <Trophy className="size-4 text-primary-500" />
          </div>
          <span className="text-sm font-semibold text-white">
            Classement général
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="size-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-green-400">Live</span>
        </div>
      </div>

      <LayoutGroup>
        <div className="divide-y divide-dark-500/30">
          {athletes.map((a) => (
            <LeaderboardRow key={a.name} athlete={a} />
          ))}
        </div>
      </LayoutGroup>

      <div className="px-5 py-2.5 border-t border-dark-400/40 bg-dark-800/30">
        <p className="text-xs text-gray-500 text-center">
          Actualisation automatique &middot; 5 épreuves
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const athletes = useAnimatedScores();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-dark-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-primary-500/8 blur-3xl animate-float" />
        <div className="absolute top-1/2 -right-24 size-80 rounded-full bg-accent-500/6 blur-3xl animate-float [animation-delay:2s]" />
        <div className="absolute -bottom-16 left-1/3 size-64 rounded-full bg-primary-600/5 blur-3xl animate-float [animation-delay:4s]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="container-custom relative z-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={false}
            animate="visible"
            className="max-w-xl"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-mono text-base uppercase tracking-wide text-primary-400 sm:text-sm"
            >
              Lâchez les tableurs. Scorez en direct.
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-6 max-w-[24ch] text-4xl font-semibold tracking-tight text-balance text-white md:text-5xl lg:text-6xl"
            >
              Le logiciel pour organiser vos compétitions CrossFit et HYROX
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-[48ch] text-lg text-pretty text-gray-300"
            >
              Gérez inscriptions, planning, scoring mobile et classements en
              direct depuis un seul outil, conçu pour les organisateurs en
              France.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <LeadButton
                label="Démarrer gratuitement"
                size="lg"
                showArrow
              />
              <Button asChild size="lg" variant="outline">
                <Link href="#formats">Explorer les formats</Link>
              </Button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={3}
              className="mt-4 text-base text-gray-400 sm:text-sm"
            >
              Envie d’explorer par vous-même ?{" "}
              <AppLink placement="hero" />
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-10 flex items-center gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((id) => (
                    <Image
                      width={36}
                      height={36}
                      key={id}
                      src={`/box/box-${id}.webp`}
                      alt=""
                      loading="eager"
                      className="size-9 rounded-full object-cover outline outline-2 outline-dark-600"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="size-3.5 text-primary-500 fill-primary-500"
                      />
                    ))}
                  </div>
                  <p className="text-base text-gray-400 sm:text-sm">
                    50+ salles en France
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial={false}
            animate="visible"
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-primary-500/10 via-accent-500/5 to-transparent rounded-3xl blur-2xl" />

            <LeaderboardCard athletes={athletes} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
