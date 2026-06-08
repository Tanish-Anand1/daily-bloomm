import fs from "fs/promises";
import path from "path";
import { products as initialProducts } from "./data";
import { kv } from "@vercel/kv";

const PRODUCTS_FILE_PATH = path.join(process.cwd(), "products.json");
const ORDERS_FILE_PATH = path.join(process.cwd(), "orders.json");

const isKvEnabled = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

export async function getProducts(): Promise<any[]> {
  if (isKvEnabled) {
    try {
      const data = await kv.get<any[]>("products");
      if (data && Array.isArray(data)) {
        return data;
      }
      // If KV is empty or not seeded, write initial list and return it
      await kv.set("products", initialProducts);
      return initialProducts;
    } catch (err) {
      console.error("Vercel KV read products error:", err);
      // Fallback to file system below
    }
  }

  // Fallback to file system
  try {
    const fileData = await fs.readFile(PRODUCTS_FILE_PATH, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    try {
      await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(initialProducts, null, 2), "utf-8");
    } catch (writeErr) {
      console.error("Failed to seed products.json:", writeErr);
    }
    return initialProducts;
  }
}

export async function saveProducts(productsList: any[]): Promise<void> {
  if (isKvEnabled) {
    try {
      await kv.set("products", productsList);
      return;
    } catch (err) {
      console.error("Vercel KV save products error:", err);
      throw new Error("Failed to save products to database.");
    }
  }

  // Fallback to file system
  await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(productsList, null, 2), "utf-8");
}

export async function getOrders(): Promise<any[]> {
  if (isKvEnabled) {
    try {
      const data = await kv.get<any[]>("orders");
      if (data && Array.isArray(data)) {
        return data;
      }
      return [];
    } catch (err) {
      console.error("Vercel KV read orders error:", err);
      // Fallback to file system below
    }
  }

  // Fallback to file system
  try {
    const fileData = await fs.readFile(ORDERS_FILE_PATH, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
}

export async function saveOrder(orderRecord: any): Promise<void> {
  if (isKvEnabled) {
    try {
      const existing = await getOrders();
      existing.push(orderRecord);
      await kv.set("orders", existing);
      return;
    } catch (err) {
      console.error("Vercel KV save order error:", err);
      throw new Error("Failed to save order to database.");
    }
  }

  // Fallback to file system
  const existingOrders = await getOrders();
  existingOrders.push(orderRecord);
  await fs.writeFile(ORDERS_FILE_PATH, JSON.stringify(existingOrders, null, 2), "utf-8");
}
