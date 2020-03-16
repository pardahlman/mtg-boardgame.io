import { disableLogging, setup } from "./test-setup";

it("when the active player taps a forest for mana, that player adds one {G} to her mana pool", () => {
  // Arrange
  const { p0, getPlayerState } = setup();
  const playerState = getPlayerState(p0);
  expect(playerState.manapool.green).toBe(0);
  const forest = playerState.battlefield.find(c => c.cardName === "Forest");

  // Act
  p0.moves.activateManaAbility({
    cardInstanceId: forest.cardInstanceId,
    abilityId: forest.activatedManaAbilities[0].abilityId
  });

  // Assert
  expect(getPlayerState(p0).manapool.green).toBe(1);
});

it(
  "when a non-active player attempts to tap a forest for mana, that player adds no mana to her mana pool",
  disableLogging(() => {
    // Arrange
    const { p1, getPlayerState } = setup();
    const playerState = getPlayerState(p1);
    expect(playerState.manapool.green).toBe(0);
    const forest = playerState.battlefield.find(c => c.cardName === "Forest");

    // Act
    p1.moves.activateManaAbility({
      cardInstanceId: forest.cardInstanceId,
      abilityId: forest.activatedManaAbilities[0].abilityId
    });

    // Assert
    expect(getPlayerState(p1).manapool.green).toBe(0);
  })
);
