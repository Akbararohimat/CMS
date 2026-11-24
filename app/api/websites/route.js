import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getApiContext() {
  const cookieStore = await cookies();
  const token = cookieStore.get("cms_auth_token")?.value;

  if (!token) {
    return {
      error: NextResponse.json(
        { message: "Sesi login tidak ditemukan. Silakan login kembali." },
        { status: 401 }
      ),
    };
  }

  if (!process.env.CMS_API_URL) {
    return {
      error: NextResponse.json(
        { message: "CMS_API_URL belum dikonfigurasi." },
        { status: 500 }
      ),
    };
  }

  return {
    token,
    apiUrl: process.env.CMS_API_URL.replace(/\/+$/, ""),
  };
}

async function parseResponse(response) {
  const responseText = await response.text();

  try {
    return responseText ? JSON.parse(responseText) : {};
  } catch {
    return {
      message: `Server mengembalikan respons tidak valid (HTTP ${response.status}).`,
    };
  }
}

export async function GET(request) {
  try {
    const context = await getApiContext();

    if (context.error) return context.error;

    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();

    const apiUrl = `${context.apiUrl}/websites${query ? `?${query}` : ""}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${context.token}`,
      },
      cache: "no-store",
    });

    const result = await parseResponse(response);

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Websites GET API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat mengambil data website dari server." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const context = await getApiContext();

    if (context.error) return context.error;

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Format data yang dikirim tidak valid." },
        { status: 400 }
      );
    }

    const response = await fetch(`${context.apiUrl}/websites`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const result = await parseResponse(response);

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Websites POST API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat menyimpan website ke server." },
      { status: 500 }
    );
  }
}
