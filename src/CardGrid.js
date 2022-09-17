import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { CardData } from "./Game";

export const CardGrid = ({ setPlayerCards, glowCondition }) => {
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
    return (<div className={"grid grid-rows-1 gap-4 "}  >
        {
        cardList.map(
            (column) => (
                // <--- Notice this, it will wrap all JSX elements below in one single JSX element.
                <div className={"grid grid-cols-3 gap-4 " + glowCondition} >
                    {column.map( // <--- Also notice here, we have wrapped it in curly braces, because it is an "expression" inside JSX.
                        (card) => (
                            <div style={{"z-index" : "2", backgroundColor:'#053C61'}} className={"outline-none outline-white hover:outline-apple-green hover:animate-small-ping "}>
                                <Card cardData={card} ></Card>
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
