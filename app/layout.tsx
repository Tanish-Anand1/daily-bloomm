import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-script",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daily Bloomm — Handcrafted Organic Soaps",
  description:
    "Small-batch organic soaps handcrafted with botanicals sourced across India. No chemicals. Just plants, water, and care.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><text y="32" font-size="32">🌸</text></svg>',
  },
  openGraph: {
    title: "Daily Bloomm — Handcrafted Organic Soaps",
    description:
      "Small-batch organic soaps handcrafted with botanicals sourced across India.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF6EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${jost.variable}`}
    >
      <body className="bg-cream font-body text-bark">
        <CartProvider>
          <GrainOverlay />
          {children}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
