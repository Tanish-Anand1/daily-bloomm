"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import FadeUp from "@/components/ui/FadeUp";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  return (
    <section className="bg-blush/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <FadeUp className="text-center">
          <h2 className="font-display text-5xl italic text-forest md:text-6xl">
            Kind Words
          </h2>
        </FadeUp>

        {/* Featured quote */}
        <FadeUp className="mx-auto mb-20 mt-10 max-w-3xl text-center">
          <div className="-mb-8 font-display text-[120px] leading-none text-terra/30">
            &ldquo;
          </div>
          <blockquote className="font-script text-3xl italic leading-relaxed text-forest md:text-4xl">
            I&apos;ve tried every fancy brand. Nothing compares to the simplicity
            and effectiveness of Daily Bloomm.
          </blockquote>
          <p className="mt-6 font-body text-sm uppercase tracking-widest text-bark/60">
            — Priya M., New Delhi
          </p>
        </FadeUp>

        {/* Card grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: i === 0 ? -40 : i === 2 ? 40 : 0, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="rounded-2xl border border-bark/[0.08] bg-white p-8 shadow-sm"
            >
              <p className="text-sm text-terra">{"★".repeat(t.rating)}</p>
              <p className="mt-3 font-body text-base leading-relaxed text-bark/80">
                {t.review}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest font-body text-sm text-cream">
                  {initials(t.name)}
                </span>
                <div>
                  <p className="font-body text-sm font-medium text-ink">
                    {t.name}
                    <span className="font-normal text-bark/50"> · {t.city}</span>
                  </p>
                  <p className="font-body text-xs text-bark/40">via Instagram</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
