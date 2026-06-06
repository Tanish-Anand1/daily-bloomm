"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import clsx from "clsx";
import { navLinks } from "@/lib/data";
import Logo from "@/components/Logo";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-bark/10 bg-cream/90 shadow-[0_2px_20px_rgba(0,0,0,0.04)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Left — brand */}
          <a href="#home" className="flex items-center gap-2">
            <Logo variant="horizontal" className="h-10 text-forest" />
          </a>

          {/* Center — links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className={clsx(
                  "font-body text-sm font-medium tracking-wide text-bark transition-colors hover:text-forest",
                  i === 0 && "underline decoration-terra/50 underline-offset-4"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-5 text-forest">
            <button aria-label="Search" className="transition-transform hover:scale-110">
              <Search size={18} />
            </button>
            <button
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
              className="relative transition-transform hover:scale-110"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-terra px-1 text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              aria-label="Open menu"
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-cream"
          >
            <button
              aria-label="Close menu"
              className="absolute right-6 top-6 text-forest"
              onClick={() => setOpen(false)}
            >
              <X size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="font-display text-3xl italic text-forest"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <CartDrawer />
    </>
  );
}
