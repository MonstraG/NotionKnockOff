import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_pages");

export const getPostSlugs = (): Promise<string[]> => fs.promises.readdir(postsDirectory);

export interface Post {
  slug: string;
  content: string;
  title: string;
  date: Date;
}

export type PostFields = (keyof Post)[];

export function getPostBySlug(slug: string, fields: PostFields = []): Promise<Post> {
  const fileName = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${fileName}.md`);
  return fs.promises.readFile(fullPath, "utf8").then((fileContents) => {
    const { data, content } = matter(fileContents);

    // Ensure only the minimal needed data is exposed
    const items: Partial<Post> = {};
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = fileName;
      }
      if (field === "content") {
        items[field] = content;
      }

      if (data[field]) {
        items[field] = data[field];
      }
    });

    return items as Post;
  });
}

export const getAllPosts = (fields: PostFields = []): Promise<Post[]> =>
  getPostSlugs().then((slugs) => Promise.all(slugs.map((slug) => getPostBySlug(slug, fields))));

export const savePost = (slug: string, content: string) => {
  //todo: hardcode for now
  const attributes = `
---
title: '${slug}'
date: '${new Date().toISOString()}'
---\n
  `;
  const fullPath = join(postsDirectory, `${slug}.md`);
  return fs.promises.writeFile(fullPath, attributes + content);
};
