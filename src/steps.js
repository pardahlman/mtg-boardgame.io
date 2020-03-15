export const STEP = {
  UNTAP: "UNTAP",
  UPKEEP: "UPKEEP",
  DRAW: "DRAW",
  PRECOMBAT_MAIN: "PRECOMBAT_MAIN",
  BEGINNING_OF_COMBAT: "BEGINNING_OF_COMBAT",
  DECLARE_ATTACKERS: "DECLARE_ATTACKERS",
  COMBAT_DAMAGE: "COMBAT_DAMAGE",
  END_OF_COMBAT: "END_OF_COMBAT",
  POSTCOMBAT_MAIN: "POSTCOMBAT_MAIN",
  END: "END",
  CLEANUP: "CLEANUP"
};

const allSteps = Object.values(STEP);

export const getInitialStepState = () => ({ currentStep: allSteps[0] });

export const setNextMagicStep = (G, ctx) => {
  const nextStepIndex = allSteps.indexOf(G.currentStep) + 1;
  if (nextStepIndex < allSteps.length) {
    G.currentStep = allSteps[nextStepIndex];
  } else {
    G.currentStep = allSteps[0];
    ctx.events.endTurn();
  }
};
