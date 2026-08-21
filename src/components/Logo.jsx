import React from "react";

export default function Logo({ size = "md", withTagline = false, dark = false }) {
  const dims = size === "sm" ? 40 : size === "lg" ? 68 : 52;
  return (
    <div className="flex items-center gap-3">
      <svg
        width={dims}
        height={dims}
        viewBox="0 0 64 64"
        className="shrink-0 drop-shadow-[2px_3px_0_rgba(43,18,16,0.35)]"
      >
        <rect width="64" height="64" rx="18" fill="#E31C2B" />
        <rect width="64" height="64" rx="18" fill="url(#logoShine)" opacity="0.5" />
        <path d="M18 22h28l-3.4 27.2A4.5 4.5 0 0 1 38.1 53H25.9a4.5 4.5 0 0 1-4.5-3.8L18 22Z" fill="#FFF6E4" />
        <path d="M18 22h28l-1.1 6.4H19.1L18 22Z" fill="#FFB627" />
        <path d="M42 10.5c5 2 6.4 7 2.7 12-3.7-1-6.3-5-2.7-12Z" fill="#2FA84F" />
        <rect x="35.4" y="6.5" width="3.2" height="16" rx="1.6" fill="#2FA84F" transform="rotate(20 37 14.5)" />
        <defs>
          <linearGradient id="logoShine" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="leading-tight">
        <span
          className={`block font-display text-xl font-extrabold tracking-tight sm:text-2xl ${
            dark ? "text-cream" : "text-juice-ink"
          }`}
        >
          Mr.<span className="text-juice-red">Juice</span>
        </span>
        {withTagline && (
          <span className={`block font-script text-sm sm:text-base ${dark ? "text-cream/80" : "text-juice-ink/70"}`}>
            Smoothy &amp; slushy master
          </span>
        )}
      </div>
    </div>
  );
}
