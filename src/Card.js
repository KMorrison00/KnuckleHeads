import React, { useState } from "react";

export const Card = ({cardData, choosingGridSpot, gridPos, clickCondition,
                      setEditedCard, potentialCard}) => {
    const clickHoverCondition = clickCondition? clickCondition: choosingGridSpot && cardData.cardVal === '';
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
                // the class name stores the row and column info of the spot
                setEditedCard([potentialCard, e.currentTarget.className.split('-')])
              }
            }}
            />
      </div>
      )
} 

