import ProductCart from "./ProductCart";
import useCartStore from "@/app/stores/useCartStore";
import useLocalCart from "@/app/stores/useLocalCart";
import { useRouter } from "next/navigation";

// const productsInCart = [
//   {
//     id: 1,
//     name: "Product 1",
//     preview_img_path:
//       "https://images.unsplash.com/photo-1678489811694-4d251732c90f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
//     price: 10,
//     count: 1,
//     stock: 10,
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     preview_img_path:
//       "https://images.unsplash.com/photo-1678489811694-4d251732c90f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
//     price: 20,
//     count: 1,
//     stock: 10,
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     preview_img_path:
//       "https://images.unsplash.com/photo-1678489811694-4d251732c90f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
//     price: 30,
//     count: 1,
//     stock: 10,
//   },
// ];

export default function CartShop() {
  const { isShowCart, setIsShowCart } = useCartStore();
  const { productsInCart } = useLocalCart();
  const router = useRouter();

  function continueShopping() {
    setIsShowCart(false);
    router.push("/products");
  }

  function proceedToCheckout() {
    setIsShowCart(false);
    router.push("/order");
  }
  return (
    <div className="w-1/2 h-full bg-white overflow-y-auto p-3 flex flex-col top-0 right-0 gap-5 z-50 fixed justify-between">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-[500]">Shop Cart</h1>
        <hr />
        {productsInCart.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <button
          type="button"
          className="p-2 bg-[#099409] text-white rounded-lg font-[500]"
          onClick={continueShopping}
        >
          Continue Shopping
        </button>
        <button
          type="button"
          className="p-2 bg-[#001E2B] text-white rounded-lg font-[500]"
          onClick={proceedToCheckout}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}
