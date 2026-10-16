import { create } from "zustand";
import { persist } from "zustand/middleware";

import useCartStore from "@/store/cartStore";
import useWishlistStore from "@/store/wishlistStore";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // All accounts registered in this demo
      registeredUsers: [],

      // Currently logged-in user
      user: null,
      isAuthenticated: false,

      // Register a new account
      registerUser: (newUser) => {
        const users = get().registeredUsers;

        const usernameExists = users.some(
          (user) =>
            user.username.toLowerCase() ===
            newUser.username.toLowerCase()
        );

        if (usernameExists) {
          return {
            success: false,
            message: "Username already exists.",
          };
        }

        const emailExists = users.some(
          (user) =>
            user.email.toLowerCase() ===
            newUser.email.toLowerCase()
        );

        if (emailExists) {
          return {
            success: false,
            message: "Email is already registered.",
          };
        }

        set({
          registeredUsers: [...users, newUser],
        });

        return {
          success: true,
          message: "Account created successfully.",
        };
      },


      login: (username, password) => {
        const account = get().registeredUsers.find(
          (user) =>
            user.username.toLowerCase() ===
              username.trim().toLowerCase() &&
            user.password === password
        );

        if (!account) {
          return {
            success: false,
            message: "Invalid username or password.",
          };
        }

       
        const { password: _password, ...safeUser } = account;

        set({
          user: safeUser,
          isAuthenticated: true,
        });

        return {
          success: true,
          message: "Login successful.",
        };
      },

     
      logout: () => {
        // Clear persisted cart
        useCartStore.getState().clearCart();

       
        useWishlistStore.getState().clearWishlist();

     
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "shopease-auth",
      partialize: (state) => ({
        registeredUsers: state.registeredUsers,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;