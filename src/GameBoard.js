import React, {useEffect} from "react";
import {createDeck, drawCard} from './api'

function GameBoard() {
    useEffect(() => {
        async function getDeck() {
          return await createDeck(1)
        }
        getDeck()
      },
        [] // only on startup
      )

      return (
            <div>Thing</div>
        )
}

export default GameBoard