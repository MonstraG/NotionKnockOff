import Page from "~/components/Page";
import PageHeader from "~/components/PageHeader";
import Navigation from "~/components/Navigation";
import Content from "~/components/Content";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <Page>
      <Navigation />
      <Content>
        <PageHeader>Hello world.</PageHeader>
      </Content>
    </Page>
  );
};

export default IndexPage;
