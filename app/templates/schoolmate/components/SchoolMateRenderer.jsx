"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  GraduationCap,
  Menu,
  Palette,
  Search,
  Sun,
  Users,
  X,
} from "lucide-react";

const iconMap = {
  sun: Sun,
  book: BookOpen,
  compass: Compass,
  graduation: GraduationCap,
  search: Search,
  palette: Palette,
  users: Users,
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div
      className={`sm-reveal ${className}`}
      style={{ "--sm-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`sm-section-heading ${light ? "is-light" : ""}`}>
      <span className="sm-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Header({ config }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = config.header;

  return (
    <header className="sm-header">
      <a className="sm-brand" href="#top" aria-label="SchoolMate home">
        <span className="sm-brand-mark">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span>{header.logoText || config.siteName}</span>
      </a>

      <nav className={`sm-nav ${menuOpen ? "is-open" : ""}`}>
        {header.navigation?.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          className="sm-nav-cta"
          href={header.buttonHref}
          onClick={() => setMenuOpen(false)}
        >
          {header.buttonLabel}
          <ArrowUpRight size={16} />
        </a>
      </nav>

      <button
        className="sm-menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Hero({ config }) {
  const hero = config.hero;

  return (
    <section className="sm-hero" id="top">
      <div className="sm-hero-copy">
        <Reveal>
          <span className="sm-eyebrow">
            <span className="sm-eyebrow-dot" />
            {hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1>
            {hero.title.split(" ").map((word, index) => (
              <span
                className={index % 3 === 1 ? "sm-word-highlight" : ""}
                key={`${word}-${index}`}
              >
                {word}{" "}
              </span>
            ))}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="sm-hero-description">{hero.description}</p>
        </Reveal>

        <Reveal delay={300}>
          <div className="sm-hero-actions">
            <a className="sm-button sm-button-blue" href={hero.primaryHref}>
              {hero.primaryButton}
              <ArrowUpRight size={18} />
            </a>
            <a className="sm-text-link" href={hero.secondaryHref}>
              {hero.secondaryButton}
              <ArrowDownRight size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="sm-hero-note">
            <span className="sm-note-spark">✳</span>
            <span>{hero.statLabel}</span>
          </div>
        </Reveal>
      </div>

      <div className="sm-hero-visual">
        <div className="sm-hero-image-wrap">
          <img src={hero.image} alt={hero.imageAlt || ""} />
          <div className="sm-image-sticker">
            <span>✳</span>
            <span>{hero.imageLabel}</span>
          </div>
        </div>
        <div className="sm-floating-note">
          <span className="sm-floating-icon">✦</span>
          <span>{hero.floatingNote}</span>
        </div>
        <div className="sm-hero-sun" aria-hidden="true">✳</div>
        <div className="sm-hero-doodle" aria-hidden="true">〰</div>
      </div>
    </section>
  );
}

function LearningJourney({ config }) {
  const section = config.learningJourney;

  return (
    <section className="sm-journey sm-section" id="our-school">
      <div className="sm-container">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />

        <div className="sm-journey-grid">
          {section.levels?.map((level, index) => {
            const Icon = iconMap[level.icon] || BookOpen;

            return (
              <Reveal key={level.number} delay={index * 100}>
                <article className={`sm-level-card sm-${level.color}`}>
                  <div className="sm-level-top">
                    <span className="sm-level-number">{level.number}</span>
                    <span className="sm-level-icon">
                      <Icon size={25} />
                    </span>
                  </div>
                  <span className="sm-level-age">{level.age}</span>
                  <h3>{level.name}</h3>
                  <p>{level.description}</p>
                  <span className="sm-level-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SchoolIntro({ config }) {
  const section = config.school;

  return (
    <section className="sm-school sm-section">
      <div className="sm-container sm-school-grid">
        <Reveal className="sm-school-visual">
          <div className="sm-school-image">
            <img src={section.image} alt={section.imageAlt || ""} />
          </div>
          <div className="sm-school-sticker">LEARN<br />GROW<br />SHINE ✳</div>
        </Reveal>

        <div className="sm-school-content">
          <Reveal>
            <SectionHeading
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
            />
          </Reveal>

          <div className="sm-feature-list">
            {section.features?.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 100}>
                <article className="sm-feature">
                  <span className="sm-feature-index">0{index + 1}</span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Learning({ config }) {
  const section = config.learning;

  return (
    <section className="sm-learning sm-section" id="learning">
      <div className="sm-container">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />

        <div className="sm-learning-grid">
          {section.cards?.map((card, index) => {
            const Icon = iconMap[card.icon] || BookOpen;

            return (
              <Reveal key={card.number} delay={index * 130}>
                <article className={`sm-learning-card sm-${card.color}`}>
                  <div className="sm-learning-card-top">
                    <span>{card.number}</span>
                    <Icon size={32} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className="sm-learning-decoration">✳</span>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StudentLife({ config }) {
  const section = config.studentLife;
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return section.items || [];

    return (section.items || []).filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory, section.items]);

  return (
    <section className="sm-life sm-section" id="student-life">
      <div className="sm-container">
        <div className="sm-life-heading-row">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
          />

          <div className="sm-filter-list" aria-label="Filter student activities">
            {section.categories?.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? "is-active" : ""}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="sm-life-grid">
          {filteredItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <article className="sm-life-card">
                <div className="sm-life-image">
                  <img src={item.image} alt={item.imageAlt || item.title} />
                  <span>{item.category}</span>
                </div>
                <div className="sm-life-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="sm-empty">No activities in this category yet.</p>
        )}
      </div>
    </section>
  );
}

function StudentWorks({ config }) {
  const section = config.studentWorks;

  return (
    <section className="sm-works sm-section">
      <div className="sm-container">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />

        <div className="sm-works-grid">
          {section.items?.map((item, index) => (
            <Reveal key={item.title} delay={index * 110}>
              <article className={`sm-work-card sm-work-${index + 1}`}>
                <div className="sm-work-image">
                  <img src={item.image} alt={item.title} />
                  <span className="sm-work-number">0{index + 1}</span>
                </div>
                <div className="sm-work-copy">
                  <span>{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParentCorner({ config }) {
  const section = config.parents;

  return (
    <section className="sm-parents sm-section" id="parents">
      <div className="sm-container">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />

        <div className="sm-parent-links">
          {section.links?.map((link, index) => (
            <a className="sm-parent-link" href={link.href} key={link.title}>
              <span className="sm-parent-number">0{index + 1}</span>
              <span className="sm-parent-copy">
                <strong>{link.title}</strong>
                <small>{link.description}</small>
              </span>
              <ArrowUpRight size={22} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Admissions({ config }) {
  const section = config.admissions;

  return (
    <section className="sm-admissions" id="admissions">
      <div className="sm-admissions-shape sm-shape-one" aria-hidden="true">✳</div>
      <div className="sm-admissions-shape sm-shape-two" aria-hidden="true">✦</div>
      <div className="sm-container sm-admissions-content">
        <Reveal>
          <span className="sm-eyebrow">{section.eyebrow}</span>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          <a className="sm-button sm-button-yellow" href={section.buttonHref}>
            {section.buttonLabel}
            <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ config }) {
  const footer = config.footer;

  return (
    <footer className="sm-footer" id="contact">
      <div className="sm-container">
        <div className="sm-footer-main">
          <div className="sm-footer-brand">
            <a className="sm-brand sm-brand-footer" href="#top">
              <span className="sm-brand-mark">
                <span />
                <span />
                <span />
                <span />
              </span>
              <span>{config.siteName}</span>
            </a>
            <p>{footer.description}</p>
          </div>

          <div className="sm-footer-nav">
            <h3>Explore</h3>
            {footer.links?.map((link) => (
              <a href={link.href} key={link.label}>{link.label}</a>
            ))}
          </div>

          <div className="sm-footer-contact">
            <h3>Say hello</h3>
            <a href={`mailto:${footer.email}`}>{footer.email}</a>
            <a href={`tel:${footer.phone}`}>{footer.phone}</a>
            <p>{footer.address}</p>
          </div>
        </div>

        <div className="sm-footer-bottom">
          <span>{footer.copyright}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function SchoolMateRenderer({ config }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".sm-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  if (!config) return null;

  return (
    <main className="schoolmate">
      <Header config={config} />
      <Hero config={config} />
      <LearningJourney config={config} />
      <SchoolIntro config={config} />
      <Learning config={config} />
      <StudentLife config={config} />
      <StudentWorks config={config} />
      <ParentCorner config={config} />
      <Admissions config={config} />
      <Footer config={config} />
    </main>
  );
}
