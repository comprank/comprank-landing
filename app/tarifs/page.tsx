import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarClock,
  Smartphone,
  Ticket,
  Timer,
  Trophy,
  Tv,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LeadButton } from "@/components/lead-button";
import { AppLink } from "@/components/app-link";
import { JsonLd } from "@/components/json-ld";
import { CheckItem, FaqItem } from "@/components/pricing-parts";
import { createPageMetadata, SITE_URL } from "@/lib/site";

// Montants validés par Nicolas : ne rien ajouter qui n'en découle pas
// (voir CLAUDE.md, « Page tarifs »).
const path = "/tarifs";

export const metadata: Metadata = createPageMetadata({
  title: "Tarifs pour les organisateurs de compétitions",
  description:
    "CompRank ne coûte rien à l’organisateur : l’athlète paie 4 % + 0,50 € de frais de service par inscription, frais de paiement compris. Aucune commission sur un événement gratuit.",
  path,
});

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Tarifs", item: `${SITE_URL}${path}` },
  ],
};

const examples = [
  { price: "30 €", fee: "1,70 €", athlete: "31,70 €", organizer: "30 €" },
  { price: "50 €", fee: "2,50 €", athlete: "52,50 €", organizer: "50 €" },
  { price: "80 €", fee: "3,70 €", athlete: "83,70 €", organizer: "80 €" },
];

const included = [
  {
    icon: Users,
    title: "Inscriptions",
    description:
      "Portail d’inscription simple avec gestion des équipes, divisions et codes d’invitation.",
    points: ["Équipes et divisions", "Codes d’invitation", "Liste d’attente par division"],
  },
  {
    icon: CalendarClock,
    title: "Planning et heats",
    description:
      "Créez des heats, ajustez la capacité de lanes et synchronisez votre planning.",
    points: ["Heats et capacité de lanes", "Heures recalculées quand un heat bouge"],
  },
  {
    icon: Smartphone,
    title: "Scoring mobile des juges",
    description:
      "Chaque juge compte les reps, note les no reps et valide la Scorecard de son Couloir.",
    points: ["App juge hors ligne", "Interface web sans installation"],
  },
  {
    icon: Trophy,
    title: "Classements en direct",
    description:
      "Dès qu’un score est validé par un juge, le classement est mis à jour en temps réel.",
    points: ["Lien public ou accès réservé", "Affichage sur écran géant"],
  },
];

const terrainServices = [
  {
    icon: Tv,
    name: "Kit Régie",
    title: "Régie live + TV live",
    label: "Compétitions de fitness fonctionnel",
    description:
      "Une installation sur place avec le Kit Régie et les téléphones des juges, pour afficher les reps pendant les vagues. Le départ et le chrono sont partagés sur le réseau local.",
  },
  {
    icon: Timer,
    name: "Kit Timing",
    title: "Chronométrage RFID",
    label: "Courses au format HYROX",
    description:
      "Des points de détection et des puces RFID portées à la cheville pour relever les passages. Les temps de course et de stations alimentent les résultats.",
  },
];

export default function TarifsPage() {
  return (
    <main id="contenu" className="isolate overflow-x-clip pt-16">
      <JsonLd data={breadcrumbData} />
      {/* Premier écran : H1 centré + les deux colonnes payeurs */}
      <section className="relative overflow-hidden bg-dark-900 pb-16 pt-8 sm:pb-24 sm:pt-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,173,74,0.16),transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-[22rem] h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-primary-500/[0.07] blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Fil d’Ariane"
            className="text-center text-sm text-gray-400"
          >
            <Link href="/" className="hover:text-white">
              Accueil
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Tarifs</span>
          </nav>

          <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-5 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-[3.5rem]">
              Tarifs CompRank&nbsp;:{" "}
              <span className="bg-gradient-to-r from-primary-300 to-primary-600 bg-clip-text text-transparent">
                0&nbsp;€ pour l’organisateur
              </span>
            </h1>
            <p className="max-w-[56ch] text-base text-pretty text-gray-300 sm:text-lg">
              Vous fixez le prix de l’inscription et vous recevez ce prix.
              L’athlète paie en plus{" "}
              <span className="whitespace-nowrap">4&nbsp;% + 0,50&nbsp;€</span>{" "}
              de frais de service par inscription, frais de paiement compris.
            </p>
          </div>

          <h2 className="mt-9 text-center font-mono text-sm font-medium uppercase tracking-[0.18em] text-gray-400 sm:mt-12">
            Qui paie quoi
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2 md:gap-6">
            {/* Colonne mise en avant : l'organisateur */}
            <article className="relative flex flex-col rounded-2xl bg-gradient-to-b from-primary-500/[0.16] via-dark-700 to-dark-800 p-6 shadow-[0_0_80px_-24px_rgba(255,173,74,0.55)] ring-2 ring-primary-500/70 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  Organisateur
                </h3>
                <Badge className="border-primary-500/30 bg-primary-500/15 text-primary-300">
                  Vous
                </Badge>
              </div>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="text-7xl font-semibold leading-none tracking-tight text-white sm:text-8xl">
                  0&nbsp;€
                </span>
              </p>
              <p className="mt-3 text-base text-gray-300">
                CompRank ne vous facture rien.
              </p>
              <ul
                role="list"
                className="mt-6 flex flex-col gap-3 border-t border-primary-500/20 pt-6"
              >
                <CheckItem tone="organizer">
                  Vous fixez le prix de l’inscription
                </CheckItem>
                <CheckItem tone="organizer">
                  Vous recevez le prix que vous avez fixé
                </CheckItem>
                <CheckItem tone="organizer">
                  Toutes les fonctionnalités du logiciel incluses
                </CheckItem>
              </ul>
            </article>

            {/* Colonne secondaire : l'athlète */}
            <article className="flex flex-col rounded-2xl bg-dark-700/70 p-6 ring-1 ring-white/10 backdrop-blur sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  Athlète
                </h3>
                <Badge className="border-accent-400/30 bg-accent-500/10 text-accent-300">
                  Vos inscrits
                </Badge>
              </div>
              <p className="mt-6 text-5xl font-semibold leading-none tracking-tight text-white sm:mt-8 sm:text-6xl">
                4&nbsp;% + 0,50&nbsp;€
              </p>
              <p className="mt-3 text-base text-gray-300">
                de frais de service, par inscription.
              </p>
              <ul
                role="list"
                className="mt-6 flex flex-1 flex-col gap-3 border-t border-white/10 pt-6"
              >
                <CheckItem tone="athlete">
                  En plus du prix fixé par l’organisateur
                </CheckItem>
                <CheckItem tone="athlete">
                  Frais de paiement (Stripe) compris
                </CheckItem>
              </ul>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-xl bg-accent-500/[0.07] px-4 py-3 text-sm text-gray-300 ring-1 ring-accent-400/15">
                <span className="text-gray-400">Exemple&nbsp;:</span>
                <span className="whitespace-nowrap">prix fixé 50&nbsp;€</span>
                <span aria-hidden="true" className="text-gray-500">→</span>
                <span className="sr-only">, </span>
                <span className="whitespace-nowrap">
                  l’athlète paie{" "}
                  <strong className="font-semibold text-white">52,50&nbsp;€</strong>
                </span>
              </p>
            </article>
          </div>

          {/* Cas particulier, plus discret : l'événement gratuit */}
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-dashed border-white/15 bg-dark-800/60 p-5 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-start gap-4">
              <span
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10"
                aria-hidden="true"
              >
                <Ticket className="size-5 text-gray-300" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Événement gratuit
                </h3>
                <p className="text-base text-gray-400">
                  Inscription à 0&nbsp;€&nbsp;: aucune commission.
                </p>
              </div>
            </div>
            <p className="hidden font-mono text-sm uppercase tracking-wide text-gray-300 sm:block sm:text-right">
              0&nbsp;€ de commission
            </p>
          </div>
        </div>
      </section>

      {/* Exemples chiffrés */}
      <section className="bg-dark-800 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge variant="outline">Exemples par inscription</Badge>
            <h2 className="max-w-[28ch] text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
              Ce que paie l’athlète, ce que reçoit l’organisateur
            </h2>
            <p className="max-w-[52ch] text-lg text-pretty text-gray-400">
              Les frais de service s’ajoutent au prix fixé. L’organisateur
              reçoit le prix qu’il a fixé.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl bg-dark-700/60 ring-1 ring-white/10">
            <table className="w-full border-collapse text-left text-sm sm:text-base">
              <caption className="sr-only">
                Exemples de frais de service pour trois prix d’inscription
                fixés par l’organisateur
              </caption>
              <thead>
                <tr className="border-b border-white/10 align-bottom text-xs font-medium leading-snug text-gray-400 sm:text-sm">
                  <th scope="col" className="px-2.5 py-4 font-medium [hyphens:auto] sm:px-6">
                    Prix fixé par l’organisateur
                  </th>
                  <th scope="col" className="px-2.5 py-4 font-medium [hyphens:auto] sm:px-6">
                    Frais de service
                  </th>
                  <th scope="col" className="px-2.5 py-4 font-medium text-accent-300 [hyphens:auto] sm:px-6">
                    L’athlète paie
                  </th>
                  <th scope="col" className="bg-primary-500/10 px-2.5 py-4 font-medium text-primary-300 [hyphens:auto] sm:px-6">
                    L’organisateur reçoit
                  </th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {examples.map((row) => (
                  <tr
                    key={row.price}
                    className="border-b border-white/5 last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-2.5 py-4 font-medium text-white sm:px-6 sm:py-5"
                    >
                      {row.price}
                    </th>
                    <td className="whitespace-nowrap px-2.5 py-4 text-gray-400 sm:px-6 sm:py-5">
                      + {row.fee}
                    </td>
                    <td className="whitespace-nowrap px-2.5 py-4 font-medium text-white sm:px-6 sm:py-5">
                      {row.athlete}
                    </td>
                    <td className="whitespace-nowrap bg-primary-500/10 px-2.5 py-4 font-semibold text-primary-300 sm:px-6 sm:py-5">
                      {row.organizer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-gray-400">
            Frais de service&nbsp;={" "}
            <span className="whitespace-nowrap">4&nbsp;% du prix fixé + 0,50&nbsp;€</span>,
            frais de paiement compris.
          </p>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="bg-dark-900 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge className="border-primary-500/20 bg-primary-500/10 text-primary-400">
              Inclus pour l’organisateur
            </Badge>
            <h2 className="max-w-[28ch] text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
              Ce qui est inclus
            </h2>
            <p className="max-w-[52ch] text-lg text-pretty text-gray-400">
              Toutes les fonctionnalités du logiciel, des inscriptions au
              classement.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="flex flex-col rounded-2xl bg-gradient-to-b from-dark-600 to-dark-700/60 p-6 ring-1 ring-white/10"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex size-11 items-center justify-center rounded-xl bg-primary-500/10 ring-1 ring-primary-500/20"
                      aria-hidden="true"
                    >
                      <Icon className="size-5 text-primary-400" />
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Inclus
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-pretty text-gray-400 sm:text-sm">
                    {feature.description}
                  </p>
                  <ul
                    role="list"
                    className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-5"
                  >
                    {feature.points.map((point) => (
                      <CheckItem key={point} tone="organizer">
                        <span className="sm:text-sm">{point}</span>
                      </CheckItem>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services terrain : ton volontairement distinct (pointillés, sans orange) */}
      <section className="border-y border-white/10 bg-dark-800 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge variant="outline" className="border-white/20 text-gray-300">
              Optionnel · séparé du logiciel
            </Badge>
            <h2 className="max-w-[28ch] text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
              Services terrain, sur demande
            </h2>
            <p className="max-w-[56ch] text-lg text-pretty text-gray-400">
              Le Kit Régie et le Kit Timing sont des prestations distinctes,
              hors du modèle ci-dessus. Vous pouvez ouvrir vos inscriptions sans
              en réserver.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
            {terrainServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.name}
                  className="flex flex-col rounded-2xl border border-dashed border-white/20 bg-dark-900/60 p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="inline-flex size-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10"
                      aria-hidden="true"
                    >
                      <Icon className="size-5 text-gray-200" />
                    </span>
                    <Badge variant="outline" className="border-white/20 text-gray-300">
                      Sur demande
                    </Badge>
                  </div>
                  <p className="mt-5 text-sm text-gray-400">{service.label}</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-base font-medium text-gray-300">
                    {service.title}
                  </p>
                  <p className="mt-4 text-base text-pretty text-gray-400">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <LeadButton
              label="Parler de votre jour J"
              size="lg"
              variant="outline"
              className="h-11"
              showArrow
            />
            <p className="text-sm text-gray-400">
              Les inscriptions, le planning, le scoring et les classements
              restent inclus, avec ou sans service terrain.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-dark-900 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
            Questions sur les tarifs
          </h2>
          <div className="mt-10 rounded-2xl bg-dark-700/60 px-5 ring-1 ring-white/10 sm:px-8">
            <FaqItem question={"Combien coûte CompRank à l’organisateur\u00a0?"}>
              Rien. CompRank ne facture rien à l’organisateur&nbsp;: vous fixez
              le prix de l’inscription et vous recevez ce prix. Toutes les
              fonctionnalités du logiciel sont incluses&nbsp;: inscriptions,
              planning, scoring et classements. Le Kit Régie et le Kit Timing
              sont des prestations distinctes, sur demande.
            </FaqItem>
            <FaqItem question={"Que paie l’athlète\u00a0?"}>
              En plus du prix fixé par l’organisateur, l’athlète paie des frais
              de service de{" "}
              <span className="whitespace-nowrap">4&nbsp;% + 0,50&nbsp;€</span> par
              inscription. Pour une
              inscription à 50&nbsp;€, il paie 52,50&nbsp;€.
            </FaqItem>
            <FaqItem question={"Et si mon événement est gratuit\u00a0?"}>
              Pour une inscription à 0&nbsp;€, aucune commission n’est
              appliquée.
            </FaqItem>
            <FaqItem question={"Les frais de paiement s’ajoutent-ils\u00a0?"}>
              Non. Les frais de paiement (Stripe) sont compris dans les{" "}
              <span className="whitespace-nowrap">4&nbsp;% + 0,50&nbsp;€</span>. L’organisateur reçoit le prix qu’il a
              fixé.
            </FaqItem>
            <FaqItem question={"Le Kit Régie et le Kit Timing sont-ils inclus\u00a0?"}>
              Non. Le Kit Régie (Régie live + TV live) et le Kit Timing
              (chronométrage RFID) sont des prestations distinctes du logiciel,
              disponibles uniquement sur demande. Parlez-nous de votre événement
              pour en discuter.
            </FaqItem>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-dark-900 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500/15 via-dark-700 to-dark-800 p-8 text-center ring-1 ring-primary-500/25 lg:p-12">
            <div
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-primary-500/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center gap-5">
              <h2 className="max-w-[24ch] text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
                Prêt à ouvrir vos inscriptions&nbsp;?
              </h2>
              <p className="max-w-[48ch] text-lg text-pretty text-gray-300">
                Fixez votre prix, ouvrez les inscriptions et recevez le prix
                fixé. CompRank ne vous facture rien.
              </p>
              <LeadButton
                label="Préparer mes inscriptions"
                size="lg"
                className="h-11"
                showArrow
              />
              <p className="text-base text-gray-400 sm:text-sm">
                Envie d’explorer par vous-même&nbsp;?{" "}
                <AppLink placement="tarifs-cta" />
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
