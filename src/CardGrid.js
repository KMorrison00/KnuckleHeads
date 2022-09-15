import React, {useEffect, useState} from "react";
import {Card} from './Card'

export const CardGrid = ({CardList}) => {
    return (
        <div className="grid grid-rows-3 grid-cols-3 gap-4">
            {CardList.map((card, index) => (
                <div key={index} className="outline-none outline-white hover:outline-apple-green hover:animate-small-ping ">
                    <Card cardData={card}></Card>
                </div>
            ))}
        </div>
    )
} 

// hover:outline-apple-green hover:animate-small-ping 