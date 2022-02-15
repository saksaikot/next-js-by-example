import Head from "next/head";
import React from "react";
import Title from "../../components/Title";
import { getProductDetails, getProducts } from "../../lib/product";

export async function getStaticPaths() {
  const products = await getProducts();
  return {
    paths: products.map(({ id }) => ({ params: { id: String(id) } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { id } }) {
  try {
    const product = await getProductDetails(id);
  } catch (err) {
    return { notFound: true };
  }
  return {
    props: { product },
    revalidate: 5 * 60,
  };
}

export default function Product({ product }) {
  const {
    title,
    description,
    price,
    picture: { width, height, caption, url },
  } = product;
  return (
    <>
      <Head>
        <title>Next-Shop</title>
      </Head>
      <main className="p-3">
        <article>
          <header>
            <Title>{title}</Title>
          </header>
          <main>
            <img src={`http://localhost:1337${url}`} alt="" />
            <p>{description}</p>
          </main>
          <footer>
            <p>{price}</p>
          </footer>
        </article>
      </main>
    </>
  );
}
