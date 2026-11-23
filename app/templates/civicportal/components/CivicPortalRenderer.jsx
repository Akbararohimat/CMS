"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  IdCard,
  Leaf,
  MapPin,
  Menu,
  MessageSquare,
  Recycle,
  Search,
  ShieldCheck,
  Store,
  X,
} from "lucide-react";

const iconMap = {
  "building-2": Building2,
  "id-card": IdCard,
  store: Store,
  recycle: Recycle,
  "message-square": MessageSquare,
  "file-text": FileText,
};

function SectionHeading({ eyebrow, heading, description, light = false }) {
  return (
    <div className={`cp-section-heading ${light ? "cp-light" : ""}`}>
      <span className="cp-eyebrow">{eyebrow}</span>
      <h2>{heading}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Header({ config }) {
  const [open, setOpen] = useState(false);
  const header = config.header || {};

  return (
    <header className="cp-header">
      {header.utilityBar?.enabled && (
        <div className="cp-utility">
          <span>{config.identity?.tagline || "Your City, Your Services"}</span>
          <div>
            {header.utilityBar.items?.map((item, i) => (
              <a href={item.href} key={i}>{item.label}</a>
            ))}
          </div>
        </div>
      )}

      <div className="cp-nav-wrap">
        <a href="#home" className="cp-brand">
          <span className="cp-brand-mark">C.</span>
          <span>{config.siteName || "CivicPortal"}</span>
        </a>

        <button
          className="cp-menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? "cp-nav cp-nav-open" : "cp-nav"}>
          {header.navigation?.map((item, i) => (
            <a key={i} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="cp-nav-cta"
            href={header.buttonHref || "#services"}
            onClick={() => setOpen(false)}
          >
            {header.buttonText || "Explore Services"}
            <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ config }) {
  const hero = config.hero || {};
  const services = config.services?.items || [];
  const [search, setSearch] = useState("");

  const filtered = services.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="cp-hero" id="home">
      <div className="cp-hero-copy">
        <span className="cp-eyebrow">{hero.eyebrow}</span>
        <h1>
          {hero.heading}
          <span>{hero.highlightText}</span>
        </h1>
        <p>{hero.description}</p>

        <div className="cp-hero-actions">
          <a href={hero.primaryButton?.href || "#services"} className="cp-button">
            {hero.primaryButton?.text || "Find a Service"}
            <ArrowUpRight size={18} />
          </a>
          <a href={hero.secondaryButton?.href || "#updates"} className="cp-text-link">
            {hero.secondaryButton?.text || "Explore the City"}
            <ArrowDownRight size={18} />
          </a>
        </div>
      </div>

      <div className="cp-hero-visual">
        <div className="cp-hero-photo">
          <img
            src={
              hero.backgroundImage ||
              "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1400&q=85"
            }
            alt="Urban city architecture"
          />
          <div className="cp-photo-caption">
            <span>01 / CITY LIFE</span>
            <span>Built around people.</span>
          </div>
        </div>
        <div className="cp-hero-stamp">
          <span>YOUR CITY</span>
          <strong>YOUR<br />VOICE.</strong>
          <ArrowDownRight />
        </div>
      </div>

      <div className="cp-hero-search">
        <div className="cp-search-label">
          <Search size={19} />
          <span>LOOKING FOR SOMETHING?</span>
        </div>
        <div className="cp-search-input-wrap">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search public services..."
            aria-label="Search public services"
          />
          <a href="#services" className="cp-search-submit">
            Search <ArrowRight size={17} />
          </a>
        </div>
        {search && (
          <div className="cp-search-results">
            {filtered.length ? filtered.slice(0, 4).map((item, i) => (
              <a key={i} href={item.href}>
                {item.title}<ArrowUpRight size={15} />
              </a>
            )) : <span>No matching services found.</span>}
          </div>
        )}
      </div>
    </section>
  );
}

function Services({ config }) {
  const data = config.services || {};
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    return (data.items || []).filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [data.items, category, query]);

  return (
    <section className="cp-services cp-section" id="services">
      <div className="cp-services-top">
        <SectionHeading
          eyebrow={data.eyebrow}
          heading={data.heading}
          description={data.description}
        />
        <div className="cp-services-search">
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a service"
          />
        </div>
      </div>

      <div className="cp-filter-row">
        {(data.categories || ["All"]).map((item) => (
          <button
            key={item}
            className={category === item ? "cp-filter active" : "cp-filter"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="cp-service-grid">
        {items.map((item, i) => {
          const Icon = iconMap[item.icon] || FileText;
          return (
            <a href={item.href} className="cp-service-card" key={i}>
              <div className="cp-service-card-top">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <Icon size={25} />
              </div>
              <div>
                <span className="cp-card-label">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="cp-card-arrow"><ArrowUpRight size={20} /></div>
            </a>
          );
        })}
      </div>
      {!items.length && <p className="cp-empty">No services found.</p>}
    </section>
  );
}

function HowItWorks({ config }) {
  const data = config.howItWorks || {};
  const steps = data.steps || [];
  const [active, setActive] = useState(0);

  return (
    <section className="cp-how cp-section" id="how-it-works">
      <div className="cp-how-heading">
        <SectionHeading
          eyebrow={data.eyebrow}
          heading={data.heading}
          description={data.description}
          light
        />
        <span className="cp-how-note">LESS CONFUSION.<br />MORE PROGRESS.</span>
      </div>

      <div className="cp-stepper">
        <div className="cp-step-list">
          {steps.map((step, i) => (
            <button
              key={i}
              className={active === i ? "cp-step active" : "cp-step"}
              onClick={() => setActive(i)}
            >
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <ArrowUpRight size={18} />
            </button>
          ))}
        </div>
        <div className="cp-step-detail">
          <span>STEP {steps[active]?.number || "01"}</span>
          <h3>{steps[active]?.title}</h3>
          <p>{steps[active]?.description}</p>
          <div className="cp-step-progress">
            <span style={{ width: `${((active + 1) / Math.max(steps.length, 1)) * 100}%` }} />
          </div>
          <div className="cp-step-controls">
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
            >Previous</button>
            <button
              onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
              disabled={active === steps.length - 1}
            >Next step <ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Updates({ config }) {
  const data = config.updates || {};
  const [category, setCategory] = useState("All");
  const items = (data.items || []).filter((item) =>
    category === "All" || item.category === category
  );

  return (
    <section className="cp-updates cp-section" id="updates">
      <SectionHeading
        eyebrow={data.eyebrow}
        heading={data.heading}
        description={data.description}
      />
      <div className="cp-update-filters">
        {(data.categories || ["All"]).map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={category === item ? "active" : ""}
          >{item}</button>
        ))}
      </div>

      <div className="cp-update-grid">
        {items.map((item, i) => (
          <a href={item.href} className={`cp-update-card cp-update-${i}`} key={i}>
            <div className="cp-update-image">
              <img src={item.image} alt="" loading="lazy" />
              <span>{item.category}</span>
            </div>
            <div className="cp-update-meta">{item.date}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="cp-update-link">Read story <ArrowUpRight size={16} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function Agenda({ config }) {
  const data = config.agenda || {};

  return (
    <section className="cp-agenda cp-section" id="agenda">
      <div className="cp-agenda-intro">
        <SectionHeading
          eyebrow={data.eyebrow}
          heading={data.heading}
        />
        <CalendarDays size={42} strokeWidth={1.2} />
      </div>

      <div className="cp-agenda-list">
        {(data.items || []).map((item, i) => (
          <article className="cp-agenda-item" key={i}>
            <div className="cp-agenda-date">
              <strong>{item.day}</strong>
              <span>{item.month}</span>
            </div>
            <div className="cp-agenda-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div>
                <span><Clock3 size={14} /> {item.time}</span>
                <span><MapPin size={14} /> {item.location}</span>
              </div>
            </div>
            <ArrowUpRight className="cp-agenda-arrow" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Transparency({ config }) {
  const data = config.transparency || {};
  const tabs = data.tabs || [];
  const [active, setActive] = useState(0);

  return (
    <section className="cp-transparency cp-section" id="transparency">
      <div className="cp-transparency-intro">
        <span className="cp-eyebrow">{data.eyebrow}</span>
        <h2>{data.heading}</h2>
        <p>{data.description}</p>
        <ShieldCheck size={68} strokeWidth={1} />
      </div>

      <div className="cp-documents">
        <div className="cp-document-tabs">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
            >{tab.label}</button>
          ))}
        </div>

        <div className="cp-document-list">
          {(tabs[active]?.items || []).map((item, i) => (
            <a href={item.href} key={i} className="cp-document">
              <FileText size={22} />
              <span>
                <strong>{item.title}</strong>
                <small>{item.type} · {item.year}</small>
              </span>
              <ArrowUpRight size={18} />
            </a>
          ))}
          {!tabs[active]?.items?.length && (
            <p className="cp-empty">No documents available.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function Participation({ config }) {
  const data = config.participation || {};

  return (
    <section className="cp-participation cp-section" id="participation">
      <div>
        <span className="cp-eyebrow">{data.eyebrow}</span>
        <h2>{data.heading}</h2>
        <p>{data.description}</p>
        <a href={data.buttonHref || "#contact"} className="cp-button cp-button-dark">
          {data.buttonText || "Explore Contact Channels"}
          <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="cp-participation-art">
        <span>LET'S</span>
        <strong>MAKE<br />IT BETTER.</strong>
        <MessageSquare size={58} strokeWidth={1} />
      </div>
    </section>
  );
}

function Contact({ config }) {
  const data = config.contact || {};

  return (
    <section className="cp-contact cp-section" id="contact">
      <div>
        <span className="cp-eyebrow">{data.eyebrow}</span>
        <h2>{data.heading}</h2>
      </div>
      <div className="cp-contact-details">
        <div><MapPin /><span><small>ADDRESS</small>{data.address}</span></div>
        <div><MessageSquare /><span><small>EMAIL</small>{data.email}</span></div>
        <div><Clock3 /><span><small>OFFICE HOURS</small>{data.officeHours}</span></div>
      </div>
    </section>
  );
}

function Footer({ config }) {
  const data = config.footer || {};

  return (
    <footer className="cp-footer">
      <div className="cp-footer-main">
        <div className="cp-footer-brand">
          <a href="#home" className="cp-brand">
            <span className="cp-brand-mark">C.</span>
            <span>{config.siteName || "CivicPortal"}</span>
          </a>
          <p>{data.description}</p>
        </div>

        {(data.linkGroups || []).map((group, i) => (
          <div className="cp-footer-links" key={i}>
            <strong>{group.title}</strong>
            {group.links?.map((link, j) => (
              <a href={link.href} key={j}>{link.label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="cp-footer-bottom">
        <span>{data.copyright}</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default function CivicPortalRenderer({ config }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".cp-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cp-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  if (!config) return null;

  return (
    <div className="cp-site">
      <Header config={config} />
      <main>
        <Hero config={config} />
        <div className="cp-reveal"><Services config={config} /></div>
        <div className="cp-reveal"><HowItWorks config={config} /></div>
        <div className="cp-reveal"><Updates config={config} /></div>
        <div className="cp-reveal"><Agenda config={config} /></div>
        <div className="cp-reveal"><Transparency config={config} /></div>
        <div className="cp-reveal"><Participation config={config} /></div>
        <div className="cp-reveal"><Contact config={config} /></div>
      </main>
      <Footer config={config} />
    </div>
  );
}
