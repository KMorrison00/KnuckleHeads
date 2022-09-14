import React from "react";


export const Card = ({card}) => {
    console.log(card)
    return (
        <div>
          <img src={card.cardImageUrl} alt={card.cardValue}  />
        </div>
      )
} 