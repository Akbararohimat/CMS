"use client";

import {
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Download,
} from "lucide-react";

export default function Transparency({ config = {} }) {
  const transparency = config.transparency || {};
  const items = transparency.items || [];
  const identity = config.identity || {};
  const primaryColor = identity.primaryColor || "#0B3B78";
  const secondaryColor = identity.secondaryColor || "#D9A441";

  if (items.length === 0) return null;

  return (
    <section id="transparency" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-10" style={{ backgroundColor: secondaryColor }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: primaryColor }}>
                {transparency.eyebrow || "Transparansi"}
              </span>
            </div>

            <div
              className="mb-7 flex h-16 w-16 items-center justify-center"
              style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
            >
              <ShieldCheck size={34} strokeWidth={1.6} />
            </div>

            <h2 className="text-3xl font-bold leading-tight text-slate-900 lg:text-[42px]">
              {transparency.heading || "Keterbukaan Informasi Publik"}
            </h2>

            {transparency.description && (
              <p className="mt-6 text-sm leading-8 text-slate-600">
                {transparency.description}
              </p>
            )}
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {items.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="flex items-center justify-between gap-5 py-6"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <FileText
                    size={22}
                    className="mt-1 shrink-0"
                    style={{ color: primaryColor }}
                  />

                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    )}

                    {item.date && (
                      <p className="mt-2 text-xs text-slate-400">
                        {item.date}
                      </p>
                    )}
                  </div>
                </div>

                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buka ${item.title}`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 transition hover:bg-slate-50"
                    style={{ color: primaryColor }}
                  >
                    {item.type === "document" ? (
                      <Download size={17} />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
