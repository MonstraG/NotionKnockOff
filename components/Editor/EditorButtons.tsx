import { FC } from "react";
import EditorStore from "~/components/Editor/EditorStore";
import IconButton from "~/components/Editor/IconButton";

type Props = {
  updateMarkdownState: (newValue: string, cursorIndex: number) => void;
  textArea: HTMLTextAreaElement | null;
};

const defaultUrl = "https://google.com";

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
