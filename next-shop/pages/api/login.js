export default function loginHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  console.log("[loginHandler]", req.body);
  return res.status(200).json({});
}
