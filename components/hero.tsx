"use client";

import {
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LeadButton } from "@/components/lead-button";
import { AppLink } from "@/components/app-link";
import { HeroVideo } from "@/components/hero-video";
import { StoreBadges } from "@/components/store-badges";

export interface Athlete {
  name: string;
  box: string;
  points: number;
  rank: number;
  rankChange: number;
  delta: number;
  highlight: boolean;
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

export function Hero() {
  return (
    <section className="relative overflow-clip bg-dark-900">
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

      <div className="container-custom relative z-10 pb-10 pt-28 sm:pb-12 sm:pt-32">
        <motion.div
          initial={false}
          animate="visible"
          className="mx-auto max-w-4xl text-center"
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
            className="mt-6 text-4xl font-semibold tracking-tight text-balance text-white md:text-5xl lg:text-6xl"
          >
            Le logiciel pour organiser vos compétitions CrossFit et HYROX
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-gray-300"
          >
            Gérez inscriptions, planning, scoring mobile et classements en
            direct depuis un seul outil, conçu pour les organisateurs en
            France.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
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
            className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8"
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
            <StoreBadges className="justify-center" />
          </motion.div>
        </motion.div>
      </div>

      <HeroVideo />
    </section>
  );
}
