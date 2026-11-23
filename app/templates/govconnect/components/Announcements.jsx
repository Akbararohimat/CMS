"use client";

import { ArrowUpRight, Megaphone } from "lucide-react";

export default function Announcements({ config = {} }) {
  const announcements = config.announcements || {};
  const items = announcements.items || [];
  const identity = config.identity || {};
  const primaryColor = identity.primaryColor || "#0B3B78";
  const secondaryColor = identity.secondaryColor || "#D9A441";

  if (items.length === 0) return null;

  return (
    <section id="announcements" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-10" style={{ backgroundColor: secondaryColor }} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: primaryColor }}>
              {announcements.eyebrow || "Pengumuman"}
            </span>
          </div>

          <h2 className="text-3xl font-bold text-slate-900 lg:text-[42px]">
            {announcements.heading || "Pengumuman Terbaru"}
          </h2>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="group flex flex-col gap-5 py-7 transition md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-5">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center"
                  style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}
                >
                  <Megaphone size={23} />
                </div>

                <div>
                  {item.category && (
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: primaryColor }}>
                      {item.category}
                    </span>
                  )}

                  <h3 className="mt-2 text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  )}

                  {item.date && (
                    <p className="mt-3 text-xs text-slate-400">{item.date}</p>
                  )}
                </div>
              </div>

              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 text-sm font-bold"
                  style={{ color: primaryColor }}
                >
                  Lihat Pengumuman
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
