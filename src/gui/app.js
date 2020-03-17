import React, { Fragment } from "react";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { mtg } from "../mtg";
import logger from "redux-logger";
import { applyMiddleware } from "redux";
import "./index.css";
import { Hand } from "./hand";
import { Battlefield } from "./battlefield";
import { Stack } from "./stack";

const game = mtg(2);
const createMtgClient = ({ enhancer } = {}) =>
  Client({
    game,
    multiplayer: Local(),
    board: props => (
      <Fragment>
        <div>
          playerID - {props.playerID}{" "}
          <button onClick={() => props.moves.passPriority()}>
            passPriority
          </button>
        </div>
        <Hand {...props} />
        <Battlefield {...props} />
        <Stack {...props} />
        <hr />
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
