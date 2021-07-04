import Link from "next/link";
import ArrowTooltip from "~/components/Common/ArrowTooltip";
import { IconButton } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import styled, { css } from "styled-components";
import useMobileContext from "~/components/Common/MobileContext/useMobileContext";
import { Post } from "~/lib/helpers";
import EditorStore from "~/components/Editor/EditorStore";
import { FC, MouseEvent } from "react";

const listItemLabelPadding = css`
  padding: 0.4rem 0;
`;

const PaddedList = styled.ul`
  padding: 2rem 0 0;
  list-style: none;
  margin: 0;
`;

const PostLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddPostContainer = styled.span`
  display: flex;
  align-items: center;
`;

const PostActions = styled.span`
  display: flex;
  opacity: 0;
`;

const AddLabel = styled.span`
  opacity: 0;
  ${listItemLabelPadding}
`;

const ListItem = styled.li<{ $active?: boolean; $mobile: boolean }>`
  padding-left: 1rem;

  :hover {
    background-color: #464646;
  }

  color: ${({ theme }) => theme.navText} !important;
  cursor: pointer;
  user-select: none;
  font-weight: ${({ $active }) => $active && "600"};

  :hover {
    ${PostActions} {
      opacity: 1;
    }
    ${AddLabel} {
      opacity: 1;
    }
  }
  ${({ $mobile }) =>
    $mobile &&
    css`
      ${PostActions} {
        opacity: 1;
      }
      ${AddLabel} {
        opacity: 1;
      }
    `};

  a {
    text-decoration: none;
    &,
    :visited,
    :active,
    :hover {
      color: ${({ theme }) => theme.navText};
    }
  }

  &,
  * {
    transition: all 0.3s;
  }
`;

const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${listItemLabelPadding}
`;

type Props = {
  posts: Post[];
  postAction: (url: string, event?: MouseEvent, slug?: string, redirect?: string) => void;
};

const PostList: FC<Props> = ({ posts, postAction }) => {
  const mobile = useMobileContext();
  const activeSlug = EditorStore.useStore(EditorStore.slug);

  const addPost = () => postAction("newPost");
  const duplicatePost = (slug: string) => (event: MouseEvent) => postAction("duplicatePost", event, slug);
  const deletePost = (slug: string) => (event: MouseEvent) => postAction("deletePost", event, slug, "/");

  return (
    <PaddedList>
      {posts.map((p) => (
        <ListItem key={p.slug} $active={p.slug === activeSlug} $mobile={mobile}>
          <Link href={`/posts/${p.slug}`} passHref>
            <PostLink>
              <Title>{p.title}</Title>
              <PostActions>
                <ArrowTooltip title="Duplicate" onClick={duplicatePost(p.slug)}>
                  <IconButton aria-label="duplicate" size="small">
                    <FileCopyOutlinedIcon />
                  </IconButton>
                </ArrowTooltip>
                <ArrowTooltip title="Delete" onClick={deletePost(p.slug)}>
                  <IconButton aria-label="delete" size="small">
                    <DeleteOutlinedIcon />
                  </IconButton>
                </ArrowTooltip>
              </PostActions>
            </PostLink>
          </Link>
        </ListItem>
      ))}
      <ListItem onClick={addPost} $mobile={mobile}>
        <AddPostContainer>
          <IconButton aria-label="add" size="small" edge="start">
            <AddBoxOutlinedIcon />
          </IconButton>
          <AddLabel>New Post</AddLabel>
        </AddPostContainer>
      </ListItem>
    </PaddedList>
  );
};

export default PostList;
