import React from "react";

export const Hand = props => (
  <div className="hand">
    Hand
    {props.G.players[props.playerID].hand.map(card => (
      <CardInHand
        key={`cardInHand${card.cardInstanceId}`}
        card={card}
        props={props}
      />
    ))}
  </div>
);
const CardInHand = ({ card, props }) => (
  <div className="cardInHand">
    <div>{card.cardName}</div>
    <button
      onClick={() => {
        props.moves.castSpell({
          cardInstanceId: card.cardInstanceId
        });
      }}
    >
      Play
    </button>
  </div>
);
