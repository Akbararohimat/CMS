"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Anchor,
  Box,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Globe2,
  Menu,
  Network,
  Package,
  Ship,
  Truck,
  Warehouse,
  X,
} from "lucide-react";

const iconMap = {
  ship: Ship,
  warehouse: Warehouse,
  truck: Truck,
  network: Network,
};

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="max-w-2xl">
      <p className={`text-xs font-bold tracking-[0.2em] ${light ? "text-orange-400" : "text-orange-600"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-3xl font-bold leading-tight tracking-tight md:text-5xl ${light ? "text-white" : "text-[#10243A]"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-sm leading-7 md:text-base ${light ? "text-slate-300" : "text-slate-500"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

function ActionLink({ href = "#", children, secondary = false }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-3 px-5 py-3 text-xs font-bold uppercase tracking-wider transition ${
        secondary
          ? "border border-white/40 text-white hover:border-orange-400 hover:bg-orange-500"
          : "bg-[#F26A2C] text-white hover:bg-[#dc571d]"
      }`}
    >
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}

function TrackingPanel({ config }) {
  const [reference, setReference] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleTrack(event) {
    event.preventDefault();

    if (!reference.trim()) {
      setError("Masukkan nomor referensi terlebih dahulu.");
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
  }

  return (
    <div id="tracking" className="relative z-20 mx-auto -mt-12 max-w-6xl px-5">
      <div className="grid gap-8 border-l-4 border-[#F26A2C] bg-white p-6 shadow-xl md:grid-cols-[1fr_1.2fr] md:p-9">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-orange-600">
            {config.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#10243A]">
            {config.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {config.description}
          </p>
        </div>

        <div>
          <form onSubmit={handleTrack} className="flex flex-col gap-3 sm:flex-row">
            <input
              value={reference}
              onChange={(event) => {
                setReference(event.target.value);
                setError("");
                setSubmitted(false);
              }}
              placeholder={config.placeholder}
              className="min-w-0 flex-1 border border-slate-200 px-4 py-3 text-sm text-[#10243A] outline-none focus:border-orange-500"
              aria-label="Shipment reference"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-[#10243A] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#1d3d5b]"
            >
              {config.buttonText}
              <ArrowRight size={15} />
            </button>
          </form>

          {error && (
            <p className="mt-3 text-xs font-medium text-red-600">{error}</p>
          )}

          {submitted && (
            <div className="mt-4 border border-orange-200 bg-orange-50 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#10243A]">
                <CheckCircle2 size={17} className="text-orange-600" />
                {config.demoStatus}
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Reference: {reference}
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Sample location: {config.demoLocation}
              </p>
              <p className="mt-3 text-[11px] leading-5 text-slate-500">
                {config.demoMessage}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CargoFlowRenderer({ config }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!config) return null;

  const theme = config.theme || {};
  const header = config.header || {};
  const hero = config.hero || {};

  return (
    <main
      className="min-h-screen overflow-hidden bg-[#F5F6F4] font-sans text-[#172B3A]"
      style={{
        "--cargo-primary": theme.primary || "#10243A",
        "--cargo-orange": theme.secondary || "#F26A2C",
      }}
    >
      {/* ANNOUNCEMENT */}
      {config.announcement?.visible && (
        <div
          className="px-5 py-2.5 text-center text-[10px] font-bold tracking-[0.12em] md:text-xs"
          style={{
            backgroundColor: config.announcement.backgroundColor,
            color: config.announcement.textColor,
          }}
        >
          {config.announcement.text}
        </div>
      )}

      {/* HEADER */}
      <header
        className="relative z-40"
        style={{
          backgroundColor: header.backgroundColor || "#10243A",
          color: header.textColor || "#FFFFFF",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a href="#home" className="flex items-center gap-3">
            {config.logo ? (
              <img src={config.logo} alt={config.siteName} className="h-9 w-auto object-contain" />
            ) : (
              <span className="flex size-10 items-center justify-center bg-[#F26A2C]">
                <Package size={21} />
              </span>
            )}
            <span className="text-lg font-black tracking-[0.12em]">
              {header.logoText || config.siteName}
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {(header.navigation || []).map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-semibold text-white/75 transition hover:text-orange-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <ActionLink href={header.buttonHref}>
              {header.buttonText}
            </ActionLink>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-white/10 px-5 py-4 lg:hidden">
            {(header.navigation || []).map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block border-b border-white/10 py-3 text-sm text-white/80"
              >
                {item.label}
              </a>
            ))}
            <a
              href={header.buttonHref}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex bg-[#F26A2C] px-4 py-3 text-xs font-bold text-white"
            >
              {header.buttonText}
            </a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative flex min-h-[620px] items-center bg-[#10243A] md:min-h-[700px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${hero.backgroundImage}")` }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: hero.overlayColor || "#10243A",
            opacity: hero.overlayOpacity ?? 0.78,
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-12 px-5 py-24 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-32">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-orange-400">
              <span className="h-px w-9 bg-orange-400" />
              {hero.eyebrow}
            </p>

            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl">
              {hero.title}
              <span className="mt-2 block text-orange-400">
                {hero.highlight}
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/70 md:text-base">
              {hero.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ActionLink href={hero.primaryHref}>
                {hero.primaryButton}
              </ActionLink>
              <ActionLink href={hero.secondaryHref} secondary>
                {hero.secondaryButton}
              </ActionLink>
            </div>
          </div>

          <div className="hidden justify-end md:flex">
            <div className="max-w-[260px] border-l border-white/30 pl-6 text-white">
              <p className="text-6xl font-black tracking-tighter text-orange-400">
                01
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em]">
                Connected logistics
              </p>
              <p className="mt-2 text-xs leading-6 text-white/60">
                One coordinated approach to freight, storage, and distribution.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-8 hidden items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-white/60 md:flex">
          SCROLL TO EXPLORE
          <ArrowDownRight size={16} />
        </div>
      </section>

      {/* TRACKING */}
      {config.tracking?.visible && (
        <TrackingPanel config={config.tracking} />
      )}

      {/* SERVICES */}
      {config.services?.visible && (
        <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow={config.services.eyebrow}
              title={config.services.title}
              description={config.services.description}
            />
            <span className="text-xs font-bold tracking-widest text-slate-400">
              OUR CAPABILITIES / 01—04
            </span>
          </div>

          <div className="mt-14 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {(config.services.items || []).map((item) => {
              const Icon = iconMap[item.icon] || Package;

              return (
                <article
                  key={item.number}
                  className="group border-b border-r border-slate-200 bg-white p-7 transition hover:bg-[#10243A] md:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-600 group-hover:text-orange-400">
                      {item.number}
                    </span>
                    <Icon size={25} className="text-[#10243A] group-hover:text-white" />
                  </div>
                  <h3 className="mt-12 text-xl font-bold text-[#10243A] group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-slate-500 group-hover:text-slate-300">
                    {item.description}
                  </p>
                  <div className="mt-8 flex justify-end text-orange-500">
                    <ArrowUpRight size={19} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ABOUT */}
      {config.about?.visible && (
        <section id="about" className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2 md:items-center md:px-8 md:py-28">
            <div className="relative">
              <img
                src={config.about.image}
                alt="Logistics warehouse"
                className="h-[360px] w-full object-cover md:h-[500px]"
              />
              <div className="absolute -bottom-5 -right-3 bg-[#F26A2C] p-5 text-white md:-right-5 md:p-7">
                <Package size={30} />
                <p className="mt-3 text-xs font-bold uppercase tracking-widest">
                  Logistics
                  <br />
                  In Motion
                </p>
              </div>
            </div>

            <div className="md:pl-10">
              <SectionHeading
                eyebrow={config.about.eyebrow}
                title={config.about.title}
                description={config.about.description}
              />
              <div className="mt-8">
                <ActionLink href={config.about.buttonHref}>
                  {config.about.buttonText}
                </ActionLink>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* NETWORK */}
      {config.network?.visible && (
        <section id="network" className="bg-[#10243A] px-5 py-24 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow={config.network.eyebrow}
              title={config.network.title}
              description={config.network.description}
              light
            />

            <div className="mt-14 grid gap-px bg-white/15 md:grid-cols-3">
              {(config.network.items || []).map((item, index) => (
                <article key={item.title} className="bg-[#10243A] p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-orange-400">
                      0{index + 1}
                    </span>
                    {[Anchor, Warehouse, Network][index % 3] && (
                      <span className="text-orange-400">
                        {index === 0 ? <Anchor /> : index === 1 ? <Warehouse /> : <Network />}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-12 text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                  <p className="mt-8 border-t border-white/15 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400">
                    {item.location}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INDUSTRIES */}
      {config.industries?.visible && (
        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
          <SectionHeading
            eyebrow={config.industries.eyebrow}
            title={config.industries.title}
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {(config.industries.items || []).map((item, index) => (
              <article
                key={item.title}
                className="flex min-h-36 items-start justify-between gap-6 border-b border-slate-200 py-7"
              >
                <div className="flex gap-5">
                  <span className="pt-1 text-xs font-bold text-orange-600">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[#10243A]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="shrink-0 text-slate-400" />
              </article>
            ))}
          </div>
        </section>
      )}

      {/* PROCESS */}
      {config.process?.visible && (
        <section className="bg-[#E9ECEA] px-5 py-24 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow={config.process.eyebrow}
              title={config.process.title}
            />

            <div className="mt-14 grid gap-8 md:grid-cols-4">
              {(config.process.steps || []).map((step, index) => (
                <article key={step.number} className="relative border-t-2 border-[#10243A] pt-6">
                  <span className="text-sm font-black text-orange-600">
                    {step.number}
                  </span>
                  <h3 className="mt-7 text-2xl font-bold text-[#10243A]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                  {index < config.process.steps.length - 1 && (
                    <ArrowRight className="absolute right-0 top-6 hidden text-orange-500 md:block" />
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FLEET */}
      {config.fleet?.visible && (
        <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow={config.fleet.eyebrow}
              title={config.fleet.title}
              description={config.fleet.description}
            />
            <span className="text-xs font-bold tracking-widest text-slate-400">
              INFRASTRUCTURE / 03
            </span>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {(config.fleet.items || []).map((item, index) => (
              <article key={item.title} className="group">
                <div className="relative overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-[#F26A2C] px-3 py-2 text-xs font-bold text-white">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#10243A]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* INSIGHTS */}
      {config.insights?.visible && (
        <section className="bg-white px-5 py-24 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow={config.insights.eyebrow}
              title={config.insights.title}
            />

            <div className="mt-12 grid border-t border-slate-200 md:grid-cols-3">
              {(config.insights.items || []).map((item, index) => (
                <article key={item.title} className="border-b border-slate-200 py-8 md:border-r md:px-7 md:first:pl-0">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-orange-600">
                    {item.category}
                  </p>
                  <h3 className="mt-5 text-xl font-bold leading-snug text-[#10243A]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                  <div className="mt-7 flex items-center gap-2 text-xs font-bold text-[#10243A]">
                    READ INSIGHT <ArrowUpRight size={14} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      {config.contact?.visible && (
        <section id="contact" className="bg-[#F26A2C] px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-[0.2em] text-white/75">
                {config.contact.eyebrow}
              </p>
              <h2 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">
                {config.contact.title}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/80">
                {config.contact.description}
              </p>
            </div>

            <a
              href={config.contact.buttonHref}
              className="inline-flex shrink-0 items-center justify-center gap-3 bg-[#10243A] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#1d3d5b]"
            >
              {config.contact.buttonText}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-[#0B1B2B] px-5 py-14 text-white md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#home" className="text-xl font-black tracking-[0.15em]">
              {config.footer.logoText}
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              {config.footer.description}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-orange-400">
              QUICK LINKS
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {(config.footer.links || []).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-orange-400">
              CONTACT
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-400">
              <p>{config.contact.email}</p>
              <p>{config.contact.phone}</p>
              <p>{config.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6">
          <p className="text-xs text-slate-500">
            {config.footer.copyright}
          </p>
        </div>
      </footer>
    </main>
  );
}