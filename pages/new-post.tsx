import Layout from "~/components/Layout";
import React, { FC, useEffect, useRef, useState, KeyboardEvent } from "react";

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
      if (!(previewRef.current.className === "hide")) {
        editorRef.current.addEventListener("scroll", onScrollHandler);
        previewRef.current.addEventListener("scroll", onScrollHandler);
        // scroll to bottom
        editorRef.current.scrollTop = editorRef.current.scrollHeight;
        previewRef.current.scrollTop = previewRef.current.scrollHeight;
      }
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

  const onScrollHandler = (e: Event) => {
    if (!editorRef.current) return;

    // sync texteditor and preview windows
    if (e.type === "change") {
      editorRef.current.scrollTop = editorRef.current.scrollHeight;
    } else {
      if (e?.target?.className === "markdown-input") {
        previewRef.current.scrollTop = editorRef.current.scrollTop;
      } else if (!previewRef.current === "hide") {
        editorRef.current.scrollTop = previewRef.current.scrollTop;
      }
    }
  };

  const getDomElements = () => {
    if (!appWrapper.current) return {};

    const headerElement = appWrapper.current.querySelector("header");
    const editorWrapper = appWrapper.current.querySelector(".editor-wrapper");
    const mdPreviewElement = appWrapper.current.querySelector(".markdown-previewer");
    const textAreaElement = appWrapper.current.querySelector("textarea");
    const buttonBarElement = appWrapper.current.querySelector(".buttonbar");
    const editButton = appWrapper.current.querySelector(".edit-button");
    return {
      headerElement,
      editorWrapper,
      mdPreviewElement,
      textAreaElement,
      buttonBarElement,
      editButton
    };
  };

  const showEditMode = () => {
    const { editorWrapper, mdPreviewElement, textAreaElement, buttonBarElement, headerElement, editButton } = getDomElements();
    // check eye button was clicked when textarea was in fullscreen mode
    headerElement.classList.toggle("hide");
    buttonBarElement.classList.toggle("hide");
    textAreaElement.classList.toggle("hide");
    editorWrapper.classList.toggle("col-1");
    mdPreviewElement.classList.toggle("editor-padding");
    mdPreviewElement.classList.toggle("editor-col");
    mdPreviewElement.classList.toggle("show");
    editButton.classList.toggle("show");
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
      <div className="container" ref={appWrapper}>
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
        <div className="editor-container">
          <div className="split editor-wrapper" ref={editorWrapperRef}>
            <div>
              <textarea
                ref={editorRef}
                className="markdown-input"
                onBlur={changeHandler}
                onChange={changeHandler}
                onKeyDown={keyDownHandler}
                value={md}
              />
            </div>
            <ButtonBar getDomElements={getDomElements} />
            <div ref={previewRef} dangerouslySetInnerHTML={{ __html: marked(md) }} />
            <button onClick={() => showEditMode()} className="edit-button">
              <PencilIcon />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditorPage;
