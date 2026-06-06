"use client";

import { ingredients } from "@/lib/data";
import FadeUp from "@/components/ui/FadeUp";

function MortarPestle() {
  return (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M14 30h36v3c0 9-8 17-18 17S14 42 14 33v-3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M10 30h44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M40 12 28 28"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="42" cy="11" r="4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function BadgeIcon({ type }: { type: "leaf" | "check" | "heart" }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "leaf")
    return (
      <svg {...common}>
        <path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-10-1 9-4 16-9 17Z" />
        <path d="M4 21c0-5 4-9 9-11" />
      </svg>
    );
  if (type === "check")
    return (
      <svg {...common}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M19 5c-2-2-5-2-7 0-2-2-5-2-7 0-2 2-2 5 0 7l7 7 7-7c2-2 2-5 0-7Z" />
    </svg>
  );
}

const promises = [
  { n: "01", text: "No SLS, SLES, or sulfates" },
  { n: "02", text: "No synthetic fragrance" },
  { n: "03", text: "No palm oil (we use coconut)" },
];

const trustBadges = [
  { type: "leaf" as const, label: "Vegan", sub: "100% plant-based" },
  { type: "heart" as const, label: "Cruelty Free", sub: "Never tested on animals" },
  { type: "check" as const, label: "Plastic Free", sub: "Compostable packaging" },
];

export default function Ingredients() {
  return (
    <section id="ingredients" className="bg-forest py-24 text-cream md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <FadeUp>
          <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-terra">
            What Goes In
          </p>
          <h2 className="whitespace-pre-line font-display text-5xl italic leading-[1.05] md:text-7xl">
            {"Only what belongs\non your skin."}
          </h2>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left — manifesto */}
          <FadeUp className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-3xl bg-white/[0.08] p-10">
              <div className="text-cream">
                <MortarPestle />
              </div>
              <h3 className="mt-6 font-display text-3xl italic text-cream">
                Our Promise
              </h3>
              <p className="mt-4 font-body text-base leading-relaxed text-cream/70">
                Every ingredient we use is food-grade, sustainably sourced, and
                ethically traded. We work with small farms across Kerala,
                Rajasthan, and the Himalayas.
              </p>
              <div className="mt-8 space-y-3">
                {promises.map((p) => (
                  <p key={p.n} className="font-body text-sm text-cream/60">
                    <span className="text-terra">{p.n}</span>
                    <span className="mx-2">·</span>
                    {p.text}
                  </p>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Right — ingredient grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
            {ingredients.map((ing, i) => (
              <FadeUp key={ing.name} delay={i * 0.06}>
                <div className="flex h-full cursor-pointer items-start gap-4 rounded-2xl bg-white/[0.08] p-5 transition hover:bg-white/[0.15]">
                  <span className="text-3xl">{ing.emoji}</span>
                  <div>
                    <p className="font-body text-base font-semibold text-cream">
                      {ing.name}
                    </p>
                    <p className="font-body text-xs uppercase tracking-wide text-terra">
                      {ing.origin}
                    </p>
                    <p className="mt-1 font-body text-sm text-cream/60">
                      {ing.benefit}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-20 border-t border-white/10 pt-10">
          <div className="flex flex-wrap justify-center gap-12">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2 text-cream">
                <BadgeIcon type={b.type} />
                <span className="font-body text-sm font-medium uppercase tracking-widest">
                  {b.label}
                </span>
                <span className="font-body text-xs text-cream/40">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
