import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { products as initialProducts } from "@/lib/data";

const PRODUCTS_FILE_PATH = path.join(process.cwd(), "products.json");

// Helper to read products
async function getProductsList() {
  try {
    const fileData = await fs.readFile(PRODUCTS_FILE_PATH, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    // If file doesn't exist, return initial list and create it
    try {
      await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(initialProducts, null, 2), "utf-8");
    } catch (writeErr) {
      console.error("Failed to seed products.json:", writeErr);
    }
    return initialProducts;
  }
}

export async function GET() {
  try {
    const list = await getProductsList();
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

    // Write to file
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(updatedProducts, null, 2), "utf-8");
    return NextResponse.json({ success: true, products: updatedProducts });
  } catch (error: any) {
    console.error("POST products error:", error);
    return NextResponse.json({ success: false, error: "Failed to update products." }, { status: 500 });
  }
}
