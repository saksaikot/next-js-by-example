import { fetchJson } from "../../lib/api";

const CMS_URL = process.env.CMS_URL;

let jwt = undefined;
export default async function userHandler(req, res) {
  // console.log(req.cookies);
  jwt = req.cookies.jwt;
  if (!jwt) return res.status(401).end();
  const { method } = req;
  switch (method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default: {
      return res.status(401).end();
    }
  }
}
async function handleDelete(req, res) {
  const { product, quantity } = req.body;
}
async function handlePost(req, res) {
  const { product, quantity } = req.body;
  console.log(req.body);
  try {
    const result = await fetchJson(`${CMS_URL}/api/cart-items/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: { product, quantity } }),
    });
    return res.status(200).json(result);
  } catch (error) {
    // console.log(error);
    return res.status(200).json(error);
  }
}

async function handleGet(req, res) {
  try {
    const result = await fetchJson(
      `${CMS_URL}/api/cart-items/?populate=product.picture`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const cartItems = result.data.map((item) => {
      const { id, attributes } = item;
      // console.log("attributes", attributes);

      const {
        quantity,
        product_id,
        product: {
          data: {
            attributes: { title, price, picture },
          },
        },
      } = attributes;
      // console.log("picture", picture);
      const {
        placeholder_webp,
        formats: {
          xsmall: { url },
        },
      } = picture.data[0].attributes;
      // console.log("placeholder_webp", placeholder_webp, url);

      const newItem = {
        id,
        quantity,
        title,
        price,
        product_id,
        placeholder_webp,
        url: CMS_URL + url,
      };
      // console.log("newItem", newItem);
      return newItem;
    });

    // console.log("[cartItems]", cartItems);
    return res.status(200).json(cartItems);
  } catch (error) {
    // console.log(error);
    if (error.status) return res.status(error.status).end;
    else res.status(500).end;
  }
}
