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
    slug: string;
  };

  export const useStore = create<EditorState>(() => ({
    md: "",
    slug: ""
  }));

  export const md = (state: EditorState) => state.md;

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
    await fetch(`/api/savePost?slug=${slug}`, { body, method: "POST" });
  };

  export const throttledSave = throttle(saveToFile);
}

export default EditorStore;
