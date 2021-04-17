import { FC, useEffect } from "react";
import { CenteredSpinner } from "~/components/Common/Spinner";
import styled from "styled-components";
import Link from "next/link";
import PostNavStore from "~/components/Aside/PostNavStore";
import EditorStore from "~/components/Editor/EditorStore";
import AddIcon from "~/components/Icons/add";
import { useRouter } from "next/router";

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

const ListItem = styled.li<{ $active?: boolean }>`
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
  //todo: while wetching spin thing
  // const [addingPage, setAddingPage] = useState(false);

  //todo: add title input pre-focused when adding i guess

  const addPage = () => {
    fetch("/api/newPost")
      .then((response) => response.text())
      .then(async (slug) => {
        await refreshPages();
        router.push("/posts/" + slug);
      });
  };

  useEffect(() => {
    refreshPages();
  }, []);

  const refreshPages = () =>
    fetch("/api/getPosts?fields=title")
      .then((response) => response.json())
      .then((x) => PostNavStore.setPages(x));

  return (
    <Aside>
      {pages == null ? (
        <CenteredSpinner />
      ) : (
        <>
          <UnstyledUl>
            {pages.map((p) => (
              <ListItem key={p.slug} $active={p.slug === activeSlug}>
                <Link href={"/posts/" + p.slug}>
                  <Anchor>{p.title}</Anchor>
                </Link>
              </ListItem>
            ))}
          </UnstyledUl>
          <ListItem onClick={addPage}>
            <AddContainer>
              <AddIcon />
              <span>New Page</span>
            </AddContainer>
          </ListItem>
        </>
      )}
    </Aside>
  );
};

export default NavAside;
