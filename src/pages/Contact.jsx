import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, MessageCircle, Facebook, Instagram, Mail, Send } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import { outlets, social } from "../data/outlets.js";

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    const text =
      `Hi Mr. Juice! My name is ${name || "—"}.\n\n${message || "I'd like to know more."}`;
    window.open(`${social.whatsappLink}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <section className="container-brand pb-6 pt-10 text-center sm:pt-16">
        <Reveal>
          <p className="eyebrow">Let's talk</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-juice-ink sm:text-5xl">
            Contact &amp; Outlets
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-juice-ink/60">
            Message us directly, or head straight to the outlet nearest you.
          </p>
        </Reveal>
      </section>

      <section className="container-brand grid gap-6 pb-16 lg:grid-cols-3">
        <Reveal className="lg:col-span-1">
          <div className="card-outline flex h-full flex-col justify-between p-7">
            <div>
              <h2 className="font-display text-xl font-extrabold text-juice-ink">Quick message</h2>
              <p className="mt-1 text-sm text-juice-ink/60">
                Sends straight to our WhatsApp — no waiting on email.
              </p>
              <form onSubmit={sendMessage} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-juice-ink/50">
                    Your name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="e.g. Ayesha"
                    className="w-full rounded-xl border-2 border-juice-ink/10 bg-white px-4 py-3 text-sm outline-none focus:border-juice-red"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-juice-ink/50">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Ask about catering, timings, an outlet…"
                    className="w-full resize-none rounded-xl border-2 border-juice-ink/10 bg-white px-4 py-3 text-sm outline-none focus:border-juice-red"
                  />
                </div>
                <button type="submit" className="btn-whatsapp w-full py-3">
                  <Send size={16} /> Send via WhatsApp
                </button>
              </form>
            </div>

            <div className="mt-8 space-y-3 border-t-2 border-juice-ink/10 pt-6">
              <a href={social.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-semibold text-juice-ink hover:text-juice-red">
                <MessageCircle size={17} className="text-juice-leaf" /> {social.whatsapp}
              </a>
              <a href={`mailto:${social.email}`} className="flex items-center gap-3 text-sm font-semibold text-juice-ink hover:text-juice-red">
                <Mail size={17} className="text-juice-red" /> {social.email}
              </a>
              <div className="flex gap-3 pt-1">
                <a href={social.facebook} target="_blank" rel="noreferrer" className="rounded-full bg-juice-ink/5 p-2.5 text-juice-ink transition hover:bg-juice-red hover:text-cream" aria-label="Facebook">
                  <Facebook size={16} />
                </a>
                <a href={social.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-juice-ink/5 p-2.5 text-juice-ink transition hover:bg-juice-red hover:text-cream" aria-label="Instagram">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
          {outlets.map((o, i) => (
            <Reveal key={o.id} delay={(i % 4) * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className="flex h-full flex-col justify-between rounded-3xl border-2 border-juice-ink/8 bg-white/80 p-6 shadow-sm transition-shadow hover:shadow-card"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-juice-red/10 text-juice-red">
                      <MapPin size={16} />
                    </span>
                    <h3 className="font-display text-lg font-extrabold text-juice-ink">{o.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-juice-ink/60">{o.address}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-juice-ink/5 px-3.5 py-2 font-display text-xs font-semibold text-juice-ink transition hover:bg-juice-mango"
                  >
                    <Navigation size={13} /> Directions
                  </a>
                  <a
                    href={`https://wa.me/${o.whatsapp}?text=${encodeURIComponent(
                      `Hi Mr. Juice! I'd like to order from your ${o.name} outlet.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-juice-leaf px-3.5 py-2 font-display text-xs font-semibold text-cream transition hover:bg-juice-leaf-dark"
                  >
                    <MessageCircle size={13} /> Order here
                  </a>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
