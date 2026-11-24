"use client";

import { useEffect, useState } from "react";
import {
  ImagePlus,
  Film,
  Trash2,
  Upload,
  LoaderCircle,
} from "lucide-react";

export default function WebsiteMediaPicker({
  websiteId,
  label = "Background Media",
  value,
  onChange,
  collection = "website",
}) {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    setPreview(value?.url || "");
  }, [value]);

  const isVideo =
    (typeof value === "object" &&
      value?.type?.startsWith("video/")) ||
    (typeof value === "string" &&
      /\.(mp4|webm)(\?.*)?$/i.test(value));

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    const validType =
      file.type.startsWith("image/") ||
      file.type.startsWith("video/");

    if (!validType) {
      setError("File harus berupa gambar atau video.");
      event.target.value = "";
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError("Ukuran file maksimal 50 MB.");
      event.target.value = "";
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("collection", collection);

      const response = await fetch(
        `/api/websites/${encodeURIComponent(websiteId)}/media`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal mengunggah media."
        );
      }

      const media = result.data;

      onChange({
        id: media.id,
        name: media.original_name,
        type: media.mime_type,
        url: media.url,
        file_path: media.file_path,
        disk: media.disk,
      });
    } catch (uploadError) {
      console.error("Upload media error:", uploadError);
      setError(uploadError.message || "Gagal mengunggah media.");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const handleRemove = () => {
    setError("");
    onChange(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      {preview ? (
        <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {isVideo ? (
            <video
              src={preview}
              controls
              className="max-h-64 w-full object-contain"
            />
          ) : (
            <img
              src={preview}
              alt={value?.name || label}
              className="max-h-64 w-full object-contain"
            />
          )}

          <div className="flex items-center justify-between border-t border-slate-200 bg-white p-3">
            <div className="flex min-w-0 items-center gap-2">
              {isVideo ? (
                <Film size={16} className="shrink-0 text-slate-500" />
              ) : (
                <ImagePlus size={16} className="shrink-0 text-slate-500" />
              )}

              <span className="truncate text-xs text-slate-600">
                {value?.name || "Media terpilih"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              disabled={loading}
              className="flex shrink-0 items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              <Trash2 size={14} />
              Lepas
            </button>
          </div>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-slate-400 hover:bg-slate-100">
          {loading ? (
            <LoaderCircle
              size={24}
              className="animate-spin text-slate-500"
            />
          ) : (
            <Upload size={24} className="text-slate-400" />
          )}

          <span className="mt-2 text-sm font-medium text-slate-700">
            {loading ? "Mengunggah media..." : "Upload gambar atau video"}
          </span>

          <span className="mt-1 text-xs text-slate-500">
            JPG, PNG, WEBP, GIF, MP4, WEBM · Maksimal 50 MB
          </span>

          <input
            type="file"
            accept="image/*,video/mp4,video/webm"
            className="hidden"
            disabled={loading}
            onChange={handleFileChange}
          />
        </label>
      )}

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
