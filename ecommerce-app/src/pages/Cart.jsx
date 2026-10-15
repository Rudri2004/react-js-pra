
import { Link, Navigate, useLocation } from "react-router-dom";
import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

export default function Cart() {
  const location = useLocation();

  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          message: "Please sign in to view and manage your cart.",
        }}
      />
    );
  }

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />

        <h1 className="mt-5 text-3xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-3 text-gray-500">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Explore Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>

          <p className="mt-2 text-gray-500">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-3">

        <section className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-center"
            >
              <Link
                to={`/products/${item.id}`}
                className="flex h-32 w-full shrink-0 items-center justify-center rounded-lg bg-gray-50 p-3 sm:w-32"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <Link
                  to={`/products/${item.id}`}
                  className="font-semibold hover:underline"
                >
                  {item.title}
                </Link>

                <p className="mt-2 text-lg font-bold">
                  ${Number(item.price).toFixed(2)}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Line total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <div className="flex items-center rounded-md border">
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100"
                    aria-label={`Decrease quantity of ${item.title}`}
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span className="min-w-9 text-center">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100"
                    aria-label={`Increase quantity of ${item.title}`}
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </article>
          ))}
        </section>

    
        <aside className="rounded-xl border bg-white p-6">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="mt-6 flex justify-between text-gray-600">
            <span>Subtotal ({totalItems} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="mt-4 flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="mt-5 border-t pt-5">
            <div className="flex justify-between gap-4 text-lg font-bold">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <p className="mt-2 text-xs text-gray-500">
              Demo checkout only. No payment will be processed.
            </p>
          </div>

     
          <Link
            to="/checkout"
            className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/"
            className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-md border border-gray-300 px-6 text-sm font-medium transition-colors hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
