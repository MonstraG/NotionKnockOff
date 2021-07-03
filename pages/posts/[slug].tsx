import { useRouter } from "next/router";
import { getAllPosts, getPostBySlug } from "~/lib/postApi";
import { FC } from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import Editor from "~/components/Editor/Editor";
import { Post } from "~/lib/helpers";

type Props = {
  post: Post;
};

const PostPage: FC<Props> = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    router.push("/");
    return null;
  }

  return <Editor post={post.content} />;
};

export default PostPage;

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}): Promise<GetStaticPropsResult<Props>> => {
  if (params?.slug == null) {
    return { props: { post: {} as Post } };
  }

  const post = await getPostBySlug(params.slug);
  return {
    props: {
      post
    }
  };
};

export async function getStaticPaths() {
  const posts = await getAllPosts(["slug"]);

  return {
    paths: posts.map((post: { slug: any }) => ({
      params: {
        slug: post.slug
      }
    })),
    fallback: false
  };
}
