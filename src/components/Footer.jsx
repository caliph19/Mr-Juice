import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import Logo from "./Logo.jsx";
import { outlets, social } from "../data/outlets.js";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-juice-ink text-cream">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-juice-red/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-juice-leaf/20 blur-3xl" />

      <div className="container-brand relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo size="sm" dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Fresh juices, smoothies, detox blends, shakes &amp; slushies — blended to order
            across Karachi &amp; Hyderabad.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={social.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-cream/10 p-2.5 transition hover:bg-juice-leaf"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-cream/10 p-2.5 transition hover:bg-juice-red"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={social.instagram}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-cream/10 p-2.5 transition hover:bg-juice-mango hover:text-juice-ink"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={`mailto:${social.email}`}
              className="rounded-full bg-cream/10 p-2.5 transition hover:bg-cream hover:text-juice-ink"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-juice-mango">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li><Link to="/" className="transition hover:text-cream">Home</Link></li>
            <li><Link to="/about" className="transition hover:text-cream">About</Link></li>
            <li><Link to="/menu" className="transition hover:text-cream">Menu</Link></li>
            <li><Link to="/gallery" className="transition hover:text-cream">Gallery</Link></li>
            <li><Link to="/contact" className="transition hover:text-cream">Contact</Link></li>
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-juice-mango">
            Our Outlets
          </h4>
          <ul className="mt-4 grid gap-3 text-sm text-cream/80 sm:grid-cols-2">
            {outlets.map((o) => (
              <li key={o.id}>
                <span className="block font-display font-semibold text-cream">{o.name}</span>
                <span className="text-cream/60">{o.address}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5">
        <div className="container-brand flex flex-col items-center justify-between gap-2 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Mr. Juice. All rights reserved.</p>
          <p>Smoothy &amp; slushy master 🍹</p>
        </div>
      </div>
    </footer>
  );
}
