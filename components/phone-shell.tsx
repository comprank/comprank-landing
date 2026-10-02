import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Châssis de téléphone réutilisable, extrait de JudgeScoringMockup. */
export function PhoneShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-[280px]", className)}>
      <div className="relative bg-dark-600 rounded-[2.5rem] p-3 border-2 border-dark-400 shadow-2xl shadow-primary-500/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-dark-600 rounded-b-2xl z-10" />
        <div className="bg-dark-800 rounded-[2rem] overflow-hidden pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
