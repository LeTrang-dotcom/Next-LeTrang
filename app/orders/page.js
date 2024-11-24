"use client";

import DefaultLayout from "../layouts/DefaultLayout";
import useServices from "@/services/useServices";
import { useEffect, useState } from "react";
import ListOrders from "./ListOrders";
import Loading from "@/components/ui/Load/Loading";

export default function OrdersPage() {
  const { getOrders } = useServices();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      const res = await getOrders();
      setOrders(res);
      setIsLoading(false);
    }
    fetchOrders();
  }, []);

  async function navigateToShop() {
    router.push("/products");
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col py-20 px-40 border gap-16">
        <h1 className="text-3xl font-[400]">Order History</h1>
        {isLoading ? (
          <Loading />
        ) : orders.length > 0 ? (
          <div className="order-list space-y-4">
            {orders.map((order) => (
              <ListOrders key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 text-2xl">You have no order history.</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
              onClick={navigateToShop}
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
