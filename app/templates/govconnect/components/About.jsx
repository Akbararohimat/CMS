"use client";

import { ArrowRight, CheckCircle2, Landmark } from "lucide-react";

export default function About({ config = {} }) {
  const about = config.about || {};
  const identity = config.identity || {};

  const primaryColor = identity.primaryColor || "#0B3B78";

  const highlights = about.highlights || [];

  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden bg-slate-100">
            {about.image ? (
              <img
                src={about.image}
                alt={about.imageAlt || "Profil instansi"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-100 text-slate-400">
                <Landmark size={64} strokeWidth={1.2} />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Foto Profil Instansi
                </span>
              </div>
            )}
          </div>

          <div
            className="absolute -bottom-5 -right-5 -z-0 h-32 w-32"
            style={{ backgroundColor: identity.secondaryColor || "#D9A441" }}
          />
          <div
            className="absolute -left-4 -top-4 h-20 w-20 border-2"
            style={{ borderColor: primaryColor }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-[2px] w-10"
              style={{ backgroundColor: identity.secondaryColor || "#D9A441" }}
            />
            <span
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: primaryColor }}
            >
              {about.eyebrow || "Tentang Kami"}
            </span>
          </div>

          <h2 className="max-w-[650px] text-3xl font-bold leading-tight tracking-tight text-slate-900 lg:text-[42px]">
            {about.heading ||
              "Melayani dengan Integritas, Membangun dengan Kolaborasi"}
          </h2>

          {about.description && (
            <p className="mt-7 text-base leading-8 text-slate-600">
              {about.description}
            </p>
          )}

          {about.secondaryDescription && (
            <p className="mt-4 text-base leading-8 text-slate-600">
              {about.secondaryDescription}
            </p>
          )}

          {highlights.length > 0 && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0"
                    style={{ color: primaryColor }}
                  />
                  <span className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          )}

          {about.buttonText && (
            <a
              href={about.buttonHref || "#contact"}
              className="mt-9 inline-flex h-12 items-center gap-3 px-6 text-sm font-bold text-white transition hover:brightness-110"
              style={{ backgroundColor: primaryColor }}
            >
              {about.buttonText}
              <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
