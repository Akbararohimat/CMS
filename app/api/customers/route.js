
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("cms_auth_token")?.value;
}

export async function GET(request) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { message: "Sesi login tidak ditemukan. Silakan login kembali." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();

    const apiUrl = `${process.env.CMS_API_URL}/customers${query ? `?${query}` : ""}`;

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
    console.error("Customers API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { message: "Sesi login tidak ditemukan. Silakan login kembali." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await fetch(
      `${process.env.CMS_API_URL}/customers`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Create Customer API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server." },
      { status: 500 }
    );
  }
}
