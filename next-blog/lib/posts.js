import { readFile } from "fs/promises";
import { marked } from "marked";
import matter from "gray-matter";
export async function getPost(slug) {
  const source = await readFile(`contents/posts/${slug}.md`, "utf-8");
  const {
    data: { title, date },
    content,
  } = matter(source);
  const body = marked(content);
  // console.log({ title, date, body });
  return { title, body, date };
}
