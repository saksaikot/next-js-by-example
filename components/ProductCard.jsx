import Link from "next/link";
import React from "react";

export default function ProductCard({ product: { id, title, price } }) {
  return (
    <div className="border  w-80 my-4 shadow hover:shadow-xl">
      <Link href={`/products/${id}`}>
        <a>
          <img src="https://dummyimage.com/320x240" alt="" />
          <header className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-semibold">{title}</h2>
            <span>{price}</span>
          </header>
        </a>
      </Link>
    </div>
  );
}
