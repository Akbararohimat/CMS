import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileSearch,
  FileText,
  FolderOpen,
  Globe2,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  ShieldCheck,
  Users,
  Landmark,
  Building2,
  Eye,
  Target,
  Image as ImageIcon,
} from "lucide-react";

const iconMap = {
  "file-text": FileText,
  "clipboard-list": ClipboardList,
  "message-square": MessageSquare,
  "file-search": FileSearch,
  calendar: CalendarDays,
  bell: Bell,
  "folder-open": FolderOpen,
};

function SectionHeading({ eyebrow, heading, description, centered = false }) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#A47B32]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#173B67] md:text-4xl">
        {heading}
      </h2>

      {description && (
        <p className="mt-4 text-sm leading-7 text-[#687789] md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function Header({ config }) {
  const data = config.header || {};

  return (
    <header className="relative z-30 border-b border-[#DFE5EC] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          {data.logo || config.logo ? (
            <img
              src={data.logo || config.logo}
              alt={data.institutionName || config.siteName}
              className="h-12 w-12 object-contain"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#173B67] text-white">
              <Landmark size={25} />
            </div>
          )}

          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.16em] text-[#A47B32]">
              {data.institutionShortName || config.siteName}
            </p>

            <p className="mt-1 max-w-[260px] text-xs font-extrabold leading-4 text-[#173B67] md:text-sm">
              {data.institutionName}
            </p>

            <p className="mt-1 hidden text-[10px] text-[#687789] sm:block">
              {data.tagline}
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {(data.navigation || []).map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-semibold text-[#40536A] transition hover:text-[#A47B32]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={data.buttonHref || "#services"}
          className="hidden shrink-0 items-center gap-2 bg-[#173B67] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#245A91] lg:flex"
        >
          {data.buttonText || "Layanan Publik"}
          <ArrowUpRight size={15} />
        </a>

        <button
          type="button"
          aria-label="Menu navigasi"
          className="flex h-10 w-10 items-center justify-center border border-[#DFE5EC] text-[#173B67] xl:hidden"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

function Hero({ config }) {
  const data = config.hero || {};
  const hasImage = Boolean(data.backgroundImage);

  return (
    <section id="home" className="relative overflow-hidden bg-[#173B67]">
      {hasImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${data.backgroundImage}")`,
            backgroundPosition: data.backgroundPosition || "center",
          }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `rgba(12, 35, 64, ${data.overlayOpacity ?? 0.45})`,
        }}
      />

      <div className="relative mx-auto grid min-h-[540px] max-w-7xl items-center px-6 py-20 lg:grid-cols-[1fr_320px] lg:gap-16 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D6A84B]" />
            <p className="text-[10px] font-bold tracking-[0.22em] text-[#F1D69D]">
              {data.eyebrow}
            </p>
          </div>

          <p className="mb-5 text-xs font-semibold tracking-[0.12em] text-white/70">
            {data.welcomeLabel}
          </p>

          <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-6xl">
            {data.heading}
            <span className="block text-[#F1D69D]">
              {data.highlightText}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-sm leading-8 text-white/80 md:text-base">
            {data.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {data.primaryButton?.text && (
              <a
                href={data.primaryButton.href || "#services"}
                className="inline-flex items-center gap-3 bg-[#D6A84B] px-6 py-4 text-xs font-bold text-[#173B67] transition hover:bg-[#E5C477]"
              >
                {data.primaryButton.text}
                <ArrowRight size={16} />
              </a>
            )}

            {data.secondaryButton?.text && (
              <a
                href={data.secondaryButton.href || "#profile"}
                className="inline-flex items-center gap-3 border border-white/40 px-6 py-4 text-xs font-bold text-white transition hover:bg-white/10"
              >
                {data.secondaryButton.text}
              </a>
            )}
          </div>
        </div>

        <div className="mt-14 hidden border-l border-white/20 pl-8 lg:block">
          <div className="mb-8 flex items-center gap-3">
            <ShieldCheck className="text-[#D6A84B]" size={25} />
            <p className="text-xs font-bold uppercase tracking-widest text-white">
              Portal Resmi
            </p>
          </div>

          <p className="text-2xl font-bold leading-snug text-white">
            Informasi yang terbuka, pelayanan yang terpercaya.
          </p>

          <p className="mt-4 text-xs leading-6 text-white/60">
            Satu portal untuk mengenal instansi, mengakses informasi, dan
            menemukan layanan publik.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-1/3 bg-[#D6A84B]" />
    </section>
  );
}

function Leadership({ config }) {
  const data = config.leadership || {};

  if (!data.description) return null;

  return (
    <section id="leadership" className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
        <div className="relative">
          <div className="aspect-[4/4.5] overflow-hidden bg-[#E9EDF2]">
            {data.photo ? (
              <img
                src={data.photo}
                alt={data.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[#AAB5C2]">
                <Users size={90} strokeWidth={1} />
              </div>
            )}
          </div>

          <div className="border-l-4 border-[#D6A84B] bg-[#F4F6F9] px-6 py-5">
            <p className="font-bold text-[#173B67]">{data.name}</p>
            <p className="mt-1 text-xs text-[#687789]">{data.position}</p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow={data.eyebrow}
            heading={data.heading}
          />

          <div className="mt-7 border-l-2 border-[#D6A84B] pl-6">
            <p className="text-base leading-9 text-[#536477]">
              “{data.description}”
            </p>
          </div>

          {data.buttonText && (
            <a
              href={data.buttonHref || "#profile"}
              className="mt-8 inline-flex items-center gap-3 text-xs font-bold text-[#173B67] hover:text-[#A47B32]"
            >
              {data.buttonText}
              <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Profile({ config }) {
  const data = config.profile || {};

  return (
    <section id="profile" className="bg-[#F4F6F9] py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <SectionHeading
            eyebrow={data.eyebrow}
            heading={data.heading}
            description={data.description}
          />

          <p className="mt-5 text-sm leading-8 text-[#687789]">
            {data.secondaryDescription}
          </p>

          <div className="mt-9 grid gap-5 border-t border-[#DFE5EC] pt-7 sm:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[#A47B32]">
                <Eye size={18} />
                <p className="text-xs font-bold uppercase tracking-wider">
                  Visi
                </p>
              </div>
              <p className="text-sm leading-7 text-[#40536A]">
                {data.vision}
              </p>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-[#A47B32]">
                <Target size={18} />
                <p className="text-xs font-bold uppercase tracking-wider">
                  Misi
                </p>
              </div>
              <ul className="space-y-2">
                {(data.mission || []).map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-xs leading-6 text-[#40536A]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#D6A84B]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="aspect-[16/10] overflow-hidden bg-[#DFE5EC]">
            {data.image ? (
              <img
                src={data.image}
                alt="Profil instansi"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[#AAB5C2]">
                <Building2 size={80} strokeWidth={1} />
              </div>
            )}
          </div>

          <div className="grid gap-5 border-t border-[#DFE5EC] pt-5 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#173B67]">
                Sejarah
              </h3>
              <p className="text-xs leading-6 text-[#687789]">
                {data.history}
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#173B67]">
                Tugas Pokok
              </h3>
              <p className="text-xs leading-6 text-[#687789]">
                {data.duties}
              </p>
            </div>
          </div>

          {data.functions?.length > 0 && (
            <div className="border-t border-[#DFE5EC] pt-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#173B67]">
                Fungsi Instansi
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {data.functions.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-xs leading-6 text-[#687789]"
                  >
                    <ChevronRight
                      size={14}
                      className="mt-1 shrink-0 text-[#A47B32]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Services({ config }) {
  const data = config.services || {};

  if (!data.items?.length) return null;

  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          heading={data.heading}
          description={data.description}
        />

        <div className="mt-12 grid gap-0 border-y border-[#DFE5EC] md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => {
            const Icon = iconMap[item.icon] || FileText;

            return (
              <article
                key={item.number || index}
                className="group border-b border-[#DFE5EC] p-7 transition hover:bg-[#F4F6F9] md:border-r md:last:border-r-0 lg:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#AAB5C2]">
                    {item.number}
                  </span>
                  <Icon
                    size={24}
                    className="text-[#A47B32] transition group-hover:translate-x-1"
                  />
                </div>

                <h3 className="mt-10 text-lg font-bold text-[#173B67]">
                  {item.title}
                </h3>

                <p className="mt-3 min-h-16 text-xs leading-6 text-[#687789]">
                  {item.description}
                </p>

                <a
                  href={item.href || "#contact"}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#173B67]"
                >
                  {item.buttonText || "Lihat Detail"}
                  <ArrowRight size={14} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function News({ config }) {
  const data = config.news || {};

  if (!data.items?.length) return null;

  return (
    <section id="news" className="bg-[#F4F6F9] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={data.eyebrow}
            heading={data.heading}
            description={data.description}
          />

          <a
            href="#news"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#173B67]"
          >
            Semua Berita
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <article key={item.id || index} className="group bg-white">
              <div className="aspect-[16/10] overflow-hidden bg-[#DFE5EC]">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#AAB5C2]">
                    <ImageIcon size={48} strokeWidth={1} />
                  </div>
                )}
              </div>

              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#A47B32]">
                  {item.category || "Berita Instansi"}
                  {item.date && ` · ${item.date}`}
                </p>

                <h3 className="mt-3 text-lg font-bold leading-7 text-[#173B67]">
                  {item.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-xs leading-6 text-[#687789]">
                  {item.description}
                </p>

                {item.href && (
                  <a
                    href={item.href}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#173B67]"
                  >
                    Baca Selengkapnya
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Announcements({ config }) {
  const data = config.announcements || {};

  if (!data.items?.length) return null;

  return (
    <section id="announcements" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          heading={data.heading}
          description={data.description}
        />

        <div className="mt-10 divide-y divide-[#DFE5EC] border-y border-[#DFE5EC]">
          {data.items.map((item, index) => (
            <article
              key={item.id || index}
              className="grid gap-4 py-6 md:grid-cols-[150px_1fr_auto] md:items-center"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A47B32]">
                <Bell size={15} />
                {item.date || "Pengumuman"}
              </div>

              <div>
                <h3 className="font-bold text-[#173B67]">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#687789]">
                  {item.description}
                </p>
              </div>

              {item.href && (
                <a
                  href={item.href}
                  aria-label={`Baca ${item.title}`}
                  className="flex h-9 w-9 items-center justify-center border border-[#DFE5EC] text-[#173B67] hover:bg-[#F4F6F9]"
                >
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

function Programs({ config }) {
  const data = config.programs || {};

  if (!data.items?.length) return null;

  return (
    <section id="programs" className="bg-[#173B67] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          heading={data.heading}
          description={data.description}
        />

        <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-3">
          {data.items.map((item, index) => (
            <article
              key={item.number || index}
              className="bg-[#173B67] p-8 transition hover:bg-[#204B7B]"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-light text-[#D6A84B]">
                  {item.number || String(index + 1).padStart(2, "0")}
                </span>
                {item.year && (
                  <span className="text-xs text-white/50">{item.year}</span>
                )}
              </div>

              {item.image && (
                <div className="mt-6 aspect-[16/9] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <h3 className="mt-7 text-xl font-bold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-xs leading-7 text-white/65">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Information({ config }) {
  const data = config.information || {};

  if (!data.categories?.length) return null;

  return (
    <section id="information" className="bg-[#F4F6F9] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          heading={data.heading}
          description={data.description}
          centered
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {data.categories.map((category) => {
            const Icon = iconMap[category.icon] || FolderOpen;

            return (
              <article
                key={category.id}
                className="border border-[#DFE5EC] bg-white p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-[#EEF2F6] text-[#173B67]">
                  <Icon size={23} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#173B67]">
                  {category.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#687789]">
                  {category.description}
                </p>

                {category.items?.length > 0 && (
                  <ul className="mt-5 space-y-3 border-t border-[#DFE5EC] pt-5">
                    {category.items.map((item, index) => (
                      <li key={item.id || index}>
                        <a
                          href={item.href || "#information"}
                          className="flex items-start gap-2 text-xs leading-5 text-[#40536A] hover:text-[#A47B32]"
                        >
                          <FileText
                            size={14}
                            className="mt-0.5 shrink-0"
                          />
                          {item.title || item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>

        {data.buttonText && (
          <div className="mt-9 text-center">
            <a
              href={data.buttonHref || "#contact"}
              className="inline-flex items-center gap-3 bg-[#173B67] px-6 py-4 text-xs font-bold text-white hover:bg-[#245A91]"
            >
              {data.buttonText}
              <ArrowRight size={15} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function Agenda({ config }) {
  const data = config.agenda || {};

  if (!data.items?.length) return null;

  return (
    <section id="agenda" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          heading={data.heading}
          description={data.description}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {data.items.map((item, index) => (
            <article
              key={item.id || index}
              className="flex gap-5 border border-[#DFE5EC] p-6"
            >
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center bg-[#173B67] text-white">
                <CalendarDays size={19} />
                <span className="mt-1 text-[9px] font-bold">
                  {item.date || "AGENDA"}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-[#173B67]">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#687789]">
                  {item.description}
                </p>

                {item.time && (
                  <p className="mt-3 flex items-center gap-2 text-xs text-[#A47B32]">
                    <Clock3 size={14} />
                    {item.time}
                  </p>
                )}

                {item.location && (
                  <p className="mt-2 flex items-center gap-2 text-xs text-[#687789]">
                    <MapPin size={14} />
                    {item.location}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ config }) {
  const data = config.gallery || {};

  if (!data.items?.length) return null;

  return (
    <section id="gallery" className="bg-[#F4F6F9] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          heading={data.heading}
          description={data.description}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <article
              key={item.id || index}
              className={`group overflow-hidden bg-[#DFE5EC] ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <div className="relative h-full min-h-40">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title || "Dokumentasi kegiatan"}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[#AAB5C2]">
                    <ImageIcon size={40} strokeWidth={1} />
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#102C4B]/90 to-transparent p-5 pt-12">
                  <p className="text-xs font-bold text-white">
                    {item.title}
                  </p>
                  {item.date && (
                    <p className="mt-1 text-[10px] text-white/70">
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ config }) {
  const data = config.contact || {};

  return (
    <section id="contact" className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            eyebrow={data.eyebrow}
            heading={data.heading}
            description={data.description}
          />

          <div className="mt-10 space-y-6">
            <ContactItem
              icon={MapPin}
              label="Alamat"
              value={data.address}
            />
            <ContactItem
              icon={Mail}
              label="Email"
              value={data.email}
              href={data.email ? `mailto:${data.email}` : undefined}
            />
            <ContactItem
              icon={Phone}
              label="Telepon"
              value={data.phone}
            />
            <ContactItem
              icon={Clock3}
              label="Jam Pelayanan"
              value={data.officeHours}
            />
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {(data.socialLinks || [])
              .filter((item) => item.href)
              .map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#DFE5EC] px-4 py-2 text-xs font-semibold text-[#40536A] hover:border-[#173B67] hover:text-[#173B67]"
                >
                  {item.label}
                </a>
              ))}
          </div>
        </div>

        <div className="min-h-[340px] bg-[#F4F6F9]">
          {data.mapEmbedUrl ? (
            <iframe
              src={data.mapEmbedUrl}
              title="Lokasi instansi"
              className="h-full min-h-[340px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full min-h-[340px] flex-col items-center justify-center p-8 text-center">
              <MapPin size={38} className="text-[#A47B32]" />
              <p className="mt-4 font-bold text-[#173B67]">
                Lokasi Instansi
              </p>
              <p className="mt-2 max-w-xs text-xs leading-6 text-[#687789]">
                Peta lokasi dapat ditampilkan setelah URL peta ditambahkan
                melalui konfigurasi website.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, value, href }) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#EEF2F6] text-[#173B67]">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#A47B32]">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="mt-1 block text-sm text-[#40536A] hover:text-[#173B67]"
          >
            {value}
          </a>
        ) : (
          <p className="mt-1 text-sm text-[#40536A]">{value}</p>
        )}
      </div>
    </div>
  );
}

function Footer({ config }) {
  const data = config.footer || {};
  const header = config.header || {};

  return (
    <footer className="bg-[#102C4B] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-white/10">
              <Landmark size={22} className="text-[#D6A84B]" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-[#D6A84B]">
                {header.institutionShortName || config.siteName}
              </p>
              <p className="mt-1 text-xs font-bold">
                {header.institutionName}
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-sm text-xs leading-7 text-white/60">
            {data.description}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {(data.linkGroups || []).map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-xs font-bold text-white">
                {group.title}
              </h3>

              <ul className="space-y-3">
                {(group.links || []).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-white/55 transition hover:text-[#D6A84B]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-6 py-5 text-[10px] text-white/45 sm:flex-row lg:px-8">
          <p>{data.copyright}</p>
          <p>Portal Informasi dan Pelayanan Publik</p>
        </div>
      </div>
    </footer>
  );
}

export default function NusaGovRenderer({ config }) {
  if (!config) return null;

  return (
    <main className="min-h-screen bg-white font-sans text-[#202D3B]">
      <Header config={config} />
      <Hero config={config} />
      <Leadership config={config} />
      <Profile config={config} />
      <Services config={config} />
      <News config={config} />
      <Announcements config={config} />
      <Programs config={config} />
      <Information config={config} />
      <Agenda config={config} />
      <Gallery config={config} />
      <Contact config={config} />
      <Footer config={config} />
    </main>
  );
}