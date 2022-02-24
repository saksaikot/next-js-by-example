import { fetchJson } from "./api";

const CMS_URL = process.env.CMS_URL;
const CMS_PRODUCTS = process.env.CMS_PRODUCTS;

export async function getProducts() {
  const products = await fetchJson(`${CMS_PRODUCTS}?populate=picture`);
  return products.data.map((product) => stripProductsDetails(product));
}
export async function getProductDetails(id) {
  const product = await fetchJson(`${CMS_PRODUCTS}/${id}?populate=picture`);
  const {
    attributes: { title, description, price, picture },
  } = product.data;

  const {
    attributes: { width, height, caption, url, placeholder_webp },
  } = picture.data[0];
  return {
    title,
    description,
    price: "$" + price.toFixed(2),
    url: CMS_URL + url,
    placeholder_webp,

    picture: {
      width,
      height,
      caption,
      url,
    },
  };
}
function stripProductsDetails(product) {
  const {
    attributes: { title, description, price, picture },
    id,
  } = product;
  const {
    attributes: { url, placeholder_webp },
  } = picture.data[0];
  return {
    id,
    title,
    price: "$" + price.toFixed(2),
    url: CMS_URL + url,
    placeholder_webp,
  };
}
