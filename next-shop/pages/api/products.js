import { getProducts } from "../../lib/product";

async function handler(req, res) {
  const products = await getProducts();
  console.log("[products] [handler]");
  return res.status(200).json(products);
}
export default handler;
