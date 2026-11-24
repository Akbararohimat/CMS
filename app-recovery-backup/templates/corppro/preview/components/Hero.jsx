"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { getMediaFile } from "../../../../../lib/media-storage";

export default function Hero({ config }) {
  const hero = config?.hero ?? {};

  const [uploadedMediaUrl, setUploadedMediaUrl] = useState("");
  const [uploadedMediaType, setUploadedMediaType] = useState("");

  useEffect(() => {
    let objectUrl;

    async function loadBackgroundMedia() {
      if (!hero.backgroundMedia?.id) {
        setUploadedMediaUrl("");
        setUploadedMediaType("");
        return;
      }

      try {
        const file = await getMediaFile(hero.backgroundMedia.id);

        if (!file) return;

        objectUrl = URL.createObjectURL(file);

        setUploadedMediaUrl(objectUrl);
        setUploadedMediaType(file.type);
      } catch (error) {
        console.error("Gagal memuat background media:", error);
      }
    }

    loadBackgroundMedia();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [hero.backgroundMedia?.id]);

  const isVideo = uploadedMediaType.startsWith("video/");

  const backgroundPosition =
    hero.backgroundPosition || "center center";

  const overlayColor = hero.overlayColor || "#FFFFFF";

  const overlayOpacity =
    Math.min(100, Math.max(0, Number(hero.overlayOpacity ?? 65))) / 100;

  const backgroundImage =
    uploadedMediaUrl && !isVideo
      ? uploadedMediaUrl
      : hero.backgroundImage ||
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85";

  return (
    <section
      id="home"
      className="relative flex min-h-[760px] items-center overflow-hidden bg-slate-100"
    >
      {uploadedMediaUrl && isVideo ? (
        <video
          src={uploadedMediaUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: backgroundPosition }}
        />
      ) : (
        <img
          src={backgroundImage}
          alt="Corporate background"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: backgroundPosition }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${overlayColor} 0%, ${overlayColor} 48%, transparent 100%)`,
          opacity: overlayOpacity,
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-36 lg:px-8">
        <div className="max-w-2xl">
          {hero.badgeText && (
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              {hero.badgeText}
            </span>
          )}

          <h1 className="mt-8 text-5xl leading-[1.12] font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            {hero.heading}{" "}
            <span className="text-blue-600">
              {hero.highlightText}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryButton?.href || "#about"}
              className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {hero.primaryButton?.text || "Learn More"}
              <ArrowRight size={17} />
            </a>

            <a
              href={hero.secondaryButton?.href || "#services"}
              className="inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-600 hover:text-blue-600"
            >
              <Play size={15} />
              {hero.secondaryButton?.text || "Our Services"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}