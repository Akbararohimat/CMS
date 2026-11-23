"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Globe2,
  Menu,
  Play,
  X,
} from "lucide-react";

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".co-reveal");

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
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

function Header({ config }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = config.header || {};

  return (
    <header className="co-header">
      <div className="co-header-inner">
        <a href="#home" className="co-brand">
          <span className="co-brand-mark">
            <GraduationCap size={25} />
          </span>
          <span>
            <strong>{config.siteName}</strong>
            <small>{config.identity?.tagline}</small>
          </span>
        </a>

        <nav className={`co-nav ${menuOpen ? "co-nav-open" : ""}`}>
          {(header.navigation || []).map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a className="co-mobile-cta" href={header.buttonHref}>
            {header.buttonText} <ArrowUpRight size={16} />
          </a>
        </nav>

        <a className="co-header-cta" href={header.buttonHref}>
          {header.buttonText} <ArrowUpRight size={16} />
        </a>

        <button
          className="co-menu-button"
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Hero({ config }) {
  const hero = config.hero || {};

  return (
    <section
      id="home"
      className="co-hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(4,38,29,.98) 0%, rgba(4,38,29,.94) 34%, rgba(4,38,29,.48) 59%, rgba(4,38,29,.05) 100%), url("${hero.backgroundImage}")`,
      }}
    >
      <div className="co-hero-pattern" />
      <div className="co-hero-inner">
        <div className="co-hero-copy">
          <p className="co-eyebrow co-gold">{hero.eyebrow}</p>
          <h1>
            {hero.heading}
            <em>{hero.highlightText}</em>
          </h1>
          <p className="co-hero-description">{hero.description}</p>

          <div className="co-hero-actions">
            <a className="co-button co-button-gold" href={hero.primaryButton?.href}>
              {hero.primaryButton?.text} <ArrowRight size={17} />
            </a>
            <a className="co-video-link" href={hero.secondaryButton?.href}>
              <span><Play size={15} fill="currentColor" /></span>
              {hero.secondaryButton?.text}
            </a>
          </div>
        </div>

        <div className="co-hero-side-note">
          <span>01</span>
          <span className="co-side-line" />
          <ArrowDown size={15} />
        </div>

        <div className="co-floating-cards">
          {(hero.floatingCards || []).map((item, index) => (
            <div className="co-floating-card" key={item.title}>
              <span className="co-floating-number">0{index + 1}</span>
              <strong>{item.title}</strong>
              <small>{item.description}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs({ config }) {
  const programs = config.programs || {};
  const categories = programs.categories || [];
  const [activeCategory, setActiveCategory] = useState(0);

  const activeItems = categories[activeCategory]?.items || [];

  return (
    <section id="programs" className="co-programs co-section">
      <div className="co-program-intro co-reveal">
        <p className="co-eyebrow">{programs.eyebrow}</p>
        <h2>{programs.heading}</h2>
        <p>{programs.description}</p>
        <a className="co-text-link" href="#admissions">
          Lihat informasi pendaftaran <ArrowRight size={16} />
        </a>
      </div>

      <div className="co-program-content co-reveal">
        <div className="co-tabs" role="tablist" aria-label="Kategori program akademik">
          {categories.map((category, index) => (
            <button
              key={category.label}
              type="button"
              role="tab"
              aria-selected={activeCategory === index}
              className={activeCategory === index ? "active" : ""}
              onClick={() => setActiveCategory(index)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="co-program-grid">
          {activeItems.map((item) => (
            <article className="co-program-card" key={item.title}>
              <div className="co-program-image">
                <img src={item.image} alt="" loading="lazy" />
                <span><ArrowUpRight size={19} /></span>
              </div>
              <div className="co-program-card-body">
                <div>
                  <BookOpen size={16} />
                  <h3>{item.title}</h3>
                </div>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ config }) {
  const about = config.about || {};

  return (
    <section id="about" className="co-about">
      <div className="co-about-inner">
        <div className="co-about-copy co-reveal">
          <p className="co-eyebrow co-gold">{about.eyebrow}</p>
          <h2>{about.heading}</h2>
          <p>{about.description}</p>
          <a className="co-button co-button-gold" href={about.buttonHref}>
            {about.buttonText} <ArrowRight size={16} />
          </a>
        </div>

        <div className="co-about-image co-reveal">
          <img src={about.image} alt="Suasana mahasiswa di lingkungan kampus" loading="lazy" />
        </div>

        <div className="co-values" id="values">
          {(about.values || []).map((item, index) => (
            <article className="co-value co-reveal" key={item.title}>
              <span className="co-value-icon">
                {index === 0 ? <GraduationCap /> : index === 1 ? <Globe2 /> : <BookOpen />}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CampusLife({ config }) {
  const section = config.campusLife || {};
  const items = section.items || [];
  const [active, setActive] = useState(0);

  const visibleItems = useMemo(() => {
    if (!items.length) return [];
    return [0, 1, 2].map((offset) => items[(active + offset) % items.length]);
  }, [active, items]);

  function move(direction) {
    if (!items.length) return;
    setActive((current) => (current + direction + items.length) % items.length);
  }

  return (
    <section id="campus-life" className="co-campus-life co-section">
      <div className="co-campus-heading co-reveal">
        <div>
          <p className="co-eyebrow">{section.eyebrow}</p>
          <h2>{section.heading}</h2>
          <p>{section.description}</p>
        </div>

        <div className="co-carousel-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Foto sebelumnya">
            <ArrowLeft />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Foto berikutnya">
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="co-campus-gallery">
        {visibleItems.map((item, index) => (
          <article className={`co-gallery-card co-gallery-${index + 1}`} key={`${item.title}-${active}`}>
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="co-gallery-caption">
              <span>0{((active + index) % items.length) + 1}</span>
              <h3>{item.title}</h3>
              <ArrowUpRight size={20} />
            </div>
          </article>
        ))}
      </div>

      <div className="co-gallery-progress">
        <span style={{ width: `${((active + 1) / Math.max(items.length, 1)) * 100}%` }} />
      </div>
    </section>
  );
}

function News({ config }) {
  const news = config.news || {};

  return (
    <section id="news" className="co-news co-section">
      <div className="co-news-heading co-reveal">
        <p className="co-eyebrow">{news.eyebrow}</p>
        <h2>{news.heading}</h2>
        <p>{news.description}</p>
      </div>

      <div className="co-news-grid">
        {(news.items || []).map((item, index) => (
          <a
            href={item.href}
            className={`co-news-card co-news-${index + 1} co-reveal`}
            key={item.title}
          >
            <div className="co-news-image">
              <img src={item.image} alt="" loading="lazy" />
              <span><ArrowUpRight size={19} /></span>
            </div>
            <div className="co-news-meta">
              <span>{item.category}</span>
              <small>{item.date}</small>
            </div>
            <h3>{item.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}

function Admissions({ config }) {
  const admissions = config.admissions || {};

  return (
    <section id="admissions" className="co-admissions">
      <div className="co-admissions-orbit" />
      <div className="co-admissions-content co-reveal">
        <p className="co-eyebrow co-gold">{admissions.eyebrow}</p>
        <h2>{admissions.heading}</h2>
        <p>{admissions.description}</p>
        <a className="co-button co-button-gold" href={admissions.buttonHref}>
          {admissions.buttonText} <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}

function Footer({ config }) {
  const footer = config.footer || {};

  return (
    <footer id="contact" className="co-footer">
      <div className="co-footer-main">
        <div className="co-footer-brand">
          <a href="#home" className="co-brand">
            <span className="co-brand-mark"><GraduationCap size={25} /></span>
            <span>
              <strong>{config.siteName}</strong>
              <small>{config.identity?.tagline}</small>
            </span>
          </a>
          <p>{footer.description}</p>
        </div>

        <div className="co-footer-column">
          <h3>Navigasi</h3>
          {(footer.navigation || []).map((item) => (
            <a href={item.href} key={item.label}>{item.label}</a>
          ))}
        </div>

        <div className="co-footer-column">
          <h3>Layanan</h3>
          {(footer.services || []).map((item) => (
            <a href={item.href} key={item.label}>{item.label}</a>
          ))}
        </div>

        <div className="co-footer-column co-footer-contact">
          <h3>Kontak Kami</h3>
          <p>{footer.address}</p>
          <a href={`mailto:${footer.email}`}>{footer.email}</a>
          <a href={`tel:${footer.phone}`}>{footer.phone}</a>
        </div>
      </div>

      <div className="co-footer-bottom">
        <span>{footer.copyright}</span>
        <div>
          <a href="#contact">Kebijakan Privasi</a>
          <a href="#contact">Syarat & Ketentuan</a>
        </div>
      </div>
    </footer>
  );
}

export default function CampusOneRenderer({ config }) {
  useReveal();

  return (
    <main className="campusone">
      <Header config={config} />
      <Hero config={config} />
      <Programs config={config} />
      <About config={config} />
      <CampusLife config={config} />
      <News config={config} />
      <Admissions config={config} />
      <Footer config={config} />
    </main>
  );
}
