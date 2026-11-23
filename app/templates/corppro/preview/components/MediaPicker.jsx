"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Film, Trash2, Upload, LoaderCircle } from "lucide-react";
import { getMediaFile, saveMediaFile } from "../../../../../lib/media-storage";

export default function MediaPicker({
  label = "Background Media",
  value,
  onChange,
  websiteId = null,
}) {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let objectUrl;

    async function loadPreview() {
      setError("");

      if (!value?.id) {
        setPreview("");
        return;
      }

      // Website media menggunakan URL dari Laravel.
      if (websiteId && value?.url) {
        setPreview(value.url);
        return;
      }

      // Template master tetap menggunakan IndexedDB.
      try {
        const file = await getMediaFile(value.id);

        if (!file) {
          setPreview("");
          setError("File tidak ditemukan di penyimpanan browser.");
          return;
        }

        objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      } catch (err) {
        console.error("Gagal memuat media:", err);
        setPreview("");
        setError("Gagal memuat media.");
      }
    }

    loadPreview();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [value?.id, value?.url, websiteId]);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    const validType =
      file.type.startsWith("image/") ||
      ["video/mp4", "video/webm"].includes(file.type);

    if (!validType) {
      setError("Format file tidak didukung.");
      event.target.value = "";
      return;
    }

    const maxSize = websiteId
      ? 100 * 1024 * 1024
      : 50 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        `Ukuran file maksimal ${websiteId ? "100" : "50"} MB.`
      );
      event.target.value = "";
      return;
    }

    setLoading(true);

    try {
      if (websiteId) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("collection", "website");

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
            result.message || "Gagal mengunggah media website."
          );
        }

        const uploadedMedia = result.data;

        onChange({
          id: uploadedMedia.id,
          name: uploadedMedia.original_name,
          type: uploadedMedia.mime_type,
          url: uploadedMedia.url,
        });
      } else {
        const media = await saveMediaFile(file);
        onChange(media);
      }
    } catch (err) {
      console.error("Gagal menyimpan media:", err);
      setError(err.message || "Gagal menyimpan file. Silakan coba lagi.");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const handleRemove = async () => {
    if (loading) return;

    setError("");

    if (websiteId && value?.id) {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/websites/${encodeURIComponent(websiteId)}/media/${encodeURIComponent(value.id)}`,
          {
            method: "DELETE",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Gagal menghapus media."
          );
        }

        onChange(null);
        setPreview("");
      } catch (err) {
        console.error("Gagal menghapus media:", err);
        setError(err.message || "Gagal menghapus media.");
      } finally {
        setLoading(false);
      }

      return;
    }

    onChange(null);
    setPreview("");
  };

  const isVideo =
    value?.type?.startsWith("video/") ||
    value?.mime_type?.startsWith("video/");

  const mediaName =
    value?.name ||
    value?.original_name ||
    "Media terpilih";

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-medium text-slate-700">
          {label}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Pilih gambar atau video maksimal{" "}
          {websiteId ? "100 MB" : "50 MB"}.
        </p>
      </div>

      {preview ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {isVideo ? (
            <video
              src={preview}
              controls
              className="h-52 w-full bg-black object-contain"
            />
          ) : (
            <img
              src={preview}
              alt={value?.alt_text || "Media preview"}
              className="h-52 w-full object-contain"
            />
          )}

          <div className="flex items-center justify-between gap-3 border-t border-slate-200 p-3">
            <div className="flex min-w-0 items-center gap-2">
              {isVideo ? (
                <Film size={17} className="shrink-0 text-slate-500" />
              ) : (
                <ImagePlus size={17} className="shrink-0 text-slate-500" />
              )}

              <span className="truncate text-xs text-slate-600">
                {mediaName}
              </span>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              disabled={loading}
              className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <LoaderCircle size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-blue-400 hover:bg-blue-50/40">
          {loading ? (
            <LoaderCircle
              size={26}
              className="animate-spin text-blue-600"
            />
          ) : (
            <Upload size={26} className="text-slate-400" />
          )}

          <span className="mt-3 text-sm font-semibold text-slate-700">
            {loading ? "Menyimpan media..." : "Pilih foto atau video"}
          </span>

          <span className="mt-1 text-xs text-slate-500">
            PNG, JPG, WEBP, GIF, MP4, WEBM
          </span>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />
        </label>
      )}

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
