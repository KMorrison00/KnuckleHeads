import React from "react";

export const Card = ({cardData}) => {
    return (
      <div>
          <img src={cardData.cardImageUrl} alt={cardData.cardValue} className={cardData.classes} onClick={()=>{console.log('hi')}}/>
      </div>
      )
} 

