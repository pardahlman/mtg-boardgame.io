import { createCard } from "./card";

export const createForest = () => ({
  ...createCard(),
  cardName: "Forest",
  zone: "battlefield",
  tapped: false,
  activatedManaAbilities: [
    {
      abilityId: 0,
      abilityName: "{T}: add {G}",
      payCost: (G, ctx, { card }) => {
        if (card.zone !== "battlefield" || card.tapped) {
          return false;
        }
        card.tapped = true;
        return true;
      },
      resolve: (G, ctx, { idOfPlayerWithPriority }) => {
        G.players[idOfPlayerWithPriority].manapool.green += 1;
      }
    }
  ]
});
