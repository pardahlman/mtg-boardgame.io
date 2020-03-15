import { STAGE } from "./stage";
import { getInitialStepState } from "./steps";
import { activateManaAbility } from "./card";
import { passPriority, resetPriority } from "./priority";
import { playerSetup } from "./player";

export const mtg = {
  setup: ctx => ({
    ...getInitialStepState(),
    ...playerSetup(["0", "1"])
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
};
