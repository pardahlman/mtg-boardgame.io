import { STAGE } from "./stage";
import { getInitialStepState } from "./steps";
import { activateManaAbility } from "./activateManaAbility";
import { passPriority, resetPriority } from "./priority";
import { playerSetup } from "./player";

export const mtg = numPlayers => ({
  setup: ctx => ({
    ...getInitialStepState(),
    ...playerSetup(Array.from(Array(numPlayers).keys()))
  }),
  turn: {
    onBegin: resetPriority,
    stages: {
      [STAGE.AWAITINGPRIORITY]: {},
      [STAGE.HASPRIORITY]: {
        moves: {
          activateManaAbility,
          passPriority
        }
      }
    }
  }
});
