import React from "react";
import { MessageCircle } from "lucide-react";
import { social } from "../data/outlets.js";

export default function WhatsAppFloat() {
  return (
    <a
      href={social.whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-6 right-5 z-40 flex items-center gap-2 rounded-full bg-juice-leaf px-4 py-3.5 text-cream shadow-pop transition-all duration-300 hover:pr-5 sm:bottom-8 sm:right-8"
      aria-label="Chat with Mr. Juice on WhatsApp"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-juice-leaf/60" />
      <MessageCircle size={22} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-display text-sm font-semibold transition-all duration-300 group-hover:max-w-[10rem]">
        Chat on WhatsApp
      </span>
    </a>
  );
}
