"use client";

import Image from "next/image";
import { formatCurrency } from "@/utils/useFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useLocalCart from "@/app/stores/useLocalCart";
import { useEffect, useState } from "react";

export default function ProductCart({ product }) {
  const {
    removeProductFromCart,
    decreaseQuantityProduct,
    increaseQuantityProduct,
    quantityProduct,
    setQuantityProduct,
    productsInCart,
    setProductsInCart,
  } = useLocalCart();
  // const [quantityProduct, setQuantityProduct] = useState(1);

  useEffect(() => {
    setQuantityProduct(product.quantity);
  }, [product.quantity, setQuantityProduct]);


  useEffect(() => {
    if (quantityProduct === 0) {
      alert("Can't set quantity to 0");
      setQuantityProduct(1); 
    } else if (quantityProduct > product.stock) {
      alert(`Can't set quantity greater than stock (${product.stock})`);
      setQuantityProduct(product.stock); 
    }else{
      setProductsInCart([
        ...productsInCart,
        { ...product, quantity: quantityProduct },
      ]);     
    }
  }, [quantityProduct, product.stock, setQuantityProduct, product, setProductsInCart, productsInCart]);

  function increaseQuantity() {
    increaseQuantityProduct(product);
  }
  function decreaseQuantity() {
    decreaseQuantityProduct(product);
  }
  function deleteProductsInCart() {
    removeProductFromCart(product);
  }

  function handleChangeQuantity(e) {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setQuantityProduct(value);
    } else {
      setQuantityProduct("");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[2fr_4fr_3fr_2fr_1fr] gap-2">
        <div className="w-full px-2">
          <Image
            src={product.img}
            alt={product.name}
            className="w-full"
            height={0}
            width={0}
            sizes="100vw"
          />
        </div>
        <div>
          <p className="text-sm font-[500]">{product.name}</p>
        </div>
        <div className="flex flex-row justify-center items-start">
          <div className="flex flex-row border w-4/5">
            <button
              type="button"
              className="w-1/4 flex justify-center items-center font-bold border-r p-1 hover:bg-gray-200"
              onClick={decreaseQuantity}
            >
              -
            </button>

            <div className="flex flex-1 justify-center items-center">
              <input
                type="number"
                className="w-full p-1 text-center"
                min={1}
                max={product.stock}
                value={quantityProduct}
                onChange={handleChangeQuantity}
              />
              {/* {product.quantity} */}
            </div>
            <button
              type="button"
              className="w-1/4 flex justify-center items-center font-bold border-l hover:bg-gray-200"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
        </div>
        <div className="font-[550] flex justify-center">
          {formatCurrency(product.price * quantityProduct)}
        </div>
        <div className="flex justify-center items-start">
          <button type="button" onClick={deleteProductsInCart}>
            <FontAwesomeIcon icon={faTrash} className="hover:text-red-500" />
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}
