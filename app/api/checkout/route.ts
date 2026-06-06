import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { products } from "@/lib/data";

// Type definitions for checkout
interface OrderItem {
  id: number;
  quantity: number;
}

interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  pincode: string;
}

interface CheckoutRequest {
  items: OrderItem[];
  customer: CustomerDetails;
}

const ORDERS_FILE_PATH = path.join(process.cwd(), "orders.json");
const PRODUCTS_FILE_PATH = path.join(process.cwd(), "products.json");

export async function POST(request: Request) {
  try {
    const body: CheckoutRequest = await request.json();
    const { items, customer } = body;

    // 1. Inputs Validation (No loopholes!)
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Your shopping cart is empty." },
        { status: 400 }
      );
    }

    if (!customer || !customer.name || !customer.phone || !customer.address || !customer.pincode) {
      return NextResponse.json(
        { success: false, error: "Please provide all delivery details." },
        { status: 400 }
      );
    }

    // Phone validation
    const cleanPhone = customer.phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit phone number." },
        { status: 400 }
      );
    }

    // Pincode validation
    const cleanPincode = customer.pincode.replace(/\D/g, "");
    if (cleanPincode.length !== 6) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 6-digit Indian PIN code." },
        { status: 400 }
      );
    }

    // 2. Server-side Price Verification (Loophole protection against price-tampering)
    let currentProducts = products;
    try {
      const prodData = await fs.readFile(PRODUCTS_FILE_PATH, "utf-8");
      currentProducts = JSON.parse(prodData);
    } catch (err) {
      console.warn("Failed to read products.json in checkout, using fallback data.");
    }

    let subtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      // Find item in server data
      const dbProduct = currentProducts.find((p) => p.id === item.id);
      if (!dbProduct) {
        return NextResponse.json(
          { success: false, error: `Product with ID ${item.id} not found.` },
          { status: 400 }
        );
      }

      if (item.quantity <= 0 || !Number.isInteger(item.quantity)) {
        return NextResponse.json(
          { success: false, error: "Invalid item quantity." },
          { status: 400 }
        );
      }

      const itemCost = dbProduct.price * item.quantity;
      subtotal += itemCost;

      verifiedItems.push({
        id: dbProduct.id,
        name: dbProduct.name,
        price: dbProduct.price,
        quantity: item.quantity,
        weight: dbProduct.weight,
        totalCost: itemCost,
      });
    }

    // Shipping rules: Free above ₹500, else ₹50
    const shippingFee = subtotal >= 500 ? 0 : 50;
    const grandTotal = subtotal + shippingFee;

    // 3. Generate Order Reference ID
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `#DB-${year}-${randomNum}`;

    // 4. Persistent Database Logging (orders.json)
    const orderRecord = {
      orderId,
      timestamp: new Date().toISOString(),
      customer: {
        name: customer.name.trim(),
        phone: cleanPhone,
        address: customer.address.trim(),
        pincode: cleanPincode,
      },
      items: verifiedItems,
      pricing: {
        subtotal,
        shippingFee,
        grandTotal,
      },
      status: "pending_whatsapp",
    };

    let existingOrders = [];
    try {
      const fileData = await fs.readFile(ORDERS_FILE_PATH, "utf-8");
      existingOrders = JSON.parse(fileData);
    } catch (readError: any) {
      // If file doesn't exist or is invalid, start clean
      existingOrders = [];
    }

    existingOrders.push(orderRecord);
    await fs.writeFile(ORDERS_FILE_PATH, JSON.stringify(existingOrders, null, 2), "utf-8");

    // 5. Construct Encoded WhatsApp Message
    const brandWhatsAppNumber = "919838070818"; // Daily Bloomm official WhatsApp Order Handoff number
    
    // Formatting template (bold text, line separators, lists)
    let message = `🌸 *DAILY BLOOMM — NEW ORDER* 🌸\n`;
    message += `----------------------------------\n`;
    message += `*Order ID:* ${orderId}\n`;
    message += `*Date:* ${new Date().toLocaleDateString("en-IN")}\n\n`;

    message += `*Customer Details:*\n`;
    message += `• *Name:* ${customer.name.trim()}\n`;
    message += `• *Phone:* ${cleanPhone}\n`;
    message += `• *Address:* ${customer.address.trim()}\n`;
    message += `• *Pincode:* ${cleanPincode}\n\n`;

    message += `*Order Summary:*\n`;
    verifiedItems.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} (${item.weight}) — ₹${item.totalCost}\n`;
    });
    message += `----------------------------------\n`;
    message += `*Subtotal:* ₹${subtotal}\n`;
    message += `*Shipping:* ${shippingFee === 0 ? "FREE" : `₹${shippingFee}`}\n`;
    message += `*Total Amount:* *₹${grandTotal}*\n\n`;
    
    message += `Please confirm this order to proceed with packaging and dispatch. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${brandWhatsAppNumber}&text=${encodedMessage}`;

    // Return the link and ID to frontend
    return NextResponse.json({
      success: true,
      orderId,
      whatsappUrl,
    });
  } catch (error: any) {
    console.error("Checkout backend error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred on the server." },
      { status: 500 }
    );
  }
}
