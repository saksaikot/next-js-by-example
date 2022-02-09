const API_BASE = `http://localhost:1337/api`;
const API_PRODUCTS = `${API_BASE}/products/?populate=picture`;

export async function getProducts() {
  const res = await fetch(API_PRODUCTS);
  const products = await res.json();
  // console.log(products.data);
  return products.data.map((product) => stripProductsDetails(product));
}

function stripProductsDetails(product) {
  const {
    attributes: { title },
    id,
  } = product;
  return {
    id,
    title,
  };
}
