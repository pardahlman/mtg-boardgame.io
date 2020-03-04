import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { game } from './game';

const GameClient = Client({
  game,
  multiplayer: Local(),
});

const App = () => (
  <div>
    <GameClient playerID="0" />
    <GameClient playerID="1" />
  </div>
);
export default App;