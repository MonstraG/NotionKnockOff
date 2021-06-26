import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import NavAside from "~/components/Aside/NavAside";
import { useRouter } from "next/router";
import { Spinner } from "~/components/Common/Spinner";

const Main = styled.div`
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

const PageBody = styled.section`
  height: 100%;
  width: 100%;
`;

const Layout: FC = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      router.events.off("routeChangeStart", () => setLoading(true));
      router.events.off("routeChangeComplete", () => setLoading(false));
      router.events.off("routeChangeError", () => setLoading(false));
    };
  }, []);

  return (
    <Main>
      <NavAside />
      <PageBody>{loading ? <Spinner /> : children}</PageBody>
    </Main>
  );
};

export default Layout;
