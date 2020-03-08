import { LAND } from "./permanents";

export const playLand = (G, ctx, land) => {
  if (!land?.types.some(t => t === LAND)) {
    return;
  }

  // TODO: looking at 'turn' here does not suffice
  // as it will change multiple times over the course
  // of a mtg turn.
  const landPlayedThisTurn = G.player.battlefield.some(
    c => c.types.some(t => t === LAND) && c.turnPlayed === ctx.turn
  );
  if (landPlayedThisTurn) {
    return;
  }

  const cardFromHand = G.player.hand.find(
    c => c.instanceId === land.instanceId
  );
  if (!cardFromHand) {
    return;
  }

  G.player.hand = G.player.hand.filter(c => c !== cardFromHand);
  land.turnPlayed = ctx.turn;
  G.player.battlefield.push(land);
};
