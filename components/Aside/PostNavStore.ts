import create from "zustand";
import { Post } from "../../lib/helpers";

namespace PostNavStore {
  type PostNavState = {
    posts: Post[] | null;
  };

  export const useStore = create<PostNavState>(() => ({
    posts: null
  }));

  export const pages = (state: PostNavState) => state.posts;
  export const setPages = (pages: Post[]) => useStore.setState({ posts: pages });

  //replaces title, reorders to the top
  export const updatePage = (slug: string, title: string) => {
    const { posts } = useStore.getState();
    if (posts == null) {
      return;
    }
    const updated = posts.find((p) => p.slug === slug);
    if (updated == null) {
      return; //updated post no longer exists?
    }
    updated.title = title;
    setPages([updated, ...posts.filter((p) => p.slug !== slug)]);
  };
}

export default PostNavStore;
