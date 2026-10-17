import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  X,
  Plus,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Reveal from "../components/Reveal.jsx";
import SplashLabel from "../components/SplashLabel.jsx";
import MenuItemCard from "../components/MenuItemCard.jsx";
import CountUp from "../components/CountUp.jsx";
import { menu, topItems } from "../data/menu.js";
import { useApp } from "../context/AppContext.jsx";
import icecreamimg2 from "../images/heroright1.png";

import heroIceCream from "../images/heroright1.png";
import heroShake from "../images/milkshake.png";
import heroBrownie from "../images/oreo2.png";
import heroSmoothie from "../images/energizers.png";

export default function Menu() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedOutlet, setOutletModalOpen, addToCart } = useApp();
  const controls = useAnimation();
  const categorySliderRef = useRef(null);

  // Typing animation states
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const [currentSlide, setCurrentSlide] = useState(0);

  const searchWords = [
    "Search ice cream",
    "Search milkshake",
    "Search smoothie",
    "Search strawberry",
    "Search chocolate",
    "Search banana",
    "Search mango",
    "Search oreo",
    "Search lassi",
  ];

  // Typing animation effect
  useEffect(() => {
    if (isInputFocused) return;

    const currentWord = searchWords[wordIndex];
    let timeout;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        }, 100);
      } else {
        // Word complete, wait before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 50);
      } else {
        // Move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % searchWords.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, isInputFocused]);

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu
      .filter(
        (cat) => selectedCategory === "all" || cat.id === selectedCategory,
      )
      .map((cat) => ({
        ...cat,
        items: q
          ? cat.items.filter(
              (item) =>
                item.name.toLowerCase().includes(q) ||
                (item.desc && item.desc.toLowerCase().includes(q)) ||
                cat.name.toLowerCase().includes(q),
            )
          : cat.items,
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query, selectedCategory]);

  const handleAddToCart = (item, categoryName) => {
    addToCart({
      ...item,
      category: categoryName,
      outlet: selectedOutlet,
    }, categoryName);
  };

  const scrollToContent = () => {
    const el = document.getElementById("menu-content");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroSlides = [
    {
      id: 1,
      image: heroIceCream,
      eyebrow: "Cool & Delicious",
      title: "Creamy Ice Cream",
      highlight: "Made For Every Mood",
      description:
        "Scoop into rich, creamy flavors made with care and served fresh at Mr. Juice.",
    },
    {
      id: 2,
      image: heroShake,
      eyebrow: "Rich & Creamy",
      title: "Loaded Milkshakes",
      highlight: "Pure Indulgence",
      description:
        "From dry fruits to chocolate delights, discover shakes made to satisfy every craving.",
    },
    {
      id: 3,
      image: heroBrownie,
      eyebrow: "Sweet & Decadent",
      title: "Rich Oreo ",
      highlight: "Shake Your Cravings",
      description:
        "A delicious combination of creamy goodness, chocolate brownie and irresistible caramel.",
    },
    {
      id: 4,
      image: heroSmoothie,
      eyebrow: "Fresh & Healthy",
      title: "Morning Delight",
      highlight: "Start Fresh",
      description:
        "Fresh fruits, creamy yogurt and natural sweetness blended into one refreshing smoothie.",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };
  const scrollCategories = (direction) => {
    const slider = categorySliderRef.current;
    if (!slider) return;
    slider.scrollBy({
      left: direction * slider.clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = categorySliderRef.current;
    const activeCategory = slider?.querySelector(`[data-category="${selectedCategory}"]`);
    if (!slider || !activeCategory) return;

    const targetLeft =
      activeCategory.getBoundingClientRect().left -
      slider.getBoundingClientRect().left +
      slider.scrollLeft -
      (slider.clientWidth - activeCategory.clientWidth) / 2;
    slider.scrollTo({ left: targetLeft, behavior: "smooth" });
  }, [selectedCategory]);

  return (
    <div>
      <section className="relative min-h-screen overflow-hidden bg-white">
        {/* ================= BACKGROUND DECORATION ================= */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Large red circle */}
          <motion.div
            className="absolute -right-[18%] top-[8%] h-[750px] w-[750px] rounded-full bg-red-600"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Soft red glow */}
          <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-red-100/70 blur-3xl" />

          {/* Small decorative circles */}
          <motion.div
            className="absolute left-[8%] top-[20%] h-5 w-5 rounded-full bg-red-500"
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="absolute left-[15%] bottom-[20%] h-3 w-3 rounded-full bg-red-300"
            animate={{
              y: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          {/* Big transparent text */}
          <span
            className="
        absolute
        -bottom-10
        right-[18%]
        hidden
        select-none
        font-display
        text-[180px]
        font-black
        uppercase
        text-white/10
        lg:block
      "
          >
            JUICE
          </span>
        </div>

        {/* ================= SLIDE CONTENT ================= */}

        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[currentSlide].id}
            className="container-brand relative z-10 flex min-h-screen items-center px-5 py-24 lg:px-8"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            {/* ================= LEFT SIDE ================= */}

            <div className="relative z-20 w-full lg:w-[52%]">
              {/* Small label */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
                className="mb-5 flex items-center gap-3"
              >
                <span className="h-[2px] w-10 bg-red-600" />

                <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-red-600">
                  {heroSlides[currentSlide].eyebrow}
                </span>
              </motion.div>

              {/* Heading */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.15,
                }}
                className="
            max-w-3xl
            font-display
            text-5xl
            font-black
            leading-[0.92]
            tracking-tight
            text-juice-ink
            sm:text-6xl
            md:text-7xl
            lg:text-[78px]
            xl:text-[92px]
          "
              >
                {heroSlides[currentSlide].title}

                <span className="mt-3 block text-yellow-400">
                  {heroSlides[currentSlide].highlight}
                </span>
              </motion.h1>

              {/* Description */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                }}
                className="
            mt-7
            max-w-lg
            text-base
            leading-relaxed
            text-juice-ink/60
            sm:text-lg
          "
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              {/* Buttons */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                }}
                className="mt-8 flex flex-wrap gap-4"
              >
                {/* Explore */}

                <button
                  onClick={scrollToContent}
                  className="
              group
              flex
              items-center
              gap-3
              rounded-full
              bg-red-600
              px-7
              py-4
              font-display
              font-bold
              text-white
              shadow-xl
              shadow-red-600/20
              transition-all
              duration-300
              hover:bg-red-700
              hover:shadow-2xl
              hover:shadow-red-600/30
              active:scale-95
            "
                >
                  Explore Menu
                  <span
                    className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-white/20
                transition
                group-hover:translate-x-1
              "
                  >
                    →
                  </span>
                </button>

                {/* Outlet */}

                <button
                  onClick={() => setOutletModalOpen(true)}
                  className="
              flex
              items-center
              gap-2
              rounded-full
              border-2
              border-red-100
              bg-white
              px-6
              py-4
              font-display
              font-semibold
              text-red-600
              shadow-sm
              transition-all
              duration-300
              hover:border-red-600
              hover:bg-red-50
            "
                >
                  <MapPin size={18} />

                  {selectedOutlet ? selectedOutlet.name : "Find Outlet"}
                </button>
              </motion.div>

              {/* ================= SLIDER NAVIGATION ================= */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.6,
                }}
                className="mt-12 flex items-center gap-5"
              >
                {/* Previous */}

                <button
                  onClick={previousSlide}
                  className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-red-100
              bg-white
              text-red-600
              shadow-sm
              transition
              hover:border-red-600
              hover:bg-red-600
              hover:text-white
            "
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Progress bars */}

                <div className="flex items-center gap-2">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(index)}
                      className="relative h-1.5 overflow-hidden rounded-full bg-red-100"
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full bg-red-600"
                        initial={false}
                        animate={{
                          width: currentSlide === index ? "100%" : "0%",
                        }}
                        transition={{
                          duration: currentSlide === index ? 5 : 0.3,
                          ease: "linear",
                        }}
                        style={{
                          width: currentSlide === index ? "48px" : "0px",
                        }}
                      />

                      <span
                        className={`
                    block
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300
                    ${currentSlide === index ? "w-12" : "w-5"}
                  `}
                      />
                    </button>
                  ))}
                </div>

                {/* Next */}

                <button
                  onClick={nextSlide}
                  className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-red-600
              text-white
              shadow-lg
              shadow-red-600/20
              transition
              hover:bg-red-700
              active:scale-95
            "
                >
                  <ChevronRight size={20} />
                </button>

                {/* Number */}

                <div className="ml-1 flex items-center gap-2">
                  <CountUp
                    key={currentSlide}
                    value={currentSlide + 1}
                    pad={2}
                    className="font-display text-xl font-black text-red-600"
                  />

                  <span className="text-sm text-juice-ink/30">/</span>

                  <CountUp
                    value={heroSlides.length}
                    pad={2}
                    className="text-sm font-semibold text-juice-ink/40"
                  />
                </div>
              </motion.div>
            </div>

            {/* ================= RIGHT PRODUCT ================= */}

            <div className="absolute right-0 top-0 hidden h-full w-[52%] lg:block">
              {/* Product shadow */}

              <motion.div
                key={`shadow-${heroSlides[currentSlide].id}`}
                initial={{
                  opacity: 0,
                  scale: 0.6,
                }}
                animate={{
                  opacity: 0.3,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="
            absolute
            bottom-[13%]
            left-[15%]
            h-12
            w-[55%]
            rounded-full
            bg-black/20
            blur-2xl
          "
              />

              {/* Product */}

              <motion.img
                key={`product-${heroSlides[currentSlide].id}`}
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  x: 100,
                  rotate: -8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
            absolute
            left-[4%]
            top-[40%] 
            z-10
            max-h-[75vh]
            w-[85%]
            -translate-y-1/2
            object-contain
            drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]
          "
              />

              {/* Floating badge */}

              <motion.div
                key={`badge-${heroSlides[currentSlide].id}`}
                initial={{
                  opacity: 0,
                  scale: 0,
                  rotate: -20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  type: "spring",
                }}
                className="
            absolute
            right-[12%]
            top-[24%]
            z-20
            flex
            h-24
            w-24
            rotate-12
            items-center
            justify-center
            rounded-full
            bg-white
            text-center
            shadow-2xl
          "
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                    Fresh
                  </p>

                  <p className="mt-1 font-display text-sm font-black text-juice-ink">
                    Every Day
                  </p>

                  <span className="text-lg">❤️</span>
                </div>
              </motion.div>

              {/* Decorative ring */}

              <motion.div
                className="
            absolute
            bottom-[15%]
            right-[10%]
            h-40
            w-40
            rounded-full
            border-[2px]
            border-dashed
            border-white/40
          "
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* ================= MOBILE PRODUCT ================= */}

            <div className="pointer-events-none absolute right-[-25%] top-[5%] h-[320px] w-[320px] lg:hidden">
              <div className="absolute inset-0 rounded-full bg-red-600" />

              <motion.img
                key={`mobile-${heroSlides[currentSlide].id}`}
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  rotate: -8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="
            absolute
            left-[-15%]
            top-[5%]
            h-full
            w-full
            object-contain
            drop-shadow-2xl
          "
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ================= LEFT SLIDE NUMBER ================= */}

        <div
          className="
      pointer-events-none
      absolute
      left-4
      top-1/2
      z-20
      hidden
      -translate-y-1/2
      flex-col
      items-center
      gap-3
      lg:flex
    "
        >
          <span className="h-16 w-[1px] bg-red-200" />

          <span className="font-display text-xs font-bold tracking-widest text-red-600 [writing-mode:vertical-rl]">
            MENU
          </span>

          <span className="h-16 w-[1px] bg-red-200" />
        </div>

        {/* ================= SCROLL ================= */}

        <motion.div
          className="
      absolute
      bottom-7
      right-8
      hidden
      items-center
      gap-3
      text-red-600
      lg:flex
    "
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Explore
          </span>

          <ArrowDown size={16} />
        </motion.div>
      </section>

      {/* Popular Items Section */}
      {!query && topItems.length > 0 && (
        <section className="relative min-h-screen overflow-hidden bg-white py-16">
          {/* Animated Background */}
          <motion.div
            className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl"
            animate={{
              x: [0, 80, 0],
              y: [0, 40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-orange-100/60 blur-3xl"
            animate={{
              x: [0, -70, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Small Floating Circle */}
          <motion.div
            className="pointer-events-none absolute left-[15%] top-[20%] h-6 w-6 rounded-full bg-amber-300/40"
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

          <motion.div
            className="pointer-events-none absolute right-[18%] top-[30%] h-4 w-4 rounded-full bg-orange-300/50"
            animate={{
              y: [0, 35, 0],
              x: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="container-brand relative z-10">
            {/* Heading */}
            <Reveal>
              <div className="mb-10 text-center">
                <p className="eyebrow">Customer Favorites</p>

                <h2 className="mt-2 font-display text-3xl font-bold text-juice-ink md:text-4xl">
                  Popular Items 🔥
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm text-juice-ink/50 md:text-base">
                  Our most-loved treats, freshly prepared and perfect for every
                  mood.
                </p>
              </div>
            </Reveal>

            {/* Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {topItems.map((item, index) => (
                <Reveal key={item.id || item.name} delay={index * 0.08}>
                  <motion.div
                    className="
                group
                relative
                flex
                h-[55vh]
                min-h-[400px]
                flex-col
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-sm
              "
                    initial={{
                      opacity: 0,
                      y: 40,
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
                      duration: 0.6,
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                  >
                    {/* Image Area - 70% */}
                    <div className="relative h-[70%] overflow-hidden">
                      <motion.img
                        src={item.image || "/images/default-item.webp"}
                        alt={item.name}
                        className="
                    h-full
                    w-full
                    object-contain
                  "
                        whileHover={{
                          scale: 1.08,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                      />

                      {/* Image Overlay */}
                      <div
                        className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/20
                    via-transparent
                    to-transparent
                    opacity-0
                    transition
                    duration-500
                    group-hover:opacity-100
                  "
                      />

                      {/* Add To Cart Button */}
                      <motion.button
                        onClick={() =>
                          handleAddToCart(item, item.category || "Popular")
                        }
                        className="
                    absolute
                    bottom-3
                    right-3
                    z-10
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-r
                    from-amber-400
                    to-orange-500
                    text-white
                    shadow-lg
                  "
                        aria-label={`Add ${item.name} to cart`}
                        whileHover={{
                          scale: 1.12,
                          rotate: 5,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                      >
                        <Plus size={20} strokeWidth={2.5} />
                      </motion.button>
                    </div>

                    {/* Item Information */}
                    <div className="flex flex-1 flex-col justify-center bg-white px-5 py-4">
                      <h3
                        className="
                  font-display
                  text-lg
                  font-semibold
                  text-juice-ink
                  transition-colors
                  duration-300
                  group-hover:text-amber-600
                "
                      >
                        {item.name}
                      </h3>

                      {item.desc && (
                        <p
                          className="
                    mt-1
                    line-clamp-1
                    text-sm
                    text-juice-ink/50
                  "
                        >
                          {item.desc}
                        </p>
                      )}

                      <p
                        className="
                  mt-2
                  font-display
                  text-xl
                  font-bold
                  text-amber-600
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
        </section>
      )}

      {/* Search and Filter Section - 60vh */}
      <div
        id="menu-content"
        className="min-h-[60vh] bg-gradient-to-b from-white to-amber-50/50"
      >
        <section className="container-brand flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
          <div className="w-full max-w-4xl text-center">
            <Reveal>
              <p className="eyebrow">The full lineup</p>
              <h2 className="mt-2 font-display text-4xl font-extrabold text-juice-ink sm:text-5xl">
                Explore Our Menu
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-juice-ink/60">
                Add items to your cart, then provide your delivery details at checkout.
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <div
                className="relative w-full max-w-md transition-all duration-300"
                style={{ width: isExpanded ? "100%" : "auto" }}
              >
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-juice-ink/40"
                  size={20}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => {
                    setIsInputFocused(true);
                    setIsExpanded(true);
                    setQuery("");
                  }}
                  onBlur={() => {
                    setIsInputFocused(false);
                    setIsExpanded(false);
                  }}
                  placeholder={displayText}
                  className="w-full rounded-full border-2 border-juice-ink/10 bg-white py-4 pl-12 pr-10 text-base text-juice-ink outline-none transition-all duration-300 focus:border-amber-500"
                  style={{
                    minWidth: isExpanded ? "400px" : "300px",
                    maxWidth: isExpanded ? "500px" : "300px",
                  }}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-juice-ink/40 hover:bg-juice-ink/5"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button
                onClick={() => setOutletModalOpen(true)}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-juice-ink/15 bg-white px-6 py-4 font-display text-sm font-semibold text-juice-ink transition hover:border-amber-500 hover:text-amber-600"
              >
                <MapPin size={18} />
                {selectedOutlet ? selectedOutlet.name : "Select outlet"}
              </button>
            </Reveal>
          </div>
        </section>
      </div>

      {/* Category filter */}
      <div className="sticky top-[60px] z-30 border-y border-amber-200/50 bg-gradient-to-r from-[#fffaf0]/95 via-white/95 to-[#fff7e6]/95 py-4 shadow-[0_12px_30px_-24px_rgba(43,18,16,0.55)] backdrop-blur-xl sm:top-[68px]">
        <div className="container-brand">
          <div className="mb-3 flex items-end justify-between gap-3 px-1">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-amber-700">
                Find your favorite
              </p>
              <h2 className="mt-0.5 font-display text-lg font-extrabold text-juice-ink sm:text-xl">
                Browse by category
              </h2>
            </div>
            <span className="pb-0.5 text-xs font-medium text-juice-ink/45">
              {selectedCategory === "all" ? (
                <>
                  <CountUp value={menu.length} /> categories
                </>
              ) : (
                menu.find((cat) => cat.id === selectedCategory)?.name
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollCategories(-1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-900/10 bg-white text-juice-ink shadow-sm transition hover:border-juice-red/30 hover:bg-juice-red hover:text-white"
              aria-label="Scroll categories left"
            >
              <ChevronLeft size={18} />
            </button>
            <div
              ref={categorySliderRef}
              aria-label="Filter menu by category"
              className="category-slider-track flex min-w-0 flex-1 gap-2 overflow-x-auto rounded-2xl border border-white/80 bg-white/55 p-2 shadow-inner shadow-amber-900/[0.03]"
            >
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              data-category="all"
              aria-pressed={selectedCategory === "all"}
              className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-juice-ink text-white shadow-lg shadow-juice-ink/20 ring-1 ring-amber-300/70"
                  : "border border-amber-900/5 bg-white/80 text-juice-ink/70 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white hover:text-juice-ink hover:shadow-md"
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400/20 text-base">
                ✨
              </span>
              All Menu
            </button>
            {menu.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  data-category={cat.id}
                  aria-pressed={active}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-juice-ink text-white shadow-lg shadow-juice-ink/20 ring-1 ring-amber-300/70"
                      : "border border-amber-900/5 bg-white/80 text-juice-ink/70 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white hover:text-juice-ink hover:shadow-md"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-base ${
                      active ? "bg-amber-400/20" : "bg-amber-50"
                    }`}
                  >
                    {cat.icon}
                  </span>
                  {cat.name}
                </button>
              );
            })}
            </div>
            <button
              type="button"
              onClick={() => scrollCategories(1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-900/10 bg-white text-juice-ink shadow-sm transition hover:border-juice-red/30 hover:bg-juice-red hover:text-white"
              aria-label="Scroll categories right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <section className="relative isolate overflow-hidden bg-transparent py-20">
        <div className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full bg-rose-300/35 blur-[90px]" />
        <div className="pointer-events-none absolute right-[8%] top-[28%] h-96 w-96 rounded-full bg-amber-300/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 left-[38%] h-80 w-80 rounded-full bg-violet-300/25 blur-[95px]" />
        <div className="pointer-events-none absolute bottom-[12%] right-[-5%] h-72 w-72 rounded-full bg-emerald-300/25 blur-[90px]" />
      <div className="container-brand relative z-10">
        {filtered.length === 0 && (
          <p className="py-20 text-center text-juice-ink/50">
            No items match "{query}". Try another search.
          </p>
        )}

        <div className="space-y-16">
          {filtered.map((cat) => (
            <section
              key={cat.id}
              id={`cat-${cat.id}`}
              className="scroll-mt-36 py-8 first:pt-0 last:pb-0"
            >
              <Reveal className="mb-6 flex flex-wrap items-center gap-4">
                <SplashLabel
                  color={
                    cat.id === "ice-cream" || cat.id === "ice-cream-shakes"
                      ? "orange"
                      : cat.id === "smoothies" || cat.id === "detox"
                        ? "green"
                        : "red"
                  }
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  {cat.name}
                </SplashLabel>
                {cat.tagline && (
                  <span className="font-script text-xl text-juice-ink/60">
                    {cat.tagline}
                  </span>
                )}
              </Reveal>
              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {cat.items.map((item, i) => (
                  <div
                    key={item.name}
                    className={`group flex min-w-0 items-center gap-3 overflow-hidden rounded-3xl border p-3 shadow-[0_14px_35px_rgba(59,32,45,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(59,32,45,0.2)] ${
                      [
                        "border-rose-200/80 bg-gradient-to-br from-rose-50 via-white to-orange-50",
                        "border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-yellow-50",
                        "border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50",
                        "border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50",
                        "border-sky-200/80 bg-gradient-to-br from-sky-50 via-white to-indigo-50",
                      ][i % 5]
                    }`}
                  >
                    {/* Image Container with Add Button */}
                    <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl bg-white/70 p-2 shadow-inner">
                      <img
                        src={item.itemimg}
                        alt={item.name}
                        className="h-full w-full object-contain transition-transform rounded-2xl duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Item Details with Red theme */}
                    <div className="min-w-0 flex-1 space-y-2 p-2">
                      <h3 className="font-['Poppins','Poppins_Fallback'] text-base font-semibold text-juice-ink transition-colors ">
                        {item.name}
                      </h3>
                      <p className=" text-gray-400 text-sm font-['Poppins','Poppins_Fallback']  ">
                        {item.desc}
                      </p>
                      {/* Price with Poppins and different weight */}
                      <p className="flex w-fit items-center rounded-lg bg-white/75 px-3 py-1 text-xs font-semibold text-juice-red shadow-sm font-['Poppins','Poppins_Fallback'] tracking-wide">
                        from Rs. {item.price}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item, cat.name)}
                        aria-label={`Add ${item.name} to cart`}
                        className="flex w-fit items-center rounded-lg bg-red-600 px-3 py-1 text-sm font-extrabold text-white shadow-lg shadow-red-600/30 transition duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-xl font-['Poppins','Poppins_Fallback'] tracking-wide"
                      >
                        Add to Cart
                      </button>

                      {/* <motion.button
                        onClick={() => handleAddToCart(item, cat.name)}
                        className=" flex w-fit items-center justify-center rounded-lg bg-red-600 text-white font-bold  shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-110 hover:bg-red-700 hover:shadow-xl active:scale-95"
                        whileHover={{ rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <Plus size={20} strokeWidth={2.5} /> Add to Cart
                      </motion.button> */}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      </section>
    </div>
  );
}
