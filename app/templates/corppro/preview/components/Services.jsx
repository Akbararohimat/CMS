import {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Lightbulb,
  ArrowUpRight,
  Monitor,
  Code,
  ShieldCheck,
  Settings,
  Users,
  TrendingUp,
  Globe,
} from "lucide-react";

const iconMap = {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Lightbulb,
  Monitor,
  Code,
  ShieldCheck,
  Settings,
  Users,
  TrendingUp,
  Globe,
};

export default function Services({ config }) {
  const servicesConfig = config?.services ?? {};
  const services = servicesConfig.items ?? [];

  return (
    <section id="services" className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-[0.18em] text-blue-600 uppercase">
            {servicesConfig.eyebrow || "Our Services"}
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {servicesConfig.heading}
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {servicesConfig.description}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || BriefcaseBusiness;

            return (
              <article
                key={`${service.title}-${index}`}
                className="group border border-slate-200 bg-white p-8 transition-colors hover:border-blue-300"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-950">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {service.description}
                </p>

                <a
                  href={service.buttonHref || "#contact"}
                  aria-label={`${service.buttonText || "Learn More"} about ${service.title}`}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-600"
                >
                  {service.buttonText || "Learn More"}
                  <ArrowUpRight size={16} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}