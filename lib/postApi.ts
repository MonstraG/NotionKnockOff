import fs from "fs";
import matter from "gray-matter";
import { allFields, PostFields, Post, resolveTitle } from "./helpers";
import { Api } from "~/lib/api";
import combinePromises from "combine-promises";

const PostApi = new Api("_posts", ".md");

const getPostRaw = (slug: string): Promise<string> => fs.promises.readFile(PostApi.getItemPath(slug), "utf8");

export const getPostBySlug = (slug: string, fields: PostFields = allFields): Promise<Partial<Post>> =>
  getPostRaw(slug).then((fileContents) => {
    const { data, content } = matter(fileContents);

    // Ensure only the minimal needed data is exposed
    const items: Partial<Post> = { slug };
    fields.forEach((field) => {
      if (field === "content") {
        items[field] = content;
      }
      if (data[field]) {
        items[field] = data[field];
      }
    });

    return items;
  });

export const getAllPosts = (fields: PostFields = []): Promise<Partial<Post>[]> =>
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

export const duplicatePost = async (slug: string): Promise<string> =>
  combinePromises({
    newSlug: PostApi.getUniqueSlug(),
    content: getPostRaw(slug)
  }).then(({ newSlug, content }) => PostApi.saveItem(newSlug, content).then(() => newSlug));

export const deletePost = async (slug: string): Promise<void> => PostApi.removeItem(slug);
