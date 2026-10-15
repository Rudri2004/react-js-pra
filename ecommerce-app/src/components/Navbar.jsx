
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Store,
  UserRound,
  Heart,
} from "lucide-react";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import useWishlistStore from "@/store/wishlistStore";

export default function Navbar() {
  const navigate = useNavigate();

  // Cart store
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  // Wishlist store
  const wishlist = useWishlistStore((state) => state.wishlist);
  const clearWishlist = useWishlistStore(
    (state) => state.clearWishlist
  );

  // Authentication store
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const logout = useAuthStore((state) => state.logout);

  // Cart and wishlist counts
  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  // Logout and clear cart and wishlist
  const handleLogout = () => {
    clearCart();
    clearWishlist();
    logout();

    navigate("/login", { replace: true });
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-gray-900"
        >
          <Store size={28} />
          E-Store
        </Link>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black sm:text-base"
          >
            <Heart
              size={21}
              className={
                wishlistCount > 0
                  ? "fill-red-500 text-red-500"
                  : ""
              }
            />

            {wishlistCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black sm:text-base"
          >
            <ShoppingCart size={23} />

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Authentication */}
          {isAuthenticated && user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black sm:text-base"
              >
                <UserRound size={19} />
               
              </Link>

            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-black sm:text-base"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm font-medium text-gray-700 hover:text-black sm:text-base"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

