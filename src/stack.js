export const stackSetup = () => ({
  stack: {
    objects: []
  }
});

export const addCardToStack = (G, ctx, { card }) => G.stack.objects.push(card);

export const getObjectsOnStack = G => G.stack.objects;
