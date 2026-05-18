import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { Product } from "./types";

type CartLine = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  totalValue: number;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "basic-shop-cart";

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartLine[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored) as CartLine[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems((previous) => {
      const existing = previous.find((line) => line.product.id === product.id);
      if (existing) {
        return previous.map((line) =>
          line.product.id === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line
        );
      }

      return [...previous, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((previous) => {
      const line = previous.find((entry) => entry.product.id === productId);
      if (!line) {
        return previous;
      }

      if (line.quantity === 1) {
        return previous.filter((entry) => entry.product.id !== productId);
      }

      return previous.map((entry) =>
        entry.product.id === productId
          ? { ...entry, quantity: entry.quantity - 1 }
          : entry
      );
    });
  }, []);

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, line) => sum + line.quantity, 0);
    const totalValue = items.reduce(
      (sum, line) => sum + line.product.price * line.quantity,
      0
    );

    return {
      items,
      itemCount,
      totalValue,
      addItem,
      removeItem,
    };
  }, [addItem, items, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}