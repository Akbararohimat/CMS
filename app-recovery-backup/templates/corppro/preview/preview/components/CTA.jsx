import { ArrowUpRight } from "lucide-react";

export default function CTA({ config }) {
  const cta = config?.cta ?? {};

  return (
    <section id="contact" className="bg-white px-6 pb-24 lg:px-8 lg:pb-32">
      <div
        className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-8 py-14 sm:px-14 lg:flex-row lg:items-center lg:py-16"
        style={{
          backgroundColor: cta.backgroundColor || "#2563eb",
        }}
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl">
            {cta.heading}
          </h2>

          <p className="mt-4 max-w-xl leading-7 text-blue-100">
            {cta.description}
          </p>
        </div>

        <a
          href={cta.buttonHref || "mailto:hello@example.com"}
          className="inline-flex shrink-0 items-center gap-3 rounded-full px-7 py-4 text-sm font-bold transition-colors hover:opacity-90"
          style={{
            backgroundColor: cta.buttonBackgroundColor || "#ffffff",
            color: cta.buttonTextColor || "#1d4ed8",
          }}
        >
          {cta.buttonText || "Get Started"}
          <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}