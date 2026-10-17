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
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center"
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
            className="w-[90%] max-w-lg rounded-t-3xl border border-red-500/30 bg-[#171717] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:rounded-3xl sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                  Where should we send it?
                </p>
                <h3 className="font-display text-2xl font-extrabold text-white">
                  Choose your outlet
                </h3>
              </div>
              <button
                onClick={() => setOutletModalOpen(false)}
                className="rounded-full bg-white/10 p-2 text-white transition hover:bg-red-600"
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
                        ? "border-red-500 bg-red-500/10"
                        : "border-white/10 hover:border-red-500/70 hover:bg-red-500/5"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        active ? "bg-red-600 text-white" : "bg-white/10 text-red-300"
                      }`}
                    >
                      {active ? <Check size={16} /> : <MapPin size={16} />}
                    </span>
                    <span>
                      <span className="block font-display font-bold text-white">{o.name}</span>
                      <span className="block text-sm text-white/60">{o.address}</span>
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
