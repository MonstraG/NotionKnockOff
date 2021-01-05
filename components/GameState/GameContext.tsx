import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { GameState, initialGameState } from "~/components/GameState/GameState";

type GameStateWithSetter = {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState>>;
};

const GameContext = createContext<GameStateWithSetter | undefined>(undefined);

const GameStateProvider: FC = ({ children }) => {
  const [state, setState] = useState<GameState>(initialGameState);
  return <GameContext.Provider value={{ state, setState }}>{children}</GameContext.Provider>;
};

const useGameState = (): GameStateWithSetter => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
};

export { GameStateProvider, useGameState };
