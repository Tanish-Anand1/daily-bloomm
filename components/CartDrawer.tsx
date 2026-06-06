"use client";

import React, { useState } from "react";
import { motion as dMotion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartDrawer() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    removeItem,
    clearCart,
    subtotal,
    shipping,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  // Checkout Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic frontend validations before hitting API
    if (!name.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      setError("Please fill in all delivery details.");
      setLoading(false);
      return;
    }

    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    if (pincode.replace(/\D/g, "").length !== 6) {
      setError("Please enter a valid 6-digit Indian PIN code.");
      setLoading(false);
      return;
    }

    try {
      const itemsPayload = cartItems.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: itemsPayload,
          customer: {
            name,
            phone,
            address,
            pincode,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Something went wrong during checkout.");
      }

      // Order placed successfully!
      // Clear local states
      clearCart();
      setIsCartOpen(false);
      
      // Reset form
      setName("");
      setPhone("");
      setAddress("");
      setPincode("");

      // Redirect user to WhatsApp Click-to-Chat URL
      if (typeof window !== "undefined") {
        const opened = window.open(data.whatsappUrl, "_blank");
        if (!opened) {
          // Fallback if popup blocker hits
          window.location.href = data.whatsappUrl;
        }
      }
    } catch (err: any) {
      console.error("Checkout failed:", err);
      setError(err.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <dMotion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity"
          />

          <div className="pointer-events-none absolute inset-y-0 right-0 flex max-w-full pl-10">
            {/* Sliding Panel */}
            <dMotion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="pointer-events-auto w-screen max-w-md bg-cream shadow-2xl flex flex-col h-full border-l border-bark/10"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-bark/10 px-6 py-5">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-forest" />
                  <h2 className="font-display text-xl font-semibold text-ink">
                    Your Shopping Bag
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full p-1.5 text-bark/60 hover:bg-bark/5 hover:text-ink transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  /* Empty state */
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/5 text-forest/70 mb-4">
                      <ShoppingBag size={28} />
                    </div>
                    <p className="font-display text-lg font-semibold text-ink">
                      Your bag is empty
                    </p>
                    <p className="mt-1 font-body text-sm text-bark/60 max-w-[200px]">
                      Add some organic bars to begin your skincare ritual.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 rounded-full bg-forest px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wider text-cream hover:bg-bark transition"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Item list */}
                    <div className="space-y-4">
                      <h3 className="font-body text-xs uppercase tracking-widest text-bark/40 font-semibold border-b border-bark/5 pb-2">
                        Items
                      </h3>
                      <div className="divide-y divide-bark/5">
                        {cartItems.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-start gap-4 py-3 first:pt-0 last:pb-0"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-16 w-16 rounded-xl object-cover border border-bark/10 bg-white"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-display text-sm font-semibold text-ink truncate">
                                {item.product.name}
                              </h4>
                              <p className="font-body text-xs text-bark/60">
                                {item.product.weight} · {item.product.scent}
                              </p>
                              
                              {/* Quantity Editor */}
                              <div className="flex items-center gap-2.5 mt-2">
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="rounded-full border border-bark/20 p-1 text-bark/60 hover:border-forest hover:text-forest transition"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="font-body text-xs font-medium text-ink min-w-[12px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => addToCart(item.product)}
                                  className="rounded-full border border-bark/20 p-1 text-bark/60 hover:border-forest hover:text-forest transition"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-col items-end justify-between h-16">
                              <span className="font-body text-sm font-semibold text-forest">
                                ₹{item.product.price * item.quantity}
                              </span>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-bark/40 hover:text-red-500 transition"
                                aria-label="Remove item"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 border-t border-bark/10 pt-5">
                      <h3 className="font-body text-xs uppercase tracking-widest text-bark/40 font-semibold">
                        Delivery Details
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full name"
                            className="w-full rounded-xl border border-bark/10 bg-white p-3 font-body text-sm text-ink placeholder:text-bark/30 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                          />
                        </div>
                        
                        <div>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="WhatsApp Number (10 digits)"
                            className="w-full rounded-xl border border-bark/10 bg-white p-3 font-body text-sm text-ink placeholder:text-bark/30 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                          />
                        </div>

                        <div>
                          <textarea
                            required
                            rows={3}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Shipping Address (Street, House No, Landmark)"
                            className="w-full resize-none rounded-xl border border-bark/10 bg-white p-3 font-body text-sm text-ink placeholder:text-bark/30 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            required
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="6-digit Pincode"
                            className="w-full rounded-xl border border-bark/10 bg-white p-3 font-body text-sm text-ink placeholder:text-bark/30 focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                          />
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* Footer Checkout Panel */}
              {cartItems.length > 0 && (
                <div className="border-t border-bark/10 bg-white p-6 space-y-4">
                  {/* Error display */}
                  {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-xs text-red-600 font-body">
                      ⚠️ {error}
                    </div>
                  )}

                  {/* Summary */}
                  <div className="space-y-2 font-body text-sm text-bark/75">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-ink">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold text-ink">
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[10px] text-terra leading-none">
                        Add ₹{500 - subtotal} more for FREE shipping!
                      </p>
                    )}
                    <div className="flex justify-between border-t border-bark/5 pt-2 text-base text-ink font-semibold">
                      <span>Total</span>
                      <span className="text-forest">₹{total}</span>
                    </div>
                  </div>

                  {/* WhatsApp redirect button */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-forest py-4 font-body text-sm font-semibold tracking-wider text-cream shadow-lg shadow-forest/15 transition-all duration-300 hover:bg-bark hover:shadow-xl hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-cream" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Redirecting to WhatsApp...
                      </span>
                    ) : (
                      <>
                        Place Order via WhatsApp
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </dMotion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
