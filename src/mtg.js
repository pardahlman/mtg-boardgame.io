import { putSpellOnTheStack } from "./castSpell";

const endIf = (G, ctx) => G.passedPriority.length === ctx.numPlayers;
const onEnd = (G, ctx) => {
  G.passedPriority = [];
};

export const mtg = {
  setup: ctx => ({
    passedPriority: []
  }),
  moves: {
    passPriority: (G, ctx) => {
      G.passedPriority.push(ctx.currentPlayer);
      ctx.events.endTurn();
    },
    putSpellOnTheStack
  },
  phases: {
    upkeep: {
      start: true,
      next: "draw",
      endIf,
      onEnd
    },
    draw: {
      next: "upkeep",
      endIf,
      onEnd
    }
  }
};
