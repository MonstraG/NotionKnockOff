import Layout from "~/components/Layout";
import { FC, useEffect, useRef, useState, KeyboardEvent } from "react";
import marked from "marked";
import FileSaver from "file-saver";
import { jsPDF } from "jspdf";
import useLocalStorage from "~/components/useLocalStorage";

//todo: dom purify?

const mdInitialHistory = [
  `
# This is a heading
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

This line contains **strong** text.

This is \`inline\` code

The following is a link: [link text](https://www.reddit.com)

unordered list items:
- houses
- cars
- animals

ordered list items:
1. first
2. second
3. fourth

This is a paragraph`
];

const EditorPage: FC = () => {
  const [mdHistory, setMdHistory] = useState(mdInitialHistory);
  const [md, setMarkdown] = useLocalStorage(mdHistory[0]);
  let [historyStep, setHistoryStep] = useState(0);
  const [undoState, setUndoState] = useState(false);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const appWrapper = useRef(null);

  useEffect(() => {
    localStorage.setItem("savedState", md);
  }, [md]);

  useEffect(() => {
    if (editorRef.current && previewRef.current) {
      //on scroll:
      // todo: sync preview and editor
      // scroll to bottom on open
    }
  }, [previewRef, editorRef]);

  // redo to `previous` state
  const handleRedo = () => {
    if (!editorRef.current) return;

    if (historyStep === mdHistory.length - 1) {
      setUndoState(false); // disable button if no more redo's
      return;
    }
    const newHistoryStep = historyStep + 1;
    setHistoryStep(newHistoryStep);
    const next = mdHistory[newHistoryStep];
    setMarkdown(next);
    editorRef.current.value = next;
  };

  // undo to previous state
  const handleUndo = () => {
    if (!editorRef.current) return;
    if (historyStep === 0) {
      return;
    }
    const newHistoryStep = historyStep - 1;
    setHistoryStep(newHistoryStep);
    const previous = mdHistory[newHistoryStep];
    setMarkdown(previous);
    editorRef.current.value = previous;
    setUndoState(true);
  };

  const updateMarkdownState = (newValue: string, cursorIndex: number) => {
    if (!editorRef.current) return;

    // update state when buttons such as bold, italic, etc
    // is clicked
    const newMdHistory = mdHistory.slice(0, historyStep + 1);
    setMdHistory(newMdHistory.concat([newValue]));
    setHistoryStep((historyStep += 1));
    setMarkdown(newValue);

    editorRef.current.selectionStart = cursorIndex;
    editorRef.current.selectionEnd = cursorIndex;
    editorRef.current.focus();
  };

  const saveAsHtml = (hideModal: () => void) => {
    const content = marked(md);
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    FileSaver.saveAs(blob, "newHtmlDocument.html");
    hideModal();
  };

  const saveAsMarkdown = (hideModal: () => void) => {
    const blob = new Blob([md], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "newMarkdownDocument.md");
    hideModal();
  };

  const saveAsPDF = (hideModal: () => void) => {
    const content = marked(md);
    const filename = "newDocument.pdf";
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save(filename);
    hideModal();
  };

  const changeHandler = (e) => {
    // save state on each keypress
    const value = e.target.value;
    setMarkdown(value);
  };

  const keyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // save state in history if backspace or delete or enter key is pressed
    if (["Backspace", "Delete", "Enter", "NumpadEnter"].includes(event.code)) {
      saveHistory(md);
    }
  };

  const saveHistory = (newValue: string) => {
    const newMdHistory = mdHistory.slice(0, historyStep + 1);
    setMdHistory(newMdHistory.concat([newValue]));
    setHistoryStep((historyStep += 1));
  };

  return (
    <Layout>
      <div ref={appWrapper}>
        <EditorNav
          getTextArea={getTextArea}
          setCursorPos={setCursorPos}
          updateMarkdownState={updateMarkdownState}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          historyStep={historyStep}
          undoState={undoState}
          setMarkdown={setMarkdown}
          saveHistory={saveHistory}
          saveAsHtml={saveAsHtml}
          saveAsMarkdown={saveAsMarkdown}
          saveAsPDF={saveAsPDF}
        />
        <div>
          <div ref={editorWrapperRef}>
            <div>
              <textarea ref={editorRef} onBlur={changeHandler} onChange={changeHandler} onKeyDown={keyDownHandler} value={md} />
            </div>
            <div ref={previewRef} dangerouslySetInnerHTML={{ __html: marked(md) }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditorPage;
