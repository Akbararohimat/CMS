
export default function Projects({ config }) {
  const projectsConfig = config?.projects ?? {};
  const projects = projectsConfig.items ?? [];

  const getGridLayout = () => {
    if (projects.length === 1) {
      return "mx-auto max-w-xl grid-cols-1";
    }

    if (projects.length === 2) {
      return "mx-auto max-w-4xl grid-cols-1 md:grid-cols-2";
    }

    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <section id="projects" className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-[0.18em] text-blue-600 uppercase">
            {projectsConfig.eyebrow || "Our Projects"}
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            {projectsConfig.heading}
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {projectsConfig.description}
          </p>
        </div>

        {projects.length > 0 && (
          <div
            className={`mt-16 grid gap-8 ${getGridLayout()}`}
          >
            {projects.map((project, index) => (
              <article
                key={project.id || `${project.title}-${index}`}
                className="group min-w-0"
              >
                <div className="overflow-hidden bg-slate-200">
                  <img
                    src={
                      project.image ||
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=85"
                    }
                    alt={project.title || "Project image"}
                    className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="pt-6">
                  <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                    {project.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-slate-950">
                    {project.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
