import { castSpell } from './castSpell';

export const game = {
  setup: (ctx) => ({

  }),
  moves: {
    passPriority: (G, ctx, payload) => {
      ctx.events.endTurn();
    },
    castSpell
  }
};