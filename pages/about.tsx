import { NextPage } from "next";
import Page from "~/components/Page";
import PageHeader from "~/components/PageHeader";
import PageBody from "~/components/PageBody";
import Navigation from "~/components/Navigation";
import Content from "~/components/Content";
import { Linka } from "~/utils/common";

const lastUpdated = "2018-09-25T19:30:01+07:00";

const AboutPage: NextPage = () => (
  <Page title="About">
    <Navigation />
    <Content>
      <PageHeader>About us.</PageHeader>
      <PageBody>
        <p>
          Perge porro; Igitur ne dolorem quidem. Omnes enim iucundum motum, quo sensus hilaretur. Nam, ut sint illa vendibiliora, haec
          uberiora certe sunt. Ad corpus diceres pertinere-, sed ea, quae dixi, ad corpusne refers?
        </p>
        <p>
          Last updated: <time dateTime={lastUpdated}>{new Date(lastUpdated).toLocaleDateString()}</time>
          <Linka href="/">Return home</Linka>
        </p>
      </PageBody>
    </Content>
  </Page>
);

export default AboutPage;
