"use client";

import { ArrowUpRight, CalendarDays, MapPin, Clock } from "lucide-react";

export default function Agenda({ config = {} }) {
  const agenda = config.agenda || {};
  const items = agenda.items || [];
  const identity = config.identity || {};
  const primaryColor = identity.primaryColor || "#0B3B78";
  const secondaryColor = identity.secondaryColor || "#D9A441";

  if (items.length === 0) return null;

  return (
    <section id="agenda" className="bg-slate-50 py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-10" style={{ backgroundColor: secondaryColor }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: primaryColor }}>
              {agenda.eyebrow || "Agenda"}
            </span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 lg:text-[42px]">
            {agenda.heading || "Agenda Kegiatan"}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="border border-slate-200 bg-white p-7 transition hover:border-slate-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="flex h-12 w-12 items-center justify-center"
                  style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                >
                  <CalendarDays size={23} />
                </div>

                {item.date && (
                  <span className="text-xs font-semibold text-slate-500">
                    {item.date}
                  </span>
                )}
              </div>

              <h3 className="mt-7 text-lg font-bold text-slate-900">
                {item.title}
              </h3>

              {item.description && (
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              )}

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                {item.time && (
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={15} />
                    {item.time}
                  </p>
                )}

                {item.location && (
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin size={15} />
                    {item.location}
                  </p>
                )}
              </div>

              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold"
                  style={{ color: primaryColor }}
                >
                  Detail Agenda
                  <ArrowUpRight size={16} />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
