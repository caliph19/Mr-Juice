// src/components/home/FeaturedSection.jsx

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Reveal from "../Reveal.jsx";
import { useApp } from "../../context/AppContext.jsx";
import { getFeaturedItems } from "../../data/homeData.js";

export default function FeaturedSection() {
  const featured = getFeaturedItems();
  const { addToCart } = useApp();

  return (
    <section className="relative overflow-hidden bg-juice-red/5 pb-32 pt-28 sm:pb-36 sm:pt-32 lg:pb-40 lg:pt-36">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-juice-red/10 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-juice-mango/10 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[20%] top-[35%] h-5 w-5 rounded-full bg-juice-red/20"
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[18%] top-[20%] h-4 w-4 rounded-full bg-juice-mango/30"
          animate={{ y: [0, 25, 0], x: [0, -15, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.8),transparent_55%)]" />
      </div>

      {/* Top wave */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block h-[70px] w-[calc(100%+1.3px)] sm:h-[90px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 L1200,0 L1200,55 C1080,110 1020,105 900,65 C780,25 700,25 600,65 C500,105 420,105 300,65 C180,25 120,25 0,75 Z"
            fill="#FFF6E4"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="container-brand relative z-20">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-juice-red px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-juice-red/20"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                Crowd favorites
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="max-w-2xl font-display text-4xl font-extrabold leading-[1] tracking-tight text-juice-ink sm:text-5xl lg:text-6xl"
              >
                Everyone orders
                <span className="text-juice-red"> these first.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 max-w-xl text-sm leading-7 text-juice-ink/55 sm:text-base"
              >
                Our most-loved drinks, shakes and desserts — freshly prepared
                and made to order.
              </motion.p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/menu"
                className="group inline-flex items-center gap-3 rounded-full bg-juice-ink px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-juice-red"
              >
                See full menu
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </Reveal>
        </div>

        {/* Product grid */}
        <div className="mt-14 grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(({ item, categoryName }, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[1.75rem] bg-white shadow-sm transition-shadow duration-500 hover:shadow-2xl"
              >
                <div className="relative h-[320px] overflow-hidden sm:h-[350px] lg:h-[380px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />

                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-juice-ink shadow-md backdrop-blur-md">
                    {categoryName}
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => addToCart(item)}
                    whileHover={{ scale: 1.12, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-5 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-juice-red text-2xl font-light text-white shadow-xl transition-colors duration-300 hover:bg-juice-ink"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    +
                  </motion.button>
                </div>

                <div className="px-5 py-5 sm:px-6 sm:py-6">
                  <h3 className="font-display text-xl font-extrabold leading-tight text-juice-ink transition-colors duration-300 group-hover:text-juice-red">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-lg font-extrabold text-juice-red">
                    Rs. {item.price}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block h-[70px] w-[calc(100%+1.3px)] sm:h-[90px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L1200,120 L1200,65 C1080,10 1020,15 900,55 C780,95 700,95 600,55 C500,15 420,15 300,55 C180,95 120,95 0,45 Z"
            fill="#FFF6E4"
          />
        </svg>
      </div>
    </section>
  );
}