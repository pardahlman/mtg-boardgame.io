import { putSpellOnTheStack } from "./castSpell";
import { playLand } from "./play-land";
import { PluginPlayer } from "boardgame.io/plugins";

const endIf = (G, ctx) => G.passedPriority.length === ctx.numPlayers;
const onEnd = (G, ctx) => {
  G.passedPriority = [];
};

export const mtg = {
  setup: ctx => ({
    passedPriority: []
  }),
  playerSetup: playerID => ({ playerID }),
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
      next: "preCombatMainPhase",
      endIf,
      onEnd
    },
    preCombatMainPhase: {
      moves: {
        playLand
      }
    }
  },
  plugins: [PluginPlayer]
};
