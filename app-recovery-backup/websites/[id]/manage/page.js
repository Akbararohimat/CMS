import { Suspense } from "react";
import ManageEditorClient from "./ManageEditorClient";

export default function WebsiteManagePage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-sm text-slate-500">
            Memuat editor website...
          </p>
        </main>
      }
    >
      <ManageEditorClient />
    </Suspense>
  );
}
