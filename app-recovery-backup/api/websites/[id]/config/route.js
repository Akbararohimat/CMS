import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("cms_auth_token")?.value;
}

async function getWebsiteConfigUrl(id) {
  return `${process.env.CMS_API_URL}/websites/${encodeURIComponent(id)}/config`;
}

export async function GET(request, { params }) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { message: "Sesi login tidak ditemukan. Silakan login kembali." },
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

    const response = await fetch(await getWebsiteConfigUrl(id), {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("Website Config GET API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat mengambil konfigurasi website." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { message: "Sesi login tidak ditemukan. Silakan login kembali." },
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

    const body = await request.json();

    if (!body?.config || typeof body.config !== "object" || Array.isArray(body.config)) {
      return NextResponse.json(
        { message: "Format konfigurasi tidak valid." },
        { status: 422 }
      );
    }

    const response = await fetch(await getWebsiteConfigUrl(id), {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        config: body.config,
      }),
      cache: "no-store",
    });

    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("Website Config PUT API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat menyimpan konfigurasi website." },
      { status: 500 }
    );
  }
}
