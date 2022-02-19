import Page from "../components/Page";
import ProductCard from "../components/ProductCard";
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
    <Page title="Indoor plants">
      <ul className="grid grid-cols-1 md:grid-cols-[repeat(2,20rem)] lg:grid-cols-[repeat(3,20rem)] gap-8 justify-center">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
    </Page>
  );
}
