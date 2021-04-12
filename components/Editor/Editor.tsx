import { ChangeEvent, FC, useEffect, useRef, KeyboardEvent } from "react";
import marked from "marked";
import FileSaver from "file-saver";
import EditorStore from "~/components/Editor/EditorStore";
import EditorButtons from "~/components/Editor/EditorButtons";

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

const Editor: FC = () => {
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const md = EditorStore.useStore(EditorStore.md);

  useEffect(() => {
    if (md === "") {
      EditorStore.setMd(initialMd);
    }
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
    // save state in history if backspace or delete or enter key is pressed
    if (["Backspace", "Delete", "Enter", "NumpadEnter"].includes(event.code)) {
      EditorStore.addHistory(md);
    }
  };

  return (
    <div>
      <EditorButtons updateMarkdownState={updateMarkdownState} textArea={editorRef.current} />
      <div ref={editorWrapperRef}>
        <div>
          <textarea ref={editorRef} onChange={onChange} onKeyDown={keyDownHandler} value={md} />
        </div>
        <div ref={previewRef} dangerouslySetInnerHTML={{ __html: marked(md) }} />
      </div>
    </div>
  );
};

export default Editor;
