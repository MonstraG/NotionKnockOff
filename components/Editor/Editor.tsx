import { ChangeEvent, FC, useEffect, useRef, KeyboardEvent } from "react";
import marked from "marked";
import FileSaver from "file-saver";
import EditorStore from "~/components/Editor/EditorStore";
import EditorButtons from "~/components/Editor/EditorButtons";
import styled from "styled-components";

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
  display: flex;
  align-items: stretch;
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 50%;
  resize: none;
`;

const Preview = styled.div`
  width: 50%;

  @media print {
    *:before,
    *:after {
      background: transparent !important;
      color: #000 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]:after {
      content: " (" attr(href) ")";
    }

    abbr[title]:after {
      content: " (" attr(title) ")";
    }

    a[href^="#"]:after,
    a[href^="javascript:"]:after {
      content: "";
    }

    pre,
    blockquote {
      border: 1px solid #999;
      page-break-inside: avoid;
    }

    thead {
      display: table-header-group;
    }

    tr,
    img {
      page-break-inside: avoid;
    }

    img {
      max-width: 100% !important;
    }

    p,
    h2,
    h3 {
      orphans: 3;
      widows: 3;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }
  }

  pre,
  code {
    font-family: "JetBrains Mono", Menlo, Monaco, "Courier New", monospace;
  }

  pre {
    padding: 0.5rem;
    line-height: 1.25;
    overflow-x: scroll;
  }

  a,
  a:visited {
    color: #3498db;
    :hover,
    :focus,
    :active {
      color: #2980b9;
    }
  }

  @media screen and (min-width: 32rem) and (max-width: 48rem) {
    font-size: 15px;
  }

  @media screen and (min-width: 48rem) {
    font-size: 16px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: inherit;
  }

  h1 {
    font-size: 3.5rem;
    margin: 0.5rem 0 2rem;
  }

  h2 {
    font-size: 3rem;
    margin: 0 0 1.5rem;
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.125rem;
  }

  h6 {
    font-size: 1rem;
  }

  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 1rem;
  }

  small {
    font-size: 0.875rem;
  }

  img,
  canvas,
  iframe,
  video,
  svg,
  select,
  textarea {
    max-width: 100%;
  }

  font-size: 18px;
  max-width: 100%;

  body {
    color: #444;
    font-family: "Open Sans Condensed", sans-serif;
    font-weight: 300;
    margin: 0 auto;
    max-width: 48rem;
    padding: 0.25rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Helvetica, sans-serif;
  }

  blockquote {
    border-left: 8px solid #fafafa;
    padding: 1rem;
  }

  pre,
  code {
    background-color: #fafafa;
  }
`;

const Editor: FC = () => {
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
    <>
      <EditorButtons updateMarkdownState={updateMarkdownState} textArea={editorRef.current} />
      <EditorWrapper>
        <TextArea ref={editorRef} onChange={onChange} onKeyDown={keyDownHandler} value={md} />
        <Preview ref={previewRef} dangerouslySetInnerHTML={{ __html: marked(md) }} />
      </EditorWrapper>
    </>
  );
};

export default Editor;
