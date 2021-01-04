import { createContext } from "react";

export const InitialGameState = {
  money: 0,
  inc: () => { } //todo: how can this increment context's money???`?
};

export const GameContext = createContext(InitialGameState)


