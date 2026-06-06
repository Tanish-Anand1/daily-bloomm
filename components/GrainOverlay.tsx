export default function GrainOverlay() {
  return (
    <>
      {/* SVG grain filter definition */}
      <svg
        className="pointer-events-none fixed h-0 w-0"
        aria-hidden="true"
        focusable="false"
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Fixed grain texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035]"
        style={{ filter: "url(#grain)", background: "transparent" }}
      />
    </>
  );
}
