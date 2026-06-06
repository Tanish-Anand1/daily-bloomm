"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Sparkles, Droplets, ShieldCheck } from "lucide-react";
import clsx from "clsx";
import { products as staticProducts, productCategories, Product } from "@/lib/data";
import FadeUp from "@/components/ui/FadeUp";
import { useCart } from "@/context/CartContext";

export default function Products() {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [active, setActive] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section id="soaps" className="bg-parch py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <FadeUp className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-terra">
            The Collection
          </p>
          <h2 className="font-display text-5xl italic text-forest md:text-6xl">
            Every bar, a ritual.
          </h2>
          <p className="mt-4 font-script text-xl italic text-bark/70">
            Each soap is cold-process crafted, botanically infused, and slow-cured
            for 6 weeks.
          </p>
        </FadeUp>

        {/* Filter pills */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {productCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={clsx(
                "cursor-pointer rounded-full px-5 py-2 font-body text-sm font-medium transition",
                active === cat
                  ? "bg-forest text-cream"
                  : "border border-bark/20 bg-white text-bark hover:border-forest"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => setSelectedProduct(p)}
                className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-bark/[0.08] bg-white transition-all duration-500 hover:-translate-y-2 hover:border-forest/30 hover:shadow-2xl hover:shadow-forest/10"
              >
                {/* Image area */}
                <div
                  className="relative h-64 overflow-hidden bg-cover bg-center"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 font-body text-xs font-medium uppercase tracking-wide text-forest backdrop-blur-sm">
                    {p.category}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 font-body text-xs font-medium uppercase tracking-wide text-forest backdrop-blur-sm">
                    {p.weight}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {p.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 font-body text-[11px] uppercase tracking-wide text-bark/60">
                    <span>{p.scent}</span>
                    <span className="h-1 w-1 rounded-full bg-bark/40" />
                    <span>{p.benefit}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 font-body text-sm leading-relaxed text-bark/70">
                    {p.desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-2xl text-forest font-medium">
                      ₹{p.price}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                      className="flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 font-body text-sm text-cream transition hover:bg-bark"
                    >
                      <ShoppingCart size={14} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-ink/65 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative grid w-full max-w-3xl overflow-hidden rounded-[32px] border border-bark/10 bg-cream shadow-2xl md:grid-cols-2"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-forest shadow-md transition hover:bg-white focus:outline-none"
              >
                <X size={20} />
              </button>

              {/* Left Column: Image */}
              <div className="relative h-64 w-full md:h-full">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent md:bg-gradient-to-r" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-wider text-forest shadow-sm">
                  {selectedProduct.category} · {selectedProduct.weight}
                </span>
              </div>

              {/* Right Column: Info */}
              <div className="flex flex-col justify-between p-8 md:p-10">
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-terra font-semibold">
                    Organic Ritual Bar
                  </span>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-ink md:text-4xl">
                    {selectedProduct.name}
                  </h2>
                  
                  {/* Quick features */}
                  <div className="mt-4 space-y-2.5 border-y border-bark/10 py-4 font-body text-sm text-bark/85">
                    <div className="flex items-center gap-2.5">
                      <Droplets size={16} className="text-forest" />
                      <span><strong>Scent:</strong> {selectedProduct.scent}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Sparkles size={16} className="text-forest" />
                      <span><strong>Best For:</strong> {selectedProduct.benefit}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck size={16} className="text-forest" />
                      <span><strong>Process:</strong> 6-week cured cold process</span>
                    </div>
                  </div>

                  <p className="mt-5 font-body text-sm leading-relaxed text-bark/70">
                    {selectedProduct.desc}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-bark/10 pt-6">
                  <div className="flex flex-col">
                    <span className="font-body text-[10px] uppercase tracking-wider text-bark/50">Price</span>
                    <span className="font-display text-3xl text-forest font-semibold">
                      ₹{selectedProduct.price}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex items-center gap-3 rounded-full bg-forest px-8 py-4 font-body text-sm font-semibold tracking-wider text-cream shadow-lg shadow-forest/15 transition-all duration-300 hover:scale-[1.02] hover:bg-bark hover:shadow-xl"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
