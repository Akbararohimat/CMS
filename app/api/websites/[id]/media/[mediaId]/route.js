import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(request, { params }) {
  try {
    const { id, mediaId } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("cms_auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.CMS_API_URL}/websites/${encodeURIComponent(id)}/media/${encodeURIComponent(mediaId)}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("DELETE Website Media Error:", error);

    return NextResponse.json(
      { message: "Gagal menghapus media website." },
      { status: 500 }
    );
  }
}
