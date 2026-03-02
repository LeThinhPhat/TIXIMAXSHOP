import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string; // slug hoặc unique id
  name: string;
  image: string;
  price: string; // VD: "3.290.000đ"
  priceNumber: number; // VD: 3290000 (để tính tổng)
  size?: string;
  color?: string;
  qty: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string, size?: string, color?: string) => void;
  updateQty: (
    id: string,
    size: string | undefined,
    color: string | undefined,
    qty: number,
  ) => void;
  clearCart: () => void;
  totalQty: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.id === newItem.id &&
              i.size === newItem.size &&
              i.color === newItem.color,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id &&
                i.size === newItem.size &&
                i.color === newItem.color
                  ? { ...i, qty: i.qty + 1 }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...newItem, qty: 1 }] };
        });
      },

      removeItem: (id, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.size === size && i.color === color),
          ),
        }));
      },

      updateQty: (id, size, color, qty) => {
        if (qty <= 0) {
          get().removeItem(id, size, color);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.size === size && i.color === color
              ? { ...i, qty }
              : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalQty: () => get().items.reduce((sum, i) => sum + i.qty, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.priceNumber * i.qty, 0),
    }),
    {
      name: "emcomerfado-cart", // key trong localStorage
    },
  ),
);
