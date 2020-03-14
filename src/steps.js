export const STEP = {
  UNTAP: "untap",
  UPKEEP: "upkeep"
};

const steps = [STEP.UNTAP, STEP.UPKEEP];

export const getInitialStepState = () => ({ currentStep: steps[0] });

export const setNextMagicStep = (G, ctx) => {
  const nextStepIndex = steps.indexOf(G.currentStep) + 1;
  if (nextStepIndex < steps.length) {
    G.currentStep = steps[nextStepIndex];
  } else {
    G.currentStep = steps[0];
    ctx.events.endTurn();
  }
};
