import { APP_URL, SITE_URL } from "@/lib/site";

// https://llmstxt.org/ — résumé du site en markdown, destiné aux assistants IA
// qui citent ou recommandent des outils. Doublon volontaire du contenu des
// pages : à maintenir quand l'offre produit change.
const body = `# CompRank

> CompRank est un logiciel français de gestion de compétitions sportives, conçu
> pour les organisateurs de compétitions CrossFit et HYROX. Il couvre les
> inscriptions, la planification des Vagues, les Scorecards mobiles des juges
> et les classements en direct.

CompRank s'adresse aux coachs et organisateurs de compétitions en France.
Ce site présente le produit ; l'application elle-même est hébergée sur
${APP_URL}. Tout le contenu est en français.

## Fonctionnalités

- **Inscriptions** : portail d'inscription avec gestion des équipes, des divisions et des codes d'invitation.
- **Liste d'attente** : file d'attente par division, avec remplacement automatique en cas de désistement.
- **Planification** : création des Vagues, capacité des Couloirs, synchronisation du planning.
- **App juge et Scorecard** : comptage des reps et no reps sur mobile, conservation des scores hors ligne et envoi à la validation.
- **Classement en direct** : leaderboard publié et mis à jour pendant l'événement.
- **Feedback athlètes** : recueil des avis post-événement pour préparer les éditions suivantes.

## Prestations sur place

Ces prestations sont proposées sur demande ; le logiciel reste gratuit pour l'organisateur.

- **Régie live + TV live — FUNCTIONAL** : CompRank installe le Kit Régie et fournit les téléphones des juges. Le comptage, le Départ, le chrono partagé et la TV live fonctionnent sur le réseau local, même sans internet.
- **Chronométrage RFID — HYROX** : CompRank installe les points de détection et équipe les athlètes d'une puce portée à la cheville. Les passages sont détectés automatiquement ; le temps total, le détail Course et Stations et la position dans la division sont disponibles après l'arrivée.

## Déroulé d'une compétition

1. Créer l'événement : workouts, divisions et capacité.
2. Ouvrir les inscriptions : places disponibles et liste d'attente.
3. Planifier : planning et Vagues.
4. Attribuer les juges : suivi des postes et validation.
5. Scorer en direct : saisie rapide et publication instantanée.
6. Publier et analyser : classement final et feedback des athlètes.

## Pages

- [Accueil](${SITE_URL}/) : présentation du produit, App juge et Scorecard, prestations sur place, fonctionnalités, déroulé d'une compétition et questions fréquentes.
- [Compétition CrossFit](${SITE_URL}/competition-crossfit) : Workouts et barèmes, divisions et équipes, Vagues, scoring mobile des juges, leaderboard en direct, Régie live et TV live.
- [Compétition HYROX](${SITE_URL}/competition-hyrox) : catégories, Vagues de Départ, stations, temps intermédiaires, classement à l'arrivée et chronométrage RFID.
- [Conditions d'utilisation](${SITE_URL}/terms) : conditions générales d'utilisation.

## Contact

- Email : contact@comprank.fr
- Application : ${APP_URL}
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
