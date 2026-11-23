import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("cms_auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: "Sesi login tidak ditemukan. Silakan login kembali.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID website tidak ditemukan." },
        { status: 400 }
      );
    }

    const apiUrl = `${process.env.CMS_API_URL}/websites/${encodeURIComponent(id)}`;

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
    console.error("Website Detail API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server." },
      { status: 500 }
    );
  }
}
