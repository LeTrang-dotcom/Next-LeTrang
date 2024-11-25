"use client";

import Image from "next/image";
import useLocalCart from "../stores/useLocalCart";
import { formatCurrency } from "@/utils/useFormat";
import { useState } from "react";


export default function CardProduct({ product }) {
  const { addProductToCart } = useLocalCart();
  const [imageSrc, setImageSrc] = useState('/images/fallback-image.jfif');

  function addToCartBtn() {
    addProductToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      img: product.preview_img_path,
      stock: product.stock,
    });
  }

  return (
    <div className="border w-full h-fit rounded-md shadow-md transform hover:-translate-y-2">
      <div>
        <Image
          src={imageSrc}
          alt={product.name}
          className="rounded-t-md w-full"
          width={0}
          height={0}
          loading="lazy"
          sizes="100vw"
          // blurDataURL="/images/fallback-image.jfif"
          // placeholder="blur"
          onLoadingComplete={(e) => {
            setImageSrc(product.preview_img_path);
          }}
        />
      </div>
      <div className="p-2 flex flex-col h-fit gap-2 justify-between">
        <p className="text-md font-[500] line-clamp-3 ">{product.name}</p>
        {product.stock > 0 ? (
          <p>In Stock: {product.stock}</p>
        ) : (
          <p className="text-gray-400">Out of Stock</p>
        )}

        <div className="flex flex-row justify-between items-center">
          <p className="text-lg font-bold">{formatCurrency(product.price)}</p>
          <button
            className={`p-3 bg-[#4b4d5a] text-white rounded-lg shadow-lg hover:bg-black ${
              product.stock > 0
                ? "hover:bg-black disabled"
                : "cursor-not-allowed bg-gray-500 "
            } `}
            disabled={product.stock <= 0}
            onClick={addToCartBtn}
          >
            + Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
