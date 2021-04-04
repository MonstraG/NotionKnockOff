import { GetStaticProps, NextPage } from "next";
import Layout from "~/components/Layout";
import { getAllPosts, Post } from "../lib/api";
import { Linka } from "~/utils/common";

type Props = {
  posts: Post[];
};

const IndexPage: NextPage<Props> = ({ posts }) => (
  <Layout>
    <div>
      {posts.map((p) => (
        <div key={p.slug}>
          <Linka href={`/posts/${p.slug}`}>
            <h3>{p.title}</h3>
          </Linka>
          <p>{p.excerpt}</p>
          <time>{p.date}</time>
        </div>
      ))}
    </div>
  </Layout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    posts: getAllPosts(["title", "date", "slug", "author", "excerpt"])
  }
});
