import { NextPage } from 'next'
import Link from 'next/link'

import Page from '~/components/Page/Page'
import PageHeader from '~/components/PageHeader/PageHeader'
import PageBody from '~/components/PageBody/PageBody'
import Navigation from '~/components/Navigation/Navigation'
import Content from '~/components/Content/Content'
import relativeTime from '~/utils/relativeTime'

const lastUpdated = '2018-09-25T19:30:01+07:00'

const AboutPage: NextPage = () => (
  <Page title="About | Next.js TypeScript Quickstart">
    <Navigation />
    <Content>
      <PageHeader>About us.</PageHeader>
      <PageBody>
        <p>
          Perge porro; Igitur ne dolorem quidem. Omnes enim iucundum motum, quo sensus hilaretur. Nam, ut sint illa vendibiliora, haec
          uberiora certe sunt. Ad corpus diceres pertinere-, sed ea, quae dixi, ad corpusne refers?
        </p>
        <p>
          Last updated: <time dateTime={lastUpdated}>{relativeTime(new Date(lastUpdated))}</time> |{' '}
          <Link href="/" passHref>
            <a>Return home</a>
          </Link>
        </p>
      </PageBody>
    </Content>
  </Page>
)

export default AboutPage
