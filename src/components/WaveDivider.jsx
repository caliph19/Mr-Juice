import React from "react";

export default function WaveDivider({ flip = false, color = "#FFF6E4", className = "" }) {
  return (
    <div className={`pointer-events-none -mb-1 w-full overflow-hidden ${className} ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="h-16 w-full sm:h-24">
        <path
          d="M0,40 C240,100 480,0 720,30 C960,60 1200,100 1440,40 L1440,100 L0,100 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
