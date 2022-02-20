import cookie from "cookie";

export default async function handleLogout(req, res) {
  return res
    .status(200)
    .setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        path: "/api",
        httpOnly: true,
        expires: new Date(0),
      })
    )
    .json({});
}
