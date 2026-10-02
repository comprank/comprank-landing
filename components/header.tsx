"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CTA } from "./CTA";
import { AppLink } from "./app-link";
import { LeadDialog } from "./lead-dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navigation = [
  { href: "/competition-crossfit", label: "CrossFit" },
  { href: "/competition-hyrox", label: "HYROX" },
  { href: "/#offre", label: "Le jour J" },
  { href: "/#features", label: "Fonctionnalités" },
  { href: "/#faq", label: "FAQ" },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const openLead = () => setIsLeadOpen(true);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-dark-900/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center">
          <Link href="/" aria-label="Homepage" onClick={closeMobileMenu}>
            <Image
              src="/logo.png"
              alt="CompRank"
              width={150}
              height={53}
              className="h-7 w-auto shrink-0"
              priority
            />
          </Link>
        </div>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-7 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className="text-sm font-normal text-gray-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="hidden items-center gap-5 sm:flex">
            <AppLink
              placement="header"
              label="Ouvrir l’app"
              className="text-sm font-normal text-gray-300 hover:text-white hover:no-underline"
            />
            <CTA label="Démarrer" onClick={openLead} />
          </div>

          <div className="relative lg:hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-12"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              aria-label={
                isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
              }
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            >
              {isMobileMenuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </Button>

            {isMobileMenuOpen ? (
              <div
                id="mobile-navigation"
                className="absolute right-0 top-12 w-64 rounded-xl bg-dark-700 p-3 shadow-2xl ring-1 ring-white/10"
              >
                <nav
                  aria-label="Navigation mobile"
                  className="flex flex-col gap-1"
                >
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="rounded-md px-3 py-3 text-base font-normal text-gray-200 hover:bg-white/5 hover:text-white sm:text-sm"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-2 flex flex-col gap-1 border-t border-white/10 pt-3 sm:hidden">
                    <CTA
                      label="Démarrer gratuitement"
                      onClick={() => {
                        closeMobileMenu();
                        openLead();
                      }}
                    />
                    <AppLink
                      placement="header-mobile"
                      className="rounded-md px-3 py-3 text-base font-normal text-gray-200 hover:bg-white/5 hover:text-white hover:no-underline sm:text-sm"
                    />
                  </div>
                </nav>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <LeadDialog open={isLeadOpen} onOpenChange={setIsLeadOpen} />
    </header>
  );
};
