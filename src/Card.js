import React, { useState } from "react";

export const Card = ({cardData}) => {
    // console.log(cardData.classes.join(' ') + cardData.cardValue !== '' ? '': 'invisible')
    console.log(cardData)
    return (
      <div>
          <img src={cardData.cardImageUrl} alt={cardData.cardValue} className={cardData.cardValue !== '' ? '': ' invisible'} onClick={()=>{console.log('hi')}}/>
      </div>
      )
} 

