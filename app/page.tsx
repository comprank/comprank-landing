import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Medal,
  Users,
  Calendar,
  ListChecks,
  MessageSquare,
  Hourglass,
  Trophy,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  BarChart3,
  Sparkles,
  Monitor,
  Share2,
  Eye,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { AppJudgeSection } from "@/components/app-judge-section";
import { DayOfEventSection } from "@/components/day-of-event";
import { LeadButton } from "@/components/lead-button";
import { AppLink } from "@/components/app-link";
import { SmartPlannerDemo } from "@/components/smart-planner-demo";
import { JsonLd } from "@/components/json-ld";
import { createPageMetadata, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Logiciel de compétition CrossFit & HYROX",
  description: SITE_DESCRIPTION,
  path: "/",
});

const anim = "opacity-100 translate-y-0";

const homepageFaqs = [
  {
    question: "Le classement s’actualise-t-il automatiquement ?",
    answer:
      "Oui. Dès qu’un score est validé par un juge, le leaderboard est mis à jour en temps réel.",
  },
  {
    question: "Puis-je rendre un leaderboard public ou privé ?",
    answer:
      "Vous pouvez partager un lien public, intégrer l’affichage sur écran géant ou restreindre l’accès aux officiels.",
  },
  {
    question: "Comment fonctionnent les listes d’attente ?",
    answer:
      "Activez-les par division. En cas de désistement, le premier de la liste reçoit une invitation et peut confirmer sa place.",
  },
  {
    question: "Puis-je importer des athlètes existants ?",
    answer:
      "Oui, via import CSV ou envoi d’invitations avec des codes dédiés.",
  },
  {
    question: "Faut-il internet pour utiliser la Régie live ?",
    answer:
      "Non. Le comptage des juges, le Départ, le chrono partagé et la TV live fonctionnent sur le réseau local du Kit Régie. Si la connexion internet coupe, les scores finaux sont envoyés à CompRank dès son retour.",
  },
  {
    question: "Comment fonctionne le chronométrage HYROX ?",
    answer:
      "CompRank installe les points de détection et équipe chaque athlète d’une puce RFID portée à la cheville. Les passages remontent automatiquement ; après l’arrivée, chaque athlète retrouve son temps total, le détail Course et Stations, et sa position dans sa division.",
  },
];

function TrustBar() {
  return (
    <section className="py-12 bg-dark-800/50 border-y border-dark-600">
      <div className="container-custom">
        <div className="text-center">
          <p className="mb-6 font-mono text-base uppercase tracking-wide text-gray-500 sm:text-sm">
            Également adapté à d’autres formats de compétition
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Fitness fonctionnel", "Haltérophilie", "Powerlifting"].map((sport) => (
              <Badge
                key={sport}
                variant="outline"
                className="px-4 py-2"
              >
                {sport}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PrimaryCategories() {
  const categories = [
    {
      href: "/competition-crossfit",
      label: "CrossFit",
      title: "Workouts, divisions, heats et scoring mobile",
      description:
        "Pour une compétition CrossFit, CompRank gère les workouts, les divisions, les heats et le scoring mobile des juges. Préparez le déroulé, équipez vos juges et publiez un leaderboard actualisé à chaque score.",
    },
    {
      href: "/competition-hyrox",
      label: "HYROX",
      title: "Catégories, vagues, stations et temps intermédiaires",
      description:
        "Pour une compétition HYROX, CompRank gère les catégories, les vagues de départ, les stations et les temps intermédiaires. Suivez les départs et les splits station par station jusqu’au classement final, avec le chronométrage RFID en option.",
    },
  ];

  return (
    <section id="formats" className="section bg-dark-800">
      <div className="container-custom">
        <div className="flex flex-col items-start gap-4">
          <p className="font-mono text-base uppercase tracking-wide text-primary-400 sm:text-sm">
            Deux formats, un même outil
          </p>
          <h2 className="max-w-[35ch] text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
            Une organisation pensée pour CrossFit et HYROX
          </h2>
          <p className="max-w-[48ch] text-lg text-pretty text-gray-400">
            CompRank gère les compétitions CrossFit et HYROX : chaque
            discipline dispose de son propre déroulé, tout en gardant
            inscriptions, terrain et résultats dans la même plateforme.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group flex flex-col items-start gap-5 rounded-xl bg-dark-700/60 p-6 ring-1 ring-white/10 hover:ring-primary-500/50 sm:p-8"
            >
              <Badge variant="outline">{category.label}</Badge>
              <h3 className="max-w-[40ch] text-2xl font-medium tracking-tight text-balance text-white">
                {category.title}
              </h3>
              <p className="max-w-[56ch] text-base text-pretty text-gray-400 sm:text-sm">
                {category.description}
              </p>
              <p className="flex items-center gap-2 text-base font-medium text-primary-400 sm:text-sm">
                Découvrir la solution
                <ArrowRight
                  className="size-4 shrink-0 stroke-primary-400 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeaderboardSection() {
  const rows = [
    { rank: 1, name: "Camille D.", box: "CrossFit Lyon", points: 398, change: "+2" },
    { rank: 2, name: "Antoine L.", box: "Box Marseille", points: 392, change: "-1" },
    { rank: 3, name: "Sarah M.", box: "CF Bordeaux", points: 384, change: "+1" },
    { rank: 4, name: "Louis P.", box: "CF Nantes", points: 372, change: "0" },
    { rank: 5, name: "Nora B.", box: "CF Toulouse", points: 361, change: "-2" },
  ];

  return (
    <section id="leaderboard" className="section bg-dark-900">
      <div className="container-custom">
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 items-start ${anim}`}>
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <h2 className="mb-6 text-4xl lg:text-5xl font-bold leading-tight">
              Les scores arrivent.{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Le classement suit.
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Le classement CompRank se met à jour en temps réel : chaque score validé par un juge l’actualise instantanément sur tous les écrans — téléphones, tablettes, écran géant. Partagez-le par lien public ou réservez-le aux officiels.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-dark-800/50 border border-dark-600">
                <Share2 className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Lien public</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-dark-800/50 border border-dark-600">
                <Monitor className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Écran géant</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-dark-800/50 border border-dark-600">
                <Eye className="w-5 h-5 text-green-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Accès privé</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Card className="bg-dark-800/50 border-dark-600 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-dark-500 bg-dark-700/50">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary-500" />
                  <span className="text-sm font-semibold text-white">Classement général</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-green-400">Live</span>
                </div>
              </div>
              <div className="divide-y divide-dark-600/50">
                {rows.map((row) => (
                  <div key={row.rank} className="flex items-center justify-between px-5 py-4 hover:bg-dark-700/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${row.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                        row.rank === 2 ? "bg-gray-500/20 text-gray-300" :
                          row.rank === 3 ? "bg-amber-600/20 text-amber-400" :
                            "bg-dark-600 text-gray-400"
                        }`}>
                        {row.rank}
                      </div>
                      {row.rank <= 3 && <Medal className={`w-4 h-4 ${row.rank === 1 ? "text-yellow-400" : row.rank === 2 ? "text-gray-300" : "text-amber-600"}`} />}
                      <div>
                        <span className="font-medium text-white">{row.name}</span>
                        <span className="text-xs text-gray-500 ml-2">{row.box}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-primary-400">{row.points}</span>
                      <Badge variant="outline" className={`text-xs ${row.change.startsWith("+") ? "border-green-500/30 text-green-400" :
                        row.change.startsWith("-") ? "border-red-500/30 text-red-400" :
                          "border-gray-500/30 text-gray-400"
                        }`}>
                        {row.change !== "0" ? row.change : "−"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-dark-700/50 border-t border-dark-600 p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400">Actualisation en continu</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function SmartPlannerSection() {
  return (
    <section id="planner" className="section bg-dark-800">
      <div className="container-custom">
        <div className={`max-w-6xl mx-auto ${anim}`}>
          <div className="flex flex-col lg:flex-row lg:items-start gap-12">
            <div className="lg:w-1/3 lg:sticky lg:top-24">
              <h2 className="mb-4 text-4xl font-bold leading-tight">
                Préparez les heats{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">avant le jour J</span>
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Avec le Smart Planner de CompRank, vos heats sont planifiés avant le jour J. Choisissez les workouts, les divisions, l&apos;heure de début et la capacité : le Smart Planner prépare un brouillon que vous pouvez ajuster avant validation.
              </p>
              <ul className="space-y-3">
                {["Workouts et divisions dans l'ordre voulu", "Heures recalculées quand un heat bouge", "Brouillon gardé localement avant validation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:w-2/3">
              <div className="rounded-lg bg-dark-700/50 p-4 ring-1 ring-dark-600 md:p-5">
                <SmartPlannerDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OtherFeaturesGrid() {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Inscriptions",
      description: "Portail d'inscription simple avec gestion des équipes, divisions et codes d'invitation.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <ListChecks className="w-6 h-6" />,
      title: "Scoring",
      description: "Barèmes flexibles, validation des juges et calcul automatique des points.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Feedback athlètes",
      description: "Recueillez les avis post-événement pour améliorer vos prochaines éditions.",
      color: "from-teal-500 to-cyan-500",
    },
    {
      icon: <Hourglass className="w-6 h-6" />,
      title: "Liste d'attente",
      description: "File d'attente par division avec remplacement automatique en cas de désistement.",
      color: "from-amber-500 to-yellow-500",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Planification",
      description: "Créez des heats, ajustez la capacité de lanes et synchronisez votre planning.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="features" className="section bg-dark-800">
      <div className="container-custom">
        <div className={`text-center mb-12 ${anim}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Tout pour vos compétitions</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-pretty text-gray-400">
            CompRank réunit les inscriptions, le scoring, le feedback athlètes,
            la liste d’attente et la planification dans un seul outil.
          </p>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 ${anim}`}>
          {features.map((f, i) => (
            <Card key={i} className="bg-dark-700/50 border-dark-600 p-5 text-center hover:border-primary-500/30 transition-all group">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${f.color} bg-opacity-10 w-fit mx-auto mb-3`}>
                <div className="text-white">{f.icon}</div>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-primary-400 transition-colors">{f.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{f.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { n: 1, title: "Créez l'événement", desc: "Paramétrez workouts, divisions et capacité.", icon: <Calendar className="w-5 h-5" /> },
    { n: 2, title: "Ouvrez les inscriptions", desc: "Gérez les places et la liste d'attente.", icon: <Users className="w-5 h-5" /> },
    { n: 3, title: "Planifiez", desc: "Construisez le planning et les heats.", icon: <Clock className="w-5 h-5" /> },
    { n: 4, title: "Attribuez les juges", desc: "Suivi des postes et validation.", icon: <Shield className="w-5 h-5" /> },
    { n: 5, title: "Scorez en live", desc: "Saisie rapide et publication instantanée.", icon: <Zap className="w-5 h-5" /> },
    { n: 6, title: "Publiez & analysez", desc: "Partagez le classement et le feedback.", icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <section className="section bg-dark-900">
      <div className="container-custom">
        <div className={`text-center mb-12 ${anim}`}>
          <h2 className="text-3xl md:text-4xl font-bold">
            Comment{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">ça marche</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-pretty text-gray-400">
            Avec CompRank, une compétition s’organise en six étapes, de la
            création de l’événement à la publication du classement.
          </p>
        </div>

        <div className={`relative max-w-5xl mx-auto ${anim}`}>
          <div className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-dark-500 to-transparent" />
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
            {steps.map((step) => (
              <div key={step.n} className="relative text-center group">
                <div className="relative z-10 w-10 h-10 rounded-full bg-dark-700 border-2 border-dark-500 group-hover:border-primary-500/50 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <span className="text-sm font-bold text-primary-400">{step.n}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="section bg-dark-800">
      <div className="container-custom">
        <div className={`text-center mb-12 ${anim}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Questions fréquentes</h2>
        </div>
        <div className={`mx-auto max-w-3xl ${anim}`}>
          <Accordion type="single" collapsible>
            {homepageFaqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`q${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className={`section bg-dark-900 ${anim}`}>
      <div className="container-custom">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary-500/10 via-dark-700 to-dark-800 border border-primary-500/20 p-8 lg:p-12 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />
          <div className="relative z-10">
            <Badge className="mb-6 bg-primary-500/10 text-primary-400 border-primary-500/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Lancez-vous maintenant
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à organiser votre{" "}
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                prochaine compétition ?
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-300 mb-8">
              Lancez votre événement en quelques minutes et offrez une expérience premium
              à vos athlètes et spectateurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <LeadButton
                label="Démarrer gratuitement"
                size="lg"
                variant="outline"
                showArrow
              />
            </div>
            <p className="mt-6 text-base text-gray-400 sm:text-sm">
              Envie d’explorer par vous-même ?{" "}
              <AppLink placement="bottom-cta" />
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: "CompRank",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Competition management software",
        operatingSystem: "Web",
        browserRequirements: "Requires a modern web browser",
        inLanguage: "fr-FR",
        description:
          "Logiciel de gestion de compétitions CrossFit et HYROX pour les organisateurs en France.",
        featureList: [
          "Gestion des inscriptions",
          "Planification des Vagues",
          "Scorecards mobiles pour les juges",
          "Classements en direct",
          "Gestion des catégories et divisions",
          "Régie live et TV live pour les compétitions FUNCTIONAL",
          "Chronométrage RFID pour les compétitions HYROX",
        ],
        audience: {
          "@type": "Audience",
          audienceType: "Organisateurs de compétitions sportives",
          geographicArea: {
            "@type": "Country",
            name: "France",
          },
        },
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: homepageFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main id="contenu" className="isolate">
      <JsonLd data={structuredData} />
      <Hero />
      <PrimaryCategories />
      <TrustBar />
      <LeaderboardSection />
      <SmartPlannerSection />
      <AppJudgeSection />
      <DayOfEventSection />
      <OtherFeaturesGrid />
      <HowItWorksSection />
      <FAQSection />
      <BottomCTA />
    </main>
  );
}
