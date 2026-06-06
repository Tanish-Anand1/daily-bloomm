"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";

const stats = [
  { value: "500+", label: "Bars Sold" },
  { value: "12", label: "Botanicals Used" },
  { value: "100%", label: "Plastic-Free" },
];

export default function About() {
  return (
    <section id="story" className="bg-parch py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Left — visual */}
        <FadeUp className="relative flex justify-center">
          <motion.div
            className="relative flex h-[520px] w-[380px] max-w-full items-center justify-center overflow-hidden bg-gradient-to-br from-moss/20 to-blush border border-bark/10 shadow-lg"
            style={{ borderRadius: "200px 200px 24px 24px" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/founder.png"
              alt="Founder Mrs. Radha Gambhir of Daily Bloomm"
              className="h-full w-full object-cover object-[center_22%] scale-[1.25] transition-transform duration-700"
            />

            {/* Decorative accents */}
            <span className="absolute bottom-12 right-8 text-xl text-forest/30 z-10">✦</span>
          </motion.div>

          {/* Overlapping floating card */}
          <motion.div
            className="absolute bottom-4 left-2 rounded-2xl border border-bark/10 bg-white p-5 shadow-lg sm:left-0 z-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="font-display text-lg font-medium text-forest italic">
              Mrs. Radha Gambhir
            </h4>
            <p className="font-body text-[11px] uppercase tracking-wider text-terra font-semibold mt-0.5">
              Founder & Creator
            </p>
            <div className="my-2 h-px bg-bark/10 w-full" />
            <p className="font-body text-xs text-bark/60">
              🌿 Small Batches · Kanpur, India
            </p>
          </motion.div>
        </FadeUp>

        {/* Right — text */}
        <div>
          <FadeUp>
            <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-terra">
              Our Story
            </p>
            <h2 className="whitespace-pre-line font-display text-5xl italic leading-[1.05] text-forest">
              {"Made by hand.\nMade with Love & Care."}
            </h2>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-bark/70">
              <p>
                Daily Bloomm started in a home kitchen in Kanpur with a single
                bar of lavender soap and a dream to make clean beauty accessible.
                What began as a hobby quickly became a calling.
              </p>
              <p>
                Today, we make every bar by hand in small batches of 50, sourcing
                ingredients from organic farms we trust. We believe that what goes
                on your skin matters — and that nature always has the answer.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-bark/10 py-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl text-forest">{s.value}</p>
                  <p className="mt-1 font-body text-xs uppercase tracking-wide text-bark/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.35}>
            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full border border-forest px-8 py-4 font-body text-sm font-medium tracking-wide text-forest transition-all duration-300 hover:bg-forest hover:text-cream"
            >
              Read Our Full Story →
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
