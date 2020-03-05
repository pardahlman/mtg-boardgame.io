import * as permanents from "./permanents";

const getBattledfield = (G, ctx) => G.players[ctx.currentPlayer].battlefield;

// used to determen if a spell can be payed for
// and can be used in the UI to indicate which lands
// will be tapped etc.
const getDefaultPayment = (G, ctx, spell) => {
  const untappedLands = getBattledfield(G, ctx).filter(
    card => card.type === permanents.LAND && !card.tapped
  );
  if (untappedLands.length < spell.cost.length) {
    return;
  }
  return untappedLands.slice(0, spell.cost.length - 1);
};

export const putSpellOnTheStack = (G, ctx, spell) => {
  const payment = getDefaultPayment(G, ctx, spell);
  if (!payment) {
    return;
  }
  G.stack.push(spell);
};

export const payCostsOfSpell = (G, ctx, landsToTap) => {
  if (!landsToTap) {
    return;
  }

  const spell = G.stack[G.stack.length - 1];
  if (landsToTap.length !== spell.cost.length) {
    return;
  }

  const battlefield = getBattledfield(G, ctx);
  if (!landsToTap.every(land => battlefield.some(c => c === land))) {
    return;
  }

  landsToTap.forEach(land => (land.tapped = true));
};
