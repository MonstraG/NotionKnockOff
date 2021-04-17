import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPosts, getPostBySlug, Post } from "../../lib/api";
import { FC } from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import Editor from "~/components/Editor/Editor";

type Props = {
  post: Post;
};

const PostPage: FC<Props> = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  console.log(post.content);

  return <Editor slug={post.slug} post={post.content} />;
};

export default PostPage;

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }): Promise<GetStaticPropsResult<Props>> => {
  if (params?.slug == null) {
    return { props: { post: {} as Post } };
  }

  const post = await getPostBySlug(params.slug, ["title", "date", "slug", "content"]);
  return {
    props: {
      post
    }
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: (await posts).map((post: { slug: any }) => ({
      params: {
        slug: post.slug
      }
    })),
    fallback: false
  };
}
