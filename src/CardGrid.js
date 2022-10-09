import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import {CardData, getCardValueFromCode} from './Constants';
import { GameObj } from "./Game";


export function checkAndRemoveOpposingCards(colNum, playerCardStrVal, gameState) {
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

export const CardGrid = ({ choosingGridSpot, opponentsTurn, setAcePlayed,
                           potentialCard, endTurn, gameState, setGameState }) => {

    const [editedCard, setEditedCard] = useState();



    useEffect(() => {
        // game is running so we just want to update the grid 
        if (choosingGridSpot && !opponentsTurn) {
            let newGameState = {...gameState}
            let row = editedCard[1][1];
            let col = editedCard[1][3];
            newGameState.p1Cards[row][col] = editedCard[0];
            console.log(editedCard[0])
            // check and remove opposing cards
            if (getCardValueFromCode(editedCard[0].cardVal).strVal === 'A') {
                // removal and turn change will then be handled by the 
                // ace modal
                let emptyCardCount = 0
                for (let i = 0; i < 3; i++) {
                    if (newGameState.p2Cards[0][col].cardVal === '') {
                        emptyCardCount++
                    }
                }
                // dont show modal if theres no enemy cards in the column
                if (emptyCardCount < 3) {
                    setAcePlayed(col)
                    return
                }
            }
            newGameState.p2Cards = checkAndRemoveOpposingCards(col, getCardValueFromCode(editedCard[0].cardVal).strVal, gameState)
            setGameState(new GameObj(newGameState))
            endTurn();
        }
    }, [editedCard]);


    return (<div className={"grid grid-rows-1 gap-4 "}>
        {
        gameState.p1Cards.map(
            (column, i) => (
                <div className={"grid grid-cols-3 gap-4 " + (opponentsTurn ? '' : 'glowOutline')} key={`row${i}`}>
                    {column.map(
                        (card, j) => (
                            <div style={{"zIndex" : "2", backgroundColor:'#053C61'}} 
                                 className={`outline-none outline-white hover:animate-enlarge`}
                                 key={`${i}_${j}`}>
                                <Card cardData={card}
                                      choosingGridSpot={choosingGridSpot} 
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

