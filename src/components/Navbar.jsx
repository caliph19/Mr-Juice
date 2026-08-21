import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, MapPin } from "lucide-react";
import Logo from "./Logo.jsx";
import { useApp } from "../context/AppContext.jsx";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { selectedOutlet, setOutletModalOpen, cartCount, setCartOpen } = useApp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
<header
  className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
    scrolled
      ? "bg-white/70 shadow-md backdrop-blur-sm"
      : "bg-black/0 backdrop-blur-sm"
  }`}
>
      <nav className="container-brand flex items-center justify-between py-3">
        <NavLink to="/" onClick={() => setOpen(false)} aria-label="Mr. Juice home">
          <Logo size="sm" />
        </NavLink>

<div className="hidden items-center gap-1 md:flex">
  {LINKS.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === "/"}
      className={({ isActive }) =>
        `relative rounded-full px-4 py-2.5 font-display text-base font-semibold transition-all duration-300 ${
          isActive
            ? "text-juice-red"
            : "text-black hover:text-juice-red"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {link.label}

          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute -bottom-0.5 left-4 right-4 h-[3px] rounded-full bg-juice-red"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
        </>
      )}
    </NavLink>
  ))}
</div>

       <div className="flex items-center gap-2">

  {/* Select Outlet */}
  <button
    onClick={() => setOutletModalOpen(true)}
    className="hidden items-center gap-1.5 rounded-full border-2 border-black/15 bg-white px-3 py-2 font-display text-xs font-semibold text-black transition-all duration-300 hover:border-juice-red hover:text-juice-red sm:flex"
  >
    <MapPin size={14} />
    {selectedOutlet ? selectedOutlet.name : "Select outlet"}
  </button>


  {/* Cart Button */}
  <button
    onClick={() => setCartOpen(true)}
    className="relative rounded-full bg-black p-2.5 text-white transition-all duration-300 hover:bg-juice-red"
    aria-label="Open order cart"
  >
    <ShoppingBag size={18} />

    {cartCount > 0 && (
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-juice-red text-[11px] font-bold text-white">
        {cartCount}
      </span>
    )}
  </button>


  {/* Mobile Menu */}
  <button
    className="rounded-full bg-black p-2.5 text-white transition-all duration-300 hover:bg-juice-red md:hidden"
    onClick={() => setOpen((v) => !v)}
    aria-label="Toggle menu"
  >
    {open ? <X size={20} /> : <Menu size={20} />}
  </button>

</div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-cream/95 backdrop-blur-md md:hidden"
          >
            <div className="container-brand flex flex-col gap-1 pb-4">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 font-display font-semibold ${
                      isActive ? "bg-juice-red text-cream" : "text-juice-ink hover:bg-juice-ink/5"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <button
                onClick={() => {
                  setOutletModalOpen(true);
                  setOpen(false);
                }}
                className="mt-1 flex items-center gap-2 rounded-xl border-2 border-juice-ink/15 px-4 py-3 text-left font-display font-semibold text-juice-ink"
              >
                <MapPin size={16} />
                {selectedOutlet ? `Ordering from ${selectedOutlet.name}` : "Select an outlet"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}