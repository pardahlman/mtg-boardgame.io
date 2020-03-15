import { createForest } from "./cards/forest";

export const playerSetup = playerIDs => ({
  players: playerIDs.reduce(
    (players, playerID) => ({
      ...players,
      [playerID]: {
        battlefield: [createForest()],
        manapool: {
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

export const getCardByCardId = (G, cardId) =>
  getAllCardsOnTheBattlefield(G).find(c => c.cardId === cardId);
