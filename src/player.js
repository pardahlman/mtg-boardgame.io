import { createForest } from "./cards/forest";

export const playerSetup = playerIDs => ({
  players: playerIDs.reduce(
    (players, playerID) => ({
      ...players,
      [playerID]: {
        battlefield: [createForest()],
        manaPool: {
          green: 0
        }
      }
    }),
    {}
  )
});

const getAllCardsOnTheBattlefield = G =>
  Object.values(G.players).reduce(
    (cards, player) => cards.concat(player.battlefield),
    []
  );

export const isOnTheBattlefield = (G, card) =>
  getAllCardsOnTheBattlefield(G).find(
    c => c.cardInstanceId === card.cardInstanceId
  );

export const getCardByCardInstanceId = (G, cardInstanceId) =>
  getAllCardsOnTheBattlefield(G).find(c => c.cardInstanceId === cardInstanceId);
