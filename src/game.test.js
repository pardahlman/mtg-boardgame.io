import { Client } from 'boardgame.io/client';
import { game } from './game';

it('should declare player 1 as the winner', () => {
  // Arrange
  const scenario = {
    ...game,
    setup: () => ({
    }),
  };

  const client = Client({
    game: scenario,
  });

  // Act
  // make some game moves
  client.moves.clickCell(8);
  client.moves.clickCell(5);

  // get the latest game state
  const { G, ctx } = client.store.getState();

  // Assert
  // the board should look like this now
  // expect(G.cells).toEqual(['0', '0', null, '1', '1', '1', null, null, '0']);
});