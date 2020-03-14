import { Client } from "boardgame.io/client";
import { Local } from "boardgame.io/multiplayer";
import { mtg } from "./mtg";

export const setup = () => {
  const spec = {
    game: { ...mtg },
    numPlayers: 3,
    multiplayer: Local()
  };

  const p0 = Client({ ...spec, playerID: "0" });
  const p1 = Client({ ...spec, playerID: "1" });
  const p2 = Client({ ...spec, playerID: "2" });
  const allPlayers = [p0, p1, p2];

  p0.start();
  p1.start();
  p2.start();
  const getActivePlayers = () => p0.getState().ctx.activePlayers;
  const getCurrentStep = () => p0.getState().G.currentStep;
  const getCurrentTurn = () => p0.getState().ctx.turn;
  return {
    p0,
    p1,
    p2,
    getActivePlayers,
    getCurrentStep,
    allPlayers,
    getCurrentTurn
  };
};
