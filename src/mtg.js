import { putSpellOnTheStack } from './castSpell';

export const mtg = {
  setup: (ctx) => ({

  }),
  moves: {
    passPriority: (G, ctx, payload) => {
      ctx.events.endTurn();
    },
    putSpellOnTheStack
  }
};