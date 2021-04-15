import create from "zustand";
import { Post } from "../../lib/api";

namespace PostNavStore {
  type PostNavState = {
    posts: Post[] | null;
  };

  export const useStore = create<PostNavState>(() => ({
    posts: null
  }));

  export const pages = (state: PostNavState) => state.posts;
  export const setPages = (pages: Post[]) => useStore.setState({ posts: pages });
}

export default PostNavStore;
