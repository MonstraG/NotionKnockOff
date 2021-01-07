export type GameState = {
  money: number;
  blocks: number;
};

export const initialGameState: GameState = {
  money: 0,
  blocks: 1,
};
