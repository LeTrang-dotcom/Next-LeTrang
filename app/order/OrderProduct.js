import Image from "next/image";
import { formatCurrency } from "@/utils/useFormat";
import { useEffect, useState } from "react";


export default function OrderProduct({product}) {
  const imageSrc = product.img?.trim() ? product.img : "/images/fallback-image.jfif";

    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[2fr_4fr_1fr_2fr] gap-2">
          <div className="w-full p-2">
            <Image
              src={imageSrc}
              alt={product.name}
              className="w-full"
              loading="lazy"
              height={0}
              width={0}
              sizes="100vw"
            />
          </div>
          <div>
            <p className="text-sm font-[500]">{product.name}</p>
          </div>
          <div>
            <div className="flex flex-row w-full">
              <div className="flex flex-1 justify-center items-center">
                {product.quantity}
              </div>
            </div>
          </div>
          <div className="font-[600] flex justify-center">
            {formatCurrency(product.price * product.quantity)}
          </div>
        </div>
        <hr />
      </div>
    );
}