import { FC, useEffect } from "react";
import EditorStore from "~/components/Editor/EditorStore";
import styled from "styled-components";
import MarkdownDisplay from "~/components/Editor/MarkdownDisplay";

//todo: dom purify?

//todo: download file to local pc

const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 4rem 1rem;
  background-color: rgb(24, 26, 27);
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: dark;

  scrollbar-face-color: #646464;
  scrollbar-base-color: #646464;
  scrollbar-3dlight-color: #646464;
  scrollbar-highlight-color: #646464;
  scrollbar-track-color: #000;
  scrollbar-arrow-color: #000;
  scrollbar-shadow-color: #646464;
  scrollbar-dark-shadow-color: #646464;

  ::-webkit-scrollbar {
    width: 8px;
    height: 3px;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar-track {
    background-color: #646464;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: rgb(24, 26, 27);
  }
  ::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #666;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-corner {
    background-color: rgb(24, 26, 27);
  }
`;

const EditorContainer = styled.div`
  width: 21cm;
  max-width: calc(100% - 2rem);
  .editor {
    padding-bottom: 30vh;
  }
`;

//todo: make title first line or header or smth

const Editors: FC<{ slug?: string; post?: string }> = ({ slug, post }) => {
  useEffect(() => {
    EditorStore.setSlug(slug || "");
    EditorStore.setMd(post || "", false);
  }, []);

  return (
    <EditorWrapper>
      <EditorContainer>
        <MarkdownDisplay />
      </EditorContainer>
    </EditorWrapper>
  );
};

export default Editors;
