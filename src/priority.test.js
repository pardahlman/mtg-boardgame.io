import { STAGE } from "./stage";
import { setup } from "./test-setup";

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

it("when all players have passed priority, the priority state is reset", () => {
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
