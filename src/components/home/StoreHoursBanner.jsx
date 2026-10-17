// src/components/home/StoreHoursBanner.jsx

import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { outlets, storeHours } from "../../data/outlets.js";
import { isOpenNow } from "../../utils/delivery.js";

export default function StoreHoursBanner() {
  const qasimabadHours = outlets.find((outlet) => outlet.id === "qasimabad")?.hours;

  // Live re-check every 60 seconds
  const [open, setOpen] = useState(isOpenNow(qasimabadHours));

  useEffect(() => {
    const timer = setInterval(() => {
      setOpen(isOpenNow(qasimabadHours));
    }, 60000);
    return () => clearInterval(timer);
  }, [qasimabadHours]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 border-y border-juice-ink/10 bg-white py-3 text-xs sm:text-sm">
      {/* Open / closed pill */}
      <span
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-bold ${
          open
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            open ? "bg-green-500 animate-pulse" : "bg-red-500"
          }`}
        />
        {open ? "Open now" : "Closed"}
      </span>

      {/* Store hours */}
      <span className="inline-flex items-center gap-2 text-juice-ink/70">
        <Clock size={14} />
        Store: <strong>{storeHours.display}</strong>
      </span>

      {/* Delivery hours */}
      <span className="inline-flex items-center gap-2 text-juice-ink/70">
        🛵 Delivery: <strong>{storeHours.deliveryDisplay}</strong>
      </span>
    </div>
  );
}