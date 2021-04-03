import Head from "next/head";
import { FC } from "react";
import styled from "styled-components";

interface PageProps {
  title?: string;
}

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const Page: FC<PageProps> = ({ children, title }) => (
  <PageContent>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
  </PageContent>
);

export default Page;
