import React, {useEffect, useState} from "react";

export const CardGrid = ({CardList}) => {
    console.log(CardList)
    return (
        <div className="grid grid-rows-3 grid-cols-3 gap-2">
            {CardList.map((card, index) => (
                <div className="hover:outline-apple-green outline-none">
                    <img src={card.cardImageUrl} alt="Card Backing"></img>
                </div>
            ))}
        </div>
    )
} 