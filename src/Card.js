import React, { useState } from "react";

export const Card = ({cardData, classes}) => {
    console.log(cardData.cardVal)
    return (
      <div className={(cardData.cardVal !== '' ? '': ' opacity-0 ')}>
          <img src={cardData.cardImageUrl} alt={cardData.cardVal}
            onClick={()=>{console.log("CLICK INSIDE CARD", cardData.cardVal)}}/>
      </div>
      )
} 

