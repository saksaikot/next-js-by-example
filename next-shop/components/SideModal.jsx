import React from "react";
import Button from "./Button";
import { useSetCartOpen } from "../hooks/pages";
import Bin from "./icons/Bin";
import { useCartItems } from "../hooks/cart";
import CartItem from "./CartItem";
// import { useCartOpen } from "../hooks/pages";

export default function SideModal() {
  const { cartItems, total } = useCartItems();
  const { toggleCartOpen } = useSetCartOpen();
  return (
    <div className="flex flex-col max-w-3xl fixed top-0 right-0 bottom-0  shadow  space-y-4 sm:p-4 mt-16 mb-3   bg-green-50 transform-x-full ">
      <header>
        <h2 className="text-xl font-semibold">Your cart</h2>
      </header>
      <ul className="flex-1 overflow-y-auto">
        {cartItems &&
          cartItems.map((item) => <CartItem key={item.id} {...item} />)}
      </ul>
      <footer>
        <div className="flex justify-end text-lg font-semibold font-mono">
          <p className="w-40">Total: {"$" + total}</p>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={toggleCartOpen}>
            Back
            <span className="sr-only sm:not-sr-only"> to shop</span>
          </Button>
          <Button type="button">
            <span className="sr-only sm:not-sr-only">Continue to</span> Checkout
          </Button>
        </div>
      </footer>
    </div>
  );
}
