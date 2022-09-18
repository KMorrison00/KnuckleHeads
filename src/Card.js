import React, { useState } from "react";

export const Card = ({cardData, choosingGridSpot, gridPos,
                      opponentsTurn, setEditedCard, potentialCard}) => {
    console.log(cardData.cardVal)
    const clickHoverCondition = choosingGridSpot && !opponentsTurn && cardData.cardVal === '';
    return (
      <div >
          <img src={cardData.cardImageUrl} alt={cardData.cardVal}
          className={gridPos}
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
            onClick={(e)=>{
              if (clickHoverCondition) {
                setEditedCard([potentialCard, e.currentTarget.className.split('-')])
              }
              console.log("CLICK INSIDE CARD", cardData.cardVal)}}/>
      </div>
      )
} 

