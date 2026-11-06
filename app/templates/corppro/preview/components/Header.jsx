"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Header({ config }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const header = config?.header ?? {};
  const navigation = header.navigation ?? [];

  const closeMenu = () => setIsMenuOpen(false);

  const logo = config?.logo;
  const siteName = config?.siteName || "CorpPro";

  return (
    <header
      className="absolute inset-x-0 top-0 z-50 border-b border-slate-200/70 backdrop-blur-sm"
      style={{
        backgroundColor: header.backgroundColor || "#ffffff",
        color: header.textColor || "#0f172a",
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="#home"
          onClick={closeMenu}
          className="flex items-center gap-2 text-2xl font-bold tracking-tight"
        >
          {logo ? (
            <img
              src={logo}
              alt={siteName}
              className="max-h-12 max-w-40 object-contain"
            />
          ) : (
            <span>{siteName}</span>
          )}
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navigation.map((item, index) => (
            <a
              key={`${item.label}-${index}`}
              href={item.href}
              className="text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={header.buttonHref || "#contact"}
          className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:inline-flex"
        >
          {header.buttonText || "Get Started"}
          <ArrowUpRight size={16} />
        </a>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="rounded-lg border border-slate-200 p-2 transition-colors hover:bg-slate-100 lg:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-slate-200 px-6 py-5 shadow-lg lg:hidden"
          style={{
            backgroundColor: header.backgroundColor || "#ffffff",
          }}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item, index) => (
              <a
                key={`${item.label}-${index}`}
                href={item.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-600"
              >
                {item.label}
              </a>
            ))}

            <a
              href={header.buttonHref || "#contact"}
              onClick={closeMenu}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {header.buttonText || "Get Started"}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}