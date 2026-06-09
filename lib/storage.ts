import { createClient } from "redis";
import fs from "fs/promises";
import path from "path";
import { products as initialProducts } from "./data";

const PRODUCTS_FILE_PATH = path.join(process.cwd(), "products.json");
const ORDERS_FILE_PATH = path.join(process.cwd(), "orders.json");

// Helper to run operations with a short-lived Redis connection.
// This is critical for serverless environments (like Vercel) where idle TCP sockets 
// are silently dropped, causing ConnectionTimeoutError or ECONNRESET on reuse.
async function runWithRedis<T>(operation: (client: any) => Promise<T>): Promise<T | null> {
  const url = process.env.REDIS_URL;
  if (!url) return null;

  const client = createClient({
    url,
    socket: {
      connectTimeout: 5000, // 5s connection timeout
      keepAlive: 1000,      // enable socket keep-alive
    }
  });

  client.on("error", (err: any) => console.error("Redis client error:", err));

  try {
    await client.connect();
    const result = await operation(client);
    await client.disconnect();
    return result;
  } catch (err) {
    console.error("Failed to run Redis operation:", err);
    try {
      await client.disconnect();
    } catch (_) {}
    return null;
  }
}

export async function getProducts(): Promise<any[]> {
  const url = process.env.REDIS_URL;
  if (url) {
    const data = await runWithRedis(async (client) => {
      return await client.get("products");
    });

    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Redis getProducts JSON parse error:", e);
      }
    } else if (data === null) {
      // If connected to Redis but key doesn't exist, seed it
      await runWithRedis(async (client) => {
        await client.set("products", JSON.stringify(initialProducts));
      });
      return initialProducts;
    }
  }

  // Fallback to local file system
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
  const url = process.env.REDIS_URL;
  if (url) {
    const success = await runWithRedis(async (client) => {
      await client.set("products", JSON.stringify(productsList));
      return true;
    });
    if (success) return;
    throw new Error("Failed to save products to Redis database.");
  }

  // Fallback to local file system
  await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(productsList, null, 2), "utf-8");
}

export async function getOrders(): Promise<any[]> {
  const url = process.env.REDIS_URL;
  if (url) {
    const data = await runWithRedis(async (client) => {
      return await client.get("orders");
    });

    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Redis getOrders JSON parse error:", e);
      }
    }
  }

  // Fallback to local file system
  try {
    const fileData = await fs.readFile(ORDERS_FILE_PATH, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
}

export async function saveOrder(orderRecord: any): Promise<void> {
  const url = process.env.REDIS_URL;
  if (url) {
    const success = await runWithRedis(async (client) => {
      const existingData = await client.get("orders");
      const existing = existingData ? JSON.parse(existingData) : [];
      existing.push(orderRecord);
      await client.set("orders", JSON.stringify(existing));
      return true;
    });
    if (success) return;
    throw new Error("Failed to save order to Redis database.");
  }

  // Fallback to local file system
  const existingOrders = await getOrders();
  existingOrders.push(orderRecord);
  await fs.writeFile(ORDERS_FILE_PATH, JSON.stringify(existingOrders, null, 2), "utf-8");
}
