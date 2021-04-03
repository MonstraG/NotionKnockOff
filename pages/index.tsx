import Page from "~/components/Page/Page";
import PageHeader from "~/components/PageHeader/PageHeader";
import PageBody from "~/components/PageBody/PageBody";
import Navigation from "~/components/Navigation/Navigation";
import Content from "~/components/Content/Content";
import { useGameState } from "~/components/GameState/GameContext";
import { GameState } from "~/components/GameState/GameState";
import Block from "~/components/Block/Block";
import Button from "~/components/Button/Button";
import { NextPage } from "next";

const IndexPage: NextPage = () => {
  const { state, setState } = useGameState();
  const incMoney = () => setState((s: GameState) =>
    ({ ...s, money: s.money + 1 }))

  //todo: refactor how Content, PageBody so I don't need marginLeft evrywher?????

  //todo: css -> scss

  const buyBlock = () => {
    if (!canBuy()) return;
    setState((s) => ({
      ...s,
      money: s.money - s.blocks,
      blocks: s.blocks + 1
    }));
  }

  const canBuy = () => state.money >= state.blocks;

  const getBlocks = (): JSX.Element[] => (
    Array.from(Array(state.blocks).keys()) // [0, 1, 2...]
      .map((i) => (<Block onBreak={incMoney} key={i} style={{ marginRight: "1rem" }} />))
  )

  //todo: fix growing page

  //todo: actually think of a way to normally display these blocks' apperence and dissapearence.

  return (
    <Page>
      <Navigation />
      <Content>
        <PageHeader>Hello world.</PageHeader>
        <PageBody>State: {JSON.stringify(state)}</PageBody>

        <Button style={{ marginLeft: "2rem" }} cb={buyBlock}>
          ¤
        </Button>

        <div style={{ display: "flex", margin: "2rem" }}>
          {getBlocks()}
        </div>
      </Content>
    </Page>
  );
};

export default IndexPage;
