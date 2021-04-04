import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Layout from "~/components/Layout";
import { getAllPosts, getPostBySlug, Post } from "../../lib/api";
import markdownToHtml from "../../lib/mdToHtml";
import { FC } from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

type Props = {
  post: Post;
};

const PostPage: FC<Props> = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout title={post.title} header={post.title}>
      <article>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
};

export default PostPage;

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }): Promise<GetStaticPropsResult<Props>> => {
  if (params?.slug == null) {
    return { props: { post: {} as Post } };
  }

  const post = getPostBySlug(params.slug, ["title", "date", "slug", "author", "content"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post: { slug: any }) => ({
      params: {
        slug: post.slug
      }
    })),
    fallback: false
  };
}
