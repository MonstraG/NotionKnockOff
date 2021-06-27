import { FC, useEffect } from "react";
import EditorStore from "~/components/Editor/EditorStore";
import styled from "styled-components";
import MarkdownEditor from "~/components/Editor/MarkdownEditor";

//todo: download file to local pc

const EditorWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 1rem; //always present padding
  background-color: ${({ theme }) => theme.editorBg};
`;

const EditorContainer = styled.div`
  width: 21cm; //a4 width
  max-width: calc(100% - 2rem); //to be shorter then a4 when screen too small
  padding: 12vh 0 30vh;
`;

const Editor: FC<{ post: string }> = ({ post }) => {
  useEffect(() => {
    EditorStore.setMd(post, false);
  }, [post]);

  return (
    <EditorWrapper>
      <EditorContainer>
        <MarkdownEditor value={post} />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default Editor;
