import { FC, useEffect } from "react";
import EditorStore from "~/components/Editor/EditorStore";
import styled from "styled-components";
import MarkdownDisplay from "~/components/Editor/MarkdownEditor";

//todo: download file to local pc

const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
  background-color: ${(props) => props.theme.editorBg};
  overflow-y: scroll;
`;

const EditorContainer = styled.div`
  width: 21cm; //a4 width
  max-width: calc(100% - 2rem);
  .editor {
    padding: 15vh 0 30vh;
  }
`;

const Editor: FC<{ post: string }> = ({ post }) => {
  useEffect(() => {
    EditorStore.setMd(post, false);
  }, [post]);

  return (
    <EditorWrapper>
      <EditorContainer>
        <MarkdownDisplay value={post} />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default Editor;
