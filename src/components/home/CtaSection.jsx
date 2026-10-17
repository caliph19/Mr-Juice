// src/components/home/CtaSection.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Reveal from "../Reveal.jsx";

export default function CtaSection() {
  return (
    <section className="container-brand py-16 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-juice-ink px-8 py-14 text-center sm:px-16">
          <div className="absolute -left-10 -top-10 h-56 w-56 animate-spinSlow rounded-full border-4 border-dashed border-juice-mango/20" />
          <div className="absolute -bottom-16 -right-10 h-64 w-64 animate-spinSlow rounded-full border-4 border-dashed border-juice-leaf/20 [animation-direction:reverse]" />

          <p className="eyebrow">Craving something fresh?</p>

          <h2 className="mx-auto mt-2 max-w-lg font-display text-3xl font-extrabold text-cream sm:text-4xl">
            Choose your favorites and tell us where to deliver.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/menu" className="btn-primary">
              Browse the menu
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      </Reveal>
    </section>
  );
}