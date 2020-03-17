import { createForest } from "./cards/forest";
import { createGrizzlyBears } from "./cards/grizzly-bears";

export const player = (
  { battlefield, hand, manaPool } = {
    battlefield: [createForest()],
    hand: [createGrizzlyBears()],
    manaPool: { green: 0, colorless: 1 }
  }
) => ({
  battlefield,
  hand,
  manaPool
});

export const playerSetup = playerIDs => ({
  players: playerIDs.reduce(
    (players, playerID) => ({
      ...players,
      [playerID]: player()
    }),
    {}
  )
});

const flatten = (elements, selector) =>
  elements.reduce((prev, curr) => prev.concat(selector(curr)), []);

const getAllCardsOnTheBattlefield = G =>
  flatten(Object.values(G.players), player => player.battlefield);

const getAllCardsInHands = G =>
  flatten(Object.values(G.players), player => player.hand);

export const isOnTheBattlefield = (G, card) =>
  getAllCardsOnTheBattlefield(G).find(
    c => c.cardInstanceId === card.cardInstanceId
  );

export const getCardByCardInstanceId = (G, cardInstanceId) =>
  [...getAllCardsOnTheBattlefield(G), ...getAllCardsInHands(G)].find(
    c => c.cardInstanceId === cardInstanceId
  );

export const removeCardFromHand = (G, ctx, { card, player }) => {
  player.hand = player.hand.filter(
    cardInHand => cardInHand.cardInstanceId !== card.cardInstanceId
  );
};
