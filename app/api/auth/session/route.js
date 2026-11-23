import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.cookies.get("cms_auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 },
    );
  }

  try {
    const response = await fetch(`${process.env.CMS_API_URL}/user`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (response.status === 401) {
      const nextResponse = NextResponse.json(
        { authenticated: false },
        { status: 401 },
      );

      nextResponse.cookies.set("cms_auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });

      return nextResponse;
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: "Gagal memeriksa sesi login." },
        { status: 503 },
      );
    }

    const result = await response.json();

    return NextResponse.json({
      authenticated: true,
      data: { user: result.data },
    });
  } catch {
    return NextResponse.json(
      { message: "Server autentikasi tidak dapat dijangkau." },
      { status: 503 },
    );
  }
}
