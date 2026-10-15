"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CTA } from "./CTA";
import { AppLink } from "./app-link";
import { LeadDialog } from "./lead-dialog";
import Image from "next/image";
import { CompetitionNavigation } from "./competition-navigation";
import { NavigationDisclosure } from "./navigation-disclosure";

const navigation = [
  { href: "/guides/planning-heats-competition-crossfit", label: "Guide heats" },
  { href: "/#features", label: "Fonctionnalités" },
  { href: "/#offre", label: "Le jour J" },
  { href: "/#faq", label: "FAQ" },
];

export const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const openLead = () => setIsLeadOpen(true);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-dark-900/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center">
          <Link href="/" aria-label="Homepage" onClick={closeMobileMenu}>
            <Image src="/logo.png" alt="CompRank" width={150} height={53} className="h-7 w-auto shrink-0" priority />
          </Link>
        </div>

        <nav aria-label="Navigation principale" className="hidden items-center gap-5 xl:flex">
          <CompetitionNavigation pathname={pathname} />
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMobileMenu}
              aria-current={pathname === item.href ? "page" : undefined}
              className="flex min-h-11 items-center whitespace-nowrap rounded text-sm font-normal text-gray-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden items-center gap-5 sm:flex">
            <AppLink placement="header" label="Ouvrir l’app" className="whitespace-nowrap text-sm font-normal text-gray-300 hover:text-white hover:no-underline" />
            <CTA label="Démarrer" onClick={openLead} />
          </div>

          <NavigationDisclosure
            open={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
            className="relative xl:hidden"
            triggerClassName="flex size-12 items-center justify-center rounded-md text-gray-200 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            label={<><span className="sr-only">{isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}</span>{isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</>}
            panelClassName="absolute right-0 top-12 max-h-[calc(100dvh-5rem)] w-72 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl bg-dark-700 p-3 shadow-2xl ring-1 ring-white/10"
          >
            <nav aria-label="Navigation mobile" className="flex flex-col gap-1"
              onClick={(event) => {
                if (event.target instanceof Element && event.target.closest("a")) closeMobileMenu();
              }}
            >
              <CompetitionNavigation key={String(isMobileMenuOpen)} pathname={pathname} mobile onNavigate={closeMobileMenu} />
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMobileMenu}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="rounded-md px-3 py-3 text-base font-normal text-gray-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:text-sm">
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-1 border-t border-white/10 pt-3 sm:hidden [&_button]:min-h-11">
                <CTA label="Préparer mes inscriptions" onClick={() => { closeMobileMenu(); openLead(); }} />
                <AppLink placement="header-mobile" className="rounded-md px-3 py-3 text-base font-normal text-gray-200 hover:bg-white/5 hover:text-white hover:no-underline sm:text-sm" />
              </div>
            </nav>
          </NavigationDisclosure>
        </div>
      </div>
      <LeadDialog open={isLeadOpen} onOpenChange={setIsLeadOpen} />
    </header>
  );
};
