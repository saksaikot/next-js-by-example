import { fetchJson } from "../../lib/api";

export default async function loginHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  const { email, password } = req.body;
  try {
    const response = await fetchJson(`http://127.0.0.1:1337/api/auth/local`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    });

    const {
      jwt,
      user: { id, username },
    } = response;
    console.log("[loginHandler]", response);
    return res.status(200).json({ id, name: username });
  } catch (error) {
    // console.log(error);
    return res.status(error.status).end();
  }
}
