import React from "react";
import { getObjectsOnStack } from "../stack";

export const Stack = props => (
  <div className="stack">
    Stack
    {getObjectsOnStack(props.G).map(card => (
      <ObjectOnTheStack
        key={`cardOnTheStack${card.cardInstanceId}`}
        card={card}
        props={props}
      />
    ))}
  </div>
);
const ObjectOnTheStack = ({ card, props }) => (
  <div className="objectOnTheStack">
    <div>{card.cardName}</div>
  </div>
);
