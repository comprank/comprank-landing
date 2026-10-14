import Link from "next/link";
import { HeatsPlanner } from "@/components/heats-planner";
import { JsonLd } from "@/components/json-ld";
import { LeadButton } from "@/components/lead-button";
import { Badge } from "@/components/ui/badge";
import { createPageMetadata, SITE_URL } from "@/lib/site";

const path = "/guides/planning-heats-competition-crossfit";
const title = "Planning des heats d’une compétition CrossFit";
const description = "Calculez vos heats, transitions et horaires par division. Exemple détaillé, calculateur et modèle CSV pour préparer un planning à vérifier sur le terrain.";
export const metadata = createPageMetadata({ title, description, path });
const sections = [
  ["capacite", "1. Partir des inscrits et des lanes"],
  ["calcul", "2. Calculer la durée d’un bloc"],
  ["exemple", "3. Lire un exemple complet"],
  ["calculateur", "4. Construire votre brouillon"],
  ["terrain", "5. Vérifier les contraintes terrain"],
  ["publication", "6. Publier une version validée"],
];
const sectionClass = "scroll-mt-24 space-y-5 border-t border-white/10 py-10";
const headingClass = "text-2xl font-semibold tracking-tight text-white sm:text-3xl";

export default function HeatsGuidePage() {
  return <main id="contenu" className="isolate bg-dark-900 pb-20 pt-28 text-gray-300">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${SITE_URL}${path}#webpage`, url: `${SITE_URL}${path}`, name: title, description, inLanguage: "fr-FR" },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: title, item: `${SITE_URL}${path}` },
      ] },
    ] }} />
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <nav aria-label="Fil d’Ariane" className="mb-8 text-sm text-gray-400"><Link href="/" className="hover:text-white">Accueil</Link><span aria-hidden="true"> / </span><span>Guide planning des heats</span></nav>
      <header className="max-w-3xl space-y-6 pb-12">
        <Badge variant="outline">Guide organisateur · méthode et outil</Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Construire le planning des heats de votre compétition CrossFit</h1>
        <p className="text-xl leading-relaxed">Une vague de plus peut décaler toute une matinée. Partez des inscriptions confirmées, comptez les lanes réellement utilisables et séparez le temps d’épreuve du temps nécessaire pour remettre l’aire en place.</p>
        <p>Ce guide vous aide à produire un brouillon chiffré. Il ne remplace ni les essais terrain ni la validation de votre équipe. Les horaires de récupération restent à définir pour votre programmation.</p>
        <a href="/downloads/modele-planning-heats.csv" download className="inline-flex rounded-lg bg-primary-400 px-5 py-3 font-medium text-dark-900 hover:bg-primary-300">Télécharger le modèle CSV</a>
      </header>
      <div className="grid items-start gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="rounded-xl border border-white/10 bg-dark-800 p-5 lg:sticky lg:top-24">
          <p className="mb-4 font-medium text-white">Dans ce guide</p>
          <nav aria-label="Sommaire du guide" className="flex flex-col gap-4 text-sm">{sections.map(([id, label]) => <a key={id} href={`#${id}`} className="hover:text-primary-400">{label}</a>)}</nav>
        </aside>
        <article className="min-w-0 leading-relaxed">
          <section id="capacite" className={sectionClass}>
            <h2 className={headingClass}>1. Partir des inscrits et des lanes disponibles</h2>
            <p>Pour chaque division et chaque workout, notez le nombre de participants qui passent ensemble : des équipes pour une épreuve en équipe, des athlètes pour une épreuve individuelle. Ne divisez pas le nombre d’athlètes par les lanes si une lane accueille une équipe entière.</p>
            <ul className="list-disc space-y-3 pl-5">
              <li>Figez une liste de travail des inscriptions confirmées par division. Identifiez les changements encore possibles.</li>
              <li>Comptez les lanes équipées pour ce workout, pas seulement les couloirs tracés au sol. Un rameur manquant peut réduire la capacité.</li>
              <li>Notez le time cap, le temps de remise en place, l’heure de départ et les pauses prévues.</li>
              <li>Vérifiez les juges disponibles, leurs rotations et les accès à la zone d’échauffement.</li>
            </ul>
            <p>Un heat est une vague de participants qui démarre ensemble. Un bloc regroupe ici les heats d’une division pour un workout, sur une même aire.</p>
          </section>
          <section id="calcul" className={sectionClass}>
            <h2 className={headingClass}>2. Calculer la durée d’un bloc sans compter deux fois les transitions</h2>
            <div className="rounded-xl bg-dark-800 p-6 ring-1 ring-white/10">
              <p className="font-mono text-primary-400">Heats = arrondi supérieur (équipes ÷ lanes)</p>
              <p className="mt-4 font-mono text-white">Durée du bloc = heats × time cap + (heats − 1) × transition</p>
            </div>
            <p>La transition entre deux heats couvre la sortie des participants, la remise en place et l’entrée de la vague suivante. Mesurez-la avec l’équipe. Une durée calculée à partir du time cap réserve tout le créneau, même si certains terminent avant.</p>
            <p>Il n’y a pas de transition finale dans cette formule. Si vous devez changer les charges, déplacer du matériel ou briefer de nouveaux juges avant le bloc suivant, ajoutez cette pause séparément, avant ce bloc. Ne la confondez pas avec la transition entre ses heats.</p>
            <p>Pour plusieurs divisions qui utilisent la même aire successivement, additionnez les durées de leurs blocs et les pauses entre blocs. Les divisions ne se déroulent pas simultanément dans ce calcul.</p>
          </section>
          <section id="exemple" className={sectionClass}>
            <Badge variant="outline">Exemple pédagogique · pas un planning client</Badge>
            <h2 className={headingClass}>3. Exemple : 20 équipes, 6 lanes, départ à 09:00</h2>
            <p>Une division, un workout, un time cap de 12 minutes et 3 minutes de transition entre les heats. La pause avant ce premier bloc est de 0 minute. On obtient 4 heats : trois vagues de 6 équipes, puis une vague de 2 équipes.</p>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <caption className="bg-dark-800 p-4 text-left text-gray-300">Horaires illustratifs, avec réservation du time cap complet</caption>
                <thead className="bg-dark-700 text-white"><tr>{["Heat", "Équipes", "Départ", "Fin au cap"].map(label => <th key={label} scope="col" className="px-4 py-3">{label}</th>)}</tr></thead>
                <tbody>{[["1", "6", "09:00", "09:12"], ["2", "6", "09:15", "09:27"], ["3", "6", "09:30", "09:42"], ["4", "2", "09:45", "09:57"]].map(row => <tr key={row[0]} className="border-t border-white/10">{row.map((cell, i) => <td key={i} className="px-4 py-3 font-mono">{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="text-lg text-white">Le bloc dure 57 minutes : 4 × 12 + 3 × 3. Il se termine à 09:57, pas à 10:00.</p>
            <p>Le dernier heat incomplet conserve son time cap. Les lanes libres ne réduisent pas la durée de l’épreuve. Le bloc suivant ne commence à 09:57 que si aucune pause ni remise en place supplémentaire n’est nécessaire.</p>
          </section>
          <section id="calculateur" className={sectionClass}>
            <h2 className={headingClass}>4. Construire et exporter votre brouillon</h2>
            <p>Remplacez les valeurs de l’exemple par vos effectifs et vos contraintes. Les blocs se succèdent sur une seule aire. Le calculateur sert à estimer les horaires ; il n’affecte pas les équipes nominativement et ne contrôle pas leur récupération.</p>
            <HeatsPlanner />
            <p>Vous pouvez aussi partir du <a href="/downloads/modele-planning-heats.csv" download className="text-primary-400 underline underline-offset-4">modèle CSV à télécharger</a>, l’ouvrir dans votre tableur et compléter les paramètres de vos blocs. Pour affecter les équipes à chaque heat, partez de l’export calculé puis ajoutez vos colonnes d’affectation. Le fichier est un point de départ à adapter, pas un planning validé. Consultez les <a href="/downloads/lisez-moi-planning-heats.txt" className="text-primary-400 underline underline-offset-4">instructions du modèle</a>.</p>
          </section>
          <section id="terrain" className={sectionClass}>
            <h2 className={headingClass}>5. Vérifier ce que le calcul ne voit pas</h2>
            <div className="grid gap-5 sm:grid-cols-2">{[
              ["Récupération des équipes", "Comparez, pour chaque équipe, la fin de son passage avec le départ de son épreuve suivante. Faites valider le repos par les responsables de la programmation selon les efforts, le niveau et les conditions. Il n’existe pas de durée universelle garantie par ce calcul."],
              ["Juges et briefings", "Vérifiez qu’un juge n’est pas affecté sur deux postes au même moment. Réservez les briefings, les pauses et le temps de relève ; le nombre de lanes ne prouve pas que vous avez assez de juges."],
              ["Matériel partagé", "Recensez les machines, barres, disques et accessoires qui changent d’aire. Ajoutez le temps de déplacement et de réglage. Deux blocs peuvent être compatibles sur le papier mais réclamer le même matériel."],
              ["Plusieurs aires", "Préparez une chronologie par aire, puis croisez les affectations des équipes, des juges et du matériel. N’additionnez pas des blocs parallèles pour obtenir la durée totale : examinez leurs heures de début et de fin et leurs conflits."],
            ].map(([heading, text]) => <div key={heading} className="rounded-xl bg-dark-800 p-5"><h3 className="mb-3 text-lg font-medium text-white">{heading}</h3><p className="text-sm">{text}</p></div>)}</div>
            <p>Gardez aussi une marge choisie par votre organisation pour les incidents, le traitement des scores ou une remise en place plus longue. Ne réduisez pas le repos des équipes pour absorber un retard sans nouvelle validation.</p>
          </section>
          <section id="publication" className={sectionClass}>
            <h2 className={headingClass}>6. Publier une version que l’équipe peut suivre</h2>
            <ol className="list-decimal space-y-3 pl-5">
              <li>Contrôlez les effectifs et les affectations : chaque équipe doit retrouver ses passages, sa division et sa lane.</li>
              <li>Faites relire le déroulé par les responsables des juges, du matériel et de l’accueil. Testez une transition en conditions réelles.</li>
              <li>Identifiez la version publiée et convenez d’un canal unique pour annoncer les modifications.</li>
              <li>En cas de retard, ajustez les blocs concernés puis revérifiez le repos, les rotations et les ressources partagées avant de diffuser les nouveaux horaires.</li>
            </ol>
            <p>Pour regrouper les inscriptions puis préparer les heats et les résultats dans le même outil, consultez la <Link href="/competition-crossfit" className="text-primary-400 underline underline-offset-4">solution CompRank pour les compétitions CrossFit</Link>. Le Smart Planner de l’application prépare un brouillon ajustable avant validation ; le calculateur de cette page reste un outil pédagogique séparé.</p>
            <div className="rounded-xl border border-primary-400/30 bg-primary-400/5 p-6">
              <h3 className="mb-3 text-xl font-medium text-white">Commencez avec vos inscriptions</h3>
              <p className="mb-5">Le module d’inscription est sans coût pour l’organisateur. Parlez-nous de vos divisions et de votre format avant de préparer le planning.</p>
              <LeadButton label="Préparer ma compétition" size="lg" showArrow />
            </div>
          </section>
        </article>
      </div>
    </div>
  </main>;
}
