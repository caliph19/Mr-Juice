import React, { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { outlets } from "../data/outlets.js";

const AppContext = createContext(null);

const OUTLET_KEY = "mrjuice_outlet";
const CART_KEY = "mrjuice_cart";

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [selectedOutletId, setSelectedOutletId] = useState(() => readStorage(OUTLET_KEY, null));
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));
  const [isOutletModalOpen, setOutletModalOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const pendingActionRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(OUTLET_KEY, JSON.stringify(selectedOutletId));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [selectedOutletId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [cart]);

  const selectedOutlet = useMemo(
    () => outlets.find((o) => o.id === selectedOutletId) || null,
    [selectedOutletId]
  );

  // Kept alongside state so callbacks queued before an outlet is chosen
  // (see requireOutlet/chooseOutlet) always read the outlet picked, not a
  // stale closure from before the pick.
  const selectedOutletRef = useRef(selectedOutlet);
  useEffect(() => {
    selectedOutletRef.current = selectedOutlet;
  }, [selectedOutlet]);

  const chooseOutlet = useCallback((id) => {
    setSelectedOutletId(id);
    setOutletModalOpen(false);
    selectedOutletRef.current = outlets.find((o) => o.id === id) || null;
    // Resume whatever action (single order / cart checkout) opened the
    // outlet picker in the first place. Called synchronously (not via
    // setTimeout) so window.open still counts as a direct result of the
    // user's click and isn't blocked as a popup.
    const pending = pendingActionRef.current;
    pendingActionRef.current = null;
    if (pending) pending();
  }, []);

  const addToCart = useCallback((item, categoryName) => {
    setCart((prev) => {
      const key = `${categoryName}::${item.name}`;
      const existing = prev.find((line) => line.key === key);
      if (existing) {
        return prev.map((line) =>
          line.key === key ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [
        ...prev,
        {
          key,
          name: item.name,
          desc: item.desc || "",
          price: item.price,
          category: categoryName,
          qty: 1
        }
      ];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((key, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((line) => line.key !== key)
        : prev.map((line) => (line.key === key ? { ...line, qty } : line))
    );
  }, []);

  const removeFromCart = useCallback((key) => {
    setCart((prev) => prev.filter((line) => line.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.price * line.qty, 0),
    [cart]
  );
  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.qty, 0), [cart]);

  const requireOutlet = useCallback(
    (after) => {
      if (selectedOutlet) {
        after?.();
      } else {
        pendingActionRef.current = after || null;
        setOutletModalOpen(true);
      }
    },
    [selectedOutlet]
  );

  const buildWhatsAppUrl = useCallback(
    ({ singleItem } = {}) => {
      const outlet = selectedOutletRef.current || outlets[0];
      const lines = singleItem ? [{ ...singleItem, qty: 1 }] : cart;
      const itemLines = lines
        .map((l) => `• ${l.name}${l.qty > 1 ? ` x${l.qty}` : ""} — Rs. ${l.price * l.qty}`)
        .join("\n");
      const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
      const message =
        `Hi Mr. Juice! 🧃 I'd like to order from your *${outlet.name}* outlet:\n\n` +
        `${itemLines}\n\n` +
        `Total: Rs. ${total}\n\n` +
        `Please confirm availability. Thank you!`;
      return `https://wa.me/${outlet.whatsapp}?text=${encodeURIComponent(message)}`;
    },
    [cart]
  );

  const orderSingleItem = useCallback(
    (item, categoryName) => {
      requireOutlet(() => {
        const url = buildWhatsAppUrl({
          singleItem: { name: item.name, price: item.price, category: categoryName }
        });
        window.open(url, "_blank", "noopener,noreferrer");
      });
    },
    [requireOutlet, buildWhatsAppUrl]
  );

  const sendCartOrder = useCallback(() => {
    requireOutlet(() => {
      if (cart.length === 0) return;
      const url = buildWhatsAppUrl();
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }, [requireOutlet, buildWhatsAppUrl, cart.length]);

  const value = {
    outlets,
    selectedOutlet,
    chooseOutlet,
    isOutletModalOpen,
    setOutletModalOpen,
    requireOutlet,
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    isCartOpen,
    setCartOpen,
    orderSingleItem,
    sendCartOrder
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
