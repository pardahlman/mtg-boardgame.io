export const registerMtgEvents = (G, ...cardEvents) => {
  for (let move in G.moves) {
    const actualMove = G.moves[move];
    const moveEvents = cardEvents.map(c => c.moves?.[move]).filter(e => !!e);
    G.moves[move] = (G, ctx, ...args) => {
      actualMove(G, ctx, ...args);
      moveEvents.forEach(e => e(G, ctx, ...args));
    };
  }

  for (let phase in G.phases) {
    const actualOnBegin = G.phases[phase].onBegin || (() => {});
    const phaseEvents = cardEvents.map(c => c.phases?.[phase]).filter(e => !!e);
    G.phases[phase].onBegin = (G, ctx) => {
      actualOnBegin(G, ctx);
      phaseEvents.forEach(e => e(G, ctx));
    };
  }
  return G;
};
