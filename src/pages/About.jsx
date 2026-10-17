import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Droplets,
  Timer,
  HeartHandshake,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

import Reveal from "../components/Reveal.jsx";
import SplashLabel from "../components/SplashLabel.jsx";
import { outlets } from "../data/outlets.js";
import { menuStats } from "../data/menu.js";
import { useApp } from "../context/AppContext.jsx";
import CountUp from "../components/CountUp.jsx";

import icecreamimg2 from "../images/heroright1.png";
import ImageSlider from "../components/ImageSlider.jsx";

// NOTE: swap the paragraph below for your real founding story, year, and any
// awards/press once you have exact copy — placeholders were avoided in favor
// of brand-voice language that doesn't invent specific facts.

const STORY = [
  "Mr. Juice started with a simple idea: a glass of juice should taste like the fruit it came from — nothing frozen, nothing pre-mixed, nothing rushed.",
  "Every outlet blends to order, from fat-burner detox shots to loaded Oreo shakes, so whether you're after something clean or something indulgent, it's made the moment you ask for it.",
];

const VALUES = [
  {
    icon: Leaf,
    title: "Fresh, always",
    text: "Fruit is sourced and prepped daily — every blend starts from scratch, not a mix.",
  },
  {
    icon: Droplets,
    title: "No shortcuts",
    text: "No pre-made syrups pretending to be fruit. What you taste is what went in.",
  },
  {
    icon: Timer,
    title: "Made to order",
    text: "Your order is blended after you ask for it, not scooped from a jug.",
  },
  {
    icon: HeartHandshake,
    title: "Easy to reach",
    text: "Six outlets and one WhatsApp number away — order ahead, skip the line.",
  },
];



export default function About() {




  const [heroLoaded, setHeroLoaded] = useState(false);

  const { selectedOutlet, setOutletModalOpen } = useApp();

  /*
   * Hero animation trigger
   */
  useEffect(() => {
    setHeroLoaded(true);
  }, []);

  /*
   * Scroll from hero to story section
   */
  const scrollToStory = () => {
    const el = document.getElementById("about-story");

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="overflow-hidden">

      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${icecreamimg2})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          {/* Dark warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        </div>


        {/* =====================================================
            FLOATING DESSERT DECORATIONS
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {[
            { emoji: "🍦", size: "text-6xl" },
            { emoji: "🍨", size: "text-7xl" },
            { emoji: "🍫", size: "text-5xl" },
            { emoji: "🍓", size: "text-5xl" },
            { emoji: "🥛", size: "text-6xl" },
            { emoji: "🍪", size: "text-5xl" },
            { emoji: "🧊", size: "text-5xl" },
            { emoji: "🍌", size: "text-5xl" },
          ].map((item, i) => {

            /*
             * Generate deterministic-ish values once per render.
             * This prevents the animation from changing every frame.
             */
            const left = `${10 + ((i * 17) % 80)}%`;
            const top = `${10 + ((i * 23) % 75)}%`;

            return (
              <motion.div
                key={i}
                className={`absolute ${item.size} opacity-20`}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                }}
                animate={{
                  x: [-30, 40, -20, 30],
                  y: [20, -40, 30, -20],
                  scale: [0.5, 1, 0.8, 1],
                  rotate: [0, 120, 240, 360],
                }}
                transition={{
                  duration: 15 + i * 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
                style={{
                  left,
                  top,
                }}
              >
                {item.emoji}
              </motion.div>
            );
          })}

        </div>


        {/* =====================================================
            LARGE DECORATIVE ICE CREAM
        ===================================================== */}

        <motion.div
          className="absolute left-10 top-20 hidden text-8xl opacity-10 lg:block"
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🍦
        </motion.div>


        <motion.div
          className="absolute bottom-20 right-10 hidden text-8xl opacity-10 lg:block"
          animate={{
            rotate: [0, -10, 10, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut",
          }}
        >
          🍨
        </motion.div>


        {/* =====================================================
            HERO CONTENT
        ===================================================== */}

        <div className="container-brand relative z-10 px-4 text-center text-white">

          {/* Small Heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: heroLoaded ? 1 : 0,
              y: heroLoaded ? 0 : 30,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            <motion.p
              className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-amber-200"
              initial={{
                opacity: 0,
                letterSpacing: "0.5em",
              }}
              animate={{
                opacity: 1,
                letterSpacing: "0.3em",
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
            >
              Who We Are
            </motion.p>
          </motion.div>


          {/* Main Heading */}
          <motion.h1
            className="mt-4 font-display text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl lg:text-8xl"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: heroLoaded ? 1 : 0,
              scale: heroLoaded ? 1 : 0.8,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
          >

            <motion.span
              className="block"
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.5,
              }}
            >
              About Mr. Juice
            </motion.span>


            <motion.span
              className="block text-amber-300"
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.7,
              }}
            >
              Freshness in Every Blend 
            </motion.span>

          </motion.h1>


          {/* Description */}
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg md:text-xl"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: heroLoaded ? 1 : 0,
              y: heroLoaded ? 0 : 30,
            }}
            transition={{
              duration: 0.6,
              delay: 0.9,
            }}
          >
            Discover the story behind Mr. Juice — where fresh ingredients,
            delicious blends, and a passion for great taste come together.
          </motion.p>


          {/* Buttons */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: heroLoaded ? 1 : 0,
              y: heroLoaded ? 0 : 30,
            }}
            transition={{
              duration: 0.6,
              delay: 1.1,
            }}
          >

            {/* Story Button */}
            <motion.button
              onClick={scrollToStory}
              className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-3 font-display font-semibold text-white shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(245, 158, 11, 0.3)",
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Discover Our Story
            </motion.button>


            {/* Outlet Button */}
            <motion.button
              onClick={() => setOutletModalOpen(true)}
              className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-display font-semibold text-white backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              <MapPin size={18} />

              {selectedOutlet
                ? selectedOutlet.name
                : "Find Outlet"}
            </motion.button>

          </motion.div>

        </div>
      </section>


      {/* =========================================================
          OUR STORY
      ========================================================= */}

      <section
        id="about-story"
        className="container-brand grid scroll-mt-20 gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center"
      >

        {/* Story Text */}
        <Reveal>

          <div className="space-y-5">

            <div>
              <p className="eyebrow">
                Our Story
              </p>

              <h2 className="mt-2 font-display text-3xl font-extrabold text-juice-ink sm:text-4xl">
                Freshness is at the heart of everything we do.
              </h2>
            </div>

            {STORY.map((p, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed text-juice-ink/75"
              >
                {p}
              </p>
            ))}

          </div>

        </Reveal>


        {/* Stats */}
        <Reveal delay={0.15}>

          <div className="relative mx-auto grid max-w-sm grid-cols-2 gap-4">

            {[
              [menuStats.items, "Menu items", "+"],
              [menuStats.categories, "Categories"],
              [outlets.length, "Outlets"],
              [1, "Tap-to-order chat"],
            ].map(([num, label, suffix = ""]) => (

              <motion.div
                key={label}
                className="card-outline flex flex-col items-center justify-center gap-1 rounded-3xl p-6 text-center shadow-card"
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <span className="font-display text-3xl font-extrabold text-juice-red">
                  <CountUp value={num} suffix={suffix} />
                </span>

                <span className="text-xs font-medium uppercase tracking-wide text-juice-ink/50">
                  {label}
                </span>

              </motion.div>

            ))}

          </div>

        </Reveal>

      </section>


      {/* =========================================================
          VALUES
      ========================================================= */}

      <section className="bg-juice-leaf/8 py-16 sm:py-20">

        <div className="container-brand">

          <Reveal className="mx-auto max-w-lg text-center">

            <SplashLabel color="green">
              What we stand for
            </SplashLabel>

            <h2 className="mt-4 font-display text-3xl font-extrabold text-juice-ink sm:text-4xl">
              Simple values. Better blends.
            </h2>

            <p className="mt-3 text-juice-ink/60">
              Everything we make follows the same simple approach:
              fresh ingredients, honest preparation, and great taste.
            </p>

          </Reveal>


          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {VALUES.map(
              ({ icon: Icon, title, text }, i) => (

                <Reveal
                  key={title}
                  delay={i * 0.08}
                >

                  <motion.div
                    className="h-full rounded-3xl bg-white/80 p-6 shadow-sm"
                    whileHover={{
                      y: -8,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-juice-red/15 text-red-400">
                      <Icon size={20} />
                    </div>

                    <h3 className="mt-4 font-display font-bold text-juice-ink">
                      {title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-relaxed text-juice-ink/60">
                      {text}
                    </p>

                  </motion.div>

                </Reveal>

              )
            )}

          </div>

        </div>

      </section>


      {/* =========================================================
          OUTLETS
      ========================================================= */}

      <section
        id="outlets"
        className="container-brand py-16 sm:py-20"
      >

        <Reveal className="mx-auto max-w-xl text-center">

          <p className="eyebrow">
            Find us
          </p>

          <h2 className="mt-1 font-display text-3xl font-extrabold text-juice-ink sm:text-4xl">
            Four outlets, one great blend
          </h2>

          <p className="mt-3 text-juice-ink/60">
            Find your nearest Mr. Juice outlet and enjoy your favorite
            blends fresh and made to order.
          </p>

        </Reveal>


        {/* Outlet Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {outlets.map((o, i) => (

            <Reveal
              key={o.id}
              delay={(i % 3) * 0.08}
            >

              <motion.div
                className="card-outline h-full p-6"
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <span className="font-display text-xs font-bold uppercase tracking-wider text-juice-red">
                  Outlet <CountUp value={i + 1} pad={2} />
                </span>

                <h3 className="mt-1 font-display text-lg font-extrabold text-juice-ink">
                  {o.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-juice-ink/60">
                  {o.address}
                </p>

              </motion.div>

            </Reveal>

          ))}

        </div>


        {/* Contact Button */}
        <Reveal className="mt-12 text-center">

          <Link
            to="/contact"
            className="btn-primary"
          >
            Get directions &amp; contact
            <ArrowRight size={18} />
          </Link>

        </Reveal>

      </section>

    </div>
  );
}