
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ShoppingBag,
  XCircle,
  CheckCircle2,
  Package,
  Truck,
  House,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuthStore from "@/store/authStore";
import useOrderStore from "@/store/orderStore";

const trackingSteps = [
  { status: "Order Placed", label: "Order Placed", icon: ShoppingBag },
  { status: "Processing", label: "Processing", icon: Package },
  { status: "Shipped", label: "Shipped", icon: Truck },
  { status: "Delivered", label: "Delivered", icon: House },
];

export default function Orders() {
  const [cancelOrderId, setCancelOrderId] = useState(null);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const allOrders = useOrderStore((state) => state.orders);
  const cancelOrder = useOrderStore((state) => state.cancelOrder);
  const updateOrderStatus = useOrderStore(
    (state) => state.updateOrderStatus
  );

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
    if (
      !window.confirm(
        "Are you sure you want to cancel this order?"
      )
    ) {
      return;
    }

    cancelOrder(orderId, user.username);
    setCancelOrderId(null);
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, user.username, newStatus);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="mt-2 text-muted-foreground">
          Track your orders and view your purchase history.
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />

            <h2 className="text-xl font-semibold">No orders yet</h2>

            <p className="mt-2 text-muted-foreground">
              Your orders will appear here after checkout.
            </p>

            <Button className="mt-6" asChild={false}>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentStep = trackingSteps.findIndex(
              (step) => step.status === order.status
            );

            const isCancelled = order.status === "Cancelled";

            return (
              <Card key={order.id}>
                <CardContent className="p-5 sm:p-6">
                  {/* Order header */}
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Order ID
                      </p>

                      <h2 className="font-semibold">{order.id}</h2>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xl font-bold">
                        ${Number(order.total).toFixed(2)}
                      </p>

                      <span
                        className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          isCancelled
                            ? "bg-red-100 text-red-700"
                            : order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status || "Order Placed"}
                      </span>
                    </div>
                  </div>

                  {/* Tracking timeline */}
                  <div className="my-6 border-t pt-6">
                    <h3 className="mb-6 font-semibold">
                      Order Tracking
                    </h3>

                    {isCancelled ? (
                      <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-700">
                        <XCircle size={24} />
                        <div>
                          <p className="font-semibold">
                            Order Cancelled
                          </p>
                          <p className="text-sm">
                            This order is no longer being processed.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {trackingSteps.map((step, index) => {
                          const StepIcon = step.icon;
                          const isComplete = index <= currentStep;

                          return (
                            <div
                              key={step.status}
                              className="flex flex-col items-center text-center"
                            >
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                  isComplete
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-400"
                                }`}
                              >
                                {index < currentStep ? (
                                  <CheckCircle2 size={21} />
                                ) : (
                                  <StepIcon size={21} />
                                )}
                              </div>

                              <p
                                className={`mt-2 text-xs sm:text-sm ${
                                  isComplete
                                    ? "font-semibold text-green-700"
                                    : "text-gray-400"
                                }`}
                              >
                                {step.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Products */}
                  <div className="border-t pt-5">
                    <h3 className="mb-4 font-semibold">
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
                  </div>

                  {/* Delivery information */}
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

                  {/* Demo status controls */}
                  {!isCancelled && order.status !== "Delivered" && (
                    <div className="mt-5 border-t pt-4">
                      <p className="mb-3 text-sm font-medium">
                        Update Status (Demo)
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {trackingSteps
                          .filter(
                            (step) =>
                              trackingSteps.findIndex(
                                (item) => item.status === step.status
                              ) > currentStep
                          )
                          .map((step) => (
                            <Button
                              key={step.status}
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleStatusChange(
                                  order.id,
                                  step.status
                                )
                              }
                            >
                              Mark as {step.label}
                            </Button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Cancellation controls */}
                  {order.status === "Order Placed" && (
                    <div className="mt-4 border-t pt-4">
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}