import React, { Fragment } from "react";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { mtg } from "../mtg";
import logger from "redux-logger";
import { applyMiddleware } from "redux";
import "./index.css";

const createMtgClient = ({ enhancer } = {}) =>
  Client({
    game: mtg,
    multiplayer: Local(),
    board: props => (
      <Fragment>
        playerID - {props.playerID}
        <button onClick={() => props.moves.passPriority()}>passPriority</button>
        {props.G.players[props.playerID].battlefield
          .reduce(
            (prev, card) =>
              prev.concat(
                card.activatedManaAbilities.map(ability => ({
                  card,
                  ability
                }))
              ),
            []
          )
          .map(({ card, ability }) => (
            <button
              key={`${card.cardId}-${ability.abilityId}`}
              onClick={() =>
                props.moves.activateManaAbility({
                  cardId: card.cardId,
                  abilityId: ability.abilityId
                })
              }
            >
              {card.cardName} - {ability.abilityName}
            </button>
          ))}
      </Fragment>
    ),
    enhancer
  });

export const NoLogMtgClient = createMtgClient();
export const MtgClient = createMtgClient({ enhancer: applyMiddleware(logger) });

export const App = () => (
  <Fragment>
    <MtgClient playerID="0" />
    <NoLogMtgClient playerID="1" />
  </Fragment>
);
