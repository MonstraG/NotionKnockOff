import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { allFields, PostFields, Post, resolveTitle } from "./helpers";

const postsDirectory = join(process.cwd(), "_posts");

const getPostPath = (slug: string): string => join(process.cwd(), "_posts", `${slug}.md`);

export const getPostSlugs = (): Promise<string[]> =>
  fs.promises.readdir(postsDirectory).then((filenames) => filenames.map((file) => file.replace(".md", "")));

export const getPostBySlug = (slug: string, fields: PostFields = allFields): Promise<Post> => {
  const fullPath = getPostPath(slug);
  return fs.promises.readFile(fullPath, "utf8").then((fileContents) => {
    const { data, content } = matter(fileContents);

    // Ensure only the minimal needed data is exposed
    const items: Partial<Post> = {};
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = slug;
      }
      if (field === "content") {
        items[field] = content;
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
};

const getPostRaw = (slug: string): Promise<string> => fs.promises.readFile(getPostPath(slug), "utf8");

export const getAllPosts = (fields: PostFields = []): Promise<Post[]> =>
  getPostSlugs().then((slugs) => Promise.all(slugs.map((slug) => getPostBySlug(slug, fields))));

export const createNewPost = async (): Promise<string> => {
  const newSlug = await getUniqueSlug();
  await savePost(newSlug, "");
  return newSlug;
};

export const savePost = (slug: string, content: string): Promise<void> => {
  const attributes = `---
title: '${resolveTitle(content)}'
date: '${new Date().toISOString()}'
---\n
  `;
  return fs.promises.writeFile(getPostPath(slug), attributes + content);
};

export const duplicatePost = async (slug: string): Promise<string> => {
  const duplicatedPost = await getPostRaw(slug);
  const newSlug = await getUniqueSlug();
  const fullPath = getPostPath(newSlug);
  await fs.promises.writeFile(fullPath, duplicatedPost);
  return newSlug;
};

export const deletePost = async (slug: string): Promise<void> => await fs.promises.rm(getPostPath(slug));

const getUniqueSlug = async (): Promise<string> => {
  const posts = await getPostSlugs();
  let newSlug = generateSlug();
  while (posts.indexOf(newSlug) != -1) {
    newSlug = generateSlug();
  }
  return newSlug;
};

const generateSlug = (): string => {
  const result = [];
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 32; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join("");
};
