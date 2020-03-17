import { getCardByCardInstanceId } from "./player";
import { getPlayerWithPriority, resetPriority } from "./priority";

export const castSpell = (G, ctx, { cardInstanceId }) => {
  const card = getCardByCardInstanceId(G, cardInstanceId);
  const playerWithPriority = getPlayerWithPriority(G, ctx);
  const couldPay = card.payCost(G, ctx, { card, playerWithPriority });
  if (couldPay) {
    card.cast(G, ctx, { card, playerWithPriority });
    resetPriority(G, ctx);
  }
};
