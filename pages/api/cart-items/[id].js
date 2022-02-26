import { fetchJson } from "../../../lib/api";

const CMS_URL = process.env.CMS_URL;

let jwt = undefined;
export default async function userHandler(req, res) {
  // console.log(req.cookies);
  jwt = req.cookies.jwt;
  if (!jwt) return res.status(401).end();

  if (req.method !== "DELETE") return res.status(400).end();
  const { id } = req.query;
  try {
    const result = await fetchJson(`${CMS_URL}/api/cart-items/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(200).json(error);
  }
}
