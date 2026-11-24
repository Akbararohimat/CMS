import { Suspense } from "react";
import WebsiteFullPreviewClient from "./WebsiteFullPreviewClient";

export default function WebsiteFullPreviewPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white">
          <p className="text-sm text-slate-500">
            Memuat website preview...
          </p>
        </main>
      }
    >
      <WebsiteFullPreviewClient />
    </Suspense>
  );
}
