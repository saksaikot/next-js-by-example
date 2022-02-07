import { readdir, readFile } from "fs/promises";
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

export async function getSlugs() {
  const extension = ".md";
  const files = await readdir("contents/posts/");
  return files
    .filter((file) => file.endsWith(extension))
    .map((filename) => filename.slice(0, -extension.length));
}

export async function getPosts() {
  const slugs = await getSlugs();
  const posts = [];
  for (const slug of slugs) {
    const post = await getPost(slug);
    posts.push({ slug, ...post });
  }
  return posts;
}
