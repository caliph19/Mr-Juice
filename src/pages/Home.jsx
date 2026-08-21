import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  Leaf,
  Clock,
  MapPin,
} from "lucide-react";

import Reveal from "../components/Reveal.jsx";
import SplashLabel from "../components/SplashLabel.jsx";
import WaveDivider from "../components/WaveDivider.jsx";
import MenuItemCard from "../components/MenuItemCard.jsx";
import { useApp } from "../context/AppContext.jsx";

import { menu, menuStats } from "../data/menu.js";
import { outlets, social } from "../data/outlets.js";


import realFruitImage from "../images/real-fruit.png";
import flavorsImage from "../images/flavors.png";
import outletsImage from "../images/outlets.jpg";
import whatsappImage from "../images/whatsapp-order.png";


import brownieCaramel from "../images/browniecaramelshake.png";
import dryFruitShake from "../images/dryfruitshake.png";
import morningDelight from "../images/morningsmoothies.png";
import pineappleShake from "../images/pineapple.png";
import enjirDates from "../images/enjirdates.png";
import chocolateIceCream from "../images/chocolateicecream.png";



// ======================================================
// HERO PRODUCT IMAGES
// ======================================================

import chocoShake from "../images/chocoshake.png";
import milkBarryShake from "../images/milkBarryShake.png";
import venella from "../images/venella.png";
import stawbarry from "../images/stawbarry.png";


// ======================================================
// CATEGORY DATA
// ======================================================

const CATEGORY_NAMES = menu.map((c) => c.name);

// ======================================================
// HERO PRODUCTS
// ======================================================

const HERO_PRODUCTS = [
  {
    id: 1,
    name: "Choco Shake",
    type: "Shake",
    image: chocoShake,
    position: "top-left",
  },
  {
    id: 2,
    name: "Milk Berry Shake",
    type: "Shake",
    image: milkBarryShake,
    position: "top-right",
  },
  {
    id: 3,
    name: "Vanilla Ice Cream",
    type: "Ice Cream",
    image: venella,
    position: "bottom-left",
  },
  {
    id: 4,
    name: "Strawberry Ice Cream",
    type: "Ice Cream",
    image: stawbarry,
    position: "bottom-right",
  },
];

// ======================================================
// FEATURED ITEMS
// ======================================================

const FEATURED = [
  {
    catId: "brownie-shakes",
    name: "Brownie Caramel",
    price: 400,
    image: brownieCaramel,
  },
  {
    catId: "milkshake",
    name: "Dryfruit Shake",
    price: 450,
    image: dryFruitShake,
  },
  {
    catId: "smoothies",
    name: "Morning Delight",
    price: 400,
    image: morningDelight,
  },
  {
    catId: "ice-cream-shakes",
    name: "Pineapple Shake",
    price: 350,
    image: pineappleShake,
  },
  {
    catId: "cocktails",
    name: "Enjir Dates",
    price: 450,
    image: enjirDates,
  },
  {
    catId: "ice-cream",
    name: "Chocolate",
    price: 250,
    image: chocolateIceCream,
  },
];


const WHY_US_DATA = [
  {
    id: 1,
    title: "Real fruit, daily",
    text: "Sourced and blended fresh every morning — no syrups pretending to be fruit.",
    image: realFruitImage,
  },
  {
    id: 2,
    title: "80+ flavors",
    text: "From refreshing juices and creamy shakes to smoothies and delicious ice creams, there is something for every mood.",
    image: flavorsImage,
  },
  {
    id: 3,
    title: "6 outlets",
    text: "Serving fresh and delicious drinks and desserts across our growing network of outlets.",
    image: outletsImage,
  },
  {
    id: 4,
    title: "WhatsApp ordering",
    text: "Pick your outlet, send your order on WhatsApp, and enjoy your favorite drinks and desserts without the wait.",
    image: whatsappImage,
  },
];




// ======================================================
// GET FEATURED ITEMS
// ======================================================

function getFeaturedItems() {
  return FEATURED.map(({ catId, name, price, image }) => {
    const cat = menu.find((c) => c.id === catId);

    const item = cat?.items.find((i) => i.name === name);

    return item
      ? {
          item: {
            ...item,
            price,
            image,
          },
          categoryName: cat.name,
        }
      : null;
  }).filter(Boolean);
}
// ======================================================
// HOME COMPONENT
// ======================================================

export default function Home() {
  const featured = getFeaturedItems();

  const { addToCart } = useApp();

  // ====================================================
  // SELECTED HERO PRODUCT
  // ====================================================

  const [selectedProduct, setSelectedProduct] = useState(HERO_PRODUCTS[0]);

  // ====================================================
  // TYPING TEXT
  // ====================================================

  const typingTexts = [
    "Pure perfection.",
    "Simply creamy.",
    "Brain freeze.",
    "Zero regrets.",
    "Too good.",
    "Order now.",
  ];

  const [typingText, setTypingText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // ====================================================
  // TYPING ANIMATION
  // ====================================================

  useEffect(() => {
    const currentText = typingTexts[textIndex];

    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypingText(currentText.substring(0, typingText.length + 1));

        if (typingText.length + 1 === currentText.length) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1800);
        }
      } else {
        setTypingText(currentText.substring(0, typingText.length - 1));

        if (typingText.length === 0) {
          setIsDeleting(false);

          setTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typingText, textIndex, isDeleting]);

  // ====================================================
  // SELECT PRODUCT
  // ====================================================

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div>
      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="
          relative
          min-h-[680px]
          overflow-hidden
          bg-[#FFF8EC]
          text-[#25352B]
          sm:min-h-[720px]
        "
      >
        {/* ==================================================
            BACKGROUND
        ================================================== */}

        <div className="absolute inset-0 overflow-hidden">
          {/* Large left blob */}

          <motion.div
            className="
              absolute
              -left-40
              -top-40
              h-[520px]
              w-[520px]
              rounded-full
              bg-[#b80603]
            "
            animate={{
              x: [0, 25, 0],
              y: [0, 20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Large right blob */}

          <motion.div
            className="
              absolute
              -bottom-52
              right-[-100px]
              h-[600px]
              w-[600px]
              rounded-full
              bg-[#DDF2D2]
            "
            animate={{
              x: [0, -20, 0],
              y: [0, -25, 0],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Decorative circle */}

          <motion.div
            className="
              absolute
              left-[45%]
              top-24
              h-4
              w-4
              rounded-full
              bg-[#b80603]
            "
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="
              absolute
              right-[10%]
              top-[20%]
              h-3
              w-3
              rounded-full
              bg-[#7BAE5B]
            "
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          {/* Radial glow */}

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_70%_50%,rgba(255,183,77,0.16),transparent_35%)]
            "
          />
        </div>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div
          className="
            container-brand
            relative
            z-10
            grid
            min-h-[680px]
            items-center
            gap-10
            py-12
            sm:min-h-[720px]
            sm:py-16
            lg:grid-cols-[1fr_0.9fr]
            lg:py-20
          "
        >
          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-20"
          >
            {/* Badge */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#25352B]/10
                bg-white/70
                px-4
                py-2
                shadow-sm
                backdrop-blur-md
              "
            >
              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-[#b80603]
                "
              />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#25352B]/70
                "
              >
                Fresh • Natural • Delicious
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="
                max-w-3xl
                text-5xl
                font-extrabold
                leading-[0.95]
                tracking-tight
                text-[#25352B]
                sm:text-6xl
                lg:text-7xl
                xl:text-[82px]
              "
            >
              Fresh taste.
              <br />
              <span className="text-[#FFB347]">
                {typingText}

                <motion.span
                  animate={{
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                  }}
                  className="ml-1 inline-block"
                >
                  {/* | */}
                </motion.span>
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.25,
              }}
              className="
                mt-7
                max-w-xl
                text-base
                leading-7
                text-[#25352B]/65
                sm:text-lg
              "
            >
              Discover fresh juices, creamy shakes, delicious smoothies and
              indulgent ice creams — blended fresh and served exactly how you
              like them.
            </motion.p>

            {/* Buttons */}
            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {/* Explore Our Menu */}
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

              {/* Order on WhatsApp */}
              <a
                href={social.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#1DA851]"
              >
                <MessageCircle size={18} />
                Order on WhatsApp
              </a>
            </motion.div>

            {/* Stats */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
              className="
                mt-12
                flex
                flex-wrap
                gap-3
              "
            >
              {[
                [`${outlets.length}`, "Outlets"],
                [`${menuStats.categories}`, "Categories"],
                [`${menuStats.items}+`, "Menu Items"],
              ].map(([num, label]) => (
                <motion.div
                  key={label}
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    min-w-[105px]
                    rounded-2xl
                    border
                    border-[#25352B]/10
                    bg-white/70
                    px-5
                    py-4
                    shadow-sm
                    backdrop-blur-md
                  "
                >
                  <p
                    className="
                      text-2xl
                      font-extrabold
                      text-[#25352B]
                    "
                  >
                    {num}
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-[#25352B]/50
                    "
                  >
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ==================================================
              RIGHT PRODUCT SHOWCASE
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 80,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              mx-auto
              flex
              h-[480px]
              w-full
              max-w-[560px]
              items-center
              justify-center
              sm:h-[550px]
              lg:h-[600px]
            "
          >
            {/* ==================================================
                BACK GLOW
            ================================================== */}

            <motion.div
              className="
                absolute
                h-[300px]
                w-[300px]
                rounded-full
                bg-[#FFB347]/30
                blur-3xl
                sm:h-[420px]
                sm:w-[420px]
              "
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.5, 0.75, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* ==================================================
                ORGANIC CENTER CIRCLE
            ================================================== */}

            <motion.div
              className="
                absolute
                h-[320px]
                w-[320px]
                rounded-[42%_58%_55%_45%/45%_40%_60%_55%]
                bg-[#b80603]
                sm:h-[430px]
                sm:w-[430px]
              "
              animate={{
                borderRadius: [
                  "42% 58% 55% 45% / 45% 40% 60% 55%",
                  "55% 45% 40% 60% / 55% 60% 40% 45%",
                  "42% 58% 55% 45% / 45% 40% 60% 55%",
                ],
                rotate: [0, 4, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* ==================================================
                DASHED RING
            ================================================== */}

            <motion.div
              className="
                absolute
                h-[370px]
                w-[370px]
                rounded-full
                border-2
                border-dashed
                border-[#25352B]/15
                sm:h-[500px]
                sm:w-[500px]
              "
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* ==================================================
                CENTER PRODUCT
            ================================================== */}

            <motion.div
              className="
                relative
                z-20
              "
              animate={{
                y: [0, -16, 0],
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Product shadow */}

              <motion.div
                className="
                  absolute
                  left-1/2
                  top-[85%]
                  h-8
                  w-40
                  -translate-x-1/2
                  rounded-full
                  bg-black/15
                  blur-xl
                "
                animate={{
                  scale: [1, 0.8, 1],
                  opacity: [0.3, 0.15, 0.3],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Animated center image */}

              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedProduct.id}
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  initial={{
                    opacity: 0,
                    scale: 0.65,
                    y: 30,
                    rotate: -8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotate: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.7,
                    y: -20,
                    rotate: 8,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    h-[240px]
                    w-[240px]
                    object-contain
                    drop-shadow-[0_30px_35px_rgba(0,0,0,0.25)]
                    sm:h-[330px]
                    sm:w-[330px]
                  "
                />
              </AnimatePresence>

              {/* Product name */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedProduct.id}-name`}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="
                    absolute
                    -bottom-8
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-full
                    bg-white
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-[#25352B]
                    shadow-xl
                  "
                >
                  {selectedProduct.name}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* ==================================================
                TOP LEFT - CHOCOLATE SHAKE
            ================================================== */}

            <motion.button
              onClick={() => handleProductSelect(HERO_PRODUCTS[0])}
              className="
                absolute
                left-[3%]
                top-[13%]
                z-30
                flex
                h-[82px]
                w-[82px]
                items-center
                justify-center
                rounded-2xl
                border
                border-white/70
                bg-white/80
                p-3
                shadow-xl
                backdrop-blur-md
                sm:h-[100px]
                sm:w-[100px]
              "
              animate={{
                y: [0, -12, 0],
                rotate: [-4, 4, -4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.15,
                rotate: 0,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <img
                src={chocoShake}
                alt="Chocolate Shake"
                className="
                  h-full
                  w-full
                  object-contain
                "
              />
            </motion.button>

            {/* ==================================================
                TOP RIGHT - MILK BERRY SHAKE
            ================================================== */}

            <motion.button
              onClick={() => handleProductSelect(HERO_PRODUCTS[1])}
              className="
                absolute
                right-[2%]
                top-[18%]
                z-30
                flex
                h-[82px]
                w-[82px]
                items-center
                justify-center
                rounded-2xl
                border
                border-white/70
                bg-white/80
                p-3
                shadow-xl
                backdrop-blur-md
                sm:h-[100px]
                sm:w-[100px]
              "
              animate={{
                y: [0, 14, 0],
                rotate: [4, -4, 4],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              whileHover={{
                scale: 1.15,
                rotate: 0,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <img
                src={milkBarryShake}
                alt="Milk Berry Shake"
                className="
                  h-full
                  w-full
                  object-contain
                "
              />
            </motion.button>

            {/* ==================================================
                BOTTOM LEFT - VANILLA ICE CREAM
            ================================================== */}

            <motion.button
              onClick={() => handleProductSelect(HERO_PRODUCTS[2])}
              className="
                absolute
                bottom-[10%]
                left-[5%]
                z-30
                flex
                h-[82px]
                w-[82px]
                items-center
                justify-center
                rounded-2xl
                border
                border-white/70
                bg-white/80
                p-3
                shadow-xl
                backdrop-blur-md
                sm:h-[100px]
                sm:w-[100px]
              "
              animate={{
                y: [0, 10, 0],
                rotate: [3, -3, 3],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
              whileHover={{
                scale: 1.15,
                rotate: 0,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <img
                src={venella}
                alt="Vanilla Ice Cream"
                className="
                  h-full
                  w-full
                  object-contain
                "
              />
            </motion.button>

            {/* ==================================================
                BOTTOM RIGHT - STRAWBERRY ICE CREAM
            ================================================== */}

            <motion.button
              onClick={() => handleProductSelect(HERO_PRODUCTS[3])}
              className="
                absolute
                bottom-[9%]
                right-[5%]
                z-30
                flex
                h-[82px]
                w-[82px]
                items-center
                justify-center
                rounded-2xl
                border
                border-white/70
                bg-white/80
                p-3
                shadow-xl
                backdrop-blur-md
                sm:h-[100px]
                sm:w-[100px]
              "
              animate={{
                y: [0, -10, 0],
                rotate: [-3, 3, -3],
              }}
              transition={{
                duration: 4.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              whileHover={{
                scale: 1.15,
                rotate: 0,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <img
                src={stawbarry}
                alt="Strawberry Ice Cream"
                className="
                  h-full
                  w-full
                  object-contain
                "
              />
            </motion.button>

            {/* ==================================================
                DECORATIVE DOTS
            ================================================== */}

            <motion.div
              className="
                absolute
                right-[18%]
                bottom-[12%]
                h-5
                w-5
                rounded-full
                bg-[#7BAE5B]
              "
              animate={{
                y: [0, -18, 0],
                x: [0, 8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="
                absolute
                left-[30%]
                top-[8%]
                h-3
                w-3
                rounded-full
                bg-[#F28C28]
              "
              animate={{
                y: [0, 15, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          MARQUEE
      ================================================== */}

      <div
        className="
          relative
          border-y-2
          border-juice-ink/10
          bg-juice-ink
          py-3
        "
      >
        <div
          className="
            flex
            w-max
            animate-marquee
            whitespace-nowrap
          "
        >
          {[...CATEGORY_NAMES, ...CATEGORY_NAMES].map((name, i) => (
            <span
              key={i}
              className="
                  mx-4
                  flex
                  items-center
                  gap-4
                  font-display
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wider
                  text-cream/80
                "
            >
              {name}

              <span className="text-juice-mango">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ==================================================
          WHY US
      ================================================== */}

{/* ================= WHY MR. JUICE ================= */}
{/* ================= WHY MR. JUICE ================= */}

<section className="container-brand py-16 sm:py-20">

  {/* SECTION HEADING */}
  <Reveal
    className="
      mx-auto
      max-w-xl
      text-center
    "
  >
    <p className="eyebrow">
      Why Mr. Juice
    </p>

    <h2
      className="
        mt-1
        font-display
        text-3xl
        font-extrabold
        text-juice-ink
        sm:text-4xl
      "
    >
      Nothing frozen. Nothing rushed.
    </h2>
  </Reveal>


  {/* ================= WHY US ITEMS ================= */}

  <div className="mt-12 space-y-8">

    {WHY_US_DATA.map((item, i) => (

      <Reveal
        key={item.id}
        delay={i * 0.1}
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 70,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
            amount: 0.25,
          }}

          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}

          className="
            group
            relative
            min-h-[50vh]
            overflow-hidden
            rounded-[2rem]
            border
            border-juice-ink/10
            bg-white
            shadow-sm
            transition-shadow
            duration-500
            hover:shadow-xl
            lg:min-h-[60vh]
            lg:grid
            lg:grid-cols-2
          "
        >

          {/* ================= IMAGE ================= */}

          <motion.div
            className={`
              relative
              min-h-[320px]
              overflow-hidden
              lg:min-h-full
              ${i % 2 === 0 ? "lg:order-1" : "lg:order-2"}
            `}
          >

            <motion.img
              src={item.image}
              alt={item.title}

              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-110
              "

              initial={{
                scale: 1.08,
              }}

              whileInView={{
                scale: 1,
              }}

              viewport={{
                once: true,
                amount: 0.3,
              }}

              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />


            {/* IMAGE OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/50
                via-black/10
                to-transparent
                opacity-80
              "
            />


            {/* NUMBER */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}

              whileInView={{
                opacity: 1,
                scale: 1,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                duration: 0.5,
                delay: 0.25,
              }}

              className="
                absolute
                left-6
                top-6
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white/90
                text-lg
                font-extrabold
                text-juice-ink
                shadow-lg
                backdrop-blur-md
              "
            >
              0{i + 1}
            </motion.div>

          </motion.div>


          {/* ================= CONTENT ================= */}

          <div
            className={`
              flex
              items-center
              p-8
              sm:p-12
              lg:p-16
              ${i % 2 === 0 ? "lg:order-2" : "lg:order-1"}
            `}
          >

            <div className="max-w-xl">

              {/* SMALL LABEL */}

              <motion.p
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? 30 : -30,
                }}

                whileInView={{
                  opacity: 1,
                  x: 0,
                }}

                viewport={{
                  once: true,
                  amount: 0.4,
                }}

                transition={{
                  duration: 0.6,
                  delay: 0.15,
                }}

                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-juice-red
                "
              >
                Why Mr. Juice
              </motion.p>


              {/* TITLE */}

              <motion.h3
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? 50 : -50,
                }}

                whileInView={{
                  opacity: 1,
                  x: 0,
                }}

                viewport={{
                  once: true,
                  amount: 0.4,
                }}

                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}

                className="
                  mt-4
                  font-display
                  text-4xl
                  font-extrabold
                  leading-tight
                  text-juice-ink
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {item.title}
              </motion.h3>


              {/* DESCRIPTION */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{
                  once: true,
                  amount: 0.4,
                }}

                transition={{
                  duration: 0.7,
                  delay: 0.3,
                }}

                className="
                  mt-6
                  max-w-lg
                  text-base
                  leading-8
                  text-juice-ink/60
                  sm:text-lg
                "
              >
                {item.text}
              </motion.p>


              {/* DECORATIVE LINE */}

              <motion.div
                initial={{
                  width: 0,
                  opacity: 0,
                }}

                whileInView={{
                  width: 80,
                  opacity: 1,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: "easeOut",
                }}

                className="
                  mt-8
                  h-1
                  rounded-full
                  bg-juice-red
                "
              />

            </div>

          </div>

        </motion.div>

      </Reveal>

    ))}

  </div>

</section>

      {/* ==================================================
          FEATURED
      ================================================== */}

{/* ================= CROWD FAVORITES ================= */}

{/* ==================================================
    CROWD FAVORITES
================================================== */}

<section
  className="
    relative
    overflow-hidden
    bg-juice-red/5
    pb-32
    pt-28
    sm:pb-36
    sm:pt-32
    lg:pb-40
    lg:pt-36
  "
>

  {/* ==================================================
      ANIMATED BACKGROUND
  ================================================== */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Large red blob */}

    <motion.div
      className="
        absolute
        -left-32
        -top-32
        h-[420px]
        w-[420px]
        rounded-full
        bg-juice-red/10
        blur-3xl
      "
      animate={{
        x: [0, 60, 0],
        y: [0, 40, 0],
        scale: [1, 1.15, 1],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Mango blob */}

    <motion.div
      className="
        absolute
        -bottom-40
        -right-32
        h-[500px]
        w-[500px]
        rounded-full
        bg-juice-mango/10
        blur-3xl
      "
      animate={{
        x: [0, -50, 0],
        y: [0, -40, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Floating circle */}

    <motion.div
      className="
        absolute
        left-[20%]
        top-[35%]
        h-5
        w-5
        rounded-full
        bg-juice-red/20
      "
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Floating circle */}

    <motion.div
      className="
        absolute
        right-[18%]
        top-[20%]
        h-4
        w-4
        rounded-full
        bg-juice-mango/30
      "
      animate={{
        y: [0, 25, 0],
        x: [0, -15, 0],
        opacity: [0.3, 0.9, 0.3],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Soft glow */}

    <div
      className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.8),transparent_55%)]
      "
    />

  </div>


  {/* ==================================================
      TOP WAVE
  ================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      left-0
      top-0
      z-10
      w-full
      overflow-hidden
      leading-[0]
    "
  >
    <svg
      className="
        relative
        block
        h-[70px]
        w-[calc(100%+1.3px)]
        sm:h-[90px]
      "
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="
          M0,0
          L1200,0
          L1200,55
          C1080,110 1020,105 900,65
          C780,25 700,25 600,65
          C500,105 420,105 300,65
          C180,25 120,25 0,75
          Z
        "
        fill="#FFF6E4"
      />
    </svg>
  </div>


  {/* ==================================================
      CONTENT
  ================================================== */}

  <div className="container-brand relative z-20">

    {/* ==================================================
        HEADER
    ================================================== */}

    <div
      className="
        flex
        flex-col
        gap-6
        md:flex-row
        md:items-end
        md:justify-between
      "
    >

      <Reveal>

        <div className="relative">

          {/* LABEL */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-juice-red
              px-4
              py-2
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-white
              shadow-lg
              shadow-juice-red/20
            "
          >
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-white
              "
            />

            Crowd favorites
          </motion.div>


          {/* HEADING */}

          <motion.h2
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="
              max-w-2xl
              font-display
              text-4xl
              font-extrabold
              leading-[1]
              tracking-tight
              text-juice-ink
              sm:text-5xl
              lg:text-6xl
            "
          >
            Everyone orders
            <span className="text-juice-red">
              {" "}these first.
            </span>
          </motion.h2>


          {/* DESCRIPTION */}

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="
              mt-4
              max-w-xl
              text-sm
              leading-7
              text-juice-ink/55
              sm:text-base
            "
          >
            Our most-loved drinks, shakes and desserts —
            freshly prepared and made to order.
          </motion.p>

        </div>

      </Reveal>


      {/* MENU BUTTON */}

      <Reveal delay={0.15}>

        <motion.div
          whileHover={{
            y: -4,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >

          <Link
            to="/menu"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-juice-ink
              px-6
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-juice-red
            "
          >
            See full menu

            <ArrowRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </Link>

        </motion.div>

      </Reveal>

    </div>


    {/* ==================================================
        PRODUCTS
    ================================================== */}

    <div
      className="
        mt-14
        grid
        gap-[30px]
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >

      {featured.map(({ item, categoryName }, i) => (

        <Reveal
          key={item.name}
          delay={i * 0.08}
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -8,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[1.75rem]
              bg-white
              shadow-sm
              transition-shadow
              duration-500
              hover:shadow-2xl
            "
          >

            {/* ==================================================
                IMAGE
            ================================================== */}

            <div
              className="
                relative
                h-[320px]
                overflow-hidden
                sm:h-[350px]
                lg:h-[380px]
              "
            >

              <img
                src={item.image}
                alt={item.name}
                className="
                  h-full
                  w-full
                  object-contain
                  transition-transform
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:scale-110
                "
              />


              {/* IMAGE OVERLAY */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/30
                  via-transparent
                  to-transparent
                  opacity-60
                  transition-opacity
                  duration-500
                  group-hover:opacity-30
                "
              />


              {/* CATEGORY */}

              <div
                className="
                  absolute
                  left-5
                  top-5
                  rounded-full
                  bg-white/90
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-juice-ink
                  shadow-md
                  backdrop-blur-md
                "
              >
                {categoryName}
              </div>


              {/* ==================================================
                  PLUS BUTTON
              ================================================== */}
<motion.button
  type="button"
  onClick={() => addToCart(item)}
  whileHover={{
    scale: 1.12,
    rotate: 90,
  }}
  whileTap={{
    scale: 0.9,
  }}
  className="
    absolute
    bottom-5
    right-5
    z-10
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-full
    bg-juice-red
    text-2xl
    font-light
    text-white
    shadow-xl
    transition-colors
    duration-300
    hover:bg-juice-ink
  "
  aria-label={`Add ${item.name} to cart`}
>
  +
</motion.button>

            </div>


            {/* ==================================================
                PRODUCT DETAILS
            ================================================== */}

            <div
              className="
                px-5
                py-5
                sm:px-6
                sm:py-6
              "
            >

              <h3
                className="
                  font-display
                  text-xl
                  font-extrabold
                  leading-tight
                  text-juice-ink
                  transition-colors
                  duration-300
                  group-hover:text-juice-red
                "
              >
                {item.name}
              </h3>


              <p
                className="
                  mt-2
                  text-lg
                  font-extrabold
                  text-juice-red
                "
              >
                Rs. {item.price}
              </p>

            </div>

          </motion.div>

        </Reveal>

      ))}

    </div>

  </div>


  {/* ==================================================
      BOTTOM WAVE
  ================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      bottom-0
      left-0
      z-10
      w-full
      overflow-hidden
      leading-[0]
    "
  >
    <svg
      className="
        relative
        block
        h-[70px]
        w-[calc(100%+1.3px)]
        sm:h-[90px]
      "
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="
          M0,120
          L1200,120
          L1200,65
          C1080,10 1020,15 900,55
          C780,95 700,95 600,55
          C500,15 420,15 300,55
          C180,95 120,95 0,45
          Z
        "
        fill="#FFF6E4"
      />
    </svg>
  </div>

</section>

      {/* ==================================================
          CTA
      ================================================== */}

      <section
        className="
          container-brand
          py-16
          sm:py-20
        "
      >
        <Reveal>
          <div
            className="
              relative
              overflow-hidden
              rounded-[2.5rem]
              bg-juice-ink
              px-8
              py-14
              text-center
              sm:px-16
            "
          >
            <div
              className="
                absolute
                -left-10
                -top-10
                h-56
                w-56
                animate-spinSlow
                rounded-full
                border-4
                border-dashed
                border-juice-mango/20
              "
            />

            <div
              className="
                absolute
                -bottom-16
                -right-10
                h-64
                w-64
                animate-spinSlow
                rounded-full
                border-4
                border-dashed
                border-juice-leaf/20
                [animation-direction:reverse]
              "
            />

            <p className="eyebrow">Craving something fresh?</p>

            <h2
              className="
                mx-auto
                mt-2
                max-w-lg
                font-display
                text-3xl
                font-extrabold
                text-cream
                sm:text-4xl
              "
            >
              Pick your outlet and order in under a minute.
            </h2>

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-center
                gap-4
              "
            >
              <Link to="/menu" className="btn-primary">
                Browse the menu
                <ArrowRight size={18} />
              </Link>

              <a
                href={social.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="
                  btn-whatsapp
                  py-3.5
                "
              >
                <MessageCircle size={18} />
                Message us directly
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
