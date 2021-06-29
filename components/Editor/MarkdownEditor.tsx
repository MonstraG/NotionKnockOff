import { FC } from "react";
import RichMarkdownEditor from "rich-markdown-editor";
import EditorStore from "~/components/Editor/EditorStore";
import styled, { css } from "styled-components";

//todo: dark selectors/menus

const CustomRichMarkdownEditor = styled(RichMarkdownEditor)<{ dark?: boolean }>`
  ${({ dark }) =>
    dark &&
    css`
      .notice-block {
        background: transparent !important;
        color: ${({ theme }) => theme.text};
        &.tip {
          box-shadow: 0 0 0 1px #9e5cf7 inset;
        }
        &.warning {
          box-shadow: 0 0 0 1px #f5be31 inset;
        }
        &.info {
          box-shadow: 0 0 0 1px #ff5c80 inset;
        }
      }
    `}
`;

const MarkdownEditor: FC<{ value: string }> = ({ value }) => (
  <CustomRichMarkdownEditor
    defaultValue={value}
    dark
    onSave={(_) => EditorStore.save()}
    onChange={(v) => EditorStore.setMd(v())}
    extensions={[]}
    readOnly={false}
    autoFocus
  />
);

export default MarkdownEditor;
