import type { Metadata } from "next";
import {
  Flag,
  Layers3,
  ListChecks,
  Monitor,
  Route,
  Timer,
} from "lucide-react";
import { CompetitionLanding } from "@/components/competition-landing";
import { CompetitionDayOffer } from "@/components/day-of-event";
import { createPageMetadata } from "@/lib/site";

const title = "Logiciel pour compétition HYROX";
const description =
  "Gérez Vagues, catégories, stations, temps intermédiaires et classement en direct, avec chronométrage RFID en option pour vos compétitions HYROX.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/competition-hyrox",
});

const features = [
  {
    icon: Layers3,
    title: "Catégories bien cadrées",
    description:
      "Configurez les formats individuels ou en équipe et appliquez les règles propres à chaque catégorie.",
  },
  {
    icon: Flag,
    title: "Vagues de départ maîtrisées",
    description:
      "Répartissez les participants par vague et gardez une vision claire des départs pendant toute la journée.",
  },
  {
    icon: Route,
    title: "Stations structurées",
    description:
      "Organisez le parcours station par station pour que l’équipe terrain retrouve immédiatement le bon passage.",
  },
  {
    icon: Timer,
    title: "Temps intermédiaires",
    description:
      "Centralisez les temps de course, de station et le temps total jusqu’à l’arrivée, qu’ils soient validés manuellement ou calculés par le chronométrage RFID.",
  },
  {
    icon: ListChecks,
    title: "Règles par catégorie",
    description:
      "Associez les bons standards et paramètres de classement à chaque catégorie de votre événement.",
  },
  {
    icon: Monitor,
    title: "Classement en direct",
    description:
      "Publiez les résultats sur mobile ou écran géant dès que les temps sont validés.",
  },
];

const steps = [
  {
    title: "Créez les catégories et les vagues",
    description:
      "Définissez vos formats, répartissez les participants et préparez les horaires de départ.",
  },
  {
    title: "Structurez les stations",
    description:
      "Cadrez le parcours et les points de chronométrage pour que chaque split remonte au bon endroit.",
  },
  {
    title: "Validez les temps intermédiaires",
    description:
      "Les passages détectés par le chronométrage RFID ou saisis dans CompRank alimentent le bon athlète, sans rapprochement après la course.",
  },
  {
    title: "Classez les athlètes à l’arrivée",
    description:
      "Les temps validés alimentent automatiquement le classement de la bonne catégorie.",
  },
];

const faqs = [
  {
    question: "CompRank gère-t-il plusieurs vagues de départ HYROX ?",
    answer:
      "Oui. Vous pouvez répartir les participants par vague, définir leurs horaires et suivre l’avancement des départs depuis le planning.",
  },
  {
    question: "Peut-on suivre les temps station par station ?",
    answer:
      "Oui. CompRank regroupe les temps de course, de station et le temps total. Avec la prestation de chronométrage RFID, les passages sont détectés automatiquement et les temps détaillés sont calculés à l’arrivée.",
  },
  {
    question: "Les règles peuvent-elles varier selon la catégorie ?",
    answer:
      "Oui. Vous pouvez configurer des catégories distinctes et leur associer les règles et paramètres de classement appropriés.",
  },
  {
    question: "Le classement s’actualise-t-il pendant la course ?",
    answer:
      "Oui. Les temps validés alimentent le classement en direct, consultable sur mobile ou affichable sur un écran.",
  },
  {
    question: "Les équipes terrain doivent-elles installer une application ?",
    answer:
      "Non. Aucune installation n’est obligatoire : les interfaces de saisie et de suivi restent accessibles dans le navigateur sur téléphone ou tablette.",
  },
];

export default function HyroxCompetitionPage() {
  return (
    <CompetitionLanding
      path="/competition-hyrox"
      eyebrow="Logiciel compétition HYROX"
      title="Pilotez votre compétition HYROX, vague après vague"
      description="Gérez catégories, départs, stations, temps intermédiaires et classements sans disperser l’organisation entre plusieurs outils."
      primaryCta="Créer mon événement"
      heroPoints={[
        "Catégories et vagues de départ structurées",
        "Temps intermédiaires suivis station par station",
        "Classement actualisé dès validation des temps",
      ]}
      panelTitle="Suivi de course"
      panelDescription="Le bon athlète, la bonne station, le bon temps."
      panelRows={[
        { label: "Catégories", value: "Solo · Doubles · Relais" },
        { label: "Départs", value: "Vagues planifiées" },
        { label: "Stations", value: "Splits intermédiaires" },
        { label: "Résultats", value: "Par catégorie" },
      ]}
      featuresEyebrow="De la vague à l’arrivée"
      featuresTitle="Cadrez les départs et suivez chaque station"
      featuresDescription="CompRank donne aux organisateurs une vue continue du parcours, des premiers départs jusqu’au classement final."
      features={features}
      workflowTitle="Un suivi continu pendant toute la course"
      workflowDescription="Les informations de planning, de passage et de classement restent reliées pour éviter les rapprochements manuels après l’arrivée."
      steps={steps}
      faqTitle="Questions sur l’organisation d’une compétition HYROX"
      faqs={faqs}
      dayOfEventOffer={<CompetitionDayOffer format="hyrox" />}
      relatedHref="/competition-crossfit"
      relatedLabel="Vous organisez aussi des compétitions CrossFit&nbsp;?"
      relatedDescription="Découvrez comment CompRank relie workouts, divisions, heats, scoring mobile et leaderboard en direct."
    />
  );
}
