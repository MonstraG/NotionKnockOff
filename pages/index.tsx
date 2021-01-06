import { NextPage } from "next";
import Page from "~/components/Page/Page";
import PageHeader from "~/components/PageHeader/PageHeader";
import PageBody from "~/components/PageBody/PageBody";
import Navigation from "~/components/Navigation/Navigation";
import Content from "~/components/Content/Content";
import { useGameState } from "~/components/GameState/GameContext";
import { GameState } from "~/components/GameState/GameState";
import Block from "~/components/Block/Block";

const IndexPage: NextPage = () => {
  const { state, setState } = useGameState();
  const incMoney = () => setState((s: GameState) => ({ ...s, money: s.money + 1 }))


  return (
    <Page>
      <Navigation />
      <Content>
        <PageHeader>Hello world.</PageHeader>
        <PageBody>State: {JSON.stringify(state)}</PageBody>
        {/*
        <Button style={{ marginLeft: "2rem" }} cb={incMoney}>
          ¤
        </Button>
        */}
        <Block style={{ margin: "2rem" }} onBreak={incMoney} />
        {/* todo: refactor how Content, PageBody so I don't need marginLeft evrywher. */}
      </Content>
    </Page>
  );
};
export default IndexPage;
