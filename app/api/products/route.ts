import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = await getProducts();
    return NextResponse.json({ success: true, products: list });
  } catch (error: any) {
    console.error("GET products error:", error);
    return NextResponse.json({ success: false, error: "Failed to read products." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { products: updatedProducts } = body;

    if (!updatedProducts || !Array.isArray(updatedProducts)) {
      return NextResponse.json({ success: false, error: "Invalid products array." }, { status: 400 });
    }

    // Write to storage
    await saveProducts(updatedProducts);
    return NextResponse.json({ success: true, products: updatedProducts });
  } catch (error: any) {
    console.error("POST products error:", error);
    return NextResponse.json({ success: false, error: "Failed to update products." }, { status: 500 });
  }
}
