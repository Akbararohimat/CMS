"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigation = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Solutions", href: "#solutions" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" }
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
            <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/90 px-5 py-3 shadow-sm backdrop-blur-md lg:px-7">
            <Link
              href="#home"
              onClick={closeMenu}
              className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-xl font-bold text-white">
                    N
                </span>

                <span className="text-xl font-bold tracking-tight text-slate-950">
                    Tech<span className="text-emerald-700">Nova</span>
                </span>
              </Link>

              <nav
                aria-label="Main Navigation"
                className="hidden items-center gap-7 lg:flex">
                    {navigation.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="text-sm font-medium text-slate-700 transition-colors hover:text-eerald-700">
                            {item.label}
                          </a>
                    ))}
                </nav>

                <a
                 href="#contact"
                 className="hidden items-center gap-2 rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 sm:inline-flex">
                    Get in Touch
                    <ArrowUpRight size={16} />
                 </a>

                 <button
                   type="button"
                   onClick={() => setIsMenuOpen((current) => !current)}
                   aria-label={isMenuOpen ? "Close Navigation" : "Open Navigation"}
                   aria-expanded={isMenuOpen}
                   aria-controls="technova-mobile-navigation"
                   className="rounded-lg border border-slate-200 p-2 text-slate-800 transition-colors hover:bg-slate-100 lg:hidden">
                    {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
                   </button>
            </div>

            {isMenuOpen && (
                <nav
                  id="technova-mobile-navigation"
                  aria-label="Mobile navigation"
                  className="mx-auto mt-2 max-w-7xl rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:hidden">
                    <div className="flex flex-col gap-1">
                        {navigation.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={closeMenu}
                              className="rounded-lg px-3 py-3 text-sm font-medium text-slate-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800">
                                {item.label}
                              </a>
                        ))}

                        <a
                          href="#contact"
                          onClick={closeMenu}
                          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800">
                            Get in Touch
                            <ArrowUpRight size={16} />
                          </a>
                    </div>
                  </nav>
            )}
        </header>
    );
}