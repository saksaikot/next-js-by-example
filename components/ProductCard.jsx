import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { imageBlur } from "../lib/image";

export default function ProductCard({
  product: { id, title, price, url, imageProps },
}) {
  // console.log(id);
  return (
    <li className="border shadow hover:shadow-xl mx-auto ">
      <Link href={`/products/${id}`}>
        <a>
          <Image
            className="w-80"
            src={url}
            alt=""
            width={320}
            height={240}
            quality={90}
            {...imageProps}
            // placeholder="blur"
            // blurDataURL={base64}
            // priority={id < 7 ? true : false}
            // layout="responsive"
            // placeholder="blur"
            layout="fixed"
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
