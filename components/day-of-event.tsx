import { Tv, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LeadButton } from "@/components/lead-button";

const offers = {
  functional: {
    title: "Régie live + TV live",
    label: "Compétitions de fitness fonctionnel",
    description: "Pour afficher les reps pendant les vagues, CompRank propose une installation sur place avec le Kit Régie et les téléphones des juges. Le départ et le chrono sont partagés sur le réseau local.",
    preparation: "À préparer ensemble : disposition des lanes, emplacement des écrans et organisation des juges.",
    icon: Tv,
  },
  hyrox: {
    title: "Chronométrage RFID",
    label: "Courses au format HYROX",
    description: "CompRank propose l’installation de points de détection et des puces RFID portées à la cheville pour relever les passages. Les temps de course et de stations alimentent les résultats.",
    preparation: "À préparer ensemble : parcours, points de détection et procédure de contrôle des passages.",
    icon: Timer,
  },
};

export function DayOfEventSection() {
  return <section id="offre" className="section scroll-mt-16 border-y border-white/10 bg-dark-900">
    <div className="container-custom">
      <Badge variant="outline">Services terrain optionnels · sur demande</Badge>
      <h2 className="mt-5 text-3xl font-semibold text-white md:text-4xl">Besoin de matériel et d’une équipe le jour J ?</h2>
      <p className="mt-5 max-w-3xl text-lg text-gray-400">Vous pouvez commencer par les inscriptions sans réserver de prestation sur place. La régie TV et le chronométrage RFID se discutent séparément, selon votre événement.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">{Object.values(offers).map(offer => <div key={offer.title} className="rounded-xl border border-white/10 bg-dark-800 p-6">
        <offer.icon className="mb-4 size-6 text-primary-400" aria-hidden="true" />
        <p className="mb-2 text-sm text-primary-400">{offer.label}</p>
        <h3 className="text-xl font-medium text-white">{offer.title}</h3>
        <p className="mt-4 text-gray-400">{offer.description}</p>
        <p className="mt-4 border-t border-white/10 pt-4 text-sm text-gray-400">{offer.preparation}</p>
      </div>)}</div>
      <p className="my-6 text-sm text-gray-400">Ces prestations sont distinctes du module d’inscription. Le module d’inscription est sans coût pour l’organisateur.</p>
      <LeadButton label="Parler de votre jour J" size="lg" showArrow />
    </div>
  </section>;
}

export function CompetitionDayOffer({ format }: { format: "functional" | "hyrox" }) {
  const offer = offers[format];
  return <section className="border-y border-white/10 bg-dark-800 py-14">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Badge variant="outline">Option sur place · à étudier après vos inscriptions</Badge>
      <h2 className="mt-5 text-3xl font-semibold text-white">{offer.title}</h2>
      <p className="mt-4 max-w-3xl text-lg text-gray-400">{offer.description}</p>
      <p className="my-5 max-w-3xl text-gray-400">{offer.preparation} Cette prestation est distincte du module d’inscription.</p>
      <LeadButton label="Parler de votre jour J" size="lg" />
    </div>
  </section>;
}
