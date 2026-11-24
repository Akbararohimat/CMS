import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    category: "Digital Transformation",
    title: "Enterprise Digital Platform",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    className: "lg:row-span-2",
    featured: true,
  },
  {
    number: "02",
    category: "Cloud Technology",
    title: "Cloud Infrastructure",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85",
    featured: false,
  },
  {
    number: "03",
    category: "Software Development",
    title: "Smart Business System",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="overflow-hidden bg-emerald-950 py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Selected Works / 2026
            </span>

            <h2 className="mt-5 max-w-xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Ideas Into
              <br />
              <span className="text-emerald-300">Real Impact.</span>
            </h2>
          </div>
          <div className="lg:justify-self-end lg:max-w-md">
            <p className="text-base leading-8 text-emerald-100/75">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-emerald-300"
            >
              Start a Project
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-2">
          {projects.map((project) => (
            <article
              key={project.number}
              className={`group relative overflow-hidden bg-emerald-900 ${
                project.featured
                  ? "min-h-[480px] lg:row-span-2 lg:min-h-[680px]"
                  : "grid min-h-[280px] grid-cols-1 sm:grid-cols-2"
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  project.featured
                    ? "absolute inset-0"
                    : "min-h-[220px] sm:min-h-full"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {project.featured && (
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent" />
                )}
              </div>

              <div
                className={`relative flex flex-col justify-between ${
                  project.featured
                    ? "min-h-[480px] justify-end p-7 sm:min-h-[680px] sm:p-10"
                    : "p-6 sm:p-7"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-emerald-200">
                    / {project.number}
                  </span>

                  <span className="text-xs font-medium uppercase tracking-wider text-emerald-100/80">
                    {project.category}
                  </span>
                </div>

                <div className={project.featured ? "mt-auto" : "mt-10"}>
                  <h3
                    className={`font-bold tracking-tight text-white ${
                      project.featured
                        ? "max-w-lg text-3xl sm:text-4xl"
                        : "text-xl"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-emerald-100/75">
                    {project.description}
                  </p>

                  <a
                    href="#contact"
                    aria-label={`Explore ${project.title}`}
                    className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200/40 text-white transition-colors hover:bg-white hover:text-emerald-950"
                  >
                    <ArrowUpRight size={19} />
                  </a>
                </div>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}