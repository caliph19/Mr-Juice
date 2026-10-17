// src/components/home/WhyUsSection.jsx

import React from "react";
import { motion } from "framer-motion";
import Reveal from "../Reveal.jsx";
import { WHY_US_DATA } from "../../data/homeData.js";
import CountUp from "../CountUp.jsx";

export default function WhyUsSection() {
  return (
    <section className="container-brand py-16 sm:py-20">
      {/* Heading */}
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Why Mr. Juice</p>
        <h2 className="mt-1 font-display text-3xl font-extrabold text-juice-ink sm:text-4xl">
          Nothing frozen. Nothing rushed.
        </h2>
      </Reveal>

      {/* Items */}
      <div className="mt-12 space-y-8">
        {WHY_US_DATA.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.1}>
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative min-h-[50vh] overflow-hidden rounded-[2rem] border border-juice-ink/10 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl lg:min-h-[60vh] lg:grid lg:grid-cols-2"
            >
              {/* Image */}
              <motion.div
                className={`relative min-h-[320px] overflow-hidden lg:min-h-full ${
                  i % 2 === 0 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />

                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-lg font-extrabold text-juice-ink shadow-lg backdrop-blur-md"
                >
                  <CountUp value={i + 1} pad={2} />
                </motion.div>
              </motion.div>

              {/* Content */}
              <div
                className={`flex items-center p-8 sm:p-12 lg:p-16 ${
                  i % 2 === 0 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="max-w-xl">
                  <motion.p
                    initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-sm font-bold uppercase tracking-[0.2em] text-juice-red"
                  >
                    Why Mr. Juice
                  </motion.p>

                  <motion.h3
                    initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 font-display text-4xl font-extrabold leading-tight text-juice-ink sm:text-5xl lg:text-6xl"
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-6 max-w-lg text-base leading-8 text-juice-ink/60 sm:text-lg"
                  >
                    {item.text}
                  </motion.p>

                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: 80, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-8 h-1 rounded-full bg-juice-red"
                  />
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}