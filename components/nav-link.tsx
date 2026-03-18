"use client";

import { useTranslation } from "@/lib/i18n/i18n-context";

type NavLinkProps = {
  vertical?: boolean;
  onClick?: () => void;
};

const NavLink = ({ vertical = false, onClick }: NavLinkProps) => {
  const { t } = useTranslation();

  const links = [
    { href: "#projects", label: t.nav.projects },
    { href: "#skills", label: t.nav.skills },
    { href: "#experience", label: t.nav.experience },
    { href: "#contact", label: t.nav.contact },
    { href: "#about-me", label: t.nav.aboutMe },
  ];

  const base = vertical ? "flex flex-col items-start gap-4" : "flex items-center gap-8";

  return (
    <ul className={base}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="hover:underline cursor-pointer"
            onClick={onClick}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export { NavLink };
