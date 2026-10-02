import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/competition-crossfit", label: "Logiciel compétition CrossFit" },
  { href: "/competition-hyrox", label: "Logiciel compétition HYROX" },
  { href: "/#offre", label: "Le jour J" },
  { href: "/#features", label: "Fonctionnalités" },
  { href: "/#faq", label: "Questions fréquentes" },
  { href: "/terms", label: "Conditions d’utilisation" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" aria-label="Homepage">
              <Image
                src="/logo.png"
                alt="CompRank"
                width={150}
                height={53}
                className="h-7 w-auto shrink-0"
              />
            </Link>
            <p className="max-w-[48ch] text-base text-pretty text-gray-400 sm:text-sm">
              La plateforme française pour planifier, scorer et publier les
              résultats de vos compétitions de fitness.
            </p>
          </div>

          <nav
            aria-label="Navigation de pied de page"
            className="grid gap-3 sm:grid-cols-2"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-normal text-gray-400 hover:text-white sm:text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
          <p className="text-base text-pretty text-gray-500 sm:text-sm">
            CompRank est une solution indépendante, sans affiliation ni
            approbation de CrossFit, LLC ou HYROX World GmbH. CrossFit et HYROX
            sont des marques de leurs propriétaires respectifs.
          </p>
          <p className="text-base text-pretty text-gray-500 sm:text-sm">
            Apple, le logo Apple et App Store sont des marques d’Apple Inc.,
            déposées aux États-Unis et dans d’autres pays.
          </p>
          <p className="text-base text-gray-500 sm:text-sm">
            © {new Date().getFullYear()} CompRank. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
