import { setup } from "./test-setup";
import { getAllCardsOnTheBattlefield } from "./player";

it("when the player casts a spell, that card is removed from her hand", () => {
  // Arrange
  const { p0, getPlayerState } = setup({
    players: { "0": { manaPool: { green: 1, colorless: 1 } } }
  });
  const playerState = getPlayerState(p0);
  expect(getPlayerState(p0).hand.length).toBe(1);
  const grizzlyBears = playerState.hand.find(
    c => c.cardName === "Grizzly Bears"
  );

  // Act
  p0.moves.castSpell({
    cardInstanceId: grizzlyBears.cardInstanceId
  });

  // Assert
  expect(getPlayerState(p0).hand.length).toBe(0);
});
