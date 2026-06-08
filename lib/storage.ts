import { createClient } from "redis";
import fs from "fs/promises";
import path from "path";
import { products as initialProducts } from "./data";

const PRODUCTS_FILE_PATH = path.join(process.cwd(), "products.json");
const ORDERS_FILE_PATH = path.join(process.cwd(), "orders.json");

let redisClient: any = null;

async function getRedisClient() {
  const url = process.env.REDIS_URL;
  if (!url) return null;

  try {
    if (!redisClient) {
      redisClient = createClient({ url });
      redisClient.on("error", (err: any) => console.error("Redis client error:", err));
      await redisClient.connect();
    } else if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    return redisClient;
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    return null;
  }
}

export async function getProducts(): Promise<any[]> {
  const redis = await getRedisClient();
  if (redis) {
    try {
      const data = await redis.get("products");
      if (data) {
        return JSON.parse(data);
      }
      // Seed Redis with initial products if it's empty
      await redis.set("products", JSON.stringify(initialProducts));
      return initialProducts;
    } catch (err) {
      console.error("Redis getProducts error:", err);
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
  const redis = await getRedisClient();
  if (redis) {
    try {
      await redis.set("products", JSON.stringify(productsList));
      return;
    } catch (err) {
      console.error("Redis saveProducts error:", err);
      throw new Error("Failed to save products to database.");
    }
  }

  // Fallback to local file system
  await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(productsList, null, 2), "utf-8");
}

export async function getOrders(): Promise<any[]> {
  const redis = await getRedisClient();
  if (redis) {
    try {
      const data = await redis.get("orders");
      if (data) {
        return JSON.parse(data);
      }
      return [];
    } catch (err) {
      console.error("Redis getOrders error:", err);
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
  const redis = await getRedisClient();
  if (redis) {
    try {
      const existing = await getOrders();
      existing.push(orderRecord);
      await redis.set("orders", JSON.stringify(existing));
      return;
    } catch (err) {
      console.error("Redis saveOrder error:", err);
      throw new Error("Failed to save order to database.");
    }
  }

  // Fallback to local file system
  const existingOrders = await getOrders();
  existingOrders.push(orderRecord);
  await fs.writeFile(ORDERS_FILE_PATH, JSON.stringify(existingOrders, null, 2), "utf-8");
}
