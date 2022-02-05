import { readFile } from "fs/promises";

export async function getPost(slug) {
  const data = await readFile(`contents/posts/${slug}.json`, "utf-8");

  return JSON.parse(data);
}
