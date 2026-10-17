// src/components/home/HeroSection.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

import { menuStats } from "../../data/menu.js";
import { outlets } from "../../data/outlets.js";
import { HERO_PRODUCTS } from "../../data/homeData.js";
import CountUp from "../CountUp.jsx";

import chocoShake from "../../images/chocoshake.png";
import milkBarryShake from "../../images/milkBarryShake.png";
import venella from "../../images/venella.png";
import stawbarry from "../../images/stawbarry.png";

const TYPING_TEXTS = [
  "Pure perfection.",
  "Simply creamy.",
  "Brain freeze.",
  "Zero regrets.",
  "Too good.",
  "Order now.",
];

export default function HeroSection() {
  const [selectedProduct, setSelectedProduct] = useState(HERO_PRODUCTS[0]);
  const [typingText, setTypingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypingText(currentText.substring(0, typingText.length + 1));
        if (typingText.length + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypingText(currentText.substring(0, typingText.length - 1));
        if (typingText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typingText, textIndex, isDeleting]);

  const handleProductSelect = (product) => setSelectedProduct(product);

  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-[#FFF8EC] text-[#25352B] sm:min-h-[720px]">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#b80603]"
          animate={{ x: [0, 25, 0], y: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-52 right-[-100px] h-[600px] w-[600px] rounded-full bg-[#DDF2D2]"
          animate={{ x: [0, -20, 0], y: [0, -25, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[45%] top-24 h-4 w-4 rounded-full bg-[#b80603]"
          animate={{ y: [0, -15, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-[10%] top-[20%] h-3 w-3 rounded-full bg-[#7BAE5B]"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,183,77,0.16),transparent_35%)]" />
      </div>

      {/* MAIN CONTENT */}
      <div className="container-brand relative z-10 grid min-h-[680px] items-center gap-10 py-20 sm:min-h-[720px] sm:py-16 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#25352B]/10 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-md"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#b80603]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#25352B]/70">
              Fresh • Natural • Delicious
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-tight text-[#25352B] sm:text-6xl lg:text-7xl xl:text-[82px]"
          >
            Fresh taste.
            <br />
            <span className="text-[#FFB347]">
              {typingText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                className="ml-1 inline-block"
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-7 max-w-xl text-base leading-7 text-[#25352B]/65 sm:text-lg"
          >
            Discover fresh juices, creamy shakes, delicious smoothies and
            indulgent ice creams — blended fresh and served exactly how you
            like them.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="/menu"
              className="group inline-flex items-center gap-3 rounded-full bg-[#B5121B] px-7 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#8F0D14]"
            >
              Explore Our Menu
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/menu"
              className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#1DA851]"
            >
              <MessageCircle size={18} />
              Start an order
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {[
              [outlets.length, "Outlets"],
              [menuStats.categories, "Categories"],
              [menuStats.items, "Menu Items", "+"],
            ].map(([num, label, suffix = ""]) => (
              <motion.div
                key={label}
                whileHover={{ y: -5 }}
                className="min-w-[105px] rounded-2xl border border-[#25352B]/10 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-md"
              >
                <p className="text-2xl font-extrabold text-[#25352B]">
                  <CountUp value={num} suffix={suffix} />
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#25352B]/50">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT PRODUCT SHOWCASE — unchanged */}
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex h-[480px] w-full max-w-[560px] items-center justify-center sm:h-[550px] lg:h-[600px]"
        >
          <motion.div
            className="absolute h-[300px] w-[300px] rounded-full bg-[#FFB347]/30 blur-3xl sm:h-[420px] sm:w-[420px]"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-[320px] w-[320px] rounded-[42%_58%_55%_45%/45%_40%_60%_55%] bg-[#b80603] sm:h-[430px] sm:w-[430px]"
            animate={{
              borderRadius: [
                "42% 58% 55% 45% / 45% 40% 60% 55%",
                "55% 45% 40% 60% / 55% 60% 40% 45%",
                "42% 58% 55% 45% / 45% 40% 60% 55%",
              ],
              rotate: [0, 4, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-[370px] w-[370px] rounded-full border-2 border-dashed border-[#25352B]/15 sm:h-[500px] sm:w-[500px]"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="relative z-20"
            animate={{ y: [0, -16, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute left-1/2 top-[85%] h-8 w-40 -translate-x-1/2 rounded-full bg-black/15 blur-xl"
              animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.15, 0.3] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <AnimatePresence mode="wait">
              <motion.img
                key={selectedProduct.id}
                src={selectedProduct.image}
                alt={selectedProduct.name}
                initial={{ opacity: 0, scale: 0.65, y: 30, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: -20, rotate: 8 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="h-[240px] w-[240px] object-contain drop-shadow-[0_30px_35px_rgba(0,0,0,0.25)] sm:h-[330px] sm:w-[330px]"
              />
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedProduct.id}-name`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-bold text-[#25352B] shadow-xl"
              >
                {selectedProduct.name}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <ProductThumb
            onClick={() => handleProductSelect(HERO_PRODUCTS[0])}
            src={chocoShake}
            alt="Chocolate Shake"
            className="left-[3%] top-[13%]"
            animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <ProductThumb
            onClick={() => handleProductSelect(HERO_PRODUCTS[1])}
            src={milkBarryShake}
            alt="Milk Berry Shake"
            className="right-[2%] top-[18%]"
            animate={{ y: [0, 14, 0], rotate: [4, -4, 4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <ProductThumb
            onClick={() => handleProductSelect(HERO_PRODUCTS[2])}
            src={venella}
            alt="Vanilla Ice Cream"
            className="bottom-[10%] left-[5%]"
            animate={{ y: [0, 10, 0], rotate: [3, -3, 3] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
          <ProductThumb
            onClick={() => handleProductSelect(HERO_PRODUCTS[3])}
            src={stawbarry}
            alt="Strawberry Ice Cream"
            className="bottom-[9%] right-[5%]"
            animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 4.3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.div
            className="absolute bottom-[12%] right-[18%] h-5 w-5 rounded-full bg-[#7BAE5B]"
            animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[30%] top-[8%] h-3 w-3 rounded-full bg-[#F28C28]"
            animate={{ y: [0, 15, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.8, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function ProductThumb({ onClick, src, alt, className, animate, transition }) {
  return (
    <motion.button
      onClick={onClick}
      className={`absolute z-30 flex h-[82px] w-[82px] items-center justify-center rounded-2xl border border-white/70 bg-white/80 p-3 shadow-xl backdrop-blur-md sm:h-[100px] sm:w-[100px] ${className}`}
      animate={animate}
      transition={transition}
      whileHover={{ scale: 1.15, rotate: 0 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={src} alt={alt} className="h-full w-full object-contain" />
    </motion.button>
  );
}