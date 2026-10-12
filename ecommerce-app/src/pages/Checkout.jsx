
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle2, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { checkoutSchema } from "@/lib/schemas/checkoutSchema";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [order, setOrder] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
          message: "Please sign in before checkout.",
        }}
      />
    );
  }

  if (items.length === 0 && !order) {
    return <Navigate to="/cart" replace />;
  }

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 100 ? 0 : 5;
  const total = subtotal + shipping;

  function onSubmit(values) {
    const newOrder = {
      id: `SE-${Date.now()}`,
      customer: values,
      items: [...items],
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
    };

    setOrder(newOrder);
    clearCart();
  }

  if (order) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Card>
          <CardContent className="p-8 text-center sm:p-12">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />

            <h1 className="mt-5 text-3xl font-bold">
              Order placed successfully!
            </h1>

            <p className="mt-3 text-gray-500">
              Thank you for shopping with ShopEase.
            </p>

            <div className="mx-auto mt-6 max-w-md rounded-lg bg-gray-50 p-5 text-left">
              <p className="text-sm text-gray-500">Order number</p>
              <p className="mt-1 font-bold">{order.id}</p>

              <p className="mt-4 text-sm text-gray-500">Order total</p>
              <p className="mt-1 text-2xl font-bold">
                ${order.total.toFixed(2)}
              </p>

              <p className="mt-4 text-sm text-gray-500">Delivering to</p>
              <p className="mt-1">
                {order.customer.name}
                <br />
                {order.customer.address}, {order.customer.city}
                <br />
                {order.customer.state} - {order.customer.postalCode}
              </p>
            </div>

            <Button className="mt-8" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-2 text-gray-500">
          Enter your shipping details to place your order.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3"
      >
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Full Name
              </label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email Address
              </label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                maxLength={10}
                placeholder="10-digit phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium">
                Street Address
              </label>
              <Input
                id="address"
                placeholder="House number, street, area"
                {...register("address")}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium">
                  City
                </label>
                <Input id="city" {...register("city")} />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="mb-1 block text-sm font-medium">
                  State
                </label>
                <Input id="state" {...register("state")} />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="postalCode"
                className="mb-1 block text-sm font-medium"
              >
                PIN Code
              </label>
              <Input
                id="postalCode"
                inputMode="numeric"
                maxLength={6}
                placeholder="6-digit PIN code"
                {...register("postalCode")}
              />
              {errors.postalCode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mb-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-14 w-14 rounded-md border bg-white object-contain p-1"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between border-t pt-3 text-base font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </Button>

            <Link
              to="/cart"
              className="mt-4 block text-center text-sm text-gray-500 hover:underline"
            >
              Return to Cart
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShoppingBag className="h-4 w-4" />
              Demo checkout — no payment is processed.
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
