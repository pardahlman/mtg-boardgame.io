import { createCard } from "./card";
import { isOnTheBattlefield } from "../player";

export const createForest = () => ({
  ...createCard(),
  cardName: "Forest",
  tapped: false,
  activatedManaAbilities: [
    {
      abilityId: 0,
      abilityName: "{T}: add {G}",
      payCost: (G, ctx, { card }) => {
        if (!isOnTheBattlefield(G, card) || card.tapped) {
          return false;
        }
        card.tapped = true;
        return true;
      },
      resolve: (G, ctx, { playerWithPriority }) => {
        playerWithPriority.manaPool.green += 1;
      }
    }
  ]
});
