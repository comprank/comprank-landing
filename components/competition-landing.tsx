import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { LeadButton } from "@/components/lead-button";
import { AppLink } from "@/components/app-link";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export type LandingFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type LandingStep = {
  title: string;
  description: string;
};

export type LandingFaq = {
  question: string;
  answer: string;
};

type CompetitionLandingProps = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  heroPoints: string[];
  panelTitle: string;
  panelDescription: string;
  panelRows: { label: string; value: string }[];
  featuresEyebrow: string;
  featuresTitle: string;
  featuresDescription: string;
  features: LandingFeature[];
  workflowTitle: string;
  workflowDescription: string;
  steps: LandingStep[];
  faqTitle: string;
  faqs: LandingFaq[];
  relatedHref: string;
  relatedLabel: string;
  relatedDescription: string;
  dayOfEventOffer?: ReactNode;
};

export function CompetitionLanding({
  path,
  eyebrow,
  title,
  description,
  primaryCta,
  heroPoints,
  panelTitle,
  panelDescription,
  panelRows,
  featuresEyebrow,
  featuresTitle,
  featuresDescription,
  features,
  workflowTitle,
  workflowDescription,
  steps,
  faqTitle,
  faqs,
  relatedHref,
  relatedLabel,
  relatedDescription,
  dayOfEventOffer,
}: CompetitionLandingProps) {
  const pageUrl = `${SITE_URL}${path}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: eyebrow,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "fr-FR",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#software`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
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
    <main className="isolate pt-16">
      <JsonLd data={structuredData} />

      <section className="relative overflow-hidden bg-dark-900 py-20 sm:py-24 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,173,74,0.12),transparent_36%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[11fr_9fr] lg:px-8">
          <div className="flex min-w-0 flex-col items-start gap-6">
            <Badge variant="outline">{eyebrow}</Badge>
            <h1 className="max-w-[24ch] text-4xl font-semibold tracking-tight text-balance text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-[48ch] text-lg text-pretty text-gray-300">
              {description}
            </p>
            <ul role="list" className="flex flex-col gap-3">
              {heroPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-base text-pretty text-gray-300 sm:text-sm"
                >
                  <Check
                    className="size-4 h-lh shrink-0 stroke-primary-400"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LeadButton label={primaryCta} size="lg" showArrow />
              <Button asChild size="lg" variant="outline">
                <Link href="#fonctionnalites">Voir les fonctionnalités</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[min(2vw,1rem)] bg-dark-700/80 p-6 shadow-2xl ring-1 ring-white/10 sm:p-8">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-6">
              <p className="text-base font-medium text-primary-400 sm:text-sm">
                {panelTitle}
              </p>
              <p className="text-base text-pretty text-gray-400 sm:text-sm">
                {panelDescription}
              </p>
            </div>
            <dl className="divide-y divide-white/10">
              {panelRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 py-5"
                >
                  <dt className="text-base font-medium text-white sm:text-sm">
                    {row.label}
                  </dt>
                  <dd className="text-right text-base text-gray-400 sm:text-sm">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-white/10 pt-5">
              <Badge variant="secondary">Données synchronisées en direct</Badge>
            </div>
          </div>
        </div>
      </section>

      <section id="fonctionnalites" className="bg-dark-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4">
            <p className="font-mono text-base uppercase tracking-wide text-primary-400 sm:text-sm">
              {featuresEyebrow}
            </p>
            <h2 className="max-w-[35ch] text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
              {featuresTitle}
            </h2>
            <p className="max-w-[48ch] text-lg text-pretty text-gray-400">
              {featuresDescription}
            </p>
          </div>

          <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={feature.title} className="flex flex-col items-start gap-4">
                  <FeatureIcon
                    className="size-6 shrink-0 stroke-primary-400"
                    aria-hidden="true"
                  />
                  <dt className="text-xl font-medium text-white">
                    {feature.title}
                  </dt>
                  <dd className="text-base text-pretty text-gray-400 sm:text-sm">
                    {feature.description}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {dayOfEventOffer}

      <section className="bg-dark-900 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="max-w-[35ch] text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
              {workflowTitle}
            </h2>
            <p className="max-w-[48ch] text-lg text-pretty text-gray-400">
              {workflowDescription}
            </p>
          </div>

          <ol role="list" className="flex flex-col">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="grid grid-cols-[auto_1fr] gap-4 border-t border-white/10 py-6 first:border-t-0 first:pt-0"
              >
                <Badge variant="outline">
                  {String(index + 1).padStart(2, "0")}
                </Badge>
                <div className="flex min-w-0 flex-col gap-2">
                  <h3 className="text-xl font-medium text-balance text-white">
                    {step.title}
                  </h3>
                  <p className="max-w-[56ch] text-base text-pretty text-gray-400 sm:text-sm">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-dark-800 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:px-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="max-w-[35ch] text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
              {faqTitle}
            </h2>
            <p className="max-w-[48ch] text-lg text-pretty text-gray-400">
              Les réponses utiles avant de lancer votre prochaine compétition
              avec {SITE_NAME}.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-dark-900 py-16 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4 border-b border-white/10 pb-8">
            <p className="text-base font-medium text-primary-400 sm:text-sm">
              À découvrir aussi
            </p>
            <h2 className="max-w-[35ch] text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
              {relatedLabel}
            </h2>
            <p className="max-w-[48ch] text-lg text-pretty text-gray-400">
              {relatedDescription}
            </p>
            <Button asChild variant="link">
              <Link href={relatedHref}>
                Explorer cette solution
                <ChevronRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col items-start gap-5">
            <h2 className="max-w-[35ch] text-3xl font-semibold tracking-tight text-balance text-white md:text-4xl">
              Prêt à remplacer les tableurs le jour J&nbsp;?
            </h2>
            <p className="max-w-[48ch] text-lg text-pretty text-gray-400">
              Créez votre événement et centralisez toute l’organisation dans
              CompRank.
            </p>
            <LeadButton
              label="Démarrer gratuitement"
              size="lg"
              variant="outline"
            />
            <p className="text-base text-gray-400 sm:text-sm">
              Envie d’explorer par vous-même ?{" "}
              <AppLink placement="landing-cta" />
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
