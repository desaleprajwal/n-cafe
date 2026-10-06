import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { menuItems } from "../data/menu";
import { menuImages } from "../data/menuImages";
import { OrderContext } from "./OrderContext";

const CART_KEY = "ncafe-cart-v1";

function readCart() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.flatMap((savedItem) => {
      const item = menuItems.find((entry) => entry.name === savedItem.name && entry.category === savedItem.category);
      const quantity = Number(savedItem.quantity);
      return item && Number.isInteger(quantity) && quantity > 0
        ? [{ ...item, image: menuImages[item.category], quantity }]
        : [];
    });
  } catch {
    return [];
  }
}

export function OrderProvider({ children }) {
  const [cart, setCart] = useState(readCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart.map(({ name, category, quantity }) => ({ name, category, quantity }))));
    } catch {
      // Keep the in-memory cart usable when storage is unavailable.
    }
  }, [cart]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2200);
  }, []);

  const addItem = useCallback((item, quantity = 1) => {
    setCart((current) => {
      const found = current.find((entry) => entry.name === item.name);
      if (found) return current.map((entry) => entry.name === item.name ? { ...entry, quantity: entry.quantity + quantity } : entry);
      return [...current, { ...item, image: item.image || menuImages[item.category], quantity }];
    });
    showToast(`${item.name} added to cart`);
  }, [showToast]);

  const setQuantity = useCallback((name, quantity) => {
    setCart((current) => current.map((item) => item.name === name ? { ...item, quantity: Math.max(1, quantity) } : item));
  }, []);

  const removeItem = useCallback((name) => {
    setCart((current) => current.filter((item) => item.name !== name));
  }, []);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = useMemo(() => ({
    cart, itemCount, subtotal, isCartOpen, setIsCartOpen, toast,
    addItem, setQuantity, removeItem,
  }), [cart, itemCount, subtotal, isCartOpen, toast, addItem, setQuantity, removeItem]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
