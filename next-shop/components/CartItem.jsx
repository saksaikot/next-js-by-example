import React from "react";
import Image from "next/image";
import { addImageOptimization } from "../lib/image";
import Bin from "./icons/Bin";
import Button from "./Button";
import { useDeleteCartItem, useHandleCartItem } from "../hooks/cart";

export default function CartItem(props) {
  const { decrease, increase, loading } = useHandleCartItem();
  const optItem = addImageOptimization([{ ...props }]);
  const { handleDelete, deleteLoading } = useDeleteCartItem();

  // console.log("optItem", optItem);
  const { id, url, title, imageProps, price, quantity, product_id, total } =
    optItem[0];
  // console.log("[CartItem]", id);
  return (
    <li className="flex flex-col py-1 sm:flex-row sm:justify-between">
      <div className="flex w-full space-x-1 sm:space-x-4">
        <div className="flex-shrink-0 object-cover w-20 h-20  rounded outline-none sm:w-32 sm:h-32">
          <Image
            src={url}
            alt={title}
            width={80}
            height={(80 * 3) / 4}
            quality={90}
            {...imageProps}
            layout="responsive"
          />
        </div>

        <div className="flex flex-col justify-between w-full pb-4">
          <div className="flex justify-between w-full pb-2 space-x-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                {title}/<span className="text-sm">{"$" + price}</span>
              </h3>
              <div>
                <Button
                  onClick={() => increase(product_id, quantity)}
                  disabled={loading}
                >
                  +
                </Button>
                <span className="px-4 font-mono">{quantity}</span>
                <Button
                  onClick={() => decrease(product_id, quantity)}
                  disabled={loading}
                >
                  -
                </Button>
                <Button
                  className="ml-2"
                  onClick={() => handleDelete(id)}
                  disabled={deleteLoading}
                >
                  Delete
                </Button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold font-mono w-14">
                {"$" + total}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
