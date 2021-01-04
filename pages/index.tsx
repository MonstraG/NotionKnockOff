import { NextPage } from 'next'

import Page from '~/components/Page/Page'
import PageHeader from '~/components/PageHeader/PageHeader'
import PageBody from '~/components/PageBody/PageBody'
import Navigation from '~/components/Navigation/Navigation'
import Content from '~/components/Content/Content'
import { useContext } from 'react'
import { GameContext } from '~/components/GameStateContext'
import Button from '~/components/Button/Button'

const IndexPage: NextPage = () => {
  const state = useContext(GameContext);
  return (
    <Page>
      <Navigation />
      <Content>
        <PageHeader>Hello world.</PageHeader>
        <PageBody>
          State: {JSON.stringify(state)}
        </PageBody>
        <Button style={{ marginLeft: "2rem" }} cb={state.inc}>¤</Button>
        {/* todo: refactor how Content, PageBody so I don't need marginLeft evrywher. */}
      </Content>
    </Page>
  )
};
export default IndexPage
