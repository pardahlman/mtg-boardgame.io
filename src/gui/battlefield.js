import React from "react";

export const Battlefield = props => (
  <div className="battlefield">
    Battlefield
    {props.G.players[props.playerID].battlefield.map(card => (
      <CardOnTheBattlefield
        key={`cardOnTheBattlefield${card.cardInstanceId}`}
        card={card}
        props={props}
      />
    ))}
  </div>
);
const CardOnTheBattlefield = ({ card, props }) => (
  <div className="cardOnTheBattlefield">
    <div>{card.cardName}</div>
    {card.activatedManaAbilities.map(ability => (
      <button
        key={`activatedManaAbility${ability.abilityId}`}
        onClick={() =>
          props.moves.activateManaAbility({
            cardInstanceId: card.cardInstanceId,
            abilityId: ability.abilityId
          })
        }
      >
        {ability.abilityName}
      </button>
    ))}
  </div>
);
