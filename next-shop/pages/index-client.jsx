// client side with useEffect

import Head from "next/head";
import { useEffect, useState } from "react";
import Title from "../components/Title";
import { getProducts } from "../lib/product";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // const loadProducts = async () => {
    //   const products = await getProducts();
    //   setProducts(products);
    // };
    // loadProducts();
    // getProducts().then((products) => setProducts(products));
    getProducts().then(setProducts);
  }, []);

  console.log("[Home] - products ", products);
  return (
    <>
      <Head>
        <title>Next-Shop</title>
      </Head>
      <main className="p-3">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
