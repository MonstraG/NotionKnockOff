import { FC, memo, useEffect, useState } from "react";
import RichMarkdownEditor from "rich-markdown-editor";
import { Router } from "next/router";
import EditorStore from "~/components/Editor/EditorStore";

// const resolveMd = () => {
//   const [value, setValue] = useState("");
//   const [initialized, setInitialised] = useState(false);
//   const md = EditorStore.useStore(EditorStore.md);
//   useEffect(() => {
//     if (!initialized && md != null) {
//       setValue(md);
//       setInitialised(true);
//     }
//   }, [md]);
//   return value;
// };

const Editor: FC = () => {
  const [render, setRender] = useState(false);

  //todo: fix this not loading and saving and stuff

  useEffect(() => {
    const handle = () => {
      // it doesn't work without setTimeout but I don't know why
      setTimeout(() => setRender(true));
    };

    // bind to window load event for ssr and route change event for csr
    window.addEventListener("load", handle);
    Router.events.on("routeChangeComplete", handle);

    return () => {
      window.removeEventListener("load", handle);
      Router.events.off("routeChangeComplete", handle);
    };
  }, []);

  // render the editor initially with an empty string until the document is completely loaded
  // this is important because the change in value causes prosemirror to rerender the dom correctly on the client later
  //todo: fix onSave
  return (
    <RichMarkdownEditor
      value={render ? "value" : ""}
      dark
      onSave={(_) => EditorStore.save()}
      onChange={(v) => EditorStore.setMd(v())}
      className="editor"
    />
  );
};

export default memo(Editor);
