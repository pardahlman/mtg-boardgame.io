import { Client } from "boardgame.io/client";
import { Local } from "boardgame.io/multiplayer";
import { STAGE } from "./stage";
import { mtg } from "./mtg";

const setup = () => {
  const spec = {
    game: { ...mtg },
    numPlayers: 3,
    multiplayer: Local()
  };

  const p0 = Client({ ...spec, playerID: "0" });
  const p1 = Client({ ...spec, playerID: "1" });
  const p2 = Client({ ...spec, playerID: "2" });

  p0.start();
  p1.start();
  p2.start();
  const getActivePlayers = () => p0.getState().ctx.activePlayers;
  return { p0, p1, p2, getActivePlayers };
};

it("when starting a game, the first player is the only active player, the others are awaiting priority", () => {
  // Arrange and Act
  const { getActivePlayers } = setup();
  const activePlayers = getActivePlayers();

  // Assert
  expect(activePlayers["0"]).toBe(STAGE.HASPRIORITY);
  expect(activePlayers["1"]).toBe(STAGE.AWAITINGPRIORITY);
  expect(activePlayers["2"]).toBe(STAGE.AWAITINGPRIORITY);
  expect(Object.keys(activePlayers).length).toBe(3);
});

it("when the stack is empty and current player passes priority, the next player gets priority and other player await priorty", () => {
  // Arrange
  const { p0, getActivePlayers } = setup();

  // Act
  p0.moves.passPriority();

  // Assert
  const activePlayers = getActivePlayers();

  expect(activePlayers[0]).toBe(STAGE.NULL);
  expect(activePlayers[1]).toBe(STAGE.HASPRIORITY);
  expect(activePlayers[2]).toBe(STAGE.AWAITINGPRIORITY);
});

it("when the second player passes priority, the third player gets priority", () => {
  // Arrange
  const { p0, p1, getActivePlayers } = setup();

  // Act
  p0.moves.passPriority();
  p1.moves.passPriority();

  // Assert
  const activePlayers = getActivePlayers();

  expect(activePlayers[0]).toBe(STAGE.NULL);
  expect(activePlayers[1]).toBe(STAGE.NULL);
  expect(activePlayers[2]).toBe(STAGE.HASPRIORITY);
});

it("when all players have passed priority, the priorty state is reset", () => {
  // Arrange
  const { p0, p1, p2, getActivePlayers } = setup();

  // Act
  p0.moves.passPriority();
  p1.moves.passPriority();
  p2.moves.passPriority();

  // Assert
  const activePlayers = getActivePlayers();

  expect(activePlayers[0]).toBe(STAGE.HASPRIORITY);
  expect(activePlayers[1]).toBe(STAGE.AWAITINGPRIORITY);
  expect(activePlayers[2]).toBe(STAGE.AWAITINGPRIORITY);
});
