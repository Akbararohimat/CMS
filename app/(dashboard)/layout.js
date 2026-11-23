import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

import DashboardShell from "./DashboardShell";

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("cms_auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const baseUrl = process.env.CMS_API_URL;

  if (!baseUrl) {
    throw new Error("CMS_API_URL belum dikonfigurasi.");
  }

  const response = await fetch(`${baseUrl}/user`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) {
    redirect("/login");
  }

  if (!response.ok) {
    throw new Error("Gagal memverifikasi sesi pengguna.");
  }

  const result = await response.json();
  const user = result.data;

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return user;
}

export default async function DashboardLayout({ children }) {
  await connection();

  const user = await getAuthenticatedUser();

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}
