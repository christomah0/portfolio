"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/i18n-context";
import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Heart } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const socials = [
    { href: "https://www.facebook.com/Mahalomba", icon: FaFacebook, label: "Facebook" },
    { href: "https://github.com/christomah0", icon: FaGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/jean-christophe-mahalomba-45989b2a3", icon: FaLinkedin, label: "LinkedIn" },
    { href: "https://x.com/@JeanMahalomba", icon: FaXTwitter, label: "X" },
    { href: "https://wa.me/261325620370", icon: FaWhatsapp, label: "WhatsApp" },
    { href: "mailto:christophemahalomba@gmail.com", icon: SiGmail, label: "Email" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-10">
        {/* Top section */}
        <div className="flex flex-col items-center gap-6">
          {/* Brand */}
          <span className="text-lg font-semibold tracking-tight">
            christomah0
          </span>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
            <p className="flex items-center gap-1">
              &copy; {year} Jean Christophe MAHALOMBA. {t.footer.rights}
            </p>
            <p className="flex items-center gap-1.5">
              {t.footer.builtWith} <Heart size={14} className="text-red-500 fill-red-500" /> &middot; {t.footer.sourceCode}{" "}
              <Link
                href="https://github.com/christomah0/portfolio"
                target="_blank"
                className="underline hover:text-white transition-colors"
              >
                GitHub
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
