import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { game } from './game';

const App = Client({
  game,
  multiplayer: Local(),
});

export default App;