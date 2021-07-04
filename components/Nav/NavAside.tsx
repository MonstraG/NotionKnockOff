import { FC, MouseEvent, useEffect, useState } from "react";
import { Spinner } from "~/components/Common/Spinner";
import styled from "styled-components";
import PostNavStore from "~/components/Nav/PostNavStore";
import EditorStore from "~/components/Editor/EditorStore";
import { useRouter } from "next/router";
import { byDate } from "~/lib/helpers";
import PostList from "~/components/Nav/PostList";
import AudioRecordings from "~/components/Mic/AudioRecordings";

export const StyledAside = styled.aside`
  width: 250px;
  background-color: #333;
  flex-shrink: 0;

  .MuiIconButton-root {
    :last-of-type {
      margin-right: 0.3rem;
    }
    svg {
      fill: ${({ theme }) => theme.navText};
      fill-opacity: 0.8;
    }
  }
`;

const updateSlug = (url: string) => EditorStore.setSlug(url.replace("/posts/", ""));

const refreshPosts = () =>
  fetch("/api/posts/getPosts?fields=title&fields=date")
    .then((response) => response.json())
    .then((posts) => PostNavStore.setPosts(posts.sort(byDate)));

const NavAside: FC = () => {
  const posts = PostNavStore.useStore(PostNavStore.posts);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateSlug(router.asPath);
  }, [router.asPath]);

  const postAction = (url: string, event?: MouseEvent, slug?: string, redirect?: string) => {
    //otherwise it would trigger Link navigation
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setLoading(true);
    fetch(`/api/posts/${url}${slug ? "?slug=" + slug : ""}`)
      .then((response) => (response.ok ? response.text() : "/"))
      .then((slug) => {
        refreshPosts();
        setLoading(false);
        router.push(redirect || `/posts/${slug}`);
      });
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <StyledAside>
      {posts == null || loading ? (
        <Spinner />
      ) : (
        <>
          <PostList posts={posts} postAction={postAction} />
          <hr />
          <AudioRecordings />
        </>
      )}
    </StyledAside>
  );
};

export default NavAside;
