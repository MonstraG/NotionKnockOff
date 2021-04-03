import { FC } from "react";
import NavBar from "~/components/NavBar";
import Head from "next/head";
import styled from "styled-components";

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1 1 auto;
`;

const PageHeader = styled.header`
  padding: 2rem 1.5rem 1rem;
`;

const H1 = styled.h1`
  margin: 0;
`;

interface PageProps {
  title?: string;
  header?: string;
}

const PageBody = styled.section`
  padding: 0 1.5rem 2rem;
`;

const Layout: FC<PageProps> = ({ title, header, children }) => (
  <PageContent>
    {title && (
      <Head>
        <title>{title}</title>
      </Head>
    )}
    <NavBar />
    <Main>
      {header && (
        <PageHeader>
          <H1>{header}</H1>
        </PageHeader>
      )}
      <PageBody>{children}</PageBody>
    </Main>
  </PageContent>
);

export default Layout;
