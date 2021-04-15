import { FC } from "react";
import styled from "styled-components";
import NavAside from "~/components/Aside/NavAside";

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Main = styled.main`
  display: flex;
  height: 100vh;
  align-items: stretch;
`;

const PageBody = styled.section`
  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
  height: 100%;
  width: 100%;
`;

const Layout: FC = ({ children }) => (
  <PageContent>
    <Main>
      <NavAside />
      <PageBody>{children}</PageBody>
    </Main>
  </PageContent>
);

export default Layout;
