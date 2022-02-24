import React from "react";

export default function CartItem({ url, title }) {
  return (
    <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
      <div className="flex w-full space-x-2 sm:space-x-4">
        <img
          className="flex-shrink-0 object-cover w-20 h-20  rounded outline-none sm:w-32 sm:h-32"
          src={url}
          alt={title}
        />
        <div className="flex flex-col justify-between w-full pb-4">
          <div className="flex justify-between w-full pb-2 space-x-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                Polaroid camera
              </h3>
              <p className="text-sm dark:text-coolGray-400">Classic</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">59.99€</p>
              <p className="text-sm line-through dark:text-coolGray-600">
                75.50€
              </p>
            </div>
          </div>
          <div className="flex text-sm divide-x">
            <button
              type="button"
              className="flex items-center px-2 py-1 pl-0 space-x-1"
            >
              <Bin />
              <span>Remove</span>
            </button>
            <button
              type="button"
              className="flex items-center px-2 py-1 space-x-1"
            >
              <span>Add to favorites</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
