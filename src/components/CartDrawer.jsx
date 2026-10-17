// src/components/CartDrawer.jsx

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

const PHONE_REGEX = /^03\d{9}$/;

export default function CartDrawer() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    specialInstruction: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const {
    isCartOpen,
    setCartOpen,
    cart,
    updateQty,
    removeFromCart,
    cartTotal,
    deliveryFee,
    selectedOutlet,
    setOutletModalOpen,
    sendCartOrder,
  } = useApp();
  const orderTotal = cartTotal + deliveryFee;

  useEffect(() => {
    if (!isCartOpen && !isCheckoutOpen) return undefined;
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [isCartOpen, isCheckoutOpen]);

  const handlePhoneChange = (value) => {
    // keep digits only, max 11
    const digits = value.replace(/\D/g, "").slice(0, 11);
    setCustomer((prev) => ({ ...prev, phone: digits }));
    if (phoneError) setPhoneError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!PHONE_REGEX.test(customer.phone)) {
      setPhoneError(
        "Enter a valid Pakistani number (11 digits, starting with 03)."
      );
      return;
    }

    sendCartOrder(customer);
    setIsCheckoutOpen(false);
    setPhoneError("");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-juice-ink/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
<motion.aside
  role="dialog"
  aria-modal="true"
  aria-labelledby="cart-title"
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ type: "spring", damping: 30, stiffness: 300 }}
  className="fixed right-0 top-0 z-[70] flex h-full w-full flex-col overflow-hidden border-l border-juice-ink/10 bg-white shadow-2xl sm:w-2/5"
>
            <div className="flex shrink-0 items-center justify-between border-b-2 border-juice-ink/10 px-6 py-5">
              <h3 id="cart-title" className="font-display text-xl font-extrabold text-juice-ink">
                Your Order
              </h3>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="rounded-full bg-juice-ink/5 p-2 hover:bg-juice-ink/10"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            <button
              onClick={() => setOutletModalOpen(true)}
              className="mx-6 mt-4 flex items-center gap-2 rounded-xl border-2 border-dashed border-juice-red/40 bg-juice-red/5 px-4 py-3 text-left font-display text-sm font-semibold text-juice-red"
            >
              <MapPin size={16} />
              {selectedOutlet
                ? `Ordering from ${selectedOutlet.name}`
                : "Choose an outlet (optional)"}
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <span className="text-5xl">🧃</span>
                  <p className="font-display font-semibold text-juice-ink">
                    Your cart is empty
                  </p>
                  <p className="max-w-[220px] text-sm text-juice-ink/60">
                    Browse the menu and tap "Add" on anything that looks good.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((line) => (
                    <li
                      key={line.key}
                      className="flex items-center gap-3 rounded-2xl bg-black/5 p-3"
                    >
                      <div className="flex-1">
                        <p className="font-display font-bold text-juice-ink">
                          {line.name}
                        </p>
                        <p className="text-xs uppercase tracking-wide text-juice-ink/50">
                          {line.category}
                        </p>
                        <p className="mt-1 font-display text-sm font-semibold text-juice-red">
                          Rs. {line.price * line.qty}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, line.qty - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-juice-red/15 bg-white text-juice-red shadow-sm transition hover:border-juice-red hover:bg-juice-red hover:text-white active:scale-95"
                          aria-label={`Decrease ${line.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-8 text-center font-display text-sm font-extrabold text-juice-ink">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, line.qty + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-juice-red/15 bg-white text-juice-red shadow-sm transition hover:border-juice-red hover:bg-juice-red hover:text-white active:scale-95"
                          aria-label={`Increase ${line.name}`}
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(line.key)}
                          className="ml-1 rounded-full p-1.5 text-juice-red/70 transition hover:bg-juice-red/10 hover:text-juice-red"
                          aria-label={`Remove ${line.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="shrink-0 border-t-2 border-juice-ink/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between font-display">
                <span className="text-juice-ink/70">Subtotal</span>
                <span className="text-xl font-extrabold text-juice-ink">
                  Rs. {cartTotal}
                </span>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                disabled={cart.length === 0}
                className="w-full rounded-full bg-juice-red py-3.5 text-base font-bold text-white transition hover:bg-juice-red/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Proceed Ordering
              </button>
            </div>
          </motion.aside>
        </>
      )}

      {isCheckoutOpen && (
        <motion.div
          key="checkout-backdrop"
          className="fixed inset-0 z-[90] h-full flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCheckoutOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            className="no-scrollbar max-h-[90vh] w-full  [scrollbar-width:none] max-w-lg overflow-y-auto rounded-3xl border border-juice-ink/10 bg-white p-5 text-juice-ink shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-juice-red">
                  Almost there
                </p>
                <h3
                  id="checkout-title"
                  className="mt-1 font-display text-2xl font-extrabold text-juice-ink"
                >
                  Order details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="rounded-full bg-juice-ink/5 p-2 text-juice-ink transition hover:bg-juice-red hover:text-white"
                aria-label="Close checkout"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <label className="block text-sm font-semibold text-juice-ink">
                Name
                <input
                  required
                  autoComplete="name"
                  value={customer.name}
                  onChange={(event) =>
                    setCustomer({ ...customer, name: event.target.value })
                  }
                  className="mt-1.5 w-full rounded-xl border border-juice-ink/15 bg-white px-4 py-3 font-normal text-juice-ink outline-none placeholder:text-juice-ink/40 focus:border-juice-red focus:ring-1 focus:ring-juice-red"
                />
              </label>

              <label className="block text-sm font-semibold text-juice-ink">
                Phone number
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  maxLength={11}
                  autoComplete="tel"
                  placeholder="03XXXXXXXXX"
                  value={customer.phone}
                  onChange={(event) => handlePhoneChange(event.target.value)}
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                  className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 font-normal text-juice-ink outline-none placeholder:text-juice-ink/40 focus:ring-1 ${
                    phoneError
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-juice-ink/15 focus:border-juice-red focus:ring-juice-red"
                  }`}
                />
                {phoneError && (
                  <span
                    id="phone-error"
                    className="mt-1 block text-xs font-medium text-red-500"
                  >
                    {phoneError}
                  </span>
                )}
              </label>

              <label className="block text-sm font-semibold text-juice-ink">
                Delivery address
                <textarea
                  required
                  autoComplete="street-address"
                  rows={2}
                  value={customer.address}
                  onChange={(event) =>
                    setCustomer({ ...customer, address: event.target.value })
                  }
                  className="mt-1.5 w-full resize-y rounded-xl border border-juice-ink/15 bg-white px-4 py-3 font-normal text-juice-ink outline-none placeholder:text-juice-ink/40 focus:border-juice-red focus:ring-1 focus:ring-juice-red"
                />
              </label>

              <label className="block text-sm font-semibold text-juice-ink">
                Special instructions{" "}
                <span className="font-normal text-juice-ink/50">(optional)</span>
                <textarea
                  rows={2}
                  value={customer.specialInstruction}
                  onChange={(event) =>
                    setCustomer({
                      ...customer,
                      specialInstruction: event.target.value,
                    })
                  }
                  className="mt-1.5 w-full resize-y rounded-xl border border-juice-ink/15 bg-white px-4 py-3 font-normal text-juice-ink outline-none placeholder:text-juice-ink/40 focus:border-juice-red focus:ring-1 focus:ring-juice-red"
                />
              </label>

              <div className="space-y-2 rounded-2xl border border-juice-red/20 bg-juice-red/5 p-4 text-sm text-juice-ink">
                <div className="flex justify-between">
                  <span className="text-juice-ink/60">Subtotal</span>
                  <span>Rs. {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-juice-ink/60">Delivery</span>
                  <span>Rs. {deliveryFee}</span>
                </div>
                <div className="flex justify-between border-t border-juice-ink/10 pt-2 font-display text-base font-extrabold text-juice-red">
                  <span>Total</span>
                  <span>Rs. {orderTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-juice-red py-3.5 text-base font-bold text-white shadow-lg shadow-juice-red/30 transition hover:bg-juice-red/90"
              >
                <MessageCircle size={20} />
                Send order on WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}