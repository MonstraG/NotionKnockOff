import { NextPage } from "next";
import { Linka } from "~/utils/common";
import Layout from "~/components/Layout";

const lastUpdated = "2018-09-25T19:30:01+07:00";

const AboutPage: NextPage = () => (
  <Layout title="About" header="About us">
    <p>
      Perge porro; Igitur ne dolorem quidem. Omnes enim iucundum motum, quo sensus hilaretur. Nam, ut sint illa vendibiliora, haec uberiora
      certe sunt. Ad corpus diceres pertinere-, sed ea, quae dixi, ad corpusne refers?
    </p>
    <p>
      Last updated: <time dateTime={lastUpdated}>{new Date(lastUpdated).toLocaleDateString()}</time> <Linka href="/">Return home</Linka>
    </p>
  </Layout>
);

export default AboutPage;
