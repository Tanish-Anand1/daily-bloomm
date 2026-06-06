import { Instagram, MessageCircle, Mail } from "lucide-react";
import Logo from "@/components/Logo";

const columns = [
  {
    title: "Shop",
    links: ["All Soaps", "Floral", "Herbal", "Citrus", "Clay", "Gift Sets"],
  },
  {
    title: "Company",
    links: ["Our Story", "Ingredients", "Sustainability", "Blog"],
  },
  {
    title: "Connect",
    links: ["WhatsApp", "Instagram", "Email", "FAQ"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-cream">
              <Logo variant="horizontal" className="h-10 text-cream" />
            </div>
            <p className="mt-4 font-script text-lg italic text-cream/50">
              Nature distilled. Skin transformed.
            </p>
            <p className="mt-4 font-body text-sm">Made in Kanpur, India 🇮🇳</p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cream/70 transition hover:border-terra hover:text-terra"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=919838070818"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cream/70 transition hover:border-terra hover:text-terra"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cream/70 transition hover:border-terra hover:text-terra"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-sm font-semibold uppercase tracking-widest text-cream">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm transition hover:text-terra"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-center font-body text-xs text-cream/30 md:flex-row md:text-left font-body">
          <span>© 2026 Daily Bloomm. All rights reserved.</span>
          <span>
            Crafted with 🌿 love in India
            <a href="/admin" className="ml-1 opacity-[0.03] hover:opacity-20 transition-opacity cursor-default select-none text-[8px]" aria-hidden="true">.</a>
          </span>
          <span>Privacy · Terms · Shipping Policy</span>
        </div>
      </div>
    </footer>
  );
}
