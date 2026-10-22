
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set) => ({
      orders: [],

    
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),

      
      cancelOrder: (orderId, username) =>
        set((state) => ({
          orders: state.orders.map((order) => {
            const isSameUser =
              order.username?.toLowerCase() ===
              username?.toLowerCase();

            if (
              order.id === orderId &&
              isSameUser &&
              order.status === "Order Placed"
            ) {
              return {
                ...order,
                status: "Cancelled",
                cancelledAt: new Date().toISOString(),
              };
            }

            return order;
          }),
        })),

   
      updateOrderStatus: (orderId, username, newStatus) =>
        set((state) => ({
          orders: state.orders.map((order) => {
            const isSameUser =
              order.username?.toLowerCase() ===
              username?.toLowerCase();

            const allowedStatuses = [
              "Order Placed",
              "Processing",
              "Shipped",
              "Delivered",
            ];

            if (
              order.id === orderId &&
              isSameUser &&
              order.status !== "Cancelled" &&
              allowedStatuses.includes(newStatus)
            ) {
              return {
                ...order,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              };
            }

            return order;
          }),
        })),
    }),
    {
      name: "shopease-orders",
    }
  )
);

export default useOrderStore;