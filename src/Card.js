import React, { useState } from "react";

export const Card = ({cardData, choosingGridSpot, opponentsTurn, setEditedCard, potentialCard}) => {
    console.log(cardData.cardVal)
    const clickHoverCondition = choosingGridSpot && !opponentsTurn && cardData.cardVal === '';
    return (
      <div >
          <img src={cardData.cardImageUrl} alt={cardData.cardVal}
            onMouseOver={(e) => {
              if (clickHoverCondition) {
                e.currentTarget.src = potentialCard.cardImageUrl;
                }
              }
            }
            onMouseOut={(e) => {
              if (clickHoverCondition) {
                e.currentTarget.src = cardData.cardImageUrl;
                }
              }
            }
            onClick={()=>{
              if (clickHoverCondition) {
                setEditedCard([potentialCard, ''])
              }
              console.log("CLICK INSIDE CARD", cardData.cardVal)}}/>
      </div>
      )
} 

