import { castSpell } from './castSpell'

describe('To cast a spell is to take it from where it is (usually the hand)', () => {
    test('put it on the stack', () =>{
        // Arrange
        const G = { stack: []};
        const ctx = {};
        const spell = {};

        //Act
        castSpell(G, ctx, spell);

        //Assert
        expect(G.stack).toContain(spell);
    });

})