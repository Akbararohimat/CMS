import { NextResponse } from "next/server";

export async function POST(request) {
  const token = request.cookies.get("cms_auth_token")?.value;

  try {
    if (token) {
      await fetch(`${process.env.CMS_API_URL}/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
    }
  } catch {
  }

  const response = NextResponse.json({
    message: "Logout berhasil.",
  });

  response.cookies.set("cms_auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
