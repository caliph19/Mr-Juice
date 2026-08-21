import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, X, Check } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function OutletModal() {
  const { outlets, isOutletModalOpen, setOutletModalOpen, chooseOutlet, selectedOutlet } = useApp();

  return (
    <AnimatePresence>
      {isOutletModalOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-juice-ink/60 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOutletModalOpen(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="w-full max-w-lg rounded-t-3xl bg-cream p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow">Where should we send it?</p>
                <h3 className="font-display text-2xl font-extrabold text-juice-ink">
                  Choose your outlet
                </h3>
              </div>
              <button
                onClick={() => setOutletModalOpen(false)}
                className="rounded-full bg-juice-ink/5 p-2 text-juice-ink hover:bg-juice-ink/10"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 grid max-h-[55vh] gap-3 overflow-y-auto pr-1">
              {outlets.map((o) => {
                const active = selectedOutlet?.id === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => chooseOutlet(o.id)}
                    className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                      active
                        ? "border-juice-red bg-juice-red/5"
                        : "border-juice-ink/10 hover:border-juice-mango hover:bg-juice-mango/10"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        active ? "bg-juice-red text-cream" : "bg-juice-ink/5 text-juice-ink"
                      }`}
                    >
                      {active ? <Check size={16} /> : <MapPin size={16} />}
                    </span>
                    <span>
                      <span className="block font-display font-bold text-juice-ink">{o.name}</span>
                      <span className="block text-sm text-juice-ink/60">{o.address}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
