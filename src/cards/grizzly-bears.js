import { createCard } from "./card";
import { removeCardFromHand } from "../player";
import { addCardToStack } from "../stack";

export const createGrizzlyBears = () => ({
  ...createCard(),
  cardName: "Grizzly Bears",
  tapped: false,
  manaCost: { green: 1, colorless: 1 },
  convertedManaCost: 2,
  types: ["Creature"],
  subTypes: ["Bear"],
  power: 2,
  toughness: 2,
  payCost: (G, ctx, { playerWithPriority }) => {
    if (
      playerWithPriority.manaPool.green >= 1 &&
      playerWithPriority.manaPool.colorless >= 1
    ) {
      playerWithPriority.manaPool.green -= 1;
      playerWithPriority.manaPool.colorless -= 1;
      return true;
    }
    return false;
  },
  cast: (G, ctx, { card, playerWithPriority }) => {
    removeCardFromHand(G, ctx, { card, player: playerWithPriority });
    addCardToStack(G, ctx, { card });
  }
});
