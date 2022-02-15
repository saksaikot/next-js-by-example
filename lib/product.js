const API_BASE = `http://127.0.0.1:1337/api`;
const API_PRODUCTS = `${API_BASE}/products/?populate=picture`;

export async function getProducts() {
  const res = await fetch(API_PRODUCTS);
  const products = await res.json();
  // console.log(products.data);
  return products.data.map((product) => stripProductsDetails(product));
}
export async function getProductDetails(id) {
  const response = await fetch(`${API_BASE}/products/${id}?populate=picture`);
  const product = await response.json();
  const {
    attributes: { title, description, price, picture },
  } = product.data;
  console.log(title, picture);
  const {
    attributes: { width, height, caption, url },
  } = picture.data[0];
  return {
    title,
    description,
    price,
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
    attributes: { title, description },
    id,
  } = product;
  return {
    id,
    title,
  };
}
