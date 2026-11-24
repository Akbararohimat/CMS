import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("cms_auth_token")?.value;
}

async function getCustomerParams(params) {
  const { id } = await params;
  return encodeURIComponent(id);
}

async function getApiResponse(id, method, body = null) {
  const token = await getAuthToken();

  if (!token) {
    return NextResponse.json(
      { message: "Sesi login tidak ditemukan. Silakan login kembali." },
      { status: 401 }
    );
  }

  const options = {
    method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  };

  if (body !== null) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const response = await fetch(
    `${process.env.CMS_API_URL}/customers/${id}`,
    options
  );

  const result = await response.json();

  return NextResponse.json(result, {
    status: response.status,
  });
}

export async function GET(request, { params }) {
  try {
    const id = await getCustomerParams(params);
    return await getApiResponse(id, "GET");
  } catch (error) {
    console.error("Get Customer Detail API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = await getCustomerParams(params);
    const body = await request.json();

    return await getApiResponse(id, "PUT", body);
  } catch (error) {
    console.error("Update Customer API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = await getCustomerParams(params);
    return await getApiResponse(id, "DELETE");
  } catch (error) {
    console.error("Delete Customer API Error:", error);

    return NextResponse.json(
      { message: "Tidak dapat terhubung ke server." },
      { status: 500 }
    );
  }
}
