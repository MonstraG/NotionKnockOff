import { FC } from "react";
import EditorStore from "~/components/Editor/EditorStore";
import IconButton from "~/components/Editor/IconButton";
import styled from "styled-components";

type Props = {
  updateMarkdownState: (newValue: string, cursorIndex: number) => void;
  textArea: HTMLTextAreaElement | null;
};

const defaultUrl = "https://google.com";

const ButtonBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const EditorButtons: FC<Props> = ({ updateMarkdownState, textArea }) => {
  const formatMarkdownCode = () => {
    if (textArea == null) return;

    const { selectionStart, selectionEnd, value } = textArea;
    const preSelect = value.substring(0, selectionStart);
    const postSelect = value.substring(selectionEnd, value.length);

    //multiline
    if (value.substring(0, selectionStart).split("\n").length > 0) {
      updateTextarea(`${preSelect}\n\`\`\`\n\n\`\`\`\n${postSelect}`, `${preSelect}\n\`\`\`\n`);
    } else {
      updateTextarea(`${preSelect}\`\`${postSelect}`, `${preSelect}\``);
    }
  };

  const formatMarkdownLink = (linkType: string) => {
    if (textArea == null) return;

    const { selectionStart, selectionEnd, value } = textArea;
    const preSelect = value.substring(0, selectionStart);
    const postSelect = value.substring(selectionEnd, value.length);
    const imagePrefix = linkType === "image" ? "!" : "";
    const text = selectionStart !== selectionEnd ? value.slice(selectionStart, selectionEnd) : `${linkType} description`;

    //multiline
    if (value.substring(0, selectionStart).split("\n").length > 0) {
      updateTextarea(
        `${preSelect} ${imagePrefix}[${text}](${defaultUrl}) ${postSelect}`,
        `${preSelect} ${imagePrefix}[${text}](${defaultUrl})`
      );
    } else {
      updateTextarea(
        `${preSelect}\n${imagePrefix}[${text}](${defaultUrl})\n${postSelect}`,
        `${preSelect}\n${imagePrefix}[${text}](${defaultUrl})`
      );
    }
  };

  // if block, inserts /n's, otherwise puts prefix on both sides
  const formatText = (defaultText: string, prefix: string, block: boolean) => {
    if (textArea == null) return;

    const { selectionStart, selectionEnd, value } = textArea;
    const replacedValue = selectionStart !== selectionEnd ? value.slice(selectionStart, selectionEnd) : defaultText;
    const text = `${prefix}${replacedValue}${block ? "" : prefix}`;
    const preSelect = value.substring(0, selectionStart);
    const postSelect = value.substring(selectionEnd, value.length);

    if (block) {
      updateTextarea(`${preSelect}\n${text}\n${postSelect}`, `${preSelect}\n${text}`);
    } else {
      updateTextarea(`${preSelect}${text}${postSelect}`, `${preSelect}${text}`);
    }
  };

  const updateTextarea = (currentValue: string, curString: string) => {
    if (textArea != null) textArea.value = currentValue;
    // get last inserted character index position
    updateMarkdownState(currentValue, curString.length);
  };

  const history = EditorStore.useStore(EditorStore.history);
  const historyStep = EditorStore.useStore(EditorStore.historyStep);

  //todo: hotkeys
  const redo = () => EditorStore.navigateHistory(1);
  const undo = () => EditorStore.navigateHistory(-1);

  return (
    <ButtonBar>
      <IconButton onClick={redo} title="Redo" disabled={historyStep >= history.length - 1}>
        Redo
      </IconButton>
      <IconButton onClick={undo} title="Undo" disabled={historyStep <= 0}>
        Undo
      </IconButton>
      <IconButton onClick={() => formatText("strong", "**", false)} title="Bold">
        Bold
      </IconButton>
      <IconButton onClick={() => formatText("emphasized", "*", false)} title="Italic">
        Italic
      </IconButton>
      <IconButton onClick={() => formatText("heading", "# ", true)} title="Heading">
        Heading
      </IconButton>
      <IconButton onClick={() => formatText("strikethrough", "~~", false)} title="Strikethrough">
        Striketru
      </IconButton>
      <IconButton onClick={() => formatText("list item one\n- list item two", "- ", true)} title="Unordered List">
        UL List
      </IconButton>
      <IconButton onClick={() => formatText("list item one\n2. list item two", "1. ", true)} title="Ordered List">
        OlList
      </IconButton>
      <IconButton onClick={() => formatText("Blockquote", "> ", true)} title="Block Quote">
        BlockQuote
      </IconButton>
      <IconButton onClick={() => formatMarkdownCode()} title="Code">
        Code
      </IconButton>
      <IconButton onClick={() => formatMarkdownLink("link")} title="Link">
        Link
      </IconButton>
      <IconButton onClick={() => formatMarkdownLink("image")} title="Image">
        Img
      </IconButton>
    </ButtonBar>
  );
};

export default EditorButtons;
