import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { mtg } from './mtg';

const GameClient = Client({
  game: mtg,
  multiplayer: Local(),
});

const App = () => (
  <div>
    <GameClient playerID="0" />
    <GameClient playerID="1" />
  </div>
);
export default App;