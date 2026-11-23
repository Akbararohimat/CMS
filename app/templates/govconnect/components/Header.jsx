"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const defaultNavigation = [
  { label: "Beranda", href: "#home" },
  { label: "Profil", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Informasi", href: "#information" },
  { label: "Berita", href: "#news" },
  { label: "Kontak", href: "#contact" },
];

export default function Header({ config = {} }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const header = config.header || {};
  const identity = config.identity || {};
  const utilityBar = header.utilityBar || {};
  const navigation = header.navigation || defaultNavigation;

  const primaryColor = identity.primaryColor || "#0B3B78";

  return (
    <header className="relative z-50 w-full bg-white">
      {utilityBar.enabled !== false && (
        <div
          className="hidden border-b border-white/10 text-white lg:block"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between px-8 text-[11px]">
            <span className="font-medium tracking-wide">
              {config.identity?.tagline || "Melayani untuk Negeri"}
            </span>

            <div className="flex items-center gap-6">
              {(utilityBar.items || []).map((item, index) => (
                <a
                  key={`${item.label}-${index}`}
                  href={item.href || "#"}
                  className="text-white/85 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto flex h-[88px] max-w-[1440px] items-center justify-between px-6 lg:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          {config.logo ? (
            <img
              src={config.logo}
              alt={config.siteName || "Logo instansi"}
              className="h-12 w-12 object-contain"
            />
          ) : (
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center text-xl font-bold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {config.siteName?.charAt(0) || "G"}
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-lg font-bold leading-tight tracking-tight text-slate-900">
              {config.siteName || "Nama Instansi"}
            </p>
            <p className="mt-1 truncate text-[10px] font-medium uppercase tracking-[0.13em] text-slate-500">
              {identity.tagline || "Melayani untuk Negeri"}
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 xl:flex">
          {navigation.map((item, index) => (
            <a
              key={`${item.label}-${index}`}
              href={item.href || "#"}
              className="text-[13px] font-semibold text-slate-700 transition hover:text-blue-800"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden xl:block">
          <a
            href={header.buttonHref || "#services"}
            className="inline-flex h-11 items-center gap-2 px-5 text-sm font-semibold text-white transition hover:brightness-110"
            style={{ backgroundColor: primaryColor }}
          >
            {header.buttonText || "Layanan Publik"}
            <ChevronDown size={15} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center text-slate-800 xl:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 xl:hidden">
          <nav className="flex flex-col">
            {navigation.map((item, index) => (
              <a
                key={`${item.label}-${index}`}
                href={item.href || "#"}
                onClick={() => setMenuOpen(false)}
                className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700 hover:text-blue-800"
              >
                {item.label}
              </a>
            ))}

            <a
              href={header.buttonHref || "#services"}
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-5 py-3 text-center text-sm font-semibold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {header.buttonText || "Layanan Publik"}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
