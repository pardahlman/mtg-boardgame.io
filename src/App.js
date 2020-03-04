import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { mtg } from './mtg';

const MtgClient = Client({
  game: mtg,
  multiplayer: Local(),
});

const App = () => (
  <div>
    <MtgClient playerID="0" />
    <MtgClient playerID="1" />
  </div>
);
export default App;