import { FC } from "react";
import styled from "styled-components";
import { Spinner } from "~/components/Common/Spinner";
import useLoadingOnNavigation from "~/components/Layout/useLoadingOnNavigation";
import { MobileContextProvider } from "~/components/Common/MobileContext/MobileContext";
import Nav from "~/components/Nav/Nav";
import CreateFab from "~/components/Layout/CreateFab";

const Main = styled.main`
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;

  background-color: ${({ theme }) => theme.editorBg};

  * {
    scrollbar-width: thin;
    scrollbar-base-color: ${({ theme }) => theme.scrollbar};
    scrollbar-shadow-color: ${({ theme }) => theme.scrollbar};

    ::-webkit-scrollbar {
      width: 8px;
      height: 3px;
    }

    ::-webkit-scrollbar-button {
      display: none;
    }

    ::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.scrollbar};
    }

    ::-webkit-scrollbar-track-piece {
      background-color: ${({ theme }) => theme.editorBg};
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.scrollbar};
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
      <MobileContextProvider>
        <Nav />
        <PageBody>{loading ? <Spinner /> : children}</PageBody>
        <CreateFab />
      </MobileContextProvider>
    </Main>
  );
};

export default Layout;
