import { putSpellOnTheStack, payCostsOfSpell } from "./castSpell";

describe("To cast a spell is to take it from where it is (usually the hand)", () => {
  test("put it on the stack", () => {
    // Arrange
    const G = { stack: [], players: { "0": { battlefield: [] } } };
    const ctx = { currentPlayer: "0" };
    const spell = { cost: [] };

    //Act
    putSpellOnTheStack(G, ctx, spell);

    //Assert
    expect(G.stack).toContain(spell);
  });

  test("pay its costs", () => {
    // Arrange
    const spell = { cost: [{ color: "blue" }, { color: "blue" }] };
    const firstLand = { tapped: false };
    const secondLand = { tapped: false };
    const thridLand = { tapped: false };
    const G = {
      stack: [spell],
      players: {
        "0": {
          battlefield: [firstLand, secondLand]
        }
      }
    };
    const ctx = { currentPlayer: "0" };

    // Act
    payCostsOfSpell(G, ctx, [firstLand, secondLand]);

    expect(firstLand.tapped).toBeTruthy();
    expect(secondLand.tapped).toBeTruthy();
    expect(thridLand.tapped).toBeFalsy();
  });

  test("unpayable costs cant be payed", () => {
    // Arrange
    const G = { stack: [], players: { "0": { battlefield: [] } } };
    const ctx = { currentPlayer: "0" };
    const spell = { cost: [{ color: "blue" }] };

    //Act
    putSpellOnTheStack(G, ctx, spell);

    //Assert
    expect(G.stack.length).toBe(0);
  });
});
