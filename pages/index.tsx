import Page from "~/components/Page/Page";
import PageHeader from "~/components/PageHeader/PageHeader";
import PageBody from "~/components/PageBody/PageBody";
import Navigation from "~/components/Navigation/Navigation";
import Content from "~/components/Content/Content";
import { useGameState } from "~/components/GameState/GameContext";
import { GameState } from "~/components/GameState/GameState";
import Button from "~/components/Button/Button";
import { NextPage } from "next";
import BlockRow from "~/components/Block/BlockRow";

const IndexPage: NextPage = () => {
  const { state, setState } = useGameState();
  const incMoney = () => setState((s: GameState) => ({ ...s, money: s.money + 1 }));

  const buyBlock = () => {
    if (!canBuy()) return;
    setState((s) => ({
      ...s,
      money: s.money - s.blocks,
      blocks: s.blocks + 1
    }));
  };

  const canBuy = () => state.money >= state.blocks;

  //todo: replace block rows on break row

  return (
    <Page>
      <Navigation />
      <Content>
        <PageHeader>Hello world.</PageHeader>
        <PageBody>State: {JSON.stringify(state)}</PageBody>

        <Button style={{ marginLeft: "2rem" }} cb={buyBlock}>
          ¤
        </Button>

        <BlockRow blocks={state.blocks} onBreakBlock={incMoney} onBreakRow={incMoney} />
      </Content>
    </Page>
  );
};

export default IndexPage;
