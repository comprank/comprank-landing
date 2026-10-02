"use client";

import Image from "next/image";
import { ANDROID_APP_URL, IOS_APP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Événement custom (et non standard) : garder le clic badge hors de la surface
// d'optimisation de Meta, qui optimiserait vers le badge au lieu du lead. Cf. #9.
function trackBadgeClick(platform: "ios" | "android") {
  if (
    process.env.NODE_ENV === "production" &&
    typeof window !== "undefined" &&
    typeof window.fbq === "function"
  ) {
    window.fbq("trackCustom", "AppBadgeClick", { platform });
  }
}

// Contraintes issues de la recherche #6 :
// App Store à gauche, Google Play à droite, hauteurs égales, plancher 40 px,
// dégagement = hauteur / 4, aucun effet CSS sur le badge lui-même.
export function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href={IOS_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackBadgeClick("ios")}
        aria-label="Télécharger CompRank dans l'App Store"
        className="inline-block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
      >
        <Image
          src="/badges/app-store-fr.svg"
          alt="Télécharger dans l'App Store"
          width={152}
          height={48}
          className="h-12 w-auto"
        />
      </a>
      <a
        href={ANDROID_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackBadgeClick("android")}
        aria-label="Télécharger CompRank sur Google Play"
        className="inline-block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
      >
        {/* Le PNG Google embarque 29 px de padding vertical (contenu 646x192).
            On le rend a 62 px et on annule le padding, pour que le badge VISIBLE
            fasse 48 px comme celui d'Apple. Cf. #6 : hauteurs egales. */}
        <Image
          src="/badges/google-play-fr.png"
          alt="Disponible sur Google Play"
          width={646}
          height={250}
          className="h-[62px] w-auto -my-[7px]"
        />
      </a>
    </div>
  );
}
