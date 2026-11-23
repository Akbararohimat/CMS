import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("cms_auth_token")?.value;
}

async function getWebsiteMediaUrl(id) {
  return `${process.env.CMS_API_URL}/websites/${encodeURIComponent(id)}/media`;
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const response = await fetch(await getWebsiteMediaUrl(id), {
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
    console.error("GET Website Media Error:", error);

    return NextResponse.json(
      { message: "Gagal mengambil data media website." },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const token = await getAuthToken();

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const response = await fetch(await getWebsiteMediaUrl(id), {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("POST Website Media Error:", error);

    return NextResponse.json(
      { message: "Gagal mengunggah media website." },
      { status: 500 }
    );
  }
}
