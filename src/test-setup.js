import { Client } from "boardgame.io/client";
import { Local } from "boardgame.io/multiplayer";
import { mtg } from "./mtg";
import { createForest } from "./cards/forest";
import { createGrizzlyBears } from "./cards/grizzly-bears";
import { player, playerSetup } from "./player";
import { stepSetup } from "./steps";
import { stackSetup } from "./stack";

export const disableLogging = testCase => () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "group").mockImplementation(() => {});
  testCase();
  jest.restoreAllMocks();
};

export const setup = ({ players } = {}) => {
  const numPlayers = 3;
  const mtgGame = mtg(numPlayers);
  const playerState = () => ({
    battlefield: [createForest()],
    hand: [createGrizzlyBears()],
    manaPool: {
      green: 0
    }
  });
  const spec = {
    game: {
      ...mtgGame,
      setup: ctx => ({
        ...stepSetup(),
        ...stackSetup(),
        players: {
          "0": player({ ...playerState(), ...(players["0"] || {}) }),
          "1": player({ ...playerState(), ...(players["1"] || {}) }),
          "2": player({ ...playerState(), ...(players["2"] || {}) })
        }
      })
    },
    numPlayers,
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
  const getPlayerState = player =>
    player.getState().G.players[allPlayers.indexOf(player)];
  return {
    p0,
    p1,
    p2,
    getActivePlayers,
    getCurrentStep,
    allPlayers,
    getCurrentTurn,
    getPlayerState
  };
};
