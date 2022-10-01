import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import {CardData, getCardValueFromCode} from './Constants';


export const CardGrid = ({ setPlayerCards, playerCards, choosingGridSpot, setChoosingGridSpot,
                           opponentsTurn, potentialCard, endTurn, setOpponentsCards, 
                           opponentCardList }) => {
    const [editedCard, setEditedCard] = useState();

    function checkAndRemoveOpposingCards(colNum, playerCardStrVal) {
        let newCardList = opponentCardList.slice()
        let changeCounter = 0;
        for (let i =0; i< 3; i++) {
            if (opponentCardList[i][colNum].cardVal !== '') {
                let oppCard = getCardValueFromCode(opponentCardList[i][colNum].cardVal)
                if (oppCard.strVal === playerCardStrVal) {
                    newCardList[i][colNum] = new CardData();
                    changeCounter++;
                }
            }
        }
        if (changeCounter !== 0) {
            setOpponentsCards(newCardList);
        }
    }

    useEffect(() => {
        // game is running so we just want to update the grid 
        if (choosingGridSpot && !opponentsTurn) {
            let row = editedCard[1][1];
            let col = editedCard[1][3];
            let newCardList = playerCards.slice();
            newCardList[row][col] = editedCard[0];
            console.log(editedCard[0])
            // check and remove opposing cards
            checkAndRemoveOpposingCards(col, getCardValueFromCode(editedCard[0].cardVal).strVal)
            setPlayerCards(newCardList)
            setChoosingGridSpot(false);
            endTurn();
        }
        

    }, [editedCard]);


    return (<div className={"grid grid-rows-1 gap-4 "}  >
        {
        playerCards.map(
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

