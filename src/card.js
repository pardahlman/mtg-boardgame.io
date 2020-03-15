import { getCardByCardId } from "./player";
import { getIdOfPlayerWithPriority } from "./priority";

const getActivatedManaAbilityFromCardByAbilityId = (card, abilityId) =>
  card.activatedManaAbilities.find(a => a.abilityId === abilityId);

export const activateManaAbility = (G, ctx, { cardId, abilityId }) => {
  const card = getCardByCardId(G, cardId);
  const ability = getActivatedManaAbilityFromCardByAbilityId(card, abilityId);
  const couldPay = ability.payCost(G, ctx, { card });
  if (couldPay) {
    const idOfPlayerWithPriority = getIdOfPlayerWithPriority(G, ctx);
    ability.resolve(G, ctx, { idOfPlayerWithPriority });
  }
};
