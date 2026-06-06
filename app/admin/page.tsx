"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ArrowLeft, Save, X, Sparkles, AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  weight: string;
  scent: string;
  benefit: string;
  desc: string;
  bgFrom: string;
  bgTo: string;
  emoji: string;
  image: string;
}

const AVAILABLE_IMAGES = [
  { label: "Aqua Cool (Blue Hearts)", value: "/aqua_cool.png" },
  { label: "Aloe Green (Lime Heart/Plate)", value: "/aloe_green.png" },
  { label: "Rose Glow (Red Roses/Marble)", value: "/rose_glow.png" },
  { label: "Marigold Glow (Yellow/Slate)", value: "/marigold_glow.png" },
  { label: "Oatmeal Artisan (Oats/Cream)", value: "/oatmeal_soap.png" },
  { label: "Aloe Heart (Jade Green Heart)", value: "/aloe_heart.png" },
  { label: "Espresso Scrub (Coffee Exfoliant)", value: "/coffee_scrub.png" },
  { label: "Cherry Cake Slice (Novelty Cake)", value: "/cherry_cake.png" },
  { label: "Ducky Tub Soap (Novelty Duck)", value: "/ducky_soap.png" },
];

const CATEGORIES = ["Herbal", "Floral", "Milk", "Novelty"];

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form Modal States
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Herbal");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("110g");
  const [scent, setScent] = useState("");
  const [benefit, setBenefit] = useState("");
  const [desc, setDesc] = useState("");
  const [bgFrom, setBgFrom] = useState("#C8EBF0");
  const [bgTo, setBgTo] = useState("#80D2D8");
  const [emoji, setEmoji] = useState("🌿");
  const [image, setImage] = useState("/aqua_cool.png");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError("Failed to load products.");
      }
    } catch (err) {
      setError("Failed to fetch product catalog.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName("");
    setCategory("Herbal");
    setPrice("");
    setWeight("110g");
    setScent("");
    setBenefit("");
    setDesc("");
    setBgFrom("#C8EBF0");
    setBgTo("#80D2D8");
    setEmoji("🌿");
    setImage("/aqua_cool.png");
    setIsOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price.toString());
    setWeight(product.weight);
    setScent(product.scent);
    setBenefit(product.benefit);
    setDesc(product.desc);
    setBgFrom(product.bgFrom);
    setBgTo(product.bgTo);
    setEmoji(product.emoji);
    setImage(product.image);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const priceNum = parseFloat(price);
    if (!name || isNaN(priceNum) || priceNum <= 0 || !scent || !benefit || !desc) {
      setError("Please fill in all fields with valid information.");
      return;
    }

    let updatedList: Product[] = [];

    if (editingProduct) {
      // Edit mode
      updatedList = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name,
              category,
              price: priceNum,
              weight,
              scent,
              benefit,
              desc,
              bgFrom,
              bgTo,
              emoji,
              image,
            }
          : p
      );
    } else {
      // Add mode - generate new ID
      const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      const newProduct: Product = {
        id: newId,
        name,
        category,
        price: priceNum,
        weight,
        scent,
        benefit,
        desc,
        bgFrom,
        bgTo,
        emoji,
        image,
      };
      updatedList = [...products, newProduct];
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: updatedList }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setSuccess(editingProduct ? "Product updated successfully!" : "Product added successfully!");
        setIsOpen(false);
      } else {
        setError(data.error || "Failed to save product.");
      }
    } catch (err) {
      setError("Server error while saving product.");
    }
  };

  const handleDelete = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setError(null);
    setSuccess(null);

    const updatedList = products.filter((p) => p.id !== productId);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: updatedList }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setSuccess("Product removed successfully!");
      } else {
        setError(data.error || "Failed to delete product.");
      }
    } catch (err) {
      setError("Server error while deleting product.");
    }
  };

  return (
    <main className="min-h-screen bg-parch text-ink pb-20">
      {/* Top Bar */}
      <header className="border-b border-bark/10 bg-white/80 py-4 shadow-sm backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <a href="/" className="flex h-9 w-9 items-center justify-center rounded-full border border-bark/10 text-forest hover:bg-cream/40 transition">
              <ArrowLeft size={16} />
            </a>
            <Logo variant="horizontal" className="h-8 text-forest" />
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-forest/10 px-3 py-1 font-body text-xs font-semibold text-forest uppercase tracking-wider">
              Founder Dashboard
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 mt-10 lg:px-10">
        {/* Alerts */}
        {error && (
          <div className="mb-6 flex items-center gap-2.5 rounded-2xl bg-red-50 p-4 font-body text-sm text-red-800 border border-red-200">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 flex items-center gap-2.5 rounded-2xl bg-emerald-50 p-4 font-body text-sm text-emerald-800 border border-emerald-200">
            <Sparkles size={18} />
            <span>{success}</span>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl italic text-forest leading-none">Manage Soaps</h1>
            <p className="mt-2 font-body text-sm text-bark/60">
              Add new creations, adjust prices, edit scents or benefits, and keep your store updated.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 font-body text-sm font-semibold text-cream shadow-md transition hover:bg-bark hover:scale-[1.01]"
          >
            <Plus size={16} />
            Add New Soap
          </button>
        </div>

        {/* List View */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest" />
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-bark/20 bg-white p-12 text-center">
            <p className="font-body text-bark/60">No products found. Click Add New Soap to begin!</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-bark/10 bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left font-body text-sm">
                <thead>
                  <tr className="border-b border-bark/10 bg-cream/50 text-[11px] uppercase tracking-wider text-bark/70 font-semibold">
                    <th className="p-4 pl-6">Soap</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Scent / Benefit</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bark/5">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-cream/20 transition-colors">
                      {/* Image & Name */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl overflow-hidden border border-bark/10 bg-cream shrink-0">
                            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <span className="font-display font-medium text-ink block text-base leading-none">
                              {p.name} {p.emoji}
                            </span>
                            <span className="text-[11px] text-bark/50 font-medium block mt-1">{p.weight}</span>
                          </div>
                        </div>
                      </td>
                      {/* Category */}
                      <td className="p-4">
                        <span className="inline-block rounded-full bg-forest/5 border border-forest/10 px-2.5 py-0.5 text-xs text-forest uppercase font-medium">
                          {p.category}
                        </span>
                      </td>
                      {/* Price */}
                      <td className="p-4">
                        <span className="font-display font-medium text-base text-forest">₹{p.price}</span>
                      </td>
                      {/* Scent & Benefit */}
                      <td className="p-4 max-w-xs truncate">
                        <span className="block font-semibold text-ink/80 text-xs">{p.scent}</span>
                        <span className="block text-xs text-bark/60 truncate mt-0.5">{p.benefit}</span>
                      </td>
                      {/* Actions */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            title="Edit"
                            className="p-2 text-bark hover:text-forest hover:bg-forest/5 rounded-full transition"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            title="Delete"
                            className="p-2 text-bark hover:text-red-600 hover:bg-red-50 rounded-full transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/65 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-bark/10 bg-white p-6 shadow-2xl z-10 md:p-8">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-cream hover:bg-bark/10 text-bark transition"
            >
              <X size={16} />
            </button>
            <h2 className="font-display text-2.5xl text-forest italic mb-6">
              {editingProduct ? "Edit Ritual Bar" : "Create New Soap Creation"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4 font-body text-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Soap Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lavender Dream"
                    className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 299"
                    className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                {/* Weight */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Weight</label>
                  <input
                    type="text"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 110g"
                    className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                {/* Emoji */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Emoji Icon</label>
                  <input
                    type="text"
                    required
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                    placeholder="e.g. 🌹"
                    className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              {/* Scent & Benefit */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Scent Notes</label>
                  <input
                    type="text"
                    required
                    value={scent}
                    onChange={(e) => setScent(e.target.value)}
                    placeholder="e.g. Calming Lavender · Vanilla"
                    className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Target Benefit</label>
                  <input
                    type="text"
                    required
                    value={benefit}
                    onChange={(e) => setBenefit(e.target.value)}
                    placeholder="e.g. For sensitive & dry skin"
                    className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Organic extracts + lye blend that heals skin..."
                  className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none resize-none"
                />
              </div>

              {/* Image Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Soap Image Catalog Photo</label>
                <select
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none"
                >
                  {AVAILABLE_IMAGES.map((img) => (
                    <option key={img.value} value={img.value}>
                      {img.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 font-body text-[11px] text-bark/50">
                  Select among the custom catalog images you uploaded and got enhanced.
                </p>
              </div>

              {/* Background styling for quick card view */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Gradient Start Hex</label>
                  <input
                    type="text"
                    required
                    value={bgFrom}
                    onChange={(e) => setBgFrom(e.target.value)}
                    placeholder="e.g. #F5D0D0"
                    className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-bark/60 mb-1.5">Gradient End Hex</label>
                  <input
                    type="text"
                    required
                    value={bgTo}
                    onChange={(e) => setBgTo(e.target.value)}
                    placeholder="e.g. #E8A8A8"
                    className="w-full rounded-xl border border-bark/20 bg-cream/10 p-3 text-ink focus:border-forest focus:outline-none"
                  />
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-bark/10 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-bark/20 px-6 py-3 font-semibold text-bark hover:bg-cream/40 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-forest px-8 py-3 font-semibold text-cream shadow-md transition hover:bg-bark"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
