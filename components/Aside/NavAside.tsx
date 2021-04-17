import { FC } from "react";
import { CenteredSpinner } from "~/components/Common/Spinner";
import styled from "styled-components";
import Link from "next/link";
import PostNavStore from "~/components/Aside/PostNavStore";
import EditorStore from "~/components/Editor/EditorStore";

const Aside = styled.aside`
  width: 250px;
  background-color: #333;
  flex-shrink: 0;
`;

const UnstyledUl = styled.ul`
  padding: 2rem 0;
  list-style: none;
  margin: 0;
`;

const ListItem = styled.li<{ $active: boolean }>`
  :hover {
    background-color: rgb(70, 70, 70);
  }
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
  font-weight: ${(props) => props.$active && "700"};
`;

const Anchor = styled.a`
  display: block;
  margin: 0 1rem;
  padding: 0.4rem 0;
  text-decoration: none;
  &,
  &:visited {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const NavAside: FC = () => {
  const pages = PostNavStore.useStore(PostNavStore.pages);
  const activeSlug = EditorStore.useStore(EditorStore.slug);

  return (
    <Aside>
      {pages == null ? (
        <CenteredSpinner />
      ) : (
        <UnstyledUl>
          {pages.map((p) => (
            <ListItem key={p.slug} $active={p.slug === activeSlug}>
              <Link href={"/posts/" + p.slug}>
                <Anchor>{p.title}</Anchor>
              </Link>
            </ListItem>
          ))}
        </UnstyledUl>
      )}
    </Aside>
  );
};

export default NavAside;
