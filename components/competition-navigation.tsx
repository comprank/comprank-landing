"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { NavigationDisclosure } from "./navigation-disclosure";
import styles from "./competition-navigation.module.css";

const competitions = [
  { href: "/competition-crossfit", label: "CrossFit" },
  { href: "/competition-hyrox", label: "HYROX" },
  { href: "/competition-backyard", label: "Backyard" },
];

export function CompetitionNavigation({ pathname, mobile = false, onNavigate }: {
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const active = competitions.some((item) => item.href === pathname);
  return (
    <NavigationDisclosure
      hover={!mobile}
      open={open}
      onOpenChange={setOpen}
      className="relative"
      triggerClassName={`${styles.trigger} ${mobile ? "w-full px-3 text-base" : "text-sm"} ${active ? "text-primary" : "text-gray-300"}`}
      label={<><span>Compétitions</span><ChevronDown aria-hidden="true" size={15} className={`transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`} /></>}
      panelClassName={`${styles.panel} ${mobile ? styles.inline : styles.floating}`}
    >
      <ul className="space-y-1">
        {competitions.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => { setOpen(false); onNavigate?.(); }}
              className={styles.link}
            >
              {item.label}<ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </NavigationDisclosure>
  );
}
