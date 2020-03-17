import { STAGE } from "./stage";
import { setNextMagicStep } from "./steps";

export const resetPriority = (G, ctx) =>
  ctx.events.setActivePlayers({
    currentPlayer: STAGE.HASPRIORITY,
    others: STAGE.AWAITINGPRIORITY
  });

export const passPriority = (G, ctx) => {
  const activePlayerId = getIdOfPlayerWithPriority(G, ctx);

  const indexOfNextPlayer =
    (ctx.playOrder.indexOf(activePlayerId) + 1) % ctx.playOrder.length;
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
};

const getIdOfPlayerWithPriority = (G, ctx) =>
  Object.entries(ctx.activePlayers).find(
    ([, value]) => value === STAGE.HASPRIORITY
  )[0];

export const getPlayerWithPriority = (G, ctx) =>
  G.players[getIdOfPlayerWithPriority(G, ctx)];
