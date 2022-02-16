import Link from "next/link";
import React from "react";

export default function ProductCard({ product: { id, title, price, url } }) {
  return (
    <li className="border shadow hover:shadow-xl mx-auto w-10/12">
      <Link href={`/products/${id}`}>
        <a>
          <img className="w-full" src={url} alt="" />
          <header className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-semibold">{title}</h2>
            <span>{price}</span>
          </header>
        </a>
      </Link>
    </li>
  );
}
