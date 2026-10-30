import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Client-side cart & wishlist. Swap persistence for API calls when a backend exists.
export type CartItem = { productId: string; size: string; price: number; qty: number };

type Ctx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  cartCount: number;
  cartTotal: number;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
    } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("cart", JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) localStorage.setItem("wishlist", JSON.stringify(wishlist)); }, [wishlist, ready]);

  const value: Ctx = {
    cart, wishlist,
    addToCart: (item, qty = 1) =>
      setCart((c) => {
        const ex = c.find((i) => i.productId === item.productId && i.size === item.size);
        if (ex) return c.map((i) => (i === ex ? { ...i, qty: i.qty + qty } : i));
        return [...c, { ...item, qty }];
      }),
    updateQty: (id, size, qty) =>
      setCart((c) => c.map((i) => (i.productId === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i))),
    removeFromCart: (id, size) => setCart((c) => c.filter((i) => !(i.productId === id && i.size === size))),
    clearCart: () => setCart([]),
    toggleWishlist: (id) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    cartTotal: cart.reduce((s, i) => s + i.qty * i.price, 0),
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
