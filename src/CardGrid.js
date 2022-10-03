import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import {CardData, getCardValueFromCode} from './Constants';
import { GameObj } from "./Game";

export const CardGrid = ({ choosingGridSpot, opponentsTurn, 
                           potentialCard, endTurn, gameState, setGameState }) => {

    const [editedCard, setEditedCard] = useState();

    function checkAndRemoveOpposingCards(colNum, playerCardStrVal) {
        let newCardList = gameState.p2Cards.slice()
        for (let i =0; i< 3; i++) {
            if (newCardList[i][colNum].cardVal !== '') {
                let oppCard = getCardValueFromCode(newCardList[i][colNum].cardVal)
                if (oppCard.strVal === playerCardStrVal) {
                    newCardList[i][colNum] = new CardData();
                }
            }
        }
        return newCardList;

    }

    useEffect(() => {
        // game is running so we just want to update the grid 
        if (choosingGridSpot && !opponentsTurn) {
            let clone = {...gameState}
            let row = editedCard[1][1];
            let col = editedCard[1][3];
            clone.p1Cards[row][col] = editedCard[0];
            console.log(editedCard[0])
            // check and remove opposing cards
            let oppCards = checkAndRemoveOpposingCards(col, getCardValueFromCode(editedCard[0].cardVal).strVal)
            clone.p2Cards = oppCards
            setGameState(new GameObj(clone))
            endTurn();
        }
    }, [editedCard]);


    return (<div className={"grid grid-rows-1 gap-4 "}  >
        {
        gameState.p1Cards.map(
            (column, i) => (
                <div className={"grid grid-cols-3 gap-4 " + (opponentsTurn ? '' : 'glowOutline')} >
                    {column.map(
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

