
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      // Add product to cart
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
            items: [...state.items, { ...product, quantity }],
          };
        }),

      // Remove product from cart
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== productId
          ),
        })),

      // Update product quantity
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

      // Empty the entire cart
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "shopease-cart",
    }
  )
);

export default useCartStore;
