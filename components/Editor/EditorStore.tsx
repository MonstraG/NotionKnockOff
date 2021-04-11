import create from "zustand";

namespace EditorStore {
  const key = "markdownEditorStorage";

  type EditorState = {
    md: string; //current editor markdown content
    history: string[]; // history of md, to redo/undo
    historyStep: number; //index where in history are we
  };

  export const useStore = create<EditorState>(() => ({
    md: "",
    history: [""],
    historyStep: 0
  }));

  export const md = (state: EditorState) => state.md;
  export const history = (state: EditorState) => state.history;
  export const historyStep = (state: EditorState) => state.historyStep;

  export const setMd = (md: string) => {
    useStore.setState({ md });
    //todo: save to file, throttle saving (show spinner while throttling)
  };

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
      localStorage.setItem(key, md);
      return { md, historyStep };
    });
}

export default EditorStore;
