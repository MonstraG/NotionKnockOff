import create from "zustand";

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
    title: string;
    slug: string;
  };

  export const useStore = create<EditorState>(() => ({
    md: "",
    title: "",
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
    const { slug, title, md } = useStore.getState();
    await saveToFile(slug, title, md);
  };

  const saveToFile = async (slug: string, title: string, body: string) => {
    await fetch(`/api/savePost?slug=${slug}?title=${title}`, { body, method: "POST" });
  };

  export const throttledSave = throttle(saveToFile);
}

export default EditorStore;
