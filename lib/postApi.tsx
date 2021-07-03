import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { allFields, PostFields, Post, resolveTitle } from "./helpers";
import { Api } from "~/lib/api";

const directory = join(process.cwd(), "_posts");
const extension = ".md";

const PostApi = new Api(directory, extension);

export const getPostBySlug = (slug: string, fields: PostFields = allFields): Promise<Post> => {
  const fullPath = PostApi.getItemPath(slug);
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

export const getAllPosts = (fields: PostFields = []): Promise<Post[]> =>
  PostApi.getItemSlugs().then((slugs) => Promise.all(slugs.map((slug) => getPostBySlug(slug, fields))));

export const createNewPost = async (content: string = ""): Promise<string> => {
  const newSlug = await PostApi.getUniqueSlug();
  return savePost(newSlug, content).then(() => newSlug);
};

export const savePost = (slug: string, content: string): Promise<void> => {
  const attributes = `---
title: '${resolveTitle(content)}'
date: '${new Date().toISOString()}'
---\n
  `;
  return PostApi.saveItem(slug, attributes + content);
};

const getPostRaw = (slug: string): Promise<string> => fs.promises.readFile(PostApi.getItemPath(slug), "utf8");

export const duplicatePost = async (slug: string): Promise<string> => getPostRaw(slug).then(createNewPost);

export const deletePost = async (slug: string): Promise<void> => PostApi.removeItem(slug);
