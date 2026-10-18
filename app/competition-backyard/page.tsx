import { Flag, Users, Timer, ListChecks, Trophy, WifiOff } from "lucide-react";
import { CompetitionLanding } from "@/components/competition-landing";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Logiciel pour organiser une Backyard",
  description: "Gérez les inscriptions de votre Backyard, les départs et passages de boucles, les abandons et les résultats. Saisie manuelle ou RFID, fonctionnement hors ligne.",
  path: "/competition-backyard",
});

export default function BackyardPage() {
  return <CompetitionLanding
    path="/competition-backyard"
    eyebrow="Organisation Backyard"
    title="Organisez votre Backyard, des inscriptions à la dernière boucle"
    description="Centralisez vos inscriptions, puis suivez les départs et les passages au fil des boucles. Votre équipe retrouve les participants encore en course, les abandons et les hors délai dans le même outil."
    primaryCta="Préparer ma Backyard"
    heroPoints={["Le module d’inscription est sans coût pour l’organisateur.", "Départs, passages et résultats réunis", "Suivi RFID ou saisie manuelle, avec fonctionnement hors ligne"]}
    panelTitle="Une boucle vue par l’organisation"
    panelDescription="Exemple pédagogique de suivi, sans données d’athlètes réels. Les décisions restent celles de votre organisation."
    panelRows={[
      { label: "Avant le départ", value: "Liste des participants" },
      { label: "Pendant la boucle", value: "Suivi des passages" },
      { label: "À contrôler", value: "Abandons et hors délai" },
      { label: "Après validation", value: "Résultats" },
    ]}
    featuresEyebrow="Au poste de suivi"
    featuresTitle="Gardez le fil quand les boucles s’enchaînent"
    featuresDescription="Commencez avec les inscriptions. Le suivi de course vous permet ensuite de regrouper les informations utiles à l’équipe qui tient le poste de départ et d’arrivée."
    features={[
      { icon: Users, title: "Inscriptions centralisées", description: "Rassemblez les participants de votre Backyard avant de préparer le suivi des boucles." },
      { icon: Flag, title: "Départs de boucles", description: "Suivez les départs pour conserver une lecture du déroulé de la course, boucle après boucle." },
      { icon: Timer, title: "Passages RFID ou manuels", description: "Suivez les passages par RFID ou en saisie manuelle selon le dispositif retenu pour votre événement." },
      { icon: ListChecks, title: "Abandons et hors délai", description: "Consignez les abandons et les participants hors délai. Contrôlez les situations avec votre équipe selon le règlement annoncé." },
      { icon: WifiOff, title: "Fonctionnement hors ligne", description: "Le suivi peut fonctionner hors ligne. Préparez le dispositif et testez votre procédure avec l’équipe avant le premier départ." },
      { icon: Trophy, title: "Résultats de la course", description: "Retrouvez les résultats à partir du suivi des boucles et des statuts de vos participants." },
    ]}
    workflowTitle="Préparez aussi la relève de votre équipe"
    workflowDescription="Sur une Backyard, le suivi doit rester compréhensible pour la personne qui reprend le poste. Convenez de qui saisit, qui contrôle et qui confirme une décision."
    steps={[
      { title: "Ouvrez les inscriptions", description: "Créez votre événement et regroupez les participants dans CompRank. Partagez séparément vos consignes et le règlement de course." },
      { title: "Préparez le poste de suivi", description: "Choisissez la saisie manuelle ou le dispositif RFID, vérifiez le matériel et faites un essai de suivi hors ligne avec votre équipe." },
      { title: "Suivez chaque boucle", description: "Relevez les départs et les passages. Faites vérifier un passage manquant avant de conclure sur la situation d’un participant." },
      { title: "Vérifiez les statuts et les résultats", description: "Consignez abandons et hors délai selon vos décisions, puis contrôlez les résultats avant de les communiquer." },
    ]}
    faqTitle="Questions pour préparer votre Backyard"
    faqs={[
      { question: "Quel est le coût des inscriptions pour l’organisateur ?", answer: "Le module d’inscription est sans coût pour l’organisateur. Cette indication concerne ce module et ne signifie pas que toutes les prestations sont gratuites." },
      { question: "Faut-il utiliser des puces RFID ?", answer: "Non. Le suivi des passages peut se faire par RFID ou par saisie manuelle. Le dispositif dépend de votre organisation." },
      { question: "Peut-on travailler hors ligne ?", answer: "Oui, le suivi Backyard dispose d’un fonctionnement hors ligne. Testez votre configuration et votre procédure de suivi avant la course." },
      { question: "Comment suivre les abandons et les hors délai ?", answer: "CompRank permet de suivre ces statuts avec les boucles et les résultats. Votre organisation applique le règlement de l’événement et contrôle les décisions ; cette page ne décrit pas de règle automatique d’élimination." },
      { question: "CompRank apporte-t-il une certification officielle ?", answer: "Non. CompRank est un outil de gestion indépendant. Son utilisation ne constitue ni une certification ni une affiliation officielle de votre Backyard." },
    ]}
    relatedHref="/competition-crossfit"
    relatedLabel="Vous organisez aussi une compétition CrossFit ?"
    relatedDescription="Retrouvez les inscriptions par équipe, la préparation des heats et le scoring des juges."
  />;
}
