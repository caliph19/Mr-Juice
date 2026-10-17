import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { outlets } from "../data/outlets.js";

const AppContext = createContext(null);

const OUTLET_KEY = "mrjuice_outlet";
const CART_KEY = "mrjuice_cart";
const DELIVERY_FEE = 100;

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

  const chooseOutlet = useCallback((id) => {
    setSelectedOutletId(id);
    setOutletModalOpen(false);
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

  const sendCartOrder = useCallback((customer) => {
    if (cart.length === 0) return;

    const outlet = selectedOutlet || outlets[0];
    const itemLines = cart
      .map((line) =>
        `----------------------------\n${line.name}${line.qty > 1 ? ` x${line.qty}` : ""}\nPrice: Rs. ${line.price * line.qty}`
      )
      .join("\n");
    const specialInstruction = customer.specialInstruction.trim();
    const message =
      `NEW FOOD MOOD ORDER\n\n` +
      `Customer: ${customer.name.trim()}\n\n` +
      `Phone: ${customer.phone.trim()}\n\n` +
      `Address: ${customer.address.trim()}\n\n` +
      (specialInstruction
        ? `Special Instruction: ${specialInstruction}\n\n`
        : "") +
      `${itemLines}\n\n` +
      `Subtotal: Rs. ${cartTotal}\n` +
      `Delivery: Rs. ${DELIVERY_FEE}\n` +
      `Total: Rs. ${cartTotal + DELIVERY_FEE}\n\n` +
      `Please confirm my order.`;
    const url = `https://wa.me/${outlet.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, [cart, cartTotal, selectedOutlet]);

  const value = {
    outlets,
    selectedOutlet,
    chooseOutlet,
    isOutletModalOpen,
    setOutletModalOpen,
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    deliveryFee: DELIVERY_FEE,
    isCartOpen,
    setCartOpen,
    sendCartOrder
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
