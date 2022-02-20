import Head from "next/head";
import React from "react";
import OptImage from "../../components/OptImage";
import Page from "../../components/Page";
import Title from "../../components/Title";
import { useUser } from "../../hooks/user";
import { ApiError } from "../../lib/api";
import { addImageOptimization } from "../../lib/image";
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
    const optProduct = await addImageOptimization([product], 1);
    // console.log("optProduct", optProduct);

    return {
      props: { product: optProduct[0] },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError) {
      // console.log(err);
      if (err.status === 404) return { notFound: true };
    }
    throw err;
  }
}

export default function Product({ product }) {
  const { title, description, price, url, imageProps } = product;
  const user = useUser();
  return (
    <Page title={title}>
      <section className="flex flex-col md:flex-row gap-2 justify-between">
        <div className="w-full">
          <OptImage
            src={url}
            width={640}
            height={480}
            imageProps={imageProps}
          />
        </div>
        <article className="flex-1">
          <p className="">{description}</p>
          <footer className="text-lg font-semibold mt-3">
            <p>{price}</p>
            {user && <p>Only for {user.name}!!!</p>}
          </footer>
        </article>
      </section>
      <style jsx>{`
        section > * {
          flex-basis: 100%;
        }
      `}</style>
    </Page>
  );
}
