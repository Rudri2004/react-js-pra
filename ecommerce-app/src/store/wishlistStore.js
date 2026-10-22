
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],

      addToWishlist: (product) =>
        set((state) => {
          const alreadyExists = state.wishlist.some(
            (item) => item.id === product.id
          );

          if (alreadyExists) {
            return state;
          }

          return {
            wishlist: [...state.wishlist, product],
          };
        }),

     
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => item.id !== productId
          ),
        })),

    
      toggleWishlist: (product) =>
        set((state) => {
          const alreadyExists = state.wishlist.some(
            (item) => item.id === product.id
          );

          return {
            wishlist: alreadyExists
              ? state.wishlist.filter(
                  (item) => item.id !== product.id
                )
              : [...state.wishlist, product],
          };
        }),

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "shopease-wishlist",
    }
  )
);

export default useWishlistStore;
