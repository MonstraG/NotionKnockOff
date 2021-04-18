import { FC, MouseEvent, useEffect, useState } from "react";
import { CenteredSpinner } from "~/components/Common/Spinner";
import styled from "styled-components";
import Link from "next/link";
import PostNavStore from "~/components/Aside/PostNavStore";
import EditorStore from "~/components/Editor/EditorStore";
import { Router, useRouter } from "next/router";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { IconButton } from "@material-ui/core";
import BootstrapTooltip from "~/components/Common/BoostrapTooltip";
import { byDate } from "../../lib/helpers";

const Aside = styled.aside`
  width: 250px;
  background-color: #333;
  flex-shrink: 0;
`;

const UnstyledUl = styled.ul`
  padding: 2rem 0 0;
  list-style: none;
  margin: 0;
`;

const PageTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageActions = styled.div`
  svg {
    fill: ${(props) => props.theme.navText};
    fill-opacity: 0.8;
  }
  margin: 0 0.3rem;
  transition: all 0.3s;
`;

const ListItem = styled.li<{ $active?: boolean }>`
  :hover {
    background-color: rgb(70, 70, 70);
  }
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
  font-weight: ${(props) => props.$active && "700"};
  :hover {
    ${PageActions} {
      opacity: 1;
    }
  }
  ${PageActions} {
    opacity: 0;
  }
`;

const Anchor = styled.a`
  display: block;
  margin: 0 1rem;
  padding: 0.4rem 0;
  text-decoration: none;
  &,
  &:visited {
    color: ${(props) => props.theme.navText};
  }
`;

const AddContainer = styled.div`
  margin-left: 0.9rem;
  padding: 0.25rem 0;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.navText};
  svg {
    fill: ${(props) => props.theme.navText};
    fill-opacity: 0.8;
    margin-right: 0.3rem;
  }
  span {
    transition: all 0.3s;
    margin-bottom: 2px;
  }
  :hover {
    span {
      opacity: 1;
    }
  }
  :not(:hover) {
    span {
      opacity: 0;
    }
  }
`;

const NavAside: FC = () => {
  const pages = PostNavStore.useStore(PostNavStore.pages);
  const activeSlug = EditorStore.useStore(EditorStore.slug);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = (url: string) => {
      EditorStore.setSlug(url.replace("/posts/", "").split("?")[0]);
    };
    Router.events.on("routeChangeStart", handler);
    return () => Router.events.off("routeChangeStart", handler);
  }, []);

  const pageAction = (url: string, event?: MouseEvent, slug?: string, redirect?: string) => {
    //otherwise it would trigger Link navigation
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setLoading(true);
    fetch(`/api/${url}${slug ? "?slug=" + slug : ""}`)
      .then((response) => (response.ok ? response.text() : "/"))
      .then(async (slug) => {
        await refreshPages();
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

  const refreshPages = () =>
    fetch("/api/getPosts?fields=title&fields=date")
      .then((response) => response.json())
      .then((pages) => PostNavStore.setPages(pages.sort(byDate)));

  return (
    <Aside>
      {pages == null || loading ? (
        <CenteredSpinner />
      ) : (
        <>
          <UnstyledUl>
            {pages.map((p) => (
              <ListItem key={p.slug} $active={p.slug === activeSlug}>
                <Link href={`/posts/${p.slug}`}>
                  <PageTitleContainer>
                    <Anchor>{p.title}</Anchor>
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
                </Link>
              </ListItem>
            ))}
          </UnstyledUl>
          <ListItem onClick={addPage}>
            <AddContainer>
              <AddBoxOutlinedIcon />
              <span>New Page</span>
            </AddContainer>
          </ListItem>
        </>
      )}
    </Aside>
  );
};

export default NavAside;
