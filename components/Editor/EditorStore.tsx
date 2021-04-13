import create from "zustand";

namespace EditorStore {
  type EditorState = {
    md: string; //current editor markdown content
    history: string[]; // history of md, to redo/undo
    historyStep: number; //index where in history are we
  };

  //todo: undo/redo moves selection to the end of the input, fix that
  export const useStore = create<EditorState>(() => ({
    md: "",
    history: [""],
    historyStep: 0
  }));

  export const md = (state: EditorState) => state.md;
  export const history = (state: EditorState) => state.history;
  export const historyStep = (state: EditorState) => state.historyStep;
  export const canUndo = (state: EditorState) => state.historyStep > 0;
  export const canRedo = (state: EditorState) => state.historyStep < state.history.length - 1;

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
      return { md, historyStep };
    });

  export const redo = () => navigateHistory(1);
  export const undo = () => navigateHistory(-1);
}

export default EditorStore;
