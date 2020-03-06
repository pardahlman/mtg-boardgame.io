import React from "react";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { mtg } from "./mtg";

const Label = ({ name, value }) => (
  <div>
    {name} - {value}
  </div>
);

const MtgClient = Client({
  game: mtg,
  multiplayer: Local(),
  board: props => (
    <div>
      <Label name="playerID" value={props.playerID}></Label>
      <Label name="currentPlayer" value={props.ctx.currentPlayer}></Label>
      <Label name="phase" value={props.ctx.phase}></Label>
      <button onClick={() => props.moves.passPriority()}>passPriority</button>
    </div>
  )
});

const App = () => (
  <div>
    <MtgClient playerID="0" />
    <MtgClient playerID="1" />
  </div>
);
export default App;
