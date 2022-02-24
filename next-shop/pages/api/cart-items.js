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
    default: {
      return res.status(401).end();
    }
  }
}

async function handleGet(req, res) {
  try {
    const result = await fetchJson(
      `${CMS_URL}/api/cart-items/?populate=product.picture`,
      {
        headers: { Authorization: `Bearer ${jwt}` },
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
        url,
      };
      // console.log("newItem", newItem);
      return newItem;
    });

    // console.log("[cartItems]", cartItems);
    return res.status(200).json(cartItems);
  } catch (error) {
    if (error.status) return res.status(error.status).end;
    else res.status(500).end;
  }
}
