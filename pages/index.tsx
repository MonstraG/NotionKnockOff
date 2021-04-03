import Page from "~/components/Page/Page";
import PageHeader from "~/components/PageHeader/PageHeader";
import Navigation from "~/components/Navigation/Navigation";
import Content from "~/components/Content/Content";
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
