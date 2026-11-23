import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("cms_auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Sesi login tidak ditemukan." },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${process.env.CMS_API_URL}/templates`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Template API error:", error);

    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server." },
      { status: 503 },
    );
  }
}
