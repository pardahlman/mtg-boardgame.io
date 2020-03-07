import { registerMtgEvents } from "./mtg-events";

it("should be possible to create event for certain move", () => {
  //Arrange
  let actualMethodCalled = false;
  let eventMethodCalled = false;
  let actualCard = null;
  let eventCard = null;

  const game = {
    moves: {
      drawCard: (G, ctx, card) => {
        actualMethodCalled = true;
        actualCard = card;
      }
    }
  };

  const events = {
    moves: {
      drawCard: (G, ctx, card) => {
        eventMethodCalled = true;
        eventCard = card;
      }
    }
  };

  registerMtgEvents(game, events);

  // Act
  game.moves.drawCard(null, null, {});

  // Assert
  expect(actualMethodCalled).toBeTruthy();
  expect(eventMethodCalled).toBeTruthy();
  expect(actualCard).toBeTruthy();
  expect(actualCard).toEqual(eventCard);
});

it("should be possible to create event for certain phase", () => {
  // Arrange
  let actualMethodCalled = false;
  let eventMethodCalled = false;

  const game = {
    phases: {
      untap: {
        onBegin: (G, ctx) => {
          actualMethodCalled = true;
        }
      }
    }
  };

  const events = {
    phases: {
      untap: (G, ctx) => {
        eventMethodCalled = true;
      }
    }
  };

  registerMtgEvents(game, events);

  // Act
  game.phases.untap.onBegin();

  // Assert
  expect(actualMethodCalled).toBeTruthy();
  expect(eventMethodCalled).toBeTruthy();
});
