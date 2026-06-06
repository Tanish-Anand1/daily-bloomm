"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { products as staticProducts, faqs } from "@/lib/data";
import FadeUp from "@/components/ui/FadeUp";

const contactCards = [
  {
    icon: "📱",
    title: "Order via WhatsApp",
    detail: "+91 98380 70818",
    badge: "Fastest response",
  },
  {
    icon: "📸",
    title: "Find us on Instagram",
    detail: "@dailybloomm",
    sub: "Daily updates & new drops",
  },
  {
    icon: "✉️",
    title: "Email us",
    detail: "hello@dailybloomm.in",
    sub: "Reply within 24 hours",
  },
];

export default function Contact() {
  const [products, setProducts] = useState(staticProducts);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error loading products in contact:", err));
  }, []);

  return (
    <section id="contact" className="bg-forest py-24 text-cream md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <FadeUp className="text-center">
          <h2 className="font-display text-5xl italic text-cream">Get in Touch</h2>
          <p className="mt-4 font-script text-xl italic text-cream/60">
            We&apos;d love to hear from you.
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left — options + FAQ */}
          <FadeUp>
            <div className="space-y-4">
              {contactCards.map((c) => (
                <div
                  key={c.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-6 transition hover:bg-white/[0.15]"
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-body font-medium text-cream">{c.title}</p>
                      {c.badge && (
                        <span className="rounded-full bg-terra px-3 py-1 font-body text-[10px] uppercase tracking-wide text-white">
                          {c.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-body text-sm text-cream/60">{c.detail}</p>
                    {c.sub && (
                      <p className="font-body text-xs text-cream/40">{c.sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ accordion */}
            <div className="mt-10">
              {faqs.map((faq, i) => (
                <div key={faq.q} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-body text-base text-cream">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-terra"
                    >
                      <Plus size={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 font-body text-sm leading-relaxed text-cream/60">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Right — form */}
          <FadeUp delay={0.15}>
            <form
              className="rounded-3xl border border-white/10 bg-white/[0.08] p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  aria-label="Name"
                  className="w-full rounded-xl border border-white/20 bg-white/10 p-4 font-body text-sm text-cream placeholder:text-cream/30 focus:border-terra focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  aria-label="Email"
                  className="w-full rounded-xl border border-white/20 bg-white/10 p-4 font-body text-sm text-cream placeholder:text-cream/30 focus:border-terra focus:outline-none"
                />
                <select
                  aria-label="Which soap interests you?"
                  defaultValue=""
                  className="w-full rounded-xl border border-white/20 bg-white/10 p-4 font-body text-sm text-cream focus:border-terra focus:outline-none [&>option]:text-ink"
                >
                  <option value="" disabled>
                    Which soap interests you?
                  </option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={4}
                  placeholder="Your message"
                  aria-label="Message"
                  className="w-full resize-none rounded-xl border border-white/20 bg-white/10 p-4 font-body text-sm text-cream placeholder:text-cream/30 focus:border-terra focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-terra py-4 font-body text-base font-medium tracking-wide text-white transition hover:bg-terra/80"
                >
                  Send Message
                </button>
                <p className="text-center font-body text-xs text-cream/40">
                  🔒 Your data is never shared or sold.
                </p>
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
