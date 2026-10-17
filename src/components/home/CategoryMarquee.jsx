// src/components/home/CategoryMarquee.jsx

import React from "react";
import { CATEGORY_NAMES } from "../../data/homeData.js";

export default function CategoryMarquee() {
  return (
    <div className="relative border-y-2 border-juice-ink/10 bg-juice-ink py-3">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...CATEGORY_NAMES, ...CATEGORY_NAMES].map((name, i) => (
          <span
            key={i}
            className="mx-4 flex items-center gap-4 font-display text-sm font-semibold uppercase tracking-wider text-cream/80"
          >
            {name}
            <span className="text-juice-mango">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}