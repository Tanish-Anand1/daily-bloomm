import { marqueeItems } from "@/lib/data";

export default function MarqueeBar() {
  // The track animates to translateX(-50%), so it must be exactly two
  // identical halves. Each half repeats the items twice to fill wide viewports.
  const half = [...marqueeItems, ...marqueeItems];
  const loop = [...half, ...half];

  return (
    <div className="relative w-full overflow-hidden bg-forest py-4">
      <div className="flex w-max animate-marquee items-center">
        {loop.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-6 font-body text-sm uppercase tracking-[0.15em] text-cream/70">
              {item}
            </span>
            <span className="text-terra" aria-hidden="true">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
