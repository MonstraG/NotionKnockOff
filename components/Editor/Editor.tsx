import { ChangeEvent, FC, useEffect, useRef, KeyboardEvent } from "react";
import marked from "marked";
import FileSaver from "file-saver";
import EditorStore from "~/components/Editor/EditorStore";
import EditorButtons from "~/components/Editor/EditorButtons";
import styled from "styled-components";
import Preview from "~/components/Editor/Preview";

//todo: dom purify?

//todo: save on localstorage save
export const saveAsMarkdown = (md: string) => {
  //todo: pagename
  const blob = new Blob([md], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, "newMarkdownDocument.md");
};

const initialMd = `
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

This is a paragraph`;

const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;

  color: rgba(255, 255, 255, 0.87);
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: 300;
  margin: 0 auto;
  padding: 0.25rem;
  background-color: #222;
`;

const EditorContainer = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 50%;
  resize: none;
  color: rgba(255, 255, 255, 0.87);
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: 300;
  margin: 0 auto;
  padding: 0.25rem;
  background-color: #222;
  border: none;
`;

const Editor: FC<{ slug?: string; post?: string }> = ({ slug, post }) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const md = EditorStore.useStore(EditorStore.md);
  const canUndo = EditorStore.useStore(EditorStore.canUndo);
  const canRedo = EditorStore.useStore(EditorStore.canRedo);

  useEffect(() => {
    EditorStore.setSlug(slug || "");
    EditorStore.setMd(post || initialMd, false);
  }, []);

  useEffect(() => {
    if (editorRef.current && previewRef.current) {
      //on scroll:
      // todo: sync preview and editor
      // scroll to bottom on open
    }
  }, [previewRef, editorRef]);

  const updateMarkdownState = (newValue: string, cursorIndex: number) => {
    if (!editorRef.current) return;

    EditorStore.setMd(newValue);
    EditorStore.addHistory(md);

    editorRef.current.selectionStart = cursorIndex;
    editorRef.current.selectionEnd = cursorIndex;
    editorRef.current.focus();
  };

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => EditorStore.setMd(event.target.value);

  const keyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    //otherwise internal browser commands execute
    if (event.ctrlKey) {
      event.preventDefault();
    }
    // save state in history if backspace or delete or enter key is pressed
    if (["Backspace", "Delete", "Enter", "NumpadEnter"].includes(event.code)) {
      EditorStore.addHistory(md);
    }

    if (event.ctrlKey && !event.shiftKey && event.key == "z") {
      if (canUndo) {
        EditorStore.undo();
        return;
      }
    }
    if (event.ctrlKey && event.shiftKey && event.key == "z") {
      if (canRedo) {
        EditorStore.redo();
        return;
      }
    }
  };

  return (
    <EditorWrapper>
      <EditorButtons updateMarkdownState={updateMarkdownState} textArea={editorRef.current} />
      <EditorContainer>
        <TextArea ref={editorRef} onChange={onChange} onKeyDown={keyDownHandler} value={md} />
        <Preview ref={previewRef} dangerouslySetInnerHTML={{ __html: marked(md) }} />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default Editor;
