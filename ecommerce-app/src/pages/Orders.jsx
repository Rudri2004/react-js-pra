
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ShoppingBag, PackageCheck, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuthStore from "@/store/authStore";
import useOrderStore from "@/store/orderStore";

export default function Orders() {
  const [cancelOrderId, setCancelOrderId] = useState(null);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const allOrders = useOrderStore((state) => state.orders);
  const cancelOrder = useOrderStore((state) => state.cancelOrder);

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: "/orders",
          message: "Please log in to view your orders.",
        }}
      />
    );
  }

  const orders = allOrders.filter(
    (order) =>
      order.username?.toLowerCase() ===
      user?.username?.toLowerCase()
  );

  const handleCancelOrder = (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    cancelOrder(orderId, user.username);
    setCancelOrderId(null);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="mt-2 text-muted-foreground">
          View your order history and order details.
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />

            <h2 className="text-xl font-semibold">
              No orders yet
            </h2>

            <p className="mt-2 text-muted-foreground">
              Your orders will appear here after checkout.
            </p>

            <Button className="mt-6" onClick={() => (window.location.href = "/")}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Order ID
                    </p>

                    <h2 className="font-semibold">{order.id}</h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xl font-bold">
                      ${Number(order.total).toFixed(2)}
                    </p>

                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                        order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status || "Order Placed"}
                    </span>
                  </div>
                </div>

                <div className="my-5 border-t" />

                <h3 className="mb-3 font-semibold">
                  Items ({order.items.length})
                </h3>

                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 rounded-md object-contain"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 font-medium">
                          {item.title}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-medium">
                        $
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t pt-4 text-sm">
                  <p>
                    <span className="font-medium">Deliver to:</span>{" "}
                    {order.customer?.name}
                  </p>

                  <p className="mt-1 text-muted-foreground">
                    {order.customer?.address},{" "}
                    {order.customer?.city},{" "}
                    {order.customer?.state} -{" "}
                    {order.customer?.postalCode}
                  </p>
                </div>

                {order.status === "Order Placed" && (
                  <div className="mt-5 border-t pt-4">
                    {cancelOrderId === order.id ? (
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-sm">
                          Cancel this order?
                        </p>

                        <Button
                          variant="destructive"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Yes, Cancel Order
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => setCancelOrderId(null)}
                        >
                          Keep Order
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="destructive"
                        onClick={() => setCancelOrderId(order.id)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel Order
                      </Button>
                    )}
                  </div>
                )}

                {order.status === "Cancelled" && (
                  <p className="mt-4 flex items-center gap-2 text-sm font-medium text-red-600">
                    <XCircle size={18} />
                    This order has been cancelled.
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
