import React from "react";
import { Card } from "./Card";

export const OppCardGrid = ({opponentsTurn, opponentCardList}) => {
    return (<div className={"grid grid-rows-1 gap-4 "} >
        {
        opponentCardList.map(
            (column, i) => (
                // <--- Notice this, it will wrap all JSX elements below in one single JSX element.
                <div className={"grid grid-cols-3 gap-4 " + (opponentsTurn ? '' : 'glowOutline')} >
                    {column.map( // <--- Also notice here, we have wrapped it in curly braces, because it is an "expression" inside JSX.
                        (card, j) => (
                            <div style={{"zIndex" : "2", backgroundColor:'#053C61'}} className={`outline-none outline-white hover:animate-enlarge`}>
                                <Card cardData={card}
                                      opponentsTurn={opponentsTurn}
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

