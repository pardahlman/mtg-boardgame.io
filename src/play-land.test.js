import { Client } from "boardgame.io/client";
import { Local } from "boardgame.io/multiplayer";
import { PERMANENT } from "./permanent";
import { playLand } from "./play-land";
import { PluginPlayer } from "boardgame.io/plugins";

const setup = setupOverrides => {
  const G = {
    moves: { playLand },
    playerSetup: id => ({ battlefield: [] }),
    plugins: [PluginPlayer]
  };
  const spec = {
    game: G,

    multiplayer: Local()
  };

  setPlayerStates({ G, setupOverrides });

  const p0 = Client({ ...spec, playerID: "0" });
  const p1 = Client({ ...spec, playerID: "1" });

  p0.start();
  p1.start();
  return { p0, p1 };
};

const setPlayerStates = ({ G, setupOverrides }) => {
  const playerSetup = G.playerSetup;
  G.playerSetup = playerID => {
    const playerState = playerSetup(playerID);

    // TODO: null propegation?
    if (!setupOverrides[playerID]) {
      return playerState;
    }

    return setupOverrides[playerID](playerState);
  };

  if (setupOverrides.phase) {
    for (let phase in G.phases) {
      G.phases[phase].start = phase === setupOverrides.phase;
    }
  }
};

it("should not accept card that is not a land", () => {
  // Arrange
  const nonLandCard = { types: [] };
  const { p0 } = setup({
    phase: "preCombatMainPhase",
    "0": state => ({ ...state, hand: [nonLandCard], battlefield: [] })
  });

  // Act
  p0.moves.playLand(nonLandCard);

  // Assert
  const state = p0.getState().G;
  expect(state.players["0"].battlefield).not.toContain(nonLandCard);
  expect(state.players["0"].hand).toContain(nonLandCard);
});

it("should accept card of type LAND", () => {
  // Arrange
  const landCard = { types: [PERMANENT.LAND], instanceId: 1 };
  const { p0 } = setup({
    phase: "preCombatMainPhase",
    "0": state => ({ ...state, hand: [landCard], battlefield: [] })
  });

  // Act
  p0.moves.playLand(landCard);

  // Assert
  const state = p0.getState().G;
  expect(state.players["0"].battlefield).toContain(landCard);
  expect(state.players["0"].hand).not.toContain(landCard);
});

it("should only be able to play one land per turn", () => {
  // Arrange
  const firstLand = { types: [PERMANENT.LAND], instanceId: 1 };
  const secondLand = { types: [PERMANENT.LAND], instanceId: 2 };
  const { p0 } = setup({
    phase: "preCombatMainPhase",
    "0": state => ({ ...state, hand: [firstLand, secondLand], battlefield: [] })
  });

  // Act
  p0.moves.playLand(firstLand);
  p0.moves.playLand(secondLand);

  // Assert
  const state = p0.getState().G;
  expect(state.players["0"].battlefield).toContain(firstLand);
  expect(state.players["0"].hand).not.toContain(firstLand);
  expect(state.players["0"].battlefield).not.toContain(secondLand);
  expect(state.players["0"].hand).toContain(secondLand);
});
