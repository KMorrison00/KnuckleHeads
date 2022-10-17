import React from "react";
import { Card } from "./Card";

export const OppCardGrid = ({opponentsTurn, gameState}) => {
    return (<div className={"grid grid-rows-1 gap-4 z-10 "+ (opponentsTurn ? '' : 'glowOutline')} >
        {
        gameState.p2Cards.map(
            (column, i) => (
                // <--- Notice this, it will wrap all JSX elements below in one single JSX element.
                <div className={"grid grid-cols-3 gap-4 "}  key={`row${i}`} >
                    {column.map( // <--- Also notice here, we have wrapped it in curly braces, because it is an "expression" inside JSX.
                        (card, j) => (
                            <div style={{"zIndex" : "2", backgroundColor:'#053C61'}} 
                            className={`outline-none hover:animate-enlarge ` + 
                            (j === 0? 'outline-green-600': j === 1 ? 'outline-purple-500': j===2? 'outline-cyan-400': '')}
                                 key={`${i}_${j}`}>
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

