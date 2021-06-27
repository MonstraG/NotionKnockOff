import { FC, MouseEvent, useEffect, useState } from "react";
import { Spinner } from "~/components/Common/Spinner";
import styled from "styled-components";
import Link from "next/link";
import PostNavStore from "~/components/Aside/PostNavStore";
import EditorStore from "~/components/Editor/EditorStore";
import { useRouter } from "next/router";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { IconButton } from "@material-ui/core";
import BootstrapTooltip from "~/components/Common/BoostrapTooltip";
import { byDate } from "~/lib/helpers";

const Aside = styled.aside`
  width: 250px;
  background-color: #333;
  flex-shrink: 0;

  .MuiIconButton-root {
    :last-of-type {
      margin-right: 0.3rem;
    }
    svg {
      fill: ${(props) => props.theme.navText};
      fill-opacity: 0.8;
    }
  }
`;

const PageList = styled.ul`
  padding: 2rem 0 0;
  list-style: none;
  margin: 0;
`;

const PageTitleContainer = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddPageContainer = styled(PageTitleContainer)`
  justify-content: flex-start;
`;

const PageActions = styled.span`
  display: flex;
  transition: all 0.3s;
  opacity: 0;
`;

const AddLabel = styled.label`
  opacity: 0;
  transition: all 0.3s;
  padding: 0.25rem 0;
`;

const ListItem = styled.li<{ $active?: boolean }>`
  padding-left: 1rem;

  :hover {
    background-color: #464646;
  }

  color: ${({ theme }) => theme.navText} !important;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
  font-weight: ${({ $active }) => $active && "600"};

  :hover {
    ${PageActions} {
      opacity: 1;
    }
    ${AddLabel} {
      opacity: 1;
    }
  }

  a {
    text-decoration: none;
    &,
    :visited,
    :active,
    :hover {
      color: ${({ theme }) => theme.navText};
    }
  }
`;

const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.4rem 0;
`;

const updateSlug = (url: string) => EditorStore.setSlug(url.replace("/posts/", ""));

const refreshPages = () =>
  fetch("/api/getPosts?fields=title&fields=date")
    .then((response) => response.json())
    .then((pages) => PostNavStore.setPages(pages.sort(byDate)));

const NavAside: FC = () => {
  const pages = PostNavStore.useStore(PostNavStore.pages);
  const activeSlug = EditorStore.useStore(EditorStore.slug);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateSlug(router.asPath);
  }, [router.asPath]);

  const pageAction = (url: string, event?: MouseEvent, slug?: string, redirect?: string) => {
    //otherwise it would trigger Link navigation
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setLoading(true);
    fetch(`/api/${url}${slug ? "?slug=" + slug : ""}`)
      .then((response) => (response.ok ? response.text() : "/"))
      .then((slug) => {
        refreshPages();
        setLoading(false);
        router.push(redirect || `/posts/${slug}`);
      });
  };

  const addPage = () => pageAction("newPost");
  const duplicatePage = (slug: string) => (event: MouseEvent) => pageAction("duplicatePost", event, slug);
  const deletePage = (slug: string) => (event: MouseEvent) => pageAction("deletePost", event, slug, "/");

  useEffect(() => {
    refreshPages();
  }, []);

  return (
    <Aside>
      {pages == null || loading ? (
        <Spinner />
      ) : (
        <>
          <PageList>
            {pages.map((p) => (
              <ListItem key={p.slug} $active={p.slug === activeSlug}>
                <Link href={`/posts/${p.slug}`}>
                  <a>
                    <PageTitleContainer>
                      <Title>{p.title}</Title>
                      <PageActions>
                        <BootstrapTooltip title="Duplicate" onClick={duplicatePage(p.slug)}>
                          <IconButton aria-label="duplicate" size="small">
                            <FileCopyOutlinedIcon />
                          </IconButton>
                        </BootstrapTooltip>
                        <BootstrapTooltip title="Delete" onClick={deletePage(p.slug)}>
                          <IconButton aria-label="delete" size="small">
                            <DeleteOutlinedIcon />
                          </IconButton>
                        </BootstrapTooltip>
                      </PageActions>
                    </PageTitleContainer>
                  </a>
                </Link>
              </ListItem>
            ))}
            <ListItem onClick={addPage}>
              <AddPageContainer>
                <IconButton aria-label="add" size="small" edge="start">
                  <AddBoxOutlinedIcon />
                </IconButton>
                <AddLabel>New Page</AddLabel>
              </AddPageContainer>
            </ListItem>
          </PageList>
        </>
      )}
    </Aside>
  );
};

export default NavAside;
