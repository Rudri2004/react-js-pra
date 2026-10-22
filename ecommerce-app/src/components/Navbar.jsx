
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Store,
  UserRound,
  Heart,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import useWishlistStore from "@/store/wishlistStore";

export default function Navbar() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);

  const wishlist = useWishlistStore((state) => state.wishlist);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const logout = useAuthStore((state) => state.logout);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;


    logout();

    navigate("/login", { replace: true });
  };

  return (
    <nav className=" top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
     
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-gray-900"
        >
          <Store size={28} />
          E-Store
        </Link>

        
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Link to="/wishlist" aria-label="Wishlist">
              <Heart
                size={21}
                className={
                  wishlistCount > 0
                    ? "fill-red-500 text-red-500"
                    : ""
                }
              />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>

        
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Link to="/cart" aria-label="Shopping cart">
              <ShoppingCart size={23} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          
          {isAuthenticated && user ? (
            <>
              <Button asChild variant="ghost" size="icon">
                <Link to="/profile" aria-label="My profile">
                  <UserRound size={20} />
                </Link>
              </Button>

             
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>

              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
