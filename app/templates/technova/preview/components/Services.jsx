import {
  Code2,
  Cloud,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Software Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    number: "02",
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "IT Consulting",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            What We Offer
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Technology Solutions for a{" "}
            <span className="text-emerald-700">Better Tomorrow</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer nec odio. Praesent libero.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.number}
                className="group relative border border-slate-200 bg-white p-8 transition-colors duration-300 hover:border-emerald-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition-colors duration-300 group-hover:bg-emerald-950 group-hover:text-white">
                    <Icon size={27} strokeWidth={1.7} />
                  </div>

                  <span className="text-sm font-semibold text-slate-300">
                    {service.number}
                  </span>
                </div>
                <h3 className="mt-9 text-xl font-bold text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  aria-label={`Learn more about ${service.title}`}
                  className="mt-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:border-emerald-800 hover:bg-emerald-950 hover:text-white"
                >
                  <ArrowUpRight size={18} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}