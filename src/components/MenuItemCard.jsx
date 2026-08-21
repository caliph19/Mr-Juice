import React from "react";
import { motion } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function MenuItemCard({ item, categoryName, categoryImage, index = 0 }) {
  const { addToCart, orderSingleItem } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.04 }}
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-juice-red/10 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-juice-red/30 hover:shadow-card"
    >
      <div>
        <div className="relative h-44 w-full overflow-hidden bg-juice-red/5">
          <img
            src={item.image || categoryImage}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-juice-red shadow-sm">
            Rs. {item.price}
          </span>
        </div>

        <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-base font-bold leading-snug text-juice-ink">
            {item.name}
          </h4>

        </div>
        {item.desc && (
          <p className="mt-1.5 text-sm leading-relaxed text-juice-ink/60">{item.desc}</p>
        )}
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2 p-4 pt-0">
        <button
          onClick={() => addToCart(item, categoryName)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-juice-red/5 px-3 py-2 font-display text-xs font-semibold text-juice-ink transition hover:bg-juice-red hover:text-white"
        >
          <Plus size={14} /> Add
        </button>
        <button
          onClick={() => orderSingleItem(item, categoryName)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-juice-leaf px-3 py-2 font-display text-xs font-semibold text-cream transition hover:bg-juice-leaf-dark"
        >
          <MessageCircle size={14} /> Order
        </button>
      </div>
    </motion.div>
  );
}
