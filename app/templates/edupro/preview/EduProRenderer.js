"use client";

import {
  ArrowRight,
  GraduationCap,
  Menu,
  BookOpen,
  X,
} from "lucide-react";
import { useState } from "react";

export default function EduProRenderer({ config }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!config) return null;

  const header = config.header || {};
  const hero = config.hero || {};
  const about = config.about || {};
  const programs = config.programs || {};
  const testimonials = config.testimonials || {};
  const cta = config.cta || {};
  const footer = config.footer || {};

  const navigation = Array.isArray(header.navigation)
    ? header.navigation
    : [];

  const programItems = Array.isArray(programs.items)
    ? programs.items
    : [];

  const testimonialItems = Array.isArray(testimonials.items)
    ? testimonials.items
    : [];

  const quickLinks = Array.isArray(footer.quickLinks)
    ? footer.quickLinks
    : [];

  const primaryButton = hero.primaryButton || {};
  const secondaryButton = hero.secondaryButton || {};

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <header
        className="relative z-50 border-b border-slate-100"
        style={{
          backgroundColor: header.backgroundColor || "#ffffff",
          color: header.textColor || "#1e293b",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <a href="#home" className="flex items-center gap-3">
            {config.logo ? (
              <img
                src={config.logo}
                alt={`${config.siteName || "EduPro"} logo`}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                <GraduationCap size={25} />
              </div>
            )}

            <span className="text-xl font-bold tracking-tight">
              {config.siteName || "EduPro"}
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item, index) => (
              <a
                key={index}
                href={item.href || "#"}
                className="text-sm font-medium opacity-80 transition hover:opacity-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {header.buttonText && (
            <a
              href={header.buttonHref || "#contact"}
              className="hidden items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 md:inline-flex"
            >
              {header.buttonText}
              <ArrowRight size={16} />
            </a>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-slate-100 px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              {navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.href || "#"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}

              {header.buttonText && (
                <a
                  href={header.buttonHref || "#contact"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 inline-flex justify-center rounded-lg bg-blue-800 px-5 py-3 text-sm font-semibold text-white"
                >
                  {header.buttonText}
                </a>
              )}
            </div>
          </nav>
        )}
      </header>

      <section
        id="home"
        className="relative overflow-hidden bg-slate-950"
        style={
          hero.backgroundImage
            ? {
                backgroundImage: `linear-gradient(90deg, rgba(8, 24, 55, 0.92), rgba(8, 24, 55, 0.48)), url("${hero.backgroundImage}")`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : undefined
        }
      >
        {!hero.backgroundImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950" />
        )}

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-32">
          <div className="max-w-2xl">
            {hero.badgeText && (
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-100">
                {hero.badgeText}
              </span>
            )}

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {hero.heading}
              {hero.highlightText && (
                <>
                  {" "}
                  <span className="text-blue-300">
                    {hero.highlightText}
                  </span>
                </>
              )}
            </h1>

            {hero.description && (
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                {hero.description}
              </p>
            )}

            <div className="mt-9 flex flex-wrap gap-4">
              {primaryButton.text && (
                <a
                  href={primaryButton.href || "#programs"}
                  className="inline-flex items-center gap-3 rounded-lg bg-white px-6 py-4 text-sm font-semibold text-blue-950 transition hover:bg-blue-50"
                >
                  {primaryButton.text}
                  <ArrowRight size={17} />
                </a>
              )}

              {secondaryButton.text && (
                <a
                  href={secondaryButton.href || "#about"}
                  className="inline-flex items-center rounded-lg border border-white/40 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {secondaryButton.text}
                </a>
              )}
            </div>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            {hero.backgroundImage ? null : (
              <div className="flex h-80 w-80 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <div className="flex h-60 w-60 items-center justify-center rounded-full border border-white/20 bg-white/5">
                  <GraduationCap
                    size={120}
                    strokeWidth={1}
                    className="text-blue-200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {(about.heading || about.description || about.image) && (
        <section id="about" className="py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">

            {about.image && (
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={about.image}
                  alt={about.heading || "About"}
                  className="h-full max-h-[480px] min-h-[300px] w-full object-cover"
                />
              </div>
            )}

            <div className={about.image ? "" : "max-w-3xl"}>
              {about.eyebrow && (
                <p className="text-sm font-bold tracking-[0.2em] text-blue-800">
                  {about.eyebrow}
                </p>
              )}

              {about.heading && (
                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                  {about.heading}
                </h2>
              )}

              {about.description && (
                <p className="mt-6 whitespace-pre-line text-base leading-8 text-slate-600">
                  {about.description}
                </p>
              )}

              {about.buttonText && (
                <a
                  href={about.buttonHref || "#programs"}
                  className="mt-8 inline-flex items-center gap-3 rounded-lg bg-blue-800 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-900"
                >
                  {about.buttonText}
                  <ArrowRight size={17} />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {(programs.heading || programItems.length > 0) && (
        <section id="programs" className="bg-slate-50 py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="mx-auto max-w-2xl text-center">
              {programs.eyebrow && (
                <p className="text-sm font-bold tracking-[0.2em] text-blue-800">
                  {programs.eyebrow}
                </p>
              )}

              {programs.heading && (
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {programs.heading}
                </h2>
              )}

              {programs.description && (
                <p className="mt-5 leading-8 text-slate-600">
                  {programs.description}
                </p>
              )}
            </div>

            {programItems.length > 0 && (
              <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {programItems.map((item, index) => (
                  <article
                    key={item.id || index}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-blue-200"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title || item.name || "Program"}
                        className="h-52 w-full object-cover"
                      />
                    )}

                    <div className="p-7">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                        <BookOpen size={23} />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900">
                        {item.title || item.name}
                      </h3>

                      {item.description && (
                        <p className="mt-3 leading-7 text-slate-600">
                          {item.description}
                        </p>
                      )}

                      {item.buttonText && (
                        <a
                          href={item.buttonHref || "#contact"}
                          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-950"
                        >
                          {item.buttonText}
                          <ArrowRight size={16} />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {testimonialItems.length > 0 && (
        <section className="py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">

            <div className="mx-auto max-w-2xl text-center">
              {testimonials.eyebrow && (
                <p className="text-sm font-bold tracking-[0.2em] text-blue-800">
                  {testimonials.eyebrow}
                </p>
              )}

              {testimonials.heading && (
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {testimonials.heading}
                </h2>
              )}
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonialItems.map((item, index) => (
                <article
                  key={item.id || index}
                  className="rounded-xl border border-slate-200 p-7"
                >
                  {item.message && (
                    <p className="leading-8 text-slate-600">
                      “{item.message}”
                    </p>
                  )}

                  <div className="mt-7 border-t border-slate-100 pt-5">
                    <p className="font-bold text-slate-900">
                      {item.name || item.author || ""}
                    </p>

                    {item.role && (
                      <p className="mt-1 text-sm text-slate-500">
                        {item.role}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {(cta.heading || cta.description || cta.buttonText) && (
        <section id="contact" className="bg-blue-950 py-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            {cta.heading && (
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {cta.heading}
              </h2>
            )}

            {cta.description && (
              <p className="mx-auto mt-5 max-w-2xl leading-8 text-blue-100">
                {cta.description}
              </p>
            )}

            {cta.buttonText && (
              <a
                href={cta.buttonHref || "#contact"}
                className="mt-8 inline-flex items-center gap-3 rounded-lg bg-white px-7 py-4 text-sm font-semibold text-blue-950 transition hover:bg-blue-50"
              >
                {cta.buttonText}
                <ArrowRight size={17} />
              </a>
            )}
          </div>
        </section>
      )}

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">

          <div className="lg:col-span-2">
            <a href="#home" className="inline-flex items-center gap-3">
              {config.logo ? (
                <img
                  src={config.logo}
                  alt={`${config.siteName || "EduPro"} logo`}
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <GraduationCap size={30} className="text-blue-300" />
              )}

              <span className="text-xl font-bold">
                {config.siteName || "EduPro"}
              </span>
            </a>

            {footer.description && (
              <p className="mt-5 max-w-md leading-7 text-slate-400">
                {footer.description}
              </p>
            )}
          </div>

          {quickLinks.length > 0 && (
            <div>
              <h3 className="font-semibold">Quick Links</h3>

              <ul className="mt-5 space-y-3">
                {quickLinks.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href || "#"}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {item.label || item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="font-semibold">Contact</h3>

            <div className="mt-5 space-y-3 text-sm text-slate-400">
              {footer.address && <p>{footer.address}</p>}

              {footer.email && (
                <a
                  href={`mailto:${footer.email}`}
                  className="block transition hover:text-white"
                >
                  {footer.email}
                </a>
              )}
            </div>
          </div>
        </div>

        {footer.copyright && (
          <div className="border-t border-white/10 px-6 py-6 text-center text-sm text-slate-500">
            {footer.copyright}
          </div>
        )}
      </footer>
    </main>
  );
}
