import { FC } from "react";
import { CenteredSpinner } from "~/components/Common/Spinner";
import styled from "styled-components";
import Link from "next/link";
import PostNavStore from "~/components/Aside/PostNavStore";

//todo: classname didn't match
const Aside = styled.aside`
  flex-grow: 0;
  width: 250px;
  background-color: #333;
  flex-shrink: 0;
`;

const EmptyUl = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0;
`;

const ListItem = styled.li`
  :hover {
    background-color: rgb(70, 70, 70);
  }
  transition: all 0.2s;
  cursor: pointer;
`;

const Anchor = styled.a`
  display: block;
  margin: 1rem;
  padding: 0.2rem 0;
  text-decoration: none;
  &,
  &:visited {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const NavAside: FC = () => {
  const pages = PostNavStore.useStore(PostNavStore.pages);

  return (
    <Aside>
      {pages == null ? (
        <CenteredSpinner />
      ) : (
        <EmptyUl>
          {pages.map((p) => (
            <ListItem key={p.slug}>
              <Link href={"/posts/" + p.slug}>
                <Anchor>{p.title}</Anchor>
              </Link>
            </ListItem>
          ))}
        </EmptyUl>
      )}
    </Aside>
  );
};

export default NavAside;
