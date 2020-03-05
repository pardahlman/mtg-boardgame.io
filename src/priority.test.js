import { Client } from "boardgame.io/client";
import { Local } from "boardgame.io/multiplayer";
import { mtg } from "./mtg";

const setup = () => {
  const game = { ...mtg };
  const spec = {
    game,
    multiplayer: Local()
  };

  const p0 = Client({ ...spec, playerID: "0" });
  const p1 = Client({ ...spec, playerID: "1" });

  p0.start();
  p1.start();
  return { p0, p1 };
};

it("current player can pass priority", () => {
  // Arrange
  const { p0 } = setup();
  expect(p0.getState().ctx.currentPlayer).toBe("0");

  // Act
  p0.moves.passPriority();

  // Assert
  expect(p0.getState().ctx.currentPlayer).toBe("1");
});

it("non-current player can not pass priority", () => {
  // Arrange
  const { p1 } = setup();
  expect(p1.getState().ctx.currentPlayer).toBe("0");

  // Act
  p1.moves.passPriority();

  // Assert
  expect(p1.getState().ctx.currentPlayer).toBe("0");
});

it("when all players pass, the next phase starts", () => {
  // Arrange
  const { p0, p1 } = setup();
  expect(p0.getState().ctx.phase).toBe("upkeep");

  // Act
  p0.moves.passPriority();
  expect(p0.getState().ctx.phase).toBe("upkeep");
  p1.moves.passPriority();

  // Assert
  expect(p0.getState().ctx.phase).toBe("draw");
});
