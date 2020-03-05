import { putSpellOnTheStack } from "./castSpell";

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
      endIf: (G, ctx) => G.passedPriority.length === ctx.numPlayers,
      onEnd: (G, ctx) => {
        G.passedPriority = [];
      }
    },
    draw: {
      next: "upkeep",
      endIf: (G, ctx) => G.passedPriority.length === ctx.numPlayers,
      onEnd: (G, ctx) => {
        G.passedPriority = [];
      }
    }
  }
};
