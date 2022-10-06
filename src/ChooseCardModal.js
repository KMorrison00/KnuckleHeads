import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "./Card";
import { checkAndRemoveOpposingCards } from "./CardGrid";
import { getCardValueFromCode } from "./Constants";

const indexArr = [1,2,3]
export const ChooseCardModal = (aceColumn, gameState, setGameState, endTurn, setAcePlayed) => {
    const enemyCardList = gameState.p2Cards;
    console.log(enemyCardList)
    const [selection, setSelection] = useState('')

    useEffect(() => {
        if (selection) {
            let newGameState = {...gameState}
            newGameState.p2Cards = checkAndRemoveOpposingCards(aceColumn, getCardValueFromCode(selection[0].cardVal).strVal, gameState)
            setGameState(newGameState)
            setAcePlayed(false)
            // endTurn()
        }
    }, [selection])

    return (
        <div id="aceRemoveModal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Select a Card To Remove 
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="aceRemoveModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="grid grid-cols-3 gap-12">
                        {indexArr.map((val) => {
                            if (enemyCardList && enemyCardList[val][aceColumn].cardVal !== '') {
                                <div>
                                    <Card
                                        cardData={enemyCardList[val][aceColumn]}
                                        clickCondition={true}
                                        potentialCard={enemyCardList[val][aceColumn].cardImageUrl}
                                        setEditedCard={setSelection}
                                        className={enemyCardList[val][aceColumn].cardVal}
                                        onClick={() => {
                                            let modal = document.getElementById('aceRemoveModal')
                                            modal.hide()
                                            }
                                        }
                                        />
                                </div>
                            }
                        })}
                    </div>
                    {/* <!-- Modal footer --> */}

                </div>
            </div>
        </div>
    )
}

