import React from "react";

const DEFAULT_FRUITS = ["🍓", "🥭", "🍊", "🍍", "🍉", "🥝", "🍒", "🍋"];

export default function FruitFloaters({ items = DEFAULT_FRUITS, className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {items.map((fruit, i) => {
        const top = `${(i * 37 + 8) % 90}%`;
        const left = `${(i * 53 + 4) % 92}%`;
        const size = 22 + ((i * 7) % 20);
        const duration = 5 + (i % 4);
        const delay = (i % 5) * 0.6;
        const rotate = (i % 2 === 0 ? 1 : -1) * (6 + (i % 3) * 3);
        return (
          <span
            key={i}
            className="absolute select-none opacity-70 drop-shadow-md"
            style={{
              top,
              left,
              fontSize: size,
              animation: `float ${duration}s ease-in-out ${delay}s infinite`,
              "--r": `${rotate}deg`
            }}
          >
            {fruit}
          </span>
        );
      })}
    </div>
  );
}
