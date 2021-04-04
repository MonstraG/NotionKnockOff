import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_pages");

export const getPostSlugs = () => fs.readdirSync(postsDirectory);

export interface Post {
  slug: string;
  content: string;
  title: string;
  excerpt: string;
  date: Date;
  author: string;
}

type PostFields = (keyof Post)[];

export function getPostBySlug(slug: string, fields: PostFields = []): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: Partial<Post> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items as Post;
}

export const getAllPosts = (fields: PostFields = []): Post[] =>
  getPostSlugs()
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
