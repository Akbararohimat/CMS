"use client";

import {
  Handshake,
  ShieldCheck,
  Users,
  ArrowUpRight,
} from "lucide-react";

const iconMap = {
  handshake: Handshake,
  "shield-check": ShieldCheck,
  users: Users,
};

export default function Values({ config = {} }) {
  const values = config.values || {};
  const items = values.items || [];
  const identity = config.identity || {};

  const primaryColor = identity.primaryColor || "#0B3B78";
  const secondaryColor = identity.secondaryColor || "#D9A441";

  if (values.enabled === false || items.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-14 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-[2px] w-10"
              style={{ backgroundColor: secondaryColor }}
            />
            <span
              className="text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: primaryColor }}
            >
              Nilai dan Komitmen
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 lg:text-[42px]">
            Prinsip Kami dalam Memberikan Pelayanan
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Komitmen untuk menghadirkan pelayanan publik yang berkualitas,
            terbuka, dan berorientasi pada kebutuhan masyarakat.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || ShieldCheck;

            return (
              <article
                key={`${item.title}-${index}`}
                className="group relative border border-slate-200 bg-white p-8 transition-colors duration-300 hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center"
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      color: primaryColor,
                    }}
                  >
                    <Icon size={27} strokeWidth={1.7} />
                  </div>

                  <span
                    className="text-4xl font-bold"
                    style={{ color: `${secondaryColor}55` }}
                  >
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                )}

                <div
                  className="mt-8 h-[2px] w-10 transition-all duration-300 group-hover:w-20"
                  style={{ backgroundColor: secondaryColor }}
                />

                <ArrowUpRight
                  size={18}
                  className="absolute bottom-8 right-8 text-slate-300 transition group-hover:text-slate-600"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
