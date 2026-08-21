import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, MessageCircle, MapPin } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function CartDrawer() {
  const {
    isCartOpen,
    setCartOpen,
    cart,
    updateQty,
    removeFromCart,
    cartTotal,
    selectedOutlet,
    setOutletModalOpen,
    sendCartOrder
  } = useApp();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-juice-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b-2 border-juice-ink/10 px-6 py-5">
              <h3 className="font-display text-xl font-extrabold text-juice-ink">Your Order</h3>
              <button
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
              {selectedOutlet ? `Pickup from ${selectedOutlet.name}` : "Select a pickup outlet"}
            </button>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <span className="text-5xl">🧃</span>
                  <p className="font-display font-semibold text-juice-ink">Your cart is empty</p>
                  <p className="max-w-[220px] text-sm text-juice-ink/60">
                    Browse the menu and tap "Add" on anything that looks good.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((line) => (
                    <li key={line.key} className="flex items-start gap-3 rounded-2xl bg-white/60 p-3">
                      <div className="flex-1">
                        <p className="font-display font-bold text-juice-ink">{line.name}</p>
                        <p className="text-xs uppercase tracking-wide text-juice-ink/50">{line.category}</p>
                        <p className="mt-1 font-display text-sm font-semibold text-juice-red">
                          Rs. {line.price * line.qty}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(line.key, line.qty - 1)}
                          className="rounded-full bg-juice-ink/5 p-1.5 hover:bg-juice-ink/10"
                          aria-label={`Decrease ${line.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-5 text-center font-display font-bold">{line.qty}</span>
                        <button
                          onClick={() => updateQty(line.key, line.qty + 1)}
                          className="rounded-full bg-juice-ink/5 p-1.5 hover:bg-juice-ink/10"
                          aria-label={`Increase ${line.name}`}
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeFromCart(line.key)}
                          className="ml-1 rounded-full p-1.5 text-juice-red/70 hover:bg-juice-red/10"
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

            <div className="border-t-2 border-juice-ink/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between font-display">
                <span className="text-juice-ink/70">Total</span>
                <span className="text-xl font-extrabold text-juice-ink">Rs. {cartTotal}</span>
              </div>
              <button
                onClick={sendCartOrder}
                disabled={cart.length === 0}
                className="btn-whatsapp w-full py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-40"
              >
                <MessageCircle size={20} />
                Send order on WhatsApp
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
