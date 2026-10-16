
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      // Add a product or increase its existing quantity
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: Math.max(1, quantity),
              },
            ],
          };
        }),

      // Remove a product completely
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== productId
          ),
        })),

      // Increase or decrease product quantity
      // Quantity below 1 removes the product
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity < 1
              ? state.items.filter(
                  (item) => item.id !== productId
                )
              : state.items.map((item) =>
                  item.id === productId
                    ? { ...item, quantity }
                    : item
                ),
        })),

      // Clear all cart items
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "shopease-cart",
    }
  )
);

export default useCartStore;
