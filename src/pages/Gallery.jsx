import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

// Illustrated gallery tiles in brand colors. Swap these for real outlet /
// product photography whenever it's ready — just replace each tile's
// `photo` field with an <img> source and keep the same card shell.
const GALLERY = [
  { id: "g1", emoji: "🍓", title: "Strawberry Lassi", grad: "from-juice-red to-juice-berry", tall: true },
  { id: "g2", emoji: "🥭", title: "Mango Punch Smoothie", grad: "from-juice-mango to-juice-red" },
  { id: "g3", emoji: "🍦", title: "Caramel Crunch Scoop", grad: "from-juice-mango to-juice-mango-dark" },
  { id: "g4", emoji: "🥒", title: "Go Green Detox", grad: "from-juice-leaf to-juice-leaf-dark", tall: true },
  { id: "g5", emoji: "🍫", title: "Brownie Chocolate Shake", grad: "from-juice-ink to-juice-red-deep" },
  { id: "g6", emoji: "🍍", title: "Tropical Pineapple", grad: "from-juice-mango to-juice-leaf" },
  { id: "g7", emoji: "🍉", title: "Watermelon Slush", grad: "from-juice-red to-juice-red-dark", tall: true },
  { id: "g8", emoji: "🍪", title: "Oreo Banana Special", grad: "from-juice-ink to-juice-ink" },
  { id: "g9", emoji: "🍊", title: "Fresh Orange Juice", grad: "from-juice-mango-dark to-juice-red" },
  { id: "g10", emoji: "🥥", title: "Pinacolada", grad: "from-juice-leaf to-juice-mango" },
  { id: "g11", emoji: "🍒", title: "Falooda Special", grad: "from-juice-berry to-juice-red", tall: true },
  { id: "g12", emoji: "🌿", title: "Mint Margarita", grad: "from-juice-leaf-dark to-juice-leaf" }
];

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <div>
      <section className="container-brand pb-6 pt-10 text-center sm:pt-16">
        <Reveal>
          <p className="eyebrow">A taste, visually</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-juice-ink sm:text-5xl">
            Gallery
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-juice-ink/60">
            A peek at what's blending. Tap any tile for a closer look.
          </p>
        </Reveal>
      </section>

      <section className="container-brand pb-20">
        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
          {GALLERY.map((tile, i) => (
            <motion.button
              key={tile.id}
              layoutId={`tile-${tile.id}`}
              onClick={() => setActive(tile)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              whileHover={{ scale: 1.03 }}
              className={`group relative mb-4 block w-full overflow-hidden rounded-3xl bg-gradient-to-br text-left shadow-card ${tile.grad} ${
                tile.tall ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
              <span className="absolute inset-0 flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-110 sm:text-7xl">
                {tile.emoji}
              </span>
              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 font-display text-sm font-bold text-cream">
                {tile.title}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-juice-ink/70 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              layoutId={`tile-${active.id}`}
              onClick={(e) => e.stopPropagation()}
              className={`relative flex w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br p-16 shadow-2xl ${active.grad}`}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-cream hover:bg-white/30"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <span className="text-8xl">{active.emoji}</span>
              <p className="mt-6 text-center font-display text-xl font-bold text-cream">{active.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
