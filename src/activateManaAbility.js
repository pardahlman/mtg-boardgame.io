import { getCardByCardInstanceId } from "./player";
import { getPlayerWithPriority } from "./priority";

const getActivatedManaAbilityFromCardByAbilityId = (card, abilityId) =>
  card.activatedManaAbilities.find(a => a.abilityId === abilityId);

export const activateManaAbility = (G, ctx, { cardInstanceId, abilityId }) => {
  const card = getCardByCardInstanceId(G, cardInstanceId);
  const ability = getActivatedManaAbilityFromCardByAbilityId(card, abilityId);
  const playerWithPriority = getPlayerWithPriority(G, ctx);
  const couldPay = ability.payCost(G, ctx, { card, playerWithPriority });
  if (couldPay) {
    ability.resolve(G, ctx, { playerWithPriority });
  }
};
