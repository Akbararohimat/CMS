import { ArrowUpRight } from "lucide-react";

export default function About({ config }) {
  const about = config?.about ?? {};

  return (
    <section id="about" className="bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative">
          <div className="absolute -bottom-5 -left-5 h-40 w-40 bg-blue-100" />

          <img
            src={
              about.image ||
              "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85"
            }
            alt="Company workspace"
            className="relative h-[420px] w-full object-cover sm:h-[520px]"
          />

          <div className="absolute -right-5 -top-5 hidden h-28 w-28 border-8 border-white bg-blue-600 sm:block" />
        </div>

        <div>
          <span className="text-sm font-bold tracking-[0.18em] text-blue-600 uppercase">
            {about.eyebrow || "About Our Company"}
          </span>

          <h2 className="mt-5 text-4xl leading-tight font-bold tracking-tight text-slate-950 sm:text-5xl">
            {about.heading}
          </h2>

          <p className="mt-7 text-base leading-8 text-slate-600">
            {about.description}
          </p>

          {about.secondaryDescription && (
            <p className="mt-4 text-base leading-8 text-slate-600">
              {about.secondaryDescription}
            </p>
          )}

          <a
            href={about.buttonHref || "#services"}
            className="mt-9 inline-flex items-center gap-3 border-b-2 border-blue-600 pb-2 text-sm font-bold text-slate-950 transition-colors hover:text-blue-600"
          >
            {about.buttonText || "Discover More"}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}