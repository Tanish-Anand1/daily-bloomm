"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Beautiful SVG Leaf Icon
function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-10-1 9-4 16-9 17Z" />
      <path d="M4 21c0-5 4-9 9-11" />
    </svg>
  );
}

// Data definitions
const leftFeatures = [
  {
    id: "handmade",
    soapIndex: 4, // Oatmeal Artisan
    title: "Hand made",
    desc: "Each organic, hand-crafted soap contains recipes that include oats, clays, and other real ingredients like calendula to give a harmonious touch.",
  },
  {
    id: "love",
    soapIndex: 2, // Rose Glow
    title: "Made With Love",
    desc: "Our soaps are carefully handcrafted with natural, ethically sourced ingredients. We keep the process simple, preserving the purity of each harvest.",
  },
  {
    id: "organic",
    soapIndex: 1, // Aloe Green
    title: "100% Organic",
    desc: "To protect your skin and environment, we avoid preservatives. This is standard handmade soap that is safe for both you and the earth.",
  },
];

const rightFeatures = [
  {
    id: "coldpress",
    soapIndex: 3, // Marigold Glow
    title: "Cold Pressed",
    desc: "Our cold-pressed soaps are curated using oils below 50°C which preserves essential nutrients, herbal properties and keeps the balance of skin.",
  },
  {
    id: "vegan",
    soapIndex: 0, // Aqua Cool
    title: "Vegan & Cruelty Free",
    desc: "This is a product of vegan, meaning that it's 100% plant-based and cruelty free. It contains no animal fat or animal-derived products.",
  },
  {
    id: "allskin",
    soapIndex: 1, // Aloe Green
    title: "For All Skin Types",
    desc: "Our soaps are specially formulated for all skin types, including sensitive skin. The soaps use pure organic ingredients like coconut, aloe vera, and essential oils.",
  },
];

const soapStack = [
  {
    id: "aquacool",
    name: "Aqua Cool",
    image: "/aqua_cool.png",
    accent: "from-cyan-200 to-sky-100",
    leftDecor: "❄️",
    rightDecor: "🍃",
  },
  {
    id: "aloe",
    name: "Aloe Green",
    image: "/aloe_green.png",
    accent: "from-emerald-200 to-green-100",
    leftDecor: "💚",
    rightDecor: "🌱",
  },
  {
    id: "rose",
    name: "Rose Glow",
    image: "/rose_glow.png",
    accent: "from-rose-200 to-red-100",
    leftDecor: "🌹",
    rightDecor: "🌹",
  },
  {
    id: "marigold",
    name: "Marigold Glow",
    image: "/marigold_glow.png",
    accent: "from-amber-200 to-yellow-100",
    leftDecor: "🌼",
    rightDecor: "✨",
  },
  {
    id: "oatmeal",
    name: "Oatmeal Artisan",
    image: "/oatmeal_soap.png",
    accent: "from-amber-100 to-orange-50",
    leftDecor: "🌾",
    rightDecor: "🥛",
  },
];

export default function Features() {
  const [hoveredSoapIndex, setHoveredSoapIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      {/* Decorative floral background blurs */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full bg-moss/10 blur-[80px]" />
        <div className="absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-terra/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Column — Features (Right Aligned on Desktop) */}
          <div className="space-y-12 lg:col-span-4 lg:text-right">
            {leftFeatures.map((feat) => (
              <motion.div
                key={feat.id}
                onMouseEnter={() => setHoveredSoapIndex(feat.soapIndex)}
                onMouseLeave={() => setHoveredSoapIndex(null)}
                className="group relative cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-start gap-2 lg:justify-end">
                  <h3 className="font-display text-2xl font-medium text-forest transition-colors duration-300 group-hover:text-terra">
                    {feat.title}
                  </h3>
                  <LeafIcon className="h-5 w-5 text-terra transition-transform duration-500 group-hover:rotate-12" />
                </div>
                <p className="mt-3 font-body text-sm leading-relaxed text-bark/70 lg:pl-6">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Column — Interactive Overlapping Soap Stack */}
          <div className="flex flex-col items-center justify-center py-8 lg:col-span-4">
            <div className="relative flex flex-col items-center gap-4">
              {soapStack.map((soap, index) => {
                const isHovered = hoveredSoapIndex === index;
                const isAnyHovered = hoveredSoapIndex !== null;

                return (
                  <motion.div
                    key={soap.id}
                    className="relative flex items-center justify-center"
                    animate={{
                      scale: isHovered ? 1.12 : isAnyHovered ? 0.92 : 1,
                      z: isHovered ? 50 : index,
                      opacity: isHovered ? 1 : isAnyHovered ? 0.45 : 0.95,
                      y: [0, index % 2 === 0 ? -4 : 4, 0],
                    }}
                    transition={{
                      scale: { type: "spring", stiffness: 150, damping: 15 },
                      opacity: { duration: 0.3 },
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.4,
                      },
                    }}
                  >
                    {/* Left floating item */}
                    <motion.span
                      className="absolute -left-12 text-2xl filter drop-shadow-sm select-none"
                      animate={{
                        x: isHovered ? -16 : 0,
                        y: [0, -8, 0],
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {soap.leftDecor}
                    </motion.span>

                    {/* Soap Image Card */}
                    <div
                      className={`relative h-20 w-48 overflow-hidden rounded-2xl bg-gradient-to-br ${soap.accent} border border-white/50 shadow-md shadow-bark/5 transition-shadow duration-300 ${
                        isHovered ? "shadow-lg shadow-forest/15" : ""
                      }`}
                    >
                      <img
                        src={soap.image}
                        alt={soap.name}
                        className="h-full w-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    {/* Right floating item */}
                    <motion.span
                      className="absolute -right-12 text-2xl filter drop-shadow-sm select-none"
                      animate={{
                        x: isHovered ? 16 : 0,
                        y: [0, 8, 0],
                        rotate: [0, -15, 15, 0],
                      }}
                      transition={{
                        duration: 3.5 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {soap.rightDecor}
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column — Features (Left Aligned) */}
          <div className="space-y-12 lg:col-span-4">
            {rightFeatures.map((feat) => (
              <motion.div
                key={feat.id}
                onMouseEnter={() => setHoveredSoapIndex(feat.soapIndex)}
                onMouseLeave={() => setHoveredSoapIndex(null)}
                className="group relative cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-start gap-2">
                  <LeafIcon className="h-5 w-5 text-terra transition-transform duration-500 group-hover:rotate-12" />
                  <h3 className="font-display text-2xl font-medium text-forest transition-colors duration-300 group-hover:text-terra">
                    {feat.title}
                  </h3>
                </div>
                <p className="mt-3 font-body text-sm leading-relaxed text-bark/70 lg:pr-6">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
