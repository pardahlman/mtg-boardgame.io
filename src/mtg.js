import { PluginPlayer } from "boardgame.io/plugins";
import { STAGE } from "./stage";
import { getInitialStepState, setNextMagicStep } from "./steps";

export const mtg = {
  setup: ctx => ({
    ...getInitialStepState()
  }),
  playerSetup: playerID => ({ playerID }),
  turn: {
    onBegin: (G, ctx) =>
      ctx.events.setActivePlayers({
        currentPlayer: STAGE.HASPRIORITY,
        others: STAGE.AWAITINGPRIORITY
      }),
    stages: {
      [STAGE.AWAITINGPRIORITY]: {},
      [STAGE.HASPRIORITY]: {
        moves: {
          passPriority: (G, ctx) => {
            const [activePlayerId] = Object.entries(ctx.activePlayers).find(
              ([, value]) => value === STAGE.HASPRIORITY
            );

            const indexOfNextPlayer =
              (ctx.playOrder.indexOf(activePlayerId) + 1) %
              ctx.playOrder.length;
            const nextPlayerId = ctx.playOrder[indexOfNextPlayer];

            let value;
            if (ctx.activePlayers[nextPlayerId] === STAGE.NULL) {
              setNextMagicStep(G, ctx);
              value = ctx.playOrder.reduce(
                (value, playerId) => ({
                  [playerId]: STAGE.AWAITINGPRIORITY,
                  ...value
                }),
                { [nextPlayerId]: STAGE.HASPRIORITY }
              );
            } else {
              value = {
                ...ctx.activePlayers,
                [activePlayerId]: STAGE.NULL,
                [nextPlayerId]: STAGE.HASPRIORITY
              };
            }

            ctx.events.setActivePlayers({
              value,
              next: {
                current: ctx.activePlayers[ctx.currentPlayer]
              }
            });
          }
        }
      }
    }
  },
  plugins: [PluginPlayer]
};
