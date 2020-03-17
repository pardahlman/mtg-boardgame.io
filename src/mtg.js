import { STAGE } from "./stage";
import { stepSetup } from "./steps";
import { activateManaAbility } from "./activateManaAbility";
import { passPriority, resetPriority } from "./priority";
import { playerSetup } from "./player";
import { stackSetup } from "./stack";
import { castSpell } from "./cast-spell";

export const mtg = numPlayers => ({
  setup: ctx => ({
    ...stepSetup(),
    ...playerSetup(Array.from(Array(numPlayers).keys())),
    ...stackSetup()
  }),
  turn: {
    onBegin: resetPriority,
    stages: {
      [STAGE.AWAITINGPRIORITY]: {},
      [STAGE.HASPRIORITY]: {
        moves: {
          activateManaAbility,
          castSpell,
          passPriority
        }
      }
    }
  }
});
