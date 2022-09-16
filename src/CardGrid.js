import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { CardData } from "./Game";

export const CardGrid = ({ setPlayerCards }) => {
    const [cardList, setCardList] = useState([[], [], []]);

    useEffect(() => {
        if (cardList[0].length === 0) {
            let initGrid = [[], [], []];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let newCard = new CardData();
                    initGrid[i].push(newCard);
                }
            }
            setCardList(initGrid);
            setPlayerCards(initGrid);
            console.log("FIRST RENDER GRID");
        }
    }, []);

  
    console.log()
    return (<div className="grid grid-rows-1 gap-4">
        {
        cardList.map(
            (column, index1) => (
                // <--- Notice this, it will wrap all JSX elements below in one single JSX element.
                <div className="grid grid-cols-3 gap-4">
                    {column.map( // <--- Also notice here, we have wrapped it in curly braces, because it is an "expression" inside JSX.
                        (card, index2) => (
                                <div key={`${index1}${index2}`} className="outline-none outline-white hover:outline-apple-green hover:animate-small-ping">
                                    <Card cardData={card}></Card>
                                </div>
                            )
                        )}
                </div> 
            )
        )
        }
    </div>)
}

// hover:outline-apple-green hover:animate-small-ping
