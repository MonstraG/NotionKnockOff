import { FC } from "react";
import styled from "styled-components";
import NavAside from "~/components/Aside/NavAside";
import { Spinner } from "~/components/Common/Spinner";
import useLoadingOnNavigation from "~/components/Common/useLoadingOnNavigation";
import NavBar from "~/components/NavBar";

const Main = styled.main`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;

  background-color: ${(props) => props.theme.editorBg};

  * {
    scrollbar-width: thin;
    scrollbar-base-color: ${(props) => props.theme.scrollbar};
    scrollbar-shadow-color: ${(props) => props.theme.scrollbar};

    ::-webkit-scrollbar {
      width: 8px;
      height: 3px;
    }

    ::-webkit-scrollbar-button {
      display: none;
    }

    ::-webkit-scrollbar-track {
      background-color: ${(props) => props.theme.scrollbar};
    }

    ::-webkit-scrollbar-track-piece {
      background-color: ${(props) => props.theme.editorBg};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.scrollbar};
      border-radius: 3px;
    }
  }
`;

const PageBody = styled.article`
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const Layout: FC = ({ children }) => {
  const loading = useLoadingOnNavigation();

  return (
    <Main>
      <NavBar />
      <NavAside />
      <PageBody>{loading ? <Spinner /> : children}</PageBody>
    </Main>
  );
};

export default Layout;
