import React from "react";

const PALETTES = {
  red: { fill: "#E31C2B", text: "text-cream" },
  green: { fill: "#2FA84F", text: "text-cream" },
  ink: { fill: "#2B1210", text: "text-cream" }
};

// A hand-painted brush-stroke badge, matching the torn-paint headers used
// throughout Mr. Juice's original menu (DETOX / ICE CREAM / LASSI etc.)
export default function SplashLabel({ children, color = "red", className = "" }) {
  const palette = PALETTES[color] || PALETTES.red;
  return (
    <span className={`relative inline-block ${className}`}>
      <svg
        viewBox="0 0 320 90"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M12 24C8 12 28 4 48 6c26-4 52 2 78-2 30-4 58 4 86 0 24-3 46 2 66 8 10 3 16 10 14 20-2 9 6 15 2 24-4 10-16 12-28 14-40 6-80 2-120 4-32 2-64-2-96 2-16 2-30-4-32-18-2-10 4-16-8-24-6-4-10-12-10-18Z"
          fill={palette.fill}
        />
      </svg>
      <span
        className={`relative z-10 block px-7 py-3 text-center font-display text-lg font-extrabold uppercase tracking-wide sm:text-xl ${palette.text}`}
      >
        {children}
      </span>
    </span>
  );
}
