import { APP_URL, SITE_URL } from "@/lib/site";

// Keep this discovery summary aligned with the public pages.
const body = `# CompRank

> CompRank est un logiciel français pour les organisateurs de compétitions CrossFit, HYROX et Backyard. Commencez par les inscriptions, puis préparez le planning et les résultats.

Le module d’inscription est sans coût pour l’organisateur. Cette indication ne signifie pas que les athlètes ne paient aucun frais ni que toutes les prestations sont gratuites.
L’application est hébergée sur ${APP_URL}. Le site présente le logiciel et permet de contacter l’équipe.

## Fonctionnalités

- Inscriptions : équipes, divisions, codes d’invitation et listes d’attente.
- CrossFit : workouts, heats, Smart Planner avec brouillon ajustable, scoring mobile des juges et classements.
- HYROX : catégories, vagues de départ, stations, temps intermédiaires et résultats.
- Backyard : inscriptions, départs et passages de boucles, abandons, hors délai et résultats ; suivi RFID ou manuel et fonctionnement hors ligne.
- App juge : comptage des reps et no reps, Scorecards et conservation des scores hors ligne.

## Prestations optionnelles

La Régie live + TV live et le chronométrage RFID sont des prestations distinctes, sur demande. Elles ne sont pas nécessaires pour commencer avec le module d’inscription. Le cas REMES CLASSICS porte uniquement sur les inscriptions, pas sur ces services.

## Pages et ressources

- [Accueil](${SITE_URL}/) : logiciel, inscriptions et cas REMES CLASSICS 2026 (60 athlètes, 20 équipes de trois, auparavant Excel).
- [Compétition CrossFit](${SITE_URL}/competition-crossfit) : inscriptions, divisions, heats, juges et résultats.
- [Compétition HYROX](${SITE_URL}/competition-hyrox) : inscriptions, catégories, vagues et temps.
- [Organisation Backyard](${SITE_URL}/competition-backyard) : inscriptions et suivi des boucles, sans certification ni affiliation officielle.
- [Guide du planning des heats](${SITE_URL}/guides/planning-heats-competition-crossfit) : méthode, calculateur pédagogique, transitions, contraintes de récupération et ressources partagées. Les blocs sont calculés successivement sur une seule aire ; aucune récupération n’est garantie automatiquement.
- [Modèle CSV du planning](${SITE_URL}/downloads/modele-planning-heats.csv) : exemple à adapter, pas un planning validé.
- [Conditions d’utilisation](${SITE_URL}/terms).

## Contact

- Email : contact@comprank.fr
- Application : ${APP_URL}
`;
export const dynamic = "force-static";
export function GET() {
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
