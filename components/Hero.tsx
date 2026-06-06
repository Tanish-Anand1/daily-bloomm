"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const ease = [0.25, 0.1, 0.25, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { y: 28, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.7, delay, ease },
  };
}

function HerbSprig() {
  return (
    <svg width="56" height="80" viewBox="0 0 56 80" fill="none" aria-hidden="true">
      <path
        d="M28 78V14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {[22, 32, 42, 52, 62].map((y, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        return (
          <path
            key={y}
            d={`M28 ${y} q ${dir * 14} -6 ${dir * 18} -14`}
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
        );
      })}
      <circle cx="28" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" fill="none" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-cream pt-28"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full bg-blush/40 blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-moss/15 blur-[60px]" />
        <span className="absolute bottom-0 left-0 font-display text-[18vw] font-bold leading-none tracking-tighter text-forest/[0.04]">
          BLOOMM
        </span>
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-24 lg:grid-cols-12 lg:px-10">
        {/* Left column */}
        <div className="flex flex-col justify-center gap-6 lg:col-span-7 lg:pl-6">
          <motion.div {...fadeUp(0.1)}>
            <span className="inline-block rounded-full border border-terra/30 bg-terra/5 px-4 py-2 font-body text-xs uppercase tracking-[0.2em] text-terra">
              ✦&nbsp;&nbsp;Small Batch&nbsp;&nbsp;·&nbsp;&nbsp;Cold Press&nbsp;&nbsp;·&nbsp;&nbsp;Organic
            </span>
          </motion.div>

          <h1 className="font-display font-normal leading-[1.05] text-forest [font-size:clamp(56px,7vw,96px)]">
            <motion.span className="block italic" {...fadeUp(0.25)}>
              Nature
            </motion.span>
            <motion.span className="relative block italic" {...fadeUp(0.4)}>
              distille
              <span className="relative inline-block">
                d.
                <svg
                  className="absolute -bottom-2 left-0 w-full text-terra"
                  height="14"
                  viewBox="0 0 120 14"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8c20-7 44-7 64-2s38 5 52-2"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.span>
            <motion.span className="block italic" {...fadeUp(0.55)}>
              Skin
            </motion.span>
            <motion.span className="block italic text-forest/70" {...fadeUp(0.7)}>
              transformed.
            </motion.span>
          </h1>

          <motion.p
            className="max-w-md font-script text-xl italic leading-relaxed text-bark/70"
            {...fadeUp(0.85)}
          >
            Organic handcrafted soaps by Daily Bloomm. Made with ingredients sourced across India. No chemicals. Just plants, water, and care.
          </motion.p>

          <motion.div className="mt-2 flex flex-wrap gap-4" {...fadeUp(1.0)}>
            <a
              href="#soaps"
              className="rounded-full bg-forest px-8 py-4 font-body text-sm font-medium tracking-wide text-cream transition-all duration-300 hover:scale-[1.02] hover:bg-bark hover:shadow-lg"
            >
              Shop the Collection
            </a>
            <a
              href="#story"
              className="rounded-full border border-forest px-8 py-4 font-body text-sm font-medium tracking-wide text-forest transition-all duration-300 hover:bg-forest hover:text-cream"
            >
              Our Story
            </a>
          </motion.div>

          <motion.div
            className="mt-4 flex flex-wrap items-center gap-6"
            {...fadeUp(1.15)}
          >
            <div className="flex items-center gap-2">
              <span className="text-terra">★★★★★</span>
              <span className="text-sm text-bark/60">4.9 / 500+ happy customers</span>
            </div>
            <span className="hidden h-6 w-px bg-bark/20 sm:block" />
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  { i: "D", c: "bg-moss" },
                  { i: "B", c: "bg-terra" },
                  { i: "M", c: "bg-forest" },
                ].map((a, idx) => (
                  <span
                    key={`${a.i}-${idx}`}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream font-body text-xs text-cream ${a.c}`}
                  >
                    {a.i}
                  </span>
                ))}
              </div>
              <span className="text-sm text-bark/60">Join our community</span>
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <motion.div
          className="relative flex items-center justify-center lg:col-span-5"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          {/* Main floating blob with masked image */}
          <motion.div
            className="relative flex h-[520px] w-[420px] max-w-full items-center justify-center bg-gradient-to-br from-blush to-parch shadow-xl shadow-bark/10 overflow-hidden"
            style={{ borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%" }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/hero_lifestyle.png"
              alt="Daily Bloomm organic soaps landscape"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Top-left float card */}
          <motion.div
            className="absolute left-0 top-8 rounded-2xl border border-bark/10 bg-white/80 p-4 shadow-md backdrop-blur"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.8 }}
          >
            <p className="font-body text-sm font-medium text-forest">🌿 Cold Pressed</p>
            <p className="font-body text-xs text-bark/60">No heat. Maximum nutrients.</p>
          </motion.div>

          {/* Bottom-right float card */}
          <motion.div
            className="absolute bottom-10 right-0 rounded-2xl border border-bark/10 bg-white/80 p-4 shadow-md backdrop-blur"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 1.0 }}
          >
            <p className="font-body text-sm font-medium text-forest">🧪 Lab Tested</p>
            <p className="font-body text-xs text-bark/60">Dermatologist approved</p>
          </motion.div>

          {/* Botanical arch illustration */}
          <motion.div
            className="absolute -right-2 top-0 hidden rounded-t-full border border-forest/20 p-6 text-forest md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <HerbSprig />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-bark/40"
        >
          <ChevronDown size={20} />
        </motion.div>
        <span className="font-body text-xs uppercase tracking-widest text-bark/40">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}
