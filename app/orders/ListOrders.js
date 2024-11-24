import { formatDate } from "@/utils/useFormat";
import Image from "next/image";
import classNames from "classnames";
import OrderProduct from "../order/OrderProduct";
import { formatCurrency } from "@/utils/useFormat";
import { useState } from "react";

export default function ListOrders({ order }) {
  const [isHiddenDetails, setIsHiddenDetails] = useState(true);

  async function toggleDetails() {
    setIsHiddenDetails(!isHiddenDetails);
  }

  return (
    <div className="order-item border rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order #{order.id}</h2>
        <span
          className={classNames("text-sm px-2 py-1 rounded", {
            "bg-green-100 text-green-700": order.status === "Delivered",
            "bg-yellow-100 text-yellow-700": order.status === "Pending",
            "bg-red-100 text-red-700": order.status === "Canceled",
          })}
        >
          {order.status}
        </span>
      </div>
      <div className="mt-2">
        <p>
          <strong>Date:</strong> {formatDate(order.created_at)}
        </p>
        <p>
          <strong>Total:</strong> {formatCurrency(order.sub_total)}
        </p>
        <p>
          <strong>Items:</strong> {order.order_items.length}
        </p>
      </div>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        onClick={toggleDetails}
      >
        View Details
      </button>
      <div
        className={`w-full flex-col gap-4 p-2 shadow-xl rounded-lg mt-2 ${
          isHiddenDetails ? "hidden" : "flex"
        }`}
      >
        {order.order_items.map((item) => (
          <OrderProduct key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
