"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
  CalendarDays,
  Users,
  Waves,
  Sparkles,
  Utensils,
  Flower2,
  ConciergeBell,
} from "lucide-react";

/* =========================================================
   HELPERS
========================================================= */

function getMediaUrl(media) {
  if (!media) return "";
  if (typeof media === "string") return media;
  return media.url || media.file_path || "";
}

function SectionHeading({ eyebrow, heading, description, light = false }) {
  return (
    <div className="max-w-2xl">
      <p
        className={`mb-4 text-[10px] font-semibold tracking-[0.28em] ${
          light ? "text-[#C5AE82]" : "text-[#9C8359]"
        }`}
      >
        {eyebrow}
      </p>

      <h2
        className={`font-serif text-4xl leading-[1.12] tracking-tight md:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-[#263B32]"
        }`}
      >
        {heading}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-xl text-sm leading-7 ${
            light ? "text-white/65" : "text-[#777B73]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function StayoraHeader({ config }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const announcement = config.announcement || {};
  const header = config.header || {};

  return (
    <>
      {announcement.visible && (
        <div className="flex min-h-9 items-center justify-center gap-2 bg-[#263B32] px-4 py-2 text-center text-[10px] tracking-[0.08em] text-white">
          <span>{announcement.text}</span>

          {announcement.linkText && (
            <a
              href={announcement.linkHref || "#contact"}
              className="underline underline-offset-4"
            >
              {announcement.linkText}
            </a>
          )}
        </div>
      )}

      <header className="absolute left-0 right-0 top-9 z-40 border-b border-white/20 text-white">
        <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-16">
          <a href="#home" className="block">
            <span className="block font-serif text-2xl tracking-[0.16em]">
              {header.brandName || config.siteName}
            </span>

            <span className="mt-1 block text-[8px] tracking-[0.34em] text-white/65">
              {header.tagline}
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {(header.navigation || []).map((item, index) => (
              <a
                key={`${item.label}-${index}`}
                href={item.href || "#"}
                className="text-[11px] tracking-[0.08em] text-white/85 transition hover:text-[#D8C29B]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {header.buttonText && (
            <a
              href={header.buttonHref || "#contact"}
              className="hidden border border-white/65 px-5 py-3 text-[10px] tracking-[0.12em] transition hover:bg-white hover:text-[#263B32] lg:inline-flex"
            >
              {header.buttonText}
            </a>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex size-10 items-center justify-center border border-white/40 lg:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-white/15 bg-[#263B32] px-6 py-5 lg:hidden">
            <div className="flex flex-col">
              {(header.navigation || []).map((item, index) => (
                <a
                  key={`${item.label}-${index}`}
                  href={item.href || "#"}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-4 text-xs tracking-[0.12em]"
                >
                  {item.label}
                </a>
              ))}

              {header.buttonText && (
                <a
                  href={header.buttonHref || "#contact"}
                  onClick={() => setMenuOpen(false)}
                  className="mt-5 bg-white px-5 py-4 text-center text-xs font-semibold tracking-[0.1em] text-[#263B32]"
                >
                  {header.buttonText}
                </a>
              )}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

/* =========================================================
   HERO
========================================================= */

function StayoraHero({ config }) {
  const hero = config.hero || {};
  const backgroundImage = getMediaUrl(hero.backgroundImage);

  return (
    <section
      id="home"
      className="relative flex min-h-[720px] items-end overflow-hidden bg-[#263B32] md:min-h-[850px]"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(90deg, rgba(17,29,23,.66), rgba(17,29,23,.12)), linear-gradient(0deg, rgba(17,29,23,.5), transparent 65%), url("${backgroundImage}")`
          : "linear-gradient(135deg, #263B32, #52695B)",
        backgroundPosition: hero.backgroundPosition || "center",
        backgroundSize: "cover",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-28 pt-56 md:px-12 md:pb-36 lg:px-16">
        <p className="mb-7 text-[10px] tracking-[0.34em] text-[#E0CBA6]">
          {hero.eyebrow}
        </p>

        <h1 className="max-w-4xl font-serif text-6xl leading-[0.98] tracking-tight text-white md:text-8xl lg:text-[112px]">
          {hero.heading}
          <br />
          <span className="italic text-[#D6C19C]">
            {hero.highlightText}
          </span>
        </h1>

        <p className="mt-8 max-w-lg text-sm leading-7 text-white/75 md:text-base">
          {hero.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          {hero.primaryButton?.text && (
            <a
              href={hero.primaryButton.href || "#booking"}
              className="inline-flex items-center gap-5 bg-[#F4F0E7] px-6 py-4 text-[10px] font-semibold tracking-[0.12em] text-[#263B32] transition hover:bg-[#D6C19C]"
            >
              {hero.primaryButton.text}
              <ArrowUpRight size={16} />
            </a>
          )}

          {hero.secondaryButton?.text && (
            <a
              href={hero.secondaryButton.href || "#story"}
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.12em] text-white"
            >
              {hero.secondaryButton.text}
              <ArrowDown size={15} />
            </a>
          )}
        </div>

        <div className="mt-20 flex items-center gap-4 text-[9px] tracking-[0.24em] text-white/55">
          <span className="h-px w-12 bg-[#D6C19C]" />
          {hero.caption}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 hidden w-[210px] border-l border-t border-white/20 bg-[#263B32]/65 p-8 text-white backdrop-blur-sm md:block">
        <span className="font-serif text-4xl italic text-[#D6C19C]">
          01
        </span>

        <p className="mt-3 text-[9px] tracking-[0.2em] text-white/65">
          A DIFFERENT WAY TO STAY
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   BOOKING
========================================================= */

function BookingPanel({ config }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [message, setMessage] = useState("");

  const booking = config.booking || {};

  function handleSubmit(event) {
    event.preventDefault();

    if (!checkIn || !checkOut) {
      setMessage("Please select your check-in and check-out dates.");
      return;
    }

    if (checkOut <= checkIn) {
      setMessage("Check-out must be later than check-in.");
      return;
    }

    setMessage(
      `Demo search: ${checkIn} to ${checkOut}, ${guests} guest(s). Connect a booking engine to enable real availability.`
    );
  }

  return (
    <section
      id="booking"
      className="relative z-20 mx-auto -mt-10 max-w-[1240px] px-5 md:-mt-14"
    >
      <form
        onSubmit={handleSubmit}
        className="grid bg-white shadow-[0_16px_55px_rgba(0,0,0,0.10)] md:grid-cols-[1.2fr_1fr_0.8fr_auto]"
      >
        <div className="border-b border-[#E5E1D8] p-6 md:border-b-0 md:border-r">
          <label className="mb-3 flex items-center gap-2 text-[9px] font-semibold tracking-[0.2em] text-[#8C806C]">
            <CalendarDays size={14} />
            {booking.checkInLabel}
          </label>

          <input
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
            className="w-full bg-transparent text-sm text-[#263B32] outline-none"
          />
        </div>

        <div className="border-b border-[#E5E1D8] p-6 md:border-b-0 md:border-r">
          <label className="mb-3 flex items-center gap-2 text-[9px] font-semibold tracking-[0.2em] text-[#8C806C]">
            <CalendarDays size={14} />
            {booking.checkOutLabel}
          </label>

          <input
            type="date"
            min={checkIn || undefined}
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
            className="w-full bg-transparent text-sm text-[#263B32] outline-none"
          />
        </div>

        <div className="p-6">
          <label className="mb-3 flex items-center gap-2 text-[9px] font-semibold tracking-[0.2em] text-[#8C806C]">
            <Users size={14} />
            {booking.guestLabel}
          </label>

          <select
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            className="w-full bg-transparent text-sm text-[#263B32] outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <option key={number} value={String(number)}>
                {number} {number === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="flex min-h-[76px] items-center justify-center gap-4 bg-[#263B32] px-8 text-[10px] font-semibold tracking-[0.12em] text-white transition hover:bg-[#40594B] md:min-h-0"
        >
          {booking.buttonText}
          <ArrowRight size={16} />
        </button>
      </form>

      <p className="mt-3 text-center text-[10px] text-[#777B73]">
        {message || booking.note}
      </p>
    </section>
  );
}

/* =========================================================
   STORY
========================================================= */

function StorySection({ config }) {
  const story = config.story || {};

  return (
    <section
      id="story"
      className="bg-[#F6F4EF] px-6 py-28 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden">
            {getMediaUrl(story.image) && (
              <img
                src={getMediaUrl(story.image)}
                alt="Stayora interior"
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="absolute -bottom-6 -right-3 bg-[#263B32] px-6 py-5 text-white md:-right-8 md:px-9 md:py-7">
            <p className="font-serif text-xl italic">
              {story.signature}
            </p>
          </div>

          <p className="mt-10 text-[9px] tracking-[0.2em] text-[#8A8579]">
            {story.imageCaption}
          </p>
        </div>

        <div className="py-5">
          <SectionHeading
            eyebrow={story.eyebrow}
            heading={story.heading}
          />

          <p className="mt-8 text-sm leading-8 text-[#62685F]">
            {story.description}
          </p>

          <p className="mt-5 text-sm leading-8 text-[#62685F]">
            {story.secondaryDescription}
          </p>

          <div className="mt-12 flex items-center gap-5">
            <span className="h-px w-14 bg-[#B69A68]" />
            <span className="font-serif text-lg italic text-[#52695B]">
              Stay a little longer.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ROOMS
========================================================= */

function RoomsSection({ config }) {
  const rooms = config.rooms || {};

  return (
    <section
      id="rooms"
      className="bg-white px-6 py-28 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={rooms.eyebrow}
            heading={rooms.heading}
            description={rooms.description}
          />

          <a
            href={rooms.buttonHref || "#contact"}
            className="inline-flex items-center gap-3 border-b border-[#B69A68] pb-3 text-[10px] font-semibold tracking-[0.13em] text-[#263B32]"
          >
            {rooms.buttonText}
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(rooms.items || []).map((room, index) => (
            <article
              key={`${room.name}-${index}`}
              className={index === 1 ? "lg:mt-12" : ""}
            >
              <a href={room.href || "#contact"} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE7DF]">
                  {getMediaUrl(room.image) && (
                    <img
                      src={getMediaUrl(room.image)}
                      alt={room.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}

                  <span className="absolute left-5 top-5 bg-[#F6F4EF] px-3 py-2 text-[9px] tracking-[0.16em] text-[#52695B]">
                    {room.category}
                  </span>

                  <span className="absolute bottom-5 right-5 flex size-11 items-center justify-center rounded-full bg-white text-[#263B32] transition group-hover:bg-[#263B32] group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 pt-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#263B32]">
                      {room.name}
                    </h3>

                    <p className="mt-3 max-w-sm text-xs leading-6 text-[#777B73]">
                      {room.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-5 border-t border-[#E5E1D8] pt-4 text-[10px] tracking-[0.08em] text-[#777B73]">
                  <span>{room.size}</span>
                  <span>{room.capacity}</span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCES
========================================================= */

function ExperiencesSection({ config }) {
  const experiences = config.experiences || {};

  return (
    <section
      id="experiences"
      className="bg-[#263B32] px-6 py-28 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow={experiences.eyebrow}
          heading={experiences.heading}
          description={experiences.description}
          light
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {(experiences.items || []).map((item, index) => (
            <a
              key={`${item.number}-${index}`}
              href={item.href || "#contact"}
              className="group"
            >
              <div className="relative aspect-[5/6] overflow-hidden bg-[#40594B]">
                {getMediaUrl(item.image) && (
                  <img
                    src={getMediaUrl(item.image)}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <span className="text-[10px] tracking-[0.2em] text-[#D6C19C]">
                    EXPERIENCE {item.number}
                  </span>

                  <h3 className="mt-3 font-serif text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-white/75">
                    {item.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-[10px] tracking-[0.12em]">
                    DISCOVER <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DINING
========================================================= */

function DiningSection({ config }) {
  const dining = config.dining || {};

  return (
    <section
      id="dining"
      className="bg-[#EEEAE1] px-6 py-28 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative">
          <div className="aspect-[5/4] overflow-hidden bg-[#D9D4C8]">
            {getMediaUrl(dining.image) && (
              <img
                src={getMediaUrl(dining.image)}
                alt={dining.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="absolute -bottom-5 -right-3 bg-white px-7 py-5 md:-right-7">
            <p className="font-serif text-2xl italic text-[#263B32]">
              {dining.name}
            </p>

            <p className="mt-1 text-[9px] tracking-[0.2em] text-[#8A8579]">
              {dining.type}
            </p>
          </div>
        </div>

        <div className="lg:pl-12">
          <SectionHeading
            eyebrow={dining.eyebrow}
            heading={dining.heading}
            description={dining.description}
          />

          <p className="mt-8 max-w-md text-sm leading-7 text-[#777B73]">
            {dining.details}
          </p>

          <a
            href={dining.buttonHref || "#contact"}
            className="mt-10 inline-flex items-center gap-4 border-b border-[#B69A68] pb-3 text-[10px] font-semibold tracking-[0.14em] text-[#263B32]"
          >
            {dining.buttonText}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   AMENITIES
========================================================= */

function AmenitiesSection({ config }) {
  const amenities = config.amenities || {};
  const icons = [Waves, Flower2, Utensils, ConciergeBell];

  return (
    <section
      id="amenities"
      className="bg-white px-6 py-28 md:px-12 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow={amenities.eyebrow}
          heading={amenities.heading}
          description={amenities.description}
        />

        <div className="mt-16 grid border-t border-[#E5E1D8] md:grid-cols-2">
          {(amenities.items || []).map((item, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={`${item.number}-${index}`}
                className="grid grid-cols-[60px_1fr] gap-5 border-b border-[#E5E1D8] py-8 md:px-7 md:py-10"
              >
                <div className="flex size-12 items-center justify-center bg-[#F6F4EF] text-[#52695B]">
                  <Icon size={21} strokeWidth={1.4} />
                </div>

                <div>
                  <span className="text-[9px] tracking-[0.18em] text-[#A28B64]">
                    {item.number}
                  </span>

                  <h3 className="mt-2 font-serif text-2xl text-[#263B32]">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-md text-xs leading-6 text-[#777B73]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   OFFERS
========================================================= */

function OffersSection({ config }) {
  const offers = config.offers || {};

  return (
    <section
      id="offers"
      className="bg-[#F6F4EF] px-6 py-28 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow={offers.eyebrow}
          heading={offers.heading}
          description={offers.description}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {(offers.items || []).map((offer, index) => (
            <article
              key={`${offer.title}-${index}`}
              className="group bg-white"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#EAE7DF]">
                {getMediaUrl(offer.image) && (
                  <img
                    src={getMediaUrl(offer.image)}
                    alt={offer.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="p-7 md:p-9">
                <p className="text-[9px] font-semibold tracking-[0.22em] text-[#A28B64]">
                  {offer.label}
                </p>

                <h3 className="mt-4 font-serif text-3xl text-[#263B32]">
                  {offer.title}
                </h3>

                <p className="mt-4 text-xs leading-6 text-[#777B73]">
                  {offer.description}
                </p>

                <a
                  href={offer.href || "#contact"}
                  className="mt-7 inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.14em] text-[#263B32]"
                >
                  {offer.buttonText}
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   GALLERY
========================================================= */

function GallerySection({ config }) {
  const gallery = config.gallery || {};

  return (
    <section
      id="gallery"
      className="bg-white px-6 py-28 md:px-12 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={gallery.eyebrow}
            heading={gallery.heading}
            description={gallery.description}
          />

          <Sparkles
            className="hidden text-[#B69A68] md:block"
            size={32}
            strokeWidth={1}
          />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {(gallery.items || []).map((item, index) => (
            <div
              key={`${item.alt}-${index}`}
              className={`overflow-hidden ${
                index === 1 ? "md:translate-y-10" : ""
              }`}
            >
              {getMediaUrl(item.image) && (
                <img
                  src={getMediaUrl(item.image)}
                  alt={item.alt || ""}
                  className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105 md:aspect-[3/4]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   LOCATION
========================================================= */

function LocationSection({ config }) {
  const location = config.location || {};

  return (
    <section
      id="location"
      className="grid bg-[#263B32] lg:grid-cols-2"
    >
      <div className="flex items-center px-6 py-24 md:px-16 md:py-32">
        <div className="max-w-xl">
          <SectionHeading
            eyebrow={location.eyebrow}
            heading={location.heading}
            description={location.description}
            light
          />

          <div className="mt-12 space-y-6 text-sm text-white/75">
            <p className="flex items-start gap-4">
              <MapPin
                className="mt-1 shrink-0 text-[#D6C19C]"
                size={17}
              />
              {location.address}
            </p>

            <p className="flex items-center gap-4">
              <Mail className="shrink-0 text-[#D6C19C]" size={17} />
              {location.email}
            </p>

            <p className="flex items-center gap-4">
              <Phone className="shrink-0 text-[#D6C19C]" size={17} />
              {location.phone}
            </p>
          </div>

          <a
            href={location.buttonHref || "#contact"}
            className="mt-10 inline-flex items-center gap-4 border border-white/40 px-6 py-4 text-[10px] tracking-[0.14em] text-white transition hover:bg-white hover:text-[#263B32]"
          >
            {location.buttonText}
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <div className="relative min-h-[360px] bg-[#D9D4C8] lg:min-h-[650px]">
        {location.mapUrl ? (
          <iframe
            src={location.mapUrl}
            title="Stayora location map"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#E6E1D7] text-center">
            <MapPin
              size={32}
              strokeWidth={1}
              className="text-[#52695B]"
            />

            <p className="mt-4 font-serif text-2xl text-[#263B32]">
              Your destination awaits.
            </p>

            <p className="mt-2 text-xs text-[#777B73]">
              Add a map embed URL in the template configuration.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function ContactSection({ config }) {
  const contact = config.contact || {};

  return (
    <section
      id="contact"
      className="bg-[#EEEAE1] px-6 py-24 text-center md:px-12 md:py-32"
    >
      <p className="text-[10px] font-semibold tracking-[0.28em] text-[#9C8359]">
        {contact.eyebrow}
      </p>

      <h2 className="mx-auto mt-5 max-w-3xl font-serif text-5xl leading-tight text-[#263B32] md:text-7xl">
        {contact.heading}
      </h2>

      <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#777B73]">
        {contact.description}
      </p>

      <a
        href={contact.buttonHref || "#"}
        className="mt-10 inline-flex items-center gap-5 bg-[#263B32] px-7 py-5 text-[10px] font-semibold tracking-[0.14em] text-white transition hover:bg-[#52695B]"
      >
        {contact.buttonText}
        <ArrowUpRight size={16} />
      </a>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function StayoraFooter({ config }) {
  const footer = config.footer || {};

  return (
    <footer className="bg-[#1C2D25] px-6 pb-8 pt-20 text-white md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-14 border-b border-white/15 pb-16 md:grid-cols-[1.4fr_2fr]">
          <div>
            <a href="#home" className="inline-block">
              <span className="block font-serif text-3xl tracking-[0.16em]">
                {footer.brandName}
              </span>

              <span className="mt-2 block text-[8px] tracking-[0.34em] text-white/55">
                {footer.tagline}
              </span>
            </a>

            <p className="mt-7 max-w-xs text-xs leading-7 text-white/55">
              {footer.description}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {(footer.linkGroups || []).map((group, index) => (
              <div key={`${group.title}-${index}`}>
                <h3 className="mb-6 text-[9px] font-semibold tracking-[0.2em] text-[#D6C19C]">
                  {group.title}
                </h3>

                <ul className="space-y-4">
                  {(group.links || []).map((link, linkIndex) => (
                    <li key={`${link.label}-${linkIndex}`}>
                      <a
                        href={link.href || "#"}
                        className="text-xs text-white/65 transition hover:text-white"
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

        <div className="flex flex-col justify-between gap-4 py-7 text-[10px] text-white/45 sm:flex-row">
          <p>{footer.copyright}</p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 tracking-[0.12em] hover:text-white"
          >
            BACK TO TOP <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   SECTION REGISTRY
========================================================= */

const stayoraSections = {
  header: StayoraHeader,
  hero: StayoraHero,
  booking: BookingPanel,
  story: StorySection,
  rooms: RoomsSection,
  experiences: ExperiencesSection,
  dining: DiningSection,
  amenities: AmenitiesSection,
  offers: OffersSection,
  gallery: GallerySection,
  location: LocationSection,
  contact: ContactSection,
  footer: StayoraFooter,
};

const defaultStayoraOrder = [
  "header",
  "hero",
  "booking",
  "story",
  "rooms",
  "experiences",
  "dining",
  "amenities",
  "offers",
  "gallery",
  "location",
  "contact",
  "footer",
];

/* =========================================================
   MAIN RENDERER
========================================================= */

export default function StayoraRenderer({ config }) {
  if (!config) return null;

  const editorSections = Array.isArray(config.editorSections)
    ? config.editorSections
    : defaultStayoraOrder.map((id, order) => ({
        id,
        visible: true,
        order,
      }));

  const orderedSections = [...editorSections]
    .filter((section) => section && section.visible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <main className="min-h-screen overflow-hidden bg-white font-sans text-[#263B32]">
      {orderedSections.map((section) => {
        const SectionComponent = stayoraSections[section.id];

        if (!SectionComponent) return null;

        return (
          <SectionComponent
            key={section.id}
            config={config}
          />
        );
      })}
    </main>
  );
}
