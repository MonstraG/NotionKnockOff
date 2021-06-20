import { FC } from "react";
import RichMarkdownEditor from "rich-markdown-editor";
import EditorStore from "~/components/Editor/EditorStore";

const MarkdownEditor: FC<{ value: string }> = ({ value }) => (
  <RichMarkdownEditor
    defaultValue={value}
    dark
    onSave={(_) => EditorStore.save()}
    onChange={(v) => EditorStore.setMd(v())}
    className="editor"
    extensions={[]}
    readOnly={false}
    autoFocus
  />
);

export default MarkdownEditor;
