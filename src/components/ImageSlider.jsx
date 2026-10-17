import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    type: "image",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85",
    title: "PORTRAIT",
    color: "bg-[#ff4b32]",
    position: "object-center",
  },
  {
    type: "text",
    title: "光",
    subtitle: "LIGHT / 01",
    color: "bg-[#f16c66]",
  },
  {
    type: "image",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85",
    title: "PEOPLE",
    color: "bg-[#b8d9ed]",
    position: "object-center",
  },
  {
    type: "text",
    title: "Aa",
    subtitle: "TYPE / 04",
    color: "bg-[#3455f5]",
  },
  {
    type: "image",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85",
    title: "FASHION",
    color: "bg-[#ee482b]",
    position: "object-top",
  },
  {
    type: "text",
    title: "余白",
    subtitle: "SPACE / 05",
    color: "bg-[#f4f0dc]",
  },
  {
    type: "image",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=700&q=85",
    title: "ART",
    color: "bg-[#252525]",
    position: "object-center",
  },
  {
    type: "text",
    title: "No 02",
    subtitle: "EDITION",
    color: "bg-[#343434]",
  },
  {
    type: "image",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85",
    title: "STYLE",
    color: "bg-[#e9e8e3]",
    position: "object-center",
  },
];

const positions = [
  { x: -340, y: -10, rotate: -8, width: 120, height: 105, z: 1 },
  { x: -215, y: -105, rotate: -3, width: 145, height: 95, z: 2 },
  { x: -65, y: -145, rotate: -2, width: 155, height: 100, z: 3 },
  { x: 100, y: -95, rotate: 3, width: 130, height: 95, z: 4 },
  { x: 205, y: 10, rotate: 4, width: 150, height: 125, z: 5 },
  { x: 85, y: 125, rotate: -3, width: 150, height: 100, z: 4 },
  { x: -80, y: 145, rotate: 2, width: 140, height: 100, z: 3 },
  { x: -220, y: 105, rotate: -4, width: 115, height: 105, z: 2 },
  { x: 340, y: -100, rotate: 8, width: 110, height: 90, z: 1 },
];

export default function ImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="relative flex min-h-[620px] w-full flex-col overflow-hidden bg-[#f5f4f0] text-[#252525] sm:min-h-[700px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Top label */}
      <div className="absolute left-5 right-5 top-6 z-20 flex items-center justify-between sm:left-10 sm:right-10">
        <span className="text-[9px] font-semibold tracking-[0.3em]">
          CREATIVE ARCHIVE
        </span>

        <span className="hidden text-[9px] tracking-[0.25em] sm:block">
          IMAGE STUDIES — 2026
        </span>

        <span className="text-[9px] tracking-[0.2em]">01 — 09</span>
      </div>

      {/* Floating image collage */}
      <div className="relative mx-auto flex w-full flex-1 items-center justify-center">
        <div
          className="relative h-[460px] w-full max-w-[1100px] [perspective:1200px] sm:h-[520px]"
          aria-label="Creative image carousel"
        >
          {slides.map((slide, index) => {
            const slot =
              (index - activeIndex + slides.length) % slides.length;
            const pos = positions[slot];

            // Fade cards that are far back in the ring
            const isFar = slot === 0 || slot === positions.length - 1;

            return (
              <motion.button
                key={slide.title}
                type="button"
                aria-label={`Show ${slide.title}`}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className="absolute left-1/2 top-1/2 overflow-hidden text-left shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
                style={{
                  width: `min(${pos.width}px, 25vw)`,
                  height: `min(${pos.height}px, 23vw)`,
                  zIndex: pos.z,
                }}
                initial={false}
                animate={{
                  x: pos.x * 0.78,
                  y: pos.y * 0.78,
                  rotate: pos.rotate,
                  opacity: isFar ? 0.85 : 1,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 18,
                  mass: 0.9,
                  opacity: { duration: 0.5 },
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                {slide.type === "image" ? (
                  <div className="group relative h-full w-full">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      loading="lazy"
                      className={`h-full w-full object-cover ${slide.position} transition-transform duration-700 group-hover:scale-110`}
                    />
                    <span className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 text-[8px] tracking-[0.2em] text-white">
                      {slide.title}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`flex h-full w-full flex-col justify-between p-3 sm:p-4 ${slide.color} ${
                      slide.title === "余白" ? "text-[#282820]" : "text-white"
                    }`}
                  >
                    <span className="text-[8px] tracking-[0.2em] opacity-75">
                      {slide.subtitle}
                    </span>

                    <span
                      className={`${
                        slide.title === "No 02"
                          ? "text-3xl leading-none"
                          : slide.title === "Aa"
                            ? "text-5xl font-light leading-none"
                            : "text-4xl font-medium leading-none"
                      }`}
                    >
                      {slide.title}
                    </span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="relative z-20 flex items-end justify-between px-5 pb-7 sm:px-10 sm:pb-9">
        <div>
          <p className="mb-2 text-[9px] tracking-[0.3em] text-neutral-500">
            SELECTED WORKS
          </p>
          <h2 className="text-xl font-light tracking-tight sm:text-2xl">
            Visual experiments<span className="text-neutral-400">.</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="mr-2 text-xs tabular-nums text-neutral-500">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 transition hover:bg-black hover:text-white"
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] text-white transition hover:bg-[#ee5a46]"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}