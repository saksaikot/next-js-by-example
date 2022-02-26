import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { imageBlur } from "../lib/image";
import OptImage from "./OptImage";

export default function ProductCard({
  product: { id, title, price, url, imageProps },
}) {
  // console.log(id);
  return (
    <li className="border shadow hover:shadow-xl mx-auto ">
      <Link href={`/products/${id}`}>
        <a>
          <OptImage
            src={url}
            width={640}
            height={480}
            imageProps={imageProps}
          />
          <header className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-semibold">{title}</h2>
            <span>{price}</span>
          </header>
        </a>
      </Link>
    </li>
  );
}
