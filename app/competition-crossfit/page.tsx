import type { Metadata } from "next";
import {
  CalendarClock,
  Dumbbell,
  FileSpreadsheet,
  Smartphone,
  Trophy,
  Users,
} from "lucide-react";
import { CompetitionLanding } from "@/components/competition-landing";
import { CompetitionDayOffer } from "@/components/day-of-event";
import { createPageMetadata } from "@/lib/site";

const title = "Logiciel pour compétition CrossFit";
const description =
  "Planifiez Workouts, divisions et Vagues, équipez vos juges et publiez le classement en direct avec CompRank, avec Régie live en option.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/competition-crossfit",
});

const features = [
  {
    icon: Dumbbell,
    title: "Workouts et barèmes flexibles",
    description:
      "Configurez les épreuves, les formats de score et les règles de classement adaptées à votre compétition.",
  },
  {
    icon: Users,
    title: "Divisions, équipes et athlètes",
    description:
      "Centralisez les inscriptions, les catégories, les équipes et les listes d’attente sans multiplier les fichiers.",
  },
  {
    icon: CalendarClock,
    title: "Heats préparés avant validation",
    description:
      "Le Smart Planner génère un brouillon ajustable selon vos lanes, vos divisions et vos horaires.",
  },
  {
    icon: Smartphone,
    title: "Scoring mobile pour les juges",
    description:
      "Les juges comptent les reps, signalent les no reps et valident les scores depuis leur téléphone.",
  },
  {
    icon: Trophy,
    title: "Leaderboard en direct",
    description:
      "Chaque score validé actualise le classement public, privé ou affiché sur écran géant.",
  },
  {
    icon: FileSpreadsheet,
    title: "Import et suivi centralisés",
    description:
      "Importez vos athlètes par CSV et gardez inscriptions, planning et résultats dans un seul outil.",
  },
];

const steps = [
  {
    title: "Configurez les workouts et les divisions",
    description:
      "Définissez vos épreuves, catégories, formats de score et capacité de lanes.",
  },
  {
    title: "Préparez le planning et les heats",
    description:
      "Générez un brouillon, déplacez les passages et validez uniquement quand le déroulé vous convient.",
  },
  {
    title: "Équipez les juges pour le scoring",
    description:
      "Chaque juge accède à une interface mobile claire pour compter et valider les performances.",
  },
  {
    title: "Publiez les classements",
    description:
      "Les athlètes et spectateurs suivent les résultats à mesure que les scores sont confirmés.",
  },
];

const faqs = [
  {
    question: "CompRank gère-t-il les équipes et les divisions CrossFit ?",
    answer:
      "Oui. Vous pouvez organiser les inscriptions par équipe ou en individuel, créer vos divisions et suivre la capacité de chaque catégorie.",
  },
  {
    question: "Le planning des heats est-il automatique ?",
    answer:
      "Le Smart Planner prépare un brouillon à partir des workouts, divisions, horaires et lanes. Vous pouvez tout ajuster avant de valider le planning.",
  },
  {
    question: "Les juges peuvent-ils compter les reps et les no reps ?",
    answer:
      "Oui. L’app CompRank permet aux juges de compter les reps, d’indiquer les no reps et de valider la Scorecard de leur Couloir. Aucune installation n’est obligatoire : l’interface web reste accessible.",
  },
  {
    question: "Le leaderboard peut-il rester privé ?",
    answer:
      "Oui. Vous pouvez diffuser un lien public, afficher le classement sur écran géant ou limiter l’accès aux personnes autorisées.",
  },
  {
    question: "Peut-on importer une liste d’athlètes existante ?",
    answer:
      "Oui. CompRank accepte l’import CSV et permet aussi d’envoyer des invitations avec des codes dédiés.",
  },
];

export default function CrossFitCompetitionPage() {
  return (
    <CompetitionLanding
      path="/competition-crossfit"
      eyebrow="Logiciel compétition CrossFit"
      title="Organisez votre compétition CrossFit sans tableurs"
      description="Pilotez les inscriptions, workouts, divisions, heats, juges et classements depuis une plateforme conçue pour le jour J."
      primaryCta="Créer ma compétition"
      heroPoints={[
        "Smart Planner ajustable avant publication",
        "Scoring reps et no reps sur mobile",
        "Leaderboard actualisé à chaque score validé",
      ]}
      panelTitle="Vue organisateur"
      panelDescription="Un déroulé lisible, du premier workout au podium."
      panelRows={[
        { label: "Divisions", value: "RX · Scaled · Masters" },
        { label: "Planning", value: "Brouillon ajustable" },
        { label: "Scoring", value: "Juges sur mobile" },
        { label: "Classement", value: "Public ou privé" },
      ]}
      featuresEyebrow="Du WOD au podium"
      featuresTitle="Construisez workouts, divisions et heats dans un seul espace"
      featuresDescription="CompRank relie la préparation, le terrain et la publication des résultats pour supprimer les doubles saisies."
      features={features}
      workflowTitle="Un workflow qui suit vraiment votre compétition"
      workflowDescription="Chaque étape alimente la suivante, sans copier-coller entre un formulaire, un tableur et un outil de classement."
      steps={steps}
      faqTitle="Questions sur l’organisation d’une compétition CrossFit"
      faqs={faqs}
      dayOfEventOffer={<CompetitionDayOffer format="functional" />}
      relatedHref="/competition-hyrox"
      relatedLabel="Vous organisez aussi des compétitions au format HYROX&nbsp;?"
      relatedDescription="Découvrez la gestion des catégories, vagues de départ, stations et temps intermédiaires avec CompRank."
    />
  );
}
