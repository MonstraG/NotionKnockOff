import create from "zustand";
import { Post } from "~/lib/helpers";

namespace PostNavStore {
  type PostNavState = {
    posts: Post[] | null;
  };

  export const useStore = create<PostNavState>(() => ({
    posts: null
  }));

  export const posts = ({ posts }: PostNavState) => posts;
  export const setPosts = (posts: Post[]) => useStore.setState({ posts });

  //replaces title, reorders to the top
  export const updatePost = (slug: string, title: string) => {
    const { posts } = useStore.getState();
    if (posts == null) {
      return;
    }
    const updated = posts.find((p) => p.slug === slug);
    if (updated == null) {
      return; //updated post no longer exists?
    }
    updated.title = title;
    setPosts([updated, ...posts.filter((p) => p.slug !== slug)]);
  };
}

export default PostNavStore;
