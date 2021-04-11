import { FC } from "react";
import EditorStore from "~/components/Editor/EditorStore";
import IconButton from "~/components/Editor/IconButton";

// todo: use getSelection? //https://developer.mozilla.org/en-US/docs/Web/API/Window/getSelection

const formatSelection = (str: string, prefix: string, block: boolean) => `${prefix}${str}${block ? "" : prefix}`;

type Props = {
  updateMarkdownState: (newValue: string, cursorIndex: number) => void;
};

const defaultUrl = "https://google.com";

//todo: pass textarea as ref?
const EditorButtons: FC<Props> = ({ updateMarkdownState }) => {
  const formatMarkdownCode = () => {
    //https://stackoverflow.com/questions/8931568/detect-if-the-selected-text-spans-on-the-entire-line-or-more-lines
    //todo:
    // if selected text contains /n or /r or smth like that, then use ``` otherwise `
  };

  //todo: simplify, use selection instead of url param (use formatText() instead basically)
  const formatMarkdownLink = (type: string) => {
    const startPos = textArea.selectionStart;
    const endPos = textArea.selectionEnd;
    const textBeforeCursorPosition = textArea.value.substring(0, startPos);
    const textAfterCursorPosition = textArea.value.substring(endPos, textArea.value.length);
    const lines = textArea.value.substring(0, startPos).split("\n");
    const exclamation = linkType === "image" ? "!" : "";
    const text = startPos !== endPos ? textArea.value.slice(startPos, endPos) : `enter ${linkType} description here`;

    let currentValue;
    let cursorIndex;
    let curString;
    if (lines[lines.length - 1]) {
      currentValue = `${textBeforeCursorPosition} ${exclamation}[${text}](${defaultUrl}) ${textAfterCursorPosition}`;
      curString = `${textBeforeCursorPosition} ${exclamation}[${text}](${defaultUrl})`;
    } else {
      currentValue = `${textBeforeCursorPosition}\n${exclamation}[${text}](${defaultUrl})\n${textAfterCursorPosition}`;
      curString = `${textBeforeCursorPosition}\n${exclamation}[${text}](${defaultUrl})`;
    }

    textArea.value = currentValue;
    // get last inserted character index position
    cursorIndex = Number(curString.length);
    updateMarkdownState(currentValue, cursorIndex);
  };

  // if block, inserts /n's, otherwise puts prefix on both sides
  const formatText = (defaultText: string, prefix: string, block: boolean) => {
    const startPos = textArea.selectionStart;
    const endPos = textArea.selectionEnd;
    // if text is highlighted or selected
    const text = formatSelection(prefix, startPos !== endPos ? textArea.value.slice(startPos, endPos) : defaultText, block);

    const beforeSelection = textArea.value.substring(0, startPos);
    const afterSelection = textArea.value.substring(endPos, textArea.value.length);

    let currentValue;
    let cursorIndex;
    let curString;
    if (block) {
      currentValue = `${beforeSelection}\n${text}\n${afterSelection}`;
      curString = `${beforeSelection}\n${text}`;
    } else {
      currentValue = `${beforeSelection}${text}${afterSelection}`;
      curString = `${beforeSelection}${text}`;
    }

    textArea.value = currentValue;
    // get last inserted character index position
    cursorIndex = Number(curString.length);
    props.updateMarkdownState(currentValue, cursorIndex);
  };

  const history = EditorStore.useStore(EditorStore.history);
  const historyStep = EditorStore.useStore(EditorStore.historyStep);

  return (
    <div>
      <IconButton onClick={() => EditorStore.navigateHistory(1)} title="Redo" disabled={historyStep < history.length - 1}>
        IRedo
      </IconButton>
      <IconButton onClick={() => EditorStore.navigateHistory(-1)} title="Undo" disabled={historyStep > 0}>
        IUndo
      </IconButton>
      <IconButton onClick={() => formatText("strong text", "**", false)} title="Bold">
        IBold
      </IconButton>
      <IconButton onClick={() => formatText("emphasized text", "*", false)} title="Italic">
        IItalic
      </IconButton>
      <IconButton onClick={() => formatText("heading", "# ", true)} title="Heading">
        IHeading
      </IconButton>
      <IconButton onClick={() => formatText("strikethrough text", "~~", false)} title="Strikethrough">
        IStrketru
      </IconButton>
      <IconButton onClick={() => formatText("list item one\n- list item two", "- ", true)} title="Unordered List">
        IULList
      </IconButton>
      <IconButton onClick={() => formatText("list item one\n2. list item two", "1. ", true)} title="Ordered List">
        IOlList
      </IconButton>
      <IconButton onClick={() => formatText("Blockquote", "> ", true)} title="Block Quote">
        IBlockQuote
      </IconButton>
      <IconButton onClick={() => formatMarkdownCode()} title="Code">
        ICode
      </IconButton>
      <IconButton onClick={() => formatMarkdownLink("link")} title="Link">
        ILink
      </IconButton>
      <IconButton onClick={() => formatMarkdownLink("image")} title="Image">
        IImg
      </IconButton>
    </div>
  );
};

export default EditorButtons;
