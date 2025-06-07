// ===== app/api/search/route.ts =====
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json({ products: [] }, { status: 400});
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/search?q=${encodeURIComponent(query)}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    // console.log("API data: ", data);
    return NextResponse.json({ products: data });
  } catch (err) {
    console.error("API fetch error: ", err);
    return NextResponse.json({ error: "Failed to fetch from backend"}, { status : 500 });
  }
}