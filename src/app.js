import React, { Fragment } from "react";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { mtg } from "./mtg";
import logger from "redux-logger";
import { applyMiddleware } from "redux";

const createMtgClient = ({ enhancer } = {}) =>
  Client({
    game: mtg,
    multiplayer: Local(),
    board: props => (
      <Fragment>
        playerID - {props.playerID}
        {Object.entries(props.moves).map(([key, value]) => (
          <button key={key} onClick={() => value()}>
            {key}
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
