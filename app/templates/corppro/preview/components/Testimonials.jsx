
"use client";

import { useEffect, useState } from "react";
import { getMediaFile } from "../../../../../lib/media-storage";

export default function Testimonials({ config, sectionLabel }) {
  const customers = config?.customers ?? {};
  const items = customers.items ?? [];

  const [mediaUrls, setMediaUrls] = useState({});

  const animationSpeed = Math.max(
    10,
    Number(customers.animationSpeed) || 30
  );

  useEffect(() => {
    let cancelled = false;
    const objectUrls = [];

    async function loadLogos() {
      const results = await Promise.all(
        items.map(async (item, index) => {
          const mediaId = item.logo?.id;

          if (!mediaId) {
            return {
              id: item.id ?? index,
              url: typeof item.logo === "string" ? item.logo : "",
            };
          }

          try {
            const file = await getMediaFile(mediaId);

            if (!file || typeof file !== "object") return null;

            const url = URL.createObjectURL(file);
            objectUrls.push(url);

            return {
              id: item.id ?? index,
              url,
            };
          } catch (error) {
            console.error("Failed to load customer logo:", error);
            return null;
          }
        })
      );

      if (cancelled) {
        objectUrls.forEach(URL.revokeObjectURL);
        return;
      }

      const nextUrls = {};

      results.forEach((result) => {
        if (result) nextUrls[result.id] = result.url;
      });

      setMediaUrls(nextUrls);
    }

    loadLogos();

    return () => {
      cancelled = true;
      objectUrls.forEach(URL.revokeObjectURL);
    };
  }, [items]);

  const logoItems = items.map((item, index) => ({
    ...item,
    key: item.id ?? index,
    image: mediaUrls[item.id ?? index] || "",
  }));

  if (items.length === 0) return null;

  const renderLogos = (duplicate = false) =>
    logoItems.map((item) => (
      <div
        key={`${duplicate ? "duplicate-" : ""}${item.key}`}
        className="flex h-24 w-44 shrink-0 items-center justify-center px-5 sm:w-52"
      >
        {item.image ? (
          <img
            src={item.image}
            alt={duplicate ? "" : item.name || "Customer logo"}
            className="max-h-[68px] max-w-full object-contain"
          />
        ) : (
          <span className="text-center text-sm font-semibold text-slate-700">
            {item.name}
          </span>
        )}
      </div>
    ));

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-white py-16 lg:py-20"
    >
      <div className="mx-auto mb-10 max-w-7xl px-6 text-center lg:mb-12">
        <h2 className="text-2xl font-bold tracking-wide text-slate-800 sm:text-3xl">
          {(sectionLabel ?? "Our Customers").toUpperCase()}
        </h2>
      </div>

      <div className="customer-marquee">
        <div
          className="customer-marquee-track"
          style={{
            "--marquee-duration": `${animationSpeed}s`,
          }}
        >
          <div className="customer-marquee-group">
            {renderLogos()}
          </div>

          <div className="customer-marquee-group" aria-hidden="true">
            {renderLogos(true)}
          </div>
        </div>
      </div>

      <style jsx>{`
        .customer-marquee {
          width: 100%;
          overflow: hidden;
        }

        .customer-marquee-track {
          display: flex;
          width: max-content;
          animation: customer-scroll var(--marquee-duration) linear infinite;
          will-change: transform;
        }

        .customer-marquee-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 1.5rem;
          padding-right: 1.5rem;
        }

        .customer-marquee:hover .customer-marquee-track {
          animation-play-state: paused;
        }

        @keyframes customer-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .customer-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
