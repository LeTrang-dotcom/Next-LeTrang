import ProductCart from "./ProductCart";
import useCartStore from "@/app/stores/useCartStore";
import useLocalCart from "@/app/stores/useLocalCart";
import { useRouter } from "next/navigation";


export default function CartShop() {
  const {  setIsShowCart } = useCartStore();
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
          className={`p-2 bg-[#001E2B] text-white rounded-lg font-[500] ${productsInCart.length === 0 ? "cursor-not-allowed brightness-50 " : ""}`}
          disabled={productsInCart.length === 0} 
          onClick={proceedToCheckout}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}
