import { Client } from 'boardgame.io/client';
import { Local } from 'boardgame.io/multiplayer';
import { game } from './game';

it('should declare player 1 as the winner', () => {
  // Arrange
  const spec = {
    game,
    multiplayer: Local(),
    setup: () => ({
    }),
  };

  const p0 = Client({ ...spec, playerID: '0' });
  const p1 = Client({ ...spec, playerID: '1' });

  p0.start();
  p1.start();

  // Act
  // make some game moves
  p0.moves.passPriority();

  // get the latest game state
  const { G, ctx } = p1.getState();

  // Assert
  // the board should look like this now
  // expect(G.cells).toEqual(['0', '0', null, '1', '1', '1', null, null, '0']);
});