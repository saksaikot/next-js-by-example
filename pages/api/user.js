import { fetchJson } from "../../lib/api";

const CMS_URL = process.env.CMS_URL;

export default async function userHandler(req, res) {
  // console.log(req.cookies);
  const { jwt } = req.cookies;
  if (!jwt) return res.status(401).end();
  try {
    const response = await fetchJson(`${CMS_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    // console.log(response);
    const { id, username: name, email } = response;
    return res.status(200).json({ id, name, email });
  } catch (error) {
    return res.status(error.status).end;
  }
}
