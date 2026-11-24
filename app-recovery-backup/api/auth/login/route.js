import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    if (
      typeof body.email !== "string" ||
      typeof body.password !== "string" ||
      !body.email.trim() ||
      !body.password
    ) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi." },
        { status: 422 },
      );
    }

    const response = await fetch(`${process.env.CMS_API_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email.trim(),
        password: body.password,
        device_name: "cms-comtronics-web",
      }),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: result.message ?? "Login gagal.",
          errors: result.errors ?? null,
        },
        { status: response.status },
      );
    }

    const token = result.data?.token;
    const user = result.data?.user;

    if (!token || !user) {
      return NextResponse.json(
        { message: "Respons login dari server tidak valid." },
        { status: 502 },
      );
    }

    const nextResponse = NextResponse.json({
      message: result.message,
      data: { user },
    });

    nextResponse.cookies.set("cms_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return nextResponse;
  } catch {
    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server. Coba lagi." },
      { status: 503 },
    );
  }
}
