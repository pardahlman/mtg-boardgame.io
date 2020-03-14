import { STEP } from "./steps";
import { setup } from "./test-setup";

it("when all players have passed priority, the next step is entered", () => {
  // Arrange
  const { allPlayers, getCurrentStep } = setup();
  expect(getCurrentStep()).toBe(STEP.UNTAP);

  // Act
  allPlayers.forEach(p => p.moves.passPriority());

  // Assert
  expect(getCurrentStep()).toBe(STEP.UPKEEP);
});

it("when the last step is left, the turn is ticked up, and current player changes", () => {
  // Arrange
  const { allPlayers, getCurrentTurn } = setup();
  const steps = Object.keys(STEP);

  // Act
  steps.forEach(() => allPlayers.forEach(p => p.moves.passPriority()));

  // Assert
  expect(getCurrentTurn()).toBe(2);
});
