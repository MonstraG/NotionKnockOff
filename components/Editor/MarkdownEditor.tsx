import { FC, useEffect, useState } from "react";
import RichMarkdownEditor from "rich-markdown-editor";
import EditorStore from "~/components/Editor/EditorStore";

const MarkdownEditor: FC<{ value: string }> = ({ value }) => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <RichMarkdownEditor
      value={render ? value : undefined}
      dark
      onSave={(_) => EditorStore.save()}
      onChange={(v) => EditorStore.setMd(v())}
      className="editor"
    />
  );
};

export default MarkdownEditor;
