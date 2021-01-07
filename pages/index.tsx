import Page from "~/components/Page/Page";
import PageHeader from "~/components/PageHeader/PageHeader";
import PageBody from "~/components/PageBody/PageBody";
import Navigation from "~/components/Navigation/Navigation";
import Content from "~/components/Content/Content";
import { useGameState } from "~/components/GameState/GameContext";
import { GameState } from "~/components/GameState/GameState";
import Block from "~/components/Block/Block";
import Button from "~/components/Button/Button";

const IndexPage: NextPage = () => {
  const { state, setState } = useGameState();
  const incMoney = () => setState((s: GameState) =>
   ({ ...s, money: s.money + 1 }))

  //todo: refactor how Content, PageBody so I don't need marginLeft evrywher?????

  //todo: css -> scss

  const buyBlock = () => {
    if (!canBuy()) return;
  	setState((s) =>
  	 ({...s,
  	 money: s.money - s.blocks,  
  	 blocks: s.blocks + 1}))
  }

  const canBuy = () => {
  	return state.money >= state.blocks;
  }
 
  const getblocks = () => {
 return (
    Array.from(Array(state.blocks)
    .keys()).map((i) =>
    (<div><Block onBreak={incMoney} key={i}/></div>)
  	)
  	)
  }

  return (
    <Page>
      <Navigation />
      <Content>
        <PageHeader>Hello world.</PageHeader>
        <PageBody>State: {JSON.stringify(state)}</PageBody>
        
        <Button style={{ marginLeft: "2rem" }} 
        cb={buyBlock}>
          ¤
        </Button>
        
        <div style={{ display:"flex", 
        justifyItems: "space-between",
        marginLeft: "2rem",
        width: "100%"}}>
          {getblocks()}
        </div>
      </Content>
    </Page>
  );
};
export default IndexPage;
