"use client";

import DefaultLayout from "../layouts/DefaultLayout";
import OrderProduct from "./OrderProduct";
import { useEffect, useState } from "react";
import useLocalCart from "@/app/stores/useLocalCart";
import { formatCurrency } from "@/utils/useFormat";
import useServices from "@/services/useServices";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  
  const [textAddress, setTextAddress] = useState("");
  const [textPhone, setTextPhone] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [total, setTotal] = useState(0);
  const { productsInCart, setProductsInCart } = useLocalCart();
  const { postOrder } = useServices();
  const router = useRouter();

  useEffect(() => {
    let total = 0;
    productsInCart.forEach((product) => {
      total += product.price * product.quantity;
    });
    setTotal(total);
  }, [productsInCart]);

  async function handleCheckout(e) {
    e.preventDefault();
    if (!textAddress) {
      setErrAddress("Please fill in address fields");
      return;
    } else if (!textPhone) {
      setErrPhone("Please fill in phone fields");
      return;
    }
    if (textAddress.length < 5) {
      setErrAddress("Address is too short");
      return;
    }
    if (textPhone.length < 5) {
      setErrPhone("Phone is too short");
      return;
    }
    if (productsInCart.length === 0) {
      setErrAddress("Please add some products to cart");
      return;
    }
    setErrAddress("");
    setErrPhone("");
    const orderDetails = {
      address: textAddress,
      phone: textPhone,
      cart_item: productsInCart.map((product) => ({
        product_id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      })),
    };
    console.log(orderDetails);  
    try {
      await postOrder(orderDetails);
      alert("Order successfully");
      router.push("/orders");
      clearCart();
    } catch(e) {
      alert("Order failed", e);
      throw e;
    }
  }

  function clearCart() {
    setProductsInCart([]);
    localStorage.removeItem("cart-store");
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col p-20 border gap-16">
        <div className="text-3xl font-[400]">Checkout</div>
        <form action="" className="w-full" onSubmit={handleCheckout}>
          <div className="flex flex-row justify-between">
            <div className="w-2/5">
              <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-[400]">
                  Add delivery address and phone
                </h1>
                <div className="flex flex-col gap-2">
                  <label htmlFor="adress" className="text-xl">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Input address"
                    value={textAddress}
                    onChange={(e) => setTextAddress(e.target.value)}
                    className="border p-2 bg-gray-100 rounded-lg"
                  />
                  <small className="text-red-500 italic">{errAddress}</small>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="adress" className="text-xl">
                    Phone
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Input phone"
                    value={textPhone}
                    onChange={(e) => setTextPhone(e.target.value)}
                    className="border p-2 bg-gray-100 rounded-lg"
                  />
                  <small className="text-red-500 italic">{errPhone}</small>
                </div>
                <button
                  type="submit"
                  className="p-2 bg-[#099409] text-white rounded-lg font-[500] w-1/6 brightness-150 hover:brightness-90"
                >
                  Pay
                </button>
              </div>
            </div>
            <div className="border-2 w-2/5 shadow-lg flex flex-col p-4 rounded-md gap-2">
              <div className="flex flex-col gap-5">
                <div className="bg-white w-full">
                  <h1 className="text-2xl font-[400]">Order details</h1>
                </div>
                <div className="overflow-y-auto h-[300px]">
                  {productsInCart.map((product) => (
                    <OrderProduct key={product.id} product={product} />
                  ))}
                </div>
              </div>

              <div className="grid grid-rows-[3fr_1fr] gap-2 px-2">
                <div className="flex flex-col gap-2 text-gray-500 text-sm font-[500]">
                  <div className="flex flex-row justify-between ">
                    <div>Sub Total</div>
                    <div>{formatCurrency(total)}</div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div>Shipping</div>
                    <div>{formatCurrency(0)}</div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div>Tax</div>
                    <div>{formatCurrency(0)}</div>
                  </div>
                </div>
                <hr />
                <div className="flex flex-row justify-between font-[550]">
                  <h2>Order Total</h2>
                  <div>{formatCurrency(total)}</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
}
