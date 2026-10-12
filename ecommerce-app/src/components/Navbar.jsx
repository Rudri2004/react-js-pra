
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Store, UserRound } from "lucide-react";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const logout = useAuthStore((state) => state.logout);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
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
          ShopEase
        </Link>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-black sm:text-base"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black sm:text-base"
          >
            <ShoppingCart size={23} />
            Cart

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated && user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black sm:text-base"
              >
                <UserRound size={19} />
                {user.name?.split(" ")[0] || "Profile"}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:text-red-800 sm:text-base"
              >
                Logout
              </button>
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