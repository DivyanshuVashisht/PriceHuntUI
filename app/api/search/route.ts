// ===== app/api/search/route.ts =====
import { NextResponse } from "next/server";
import { sampleData } from "../../utils/sampleData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const filtered = sampleData.filter((item) => 
  item.title.toLowerCase().includes(query));
  return NextResponse.json({ products: filtered });
}