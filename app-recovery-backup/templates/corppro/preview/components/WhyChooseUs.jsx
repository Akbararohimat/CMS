
"use client";

import { useEffect, useState } from "react";
import { getMediaFile } from "../../../../../lib/media-storage";

function VisionMissionCard({ item, type, duration = 400 }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    let active = true;
    let objectUrl = null;

    async function loadImage() {
      setImageUrl(null);

      if (!item?.image) return;

      if (typeof item.image === "string") {
        setImageUrl(item.image);
        return;
      }

      if (item.image.url) {
        setImageUrl(item.image.url);
        return;
      }

      if (item.image.id) {
        try {
          const file = await getMediaFile(item.image.id);

          if (file && active) {
            objectUrl = URL.createObjectURL(file);
            setImageUrl(objectUrl);
          }
        } catch (error) {
          console.error("Failed to load image:", error);
        }
      }
    }

    loadImage();

    return () => {
      active = false;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [item?.image]);

  const hasImage = Boolean(imageUrl);
  const hasHoverContent = Boolean(item?.hoverContent?.trim());

  return (
    <article
      className={`group relative overflow-hidden border border-slate-200 bg-white ${
        hasImage
          ? ""
          : "transition-transform hover:-translate-y-2 hover:scale-[1.02]"
      }`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {hasImage && (
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <img
            src={imageUrl}
            alt={item.title || type}
            className="h-full w-full object-cover transition-transform ease-out group-hover:scale-110"
            style={{ transitionDuration: `${duration}ms` }}
          />
        </div>
      )}

      <div className="relative p-7 sm:p-9">
        <span className="text-xs font-bold tracking-[0.18em] text-blue-600 uppercase">
          {type}
        </span>

        <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
          {item.title || `Our ${type}`}
        </h3>

        {item.description && (
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {item.description}
          </p>
        )}

        {hasHoverContent && (
          <div
            className="mt-4 overflow-hidden transition-all ease-out md:max-h-0 md:translate-y-2 md:opacity-0 md:group-hover:max-h-60 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            style={{ transitionDuration: `${duration}ms` }}
          >
            <div className="border-t border-slate-200 pt-4">
              <p className="text-sm leading-7 text-slate-600">
                {item.hoverContent}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

export default function WhyChooseUs({ config }) {
  const visionMission = config?.whyChooseUs?.visionMission ?? {};

  const vision = visionMission.vision ?? {
    title: "Our Vision",
    description: "",
    hoverContent: "",
    image: null,
  };

  const mission = visionMission.mission ?? {
    title: "Our Mission",
    description: "",
    hoverContent: "",
    image: null,
  };

  const hoverDuration = Math.max(
    100,
    Math.min(1500, Number(visionMission.hoverDuration) || 400)
  );

  return (
    <section className="overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <span className="text-sm font-bold tracking-[0.18em] text-blue-600 uppercase">
            Our Goals
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Our Vision & Mission
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <VisionMissionCard
            type="Vision"
            item={vision}
            duration={hoverDuration}
          />

          <VisionMissionCard
            type="Mission"
            item={mission}
            duration={hoverDuration}
          />
        </div>
      </div>
    </section>
  );
}
