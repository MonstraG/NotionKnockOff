import create from "zustand";

// first call executed immediately, subsequent calls get debounced
// todo: throttle not debounce
const debounce = (func: Function, limit: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  let debounceActive = false;
  let debouncing = false; // was there even a call to debounce
  return function (...args: any[]) {
    // @ts-ignore
    const context = this;

    if (debounceActive) {
      debouncing = true;
      clearTimeout(timeout);
    } else {
      func.apply(context, args);
      debounceActive = true;
    }

    timeout = setTimeout(() => {
      if (debouncing) {
        func.apply(context, args);
      }
      debounceActive = false;
      debouncing = false;
    }, limit);
  };
};

namespace EditorStore {
  type EditorState = {
    md: string; //current editor markdown content
    history: string[]; // history of md, to redo/undo
    historyStep: number; //index where in history are we
    slug: string;
  };

  //todo: undo/redo moves selection to the end of the input, fix that
  export const useStore = create<EditorState>(() => ({
    md: "",
    history: [""],
    historyStep: 0,
    slug: ""
  }));

  export const md = (state: EditorState) => state.md;
  export const history = (state: EditorState) => state.history;
  export const historyStep = (state: EditorState) => state.historyStep;
  export const canUndo = (state: EditorState) => state.historyStep > 0;
  export const canRedo = (state: EditorState) => state.historyStep < state.history.length - 1;

  export const setMd = (md: string, save: boolean = true) => {
    useStore.setState((prevState) => {
      if (save && prevState.slug) {
        debouncedSave(prevState.slug, md);
      }
      return { md };
    });
  };

  export const setSlug = (slug: string) => useStore.setState({ slug });

  // this can change `branches` (forget about future on changes in the middle thanks to slice)
  export const addHistory = (value: string) =>
    useStore.setState((prevState) => ({
      history: [...prevState.history.slice(0, prevState.historyStep + 1), value],
      historyStep: prevState.historyStep + 1
    }));

  export const navigateHistory = (step: 1 | -1) =>
    useStore.setState((prevState) => {
      const historyStep = prevState.historyStep + step;
      const md = prevState.history[historyStep];
      return { md, historyStep };
    });

  export const redo = () => navigateHistory(1);
  export const undo = () => navigateHistory(-1);

  const saveToFile = async (slug: string, body: string) => {
    await fetch(`/api/savePost?slug=${slug}`, { body, method: "POST" });
  };

  const debouncedSave = debounce(saveToFile, 300);
}

export default EditorStore;
