import create from "zustand";
import PostNavStore from "~/components/Aside/PostNavStore";
import { resolveTitle } from "~/lib/helpers";

const throttle = (func: Function) => {
  let lastArgs: any[];
  let throttleTimeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    lastArgs = args;
    clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(() => {
      func(...lastArgs);
    }, 500);
  };
};

namespace EditorStore {
  type EditorState = {
    md: string; //current editor markdown content
    slug: string;
  };

  export const useStore = create<EditorState>(() => ({
    md: "",
    slug: ""
  }));

  export const slug = (state: EditorState) => state.slug;

  export const setMd = (md: string, save: boolean = true) => {
    useStore.setState((prevState) => {
      if (save && prevState.slug) {
        throttledSave(prevState.slug, md);
      }
      return { md };
    });
  };

  export const setSlug = (slug: string) => useStore.setState({ slug });

  export const save = async () => {
    const { slug, md } = useStore.getState();
    await saveToFile(slug, md);
  };

  const saveToFile = async (slug: string, body: string) => {
    //update title
    PostNavStore.updatePage(slug, resolveTitle(body));
    //save data
    return await fetch(`/api/savePost?slug=${slug}`, { body, method: "PUT" });
  };

  export const throttledSave = throttle(save);
}

export default EditorStore;
