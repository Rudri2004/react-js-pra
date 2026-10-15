
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  PackageCheck,
  LogOut,
  ShoppingBag,
} from "lucide-react";

import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

 
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage your ShopEase account.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          {/* Profile header */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-2xl font-bold text-white">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user.name}
              </h2>

              <p className="text-sm text-gray-500">
                ShopEase Customer
              </p>
            </div>
          </div>
    <div className="space-y-5 border-t border-gray-200 pt-6">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="mt-1 font-medium text-gray-900">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="mt-1 break-all font-medium text-gray-900">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="mt-1 break-all font-medium text-gray-900">
                {user.username}
              </p>
            </div>
          </div>

          {/* Account actions */}
          <div className="mt-8 space-y-3 border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Account Actions
            </h3>

            <Link
              to="/orders"
              className="flex min-h-12 w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-50"
            >
              <span className="flex items-center gap-3">
                <PackageCheck className="h-5 w-5" />
                My Orders
              </span>

              <span className="text-gray-400">→</span>
            </Link>

            <Link
              to="/"
              className="flex min-h-12 w-full items-center justify-between rounded-lg border border-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-50"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5" />
                Continue Shopping
              </span>

              <span className="text-gray-400">→</span>
            </Link>

            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start border-red-200 py-5 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
