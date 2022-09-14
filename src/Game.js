import React, {useEffect, useState} from "react";
import { CardGrid } from "./CardGrid";
import { Card } from "./Card"
import CardBack from './CardBack.png'
import {createDeck, drawCard} from './api'

const Game = () => {

  const players = ['player1', 'player2']

  const [card, setCardState] = useState({
    cardValue: null,
    cardImageUrl: CardBack
  })
  const [discardPile, setDiscardPile] = useState([])
  const [turn, setTurn] = useState('')
  const [deckId, setDeckId] = useState(null);

  // draw card and attach to mouse store temporarily
  async function drawCardFromDeck() {
    console.log(deckId)
    let {code, image} = await drawCard({deckId: deckId});
    setCardState({cardValue: code, cardImageUrl: image})
  }

  useEffect(() => {
      const getDeck = async () => {
        const deck_id = await createDeck(1);
        setDeckId(deck_id)
      }
      getDeck()
      setTurn('player1')
      console.log('MADE A DECK')
      console.log(deckId)
    },
      [] // only on startup
    )
  

    return (
          <div>
            <div className="grid grid-cols-3 grid-rows-3 grid-rows-auto bg-indigo-blue p-10 place-items-center">
              <div></div>
              <div>
                <CardGrid />
              </div>
              <div></div>
              <div></div>
              <div>
                <button onClick={drawCardFromDeck} className='text-algae-green'>
                  <Card card={card} />
                </button>
                
              </div>
              <div></div>
              <div></div>
              <div>
                <CardGrid />
              </div>
              <div></div>
            </div>
          </div>
      )

}

export default Game