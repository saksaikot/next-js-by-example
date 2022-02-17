import Head from "next/head";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import Title from "../components/Title";
import { addImageOptimization } from "../lib/image";
import { getProducts } from "../lib/product";

export async function getStaticProps() {
  const LCP_AMOUNT = 6;
  const products = await getProducts();
  const optProducts = await addImageOptimization(products, LCP_AMOUNT);

  return {
    props: {
      products: optProducts,
    },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
}

export default function Home({ products }) {
  // console.log("[Home] - products ", products);
  return (
    <>
      <Head>
        <title>Next-Shop</title>
      </Head>
      <main className="p-3">
        <Title>Next Shop</Title>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,20rem)] gap-8 justify-center">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ul>
      </main>
    </>
  );
}
