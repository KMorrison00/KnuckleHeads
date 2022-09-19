import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { CardData } from "./Game";

export const CardGrid = ({ setPlayerCards, choosingGridSpot, setChoosingGridSpot,
                           opponentsTurn, potentialCard, setTurn }) => {
    const [cardList, setCardList] = useState([[], [], []]);
    const [editedCard, setEditedCard] = useState();

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
        } else {
            // game is running so we just want to update the grid 
            if (choosingGridSpot && !opponentsTurn) {
                let row = editedCard[1][1];
                let col = editedCard[1][3];
                let newCardList = cardList.slice();
                newCardList[row][col] = editedCard[0];
                setCardList(newCardList);
                setChoosingGridSpot(false);
                setTurn();
            }
        }

    }, [editedCard]);



  
    console.log()
    return (<div className={"grid grid-rows-1 gap-4 "}  >
        {
        cardList.map(
            (column, i) => (
                // <--- Notice this, it will wrap all JSX elements below in one single JSX element.
                <div className={"grid grid-cols-3 gap-4 " + (opponentsTurn ? '' : 'glowOutline')} >
                    {column.map( // <--- Also notice here, we have wrapped it in curly braces, because it is an "expression" inside JSX.
                        (card, j) => (
                            <div style={{"zIndex" : "2", backgroundColor:'#053C61'}} className={`outline-none outline-white hover:animate-enlarge`}>
                                <Card cardData={card}
                                      choosingGridSpot={choosingGridSpot} 
                                      opponentsTurn={opponentsTurn}
                                      setEditedCard={setEditedCard}
                                      potentialCard={potentialCard}
                                      gridPos={`row-${i}-col-${j}`}
                                    />
                            </div>
                            )
                        )}
                </div> 
              )
            )
        }
    </div>)
}

