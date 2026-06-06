import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp call-to-action, fixed to the bottom-right corner,
 * with an animated ping pulse ring and hover tooltip.
 */
export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=919838070818"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 before:absolute before:inset-0 before:rounded-full before:bg-[#25D366] before:opacity-30 before:content-[''] before:[animation:ping_2s_cubic-bezier(0,0,0.2,1)_infinite] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
    >
      <MessageCircle className="relative h-6 w-6" strokeWidth={2} />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-full bg-forest px-3 py-1.5 font-body text-xs text-cream opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
        Chat with us on WhatsApp
      </span>
    </a>
  );
}
