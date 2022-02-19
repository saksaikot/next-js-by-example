import { fetchJson } from "../../lib/api";
import cookie from "cookie";
const CMS_URL = process.env.CMS_URL;
const WEEK_IN_SECONDS = 604800;

export default async function loginHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password } = req.body;
  try {
    const response = await fetchJson(`${CMS_URL}/api/auth/local`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    });

    const {
      jwt,
      user: { id, username },
    } = response;
    console.log("[loginHandler]", response);
    return res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          path: "/api",
          httpOnly: true,
          maxAge: WEEK_IN_SECONDS,
        })
      )
      .json({ id, name: username });
  } catch (error) {
    // console.log(error);
    return res.status(error.status).end();
  }
}
