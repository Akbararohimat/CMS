"use client";

import { ArrowRight, Landmark } from "lucide-react";

export default function Hero({ config = {} }) {
  const hero = config.hero || {};
  const identity = config.identity || {};

  const primaryColor = identity.primaryColor || "#0B3B78";
  const secondaryColor = identity.secondaryColor || "#D9A441";

  const overlayOpacity = Number(hero.overlayOpacity ?? 35) / 100;

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[590px] items-center overflow-hidden bg-slate-900"
    >
      {hero.backgroundImage ? (
        <img
          src={hero.backgroundImage}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: hero.backgroundPosition || "center" }}
        />
      ) : (
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950" />
      )}

      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: primaryColor,
          opacity: overlayOpacity,
          mixBlendMode: "multiply",
        }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/10" />

      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 lg:px-12">
        <div className="max-w-[760px]">
          <div className="mb-7 inline-flex items-center gap-2 border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            <Landmark size={15} style={{ color: secondaryColor }} />
            {hero.eyebrow || "Pemerintah untuk Masyarakat"}
          </div>

          <h1 className="max-w-[800px] text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[64px]">
            {hero.heading || "Bersama Membangun Indonesia yang"}
            {" "}
            <span style={{ color: secondaryColor }}>
              {hero.highlightText || "Lebih Baik"}
            </span>
          </h1>

          {hero.description && (
            <p className="mt-7 max-w-[620px] text-base leading-8 text-white/80 lg:text-lg">
              {hero.description}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryButton?.href || "#services"}
              className="inline-flex h-14 items-center gap-3 px-7 text-sm font-bold text-white transition hover:brightness-110"
              style={{ backgroundColor: primaryColor }}
            >
              {hero.primaryButton?.text || "Jelajahi Layanan"}
              <ArrowRight size={17} />
            </a>

            <a
              href={hero.secondaryButton?.href || "#about"}
              className="inline-flex h-14 items-center border border-white/60 px-7 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
            >
              {hero.secondaryButton?.text || "Tentang Kami"}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
        <div
          className="h-full w-1/3"
          style={{ backgroundColor: secondaryColor }}
        />
      </div>
    </section>
  );
}
