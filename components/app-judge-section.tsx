import { Check, CloudOff, ListChecks, Smartphone, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PhoneShell } from "@/components/phone-shell";
import { PhoneJudgeOfflineScreen } from "@/components/phone-screens";
import { StoreBadges } from "@/components/store-badges";

const appProofs = [
  { icon: Zap, label: "Compteur de reps et de no reps" },
  {
    icon: ListChecks,
    label: "Une Scorecard par Couloir, transmise à la validation",
  },
  { icon: CloudOff, label: "Scores conservés sur le téléphone hors ligne" },
  {
    icon: Check,
    label: "Aucune installation obligatoire : l’interface web reste accessible",
  },
];

export function AppJudgeSection() {
  return (
    <section id="scoring" className="section scroll-mt-16 bg-dark-900">
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start">
            <Badge className="border-primary-500/20 bg-primary-500/10 text-primary-400">
              <Smartphone className="mr-1.5 size-3.5" aria-hidden="true" />
              App juge · Scorecard
            </Badge>
            <h2 className="mt-5 max-w-[22ch] text-3xl font-bold text-balance text-white md:text-4xl lg:text-5xl">
              Vos juges scorent, même quand le réseau lâche.
            </h2>
            <p className="mt-5 max-w-[58ch] text-lg text-pretty text-gray-400">
              L’app juge CompRank fonctionne hors ligne : pendant une coupure,
              les scores restent sur le téléphone, puis partent dès que le
              réseau revient. Chaque juge y compte les reps, note les no reps
              et valide la Scorecard de son Couloir.
            </p>

            <ul role="list" className="mt-8 space-y-3">
              {appProofs.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-3 text-base text-gray-300 sm:text-sm"
                >
                  <Icon
                    className="mt-0.5 size-4 shrink-0 text-orange-400"
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-gray-400">
              Disponible sur iOS et Android.
            </p>
            <StoreBadges className="mt-3" />
          </div>

          <div aria-hidden="true">
            <PhoneShell>
              <PhoneJudgeOfflineScreen />
            </PhoneShell>
          </div>
        </div>
      </div>
    </section>
  );
}
