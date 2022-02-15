import Head from "next/head";
import Link from "next/link";
import Title from "../components/Title";
import { getProducts } from "../lib/product";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
    revalidate: 5 * 60,
  };
}

export default function Home({ products }) {
  console.log("[Home] - products ", products);
  return (
    <>
      <Head>
        <title>Next-Shop</title>
      </Head>
      <main className="p-3">
        <Title>Next Shop</Title>
        <ul>
          {products.map(({ id, title }) => (
            <li key={id}>
              <Link href={`/products/${id}`}>
                <a> {title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
