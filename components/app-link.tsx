"use client";

import { ArrowUpRight } from "lucide-react";
import { APP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Événement custom (et non standard), comme AppBadgeClick : garder le clic vers
// l'app hors de la surface d'optimisation de Meta, qui doit rester sur le lead.
function trackAppLinkClick(placement: string) {
  if (
    process.env.NODE_ENV === "production" &&
    typeof window !== "undefined" &&
    typeof window.fbq === "function"
  ) {
    window.fbq("trackCustom", "AppLinkClick", { placement });
  }
}

type AppLinkProps = {
  /** Où le lien est rendu, envoyé au pixel pour distinguer les emplacements. */
  placement: string;
  label?: string;
  className?: string;
};

/**
 * Lien direct vers app.comprank.fr, volontairement rendu comme un lien texte
 * avec flèche sortante et non comme un bouton : il doit rester distinct des
 * CTA "Démarrer" qui ouvrent le formulaire de contact. S'ouvre dans un nouvel
 * onglet, comme les badges store, pour garder la landing ouverte.
 */
export function AppLink({
  placement,
  label = "Ouvrir l’application",
  className,
}: AppLinkProps) {
  return (
    <a
      href={APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAppLinkClick(placement)}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm font-medium text-primary-400 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className,
      )}
    >
      {label}
      <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
    </a>
  );
}
