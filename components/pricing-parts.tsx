import type { ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "organizer" | "athlete" | "neutral";

const checkTone: Record<Tone, string> = {
  organizer: "bg-primary-500/15 text-primary-400 ring-primary-500/30",
  athlete: "bg-accent-500/15 text-accent-300 ring-accent-400/30",
  neutral: "bg-white/5 text-gray-300 ring-white/15",
};

/** Ligne à coche des cartes de la page /tarifs. */
export function CheckItem({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <li className="flex items-start gap-3 text-base text-pretty text-gray-200 sm:text-[0.9375rem]">
      <span
        className={cn(
          "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full ring-1",
          checkTone[tone],
        )}
        aria-hidden="true"
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

/**
 * Question de FAQ en <details> natif : la réponse est présente dans le HTML
 * serveur même fermée (l'accordéon Radix ne rend pas le contenu fermé).
 */
export function FaqItem({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  return (
    <details className="group border-b border-white/10 last:border-b-0">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 text-left text-base font-medium text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
        {question}
        <ChevronDown
          className="size-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <p className="max-w-[62ch] pb-5 text-base text-pretty text-gray-400">
        {children}
      </p>
    </details>
  );
}
