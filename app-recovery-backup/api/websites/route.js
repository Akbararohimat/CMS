import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("cms_auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Sesi login tidak ditemukan. Silakan login kembali." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const query = searchParams.toString();
    const apiUrl = `${process.env.CMS_API_URL}/websites${query ? `?${query}` : ""}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Websites API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server." },
      { status: 500 }
    );
  }
}