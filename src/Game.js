import React, {useEffect, useState} from "react";
import { CardGrid } from "./CardGrid";
import {createDeck, drawCard} from './api'

const Game = () => {

  const players = ['player1', 'player2']

  const [card, setCardState] = useState({
    cardValue: null,
    suit: null,
    cardImageUrl: null
  })
  const [discardPile, setDiscardPile] = useState([])
  const [turn, setTurn] = useState('')
  const [deckId, setDeckId] = useState(null);

  useEffect(() => {
      const getDeck = async () => {
        const deck_id = createDeck(1);
        setDeckId(deck_id)
      }
      getDeck()
      setTurn('player1')
    },
      [] // only on startup
    )
  

    return (
          
          <div className="grid grid-cols-3 grid-rows-3 grid-rows-auto">
            <div></div>
            <div>
              <CardGrid />
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>
              <CardGrid />
            </div>
            <div></div>
          </div>
      )

}

export default Game