import React, {useEffect, useState, useRef} from "react";
import { CardGrid } from "./CardGrid";
import { Card } from "./Card"
import CardBack from './CardBack.png'
import {createDeck, drawCard} from './Api'
import { useFirstRender } from "./Utils";

export class CardData {
  constructor({cardVal='', cardImageUrl=CardBack, classes='invisible'} = {}) {
    this.cardValue = cardVal;
    this.cardImageUrl = cardImageUrl;
    this.classes = classes;
  }
}

const Game = () => {
  
  const initGrid = []
  for (let i = 0; i < 9; i++) {
    let newCard = new CardData() 
    initGrid.push(newCard)
  }

  const [discardPile, setDiscardPile] = useState([]);
  const [turn, setTurn] = useState('player1');
  const [deckId, setDeckId] = useState(null);
  const [p1Cards, setP1Cards] = useState(initGrid.slice());
  const [p2Cards, setP2Cards] = useState(initGrid.slice());
  const [choosingGridSpot, setChoosingGridSpot] = useState('');
  const [card, setCardState] = useState({CardData});
  const players = {'player1': p1Cards, 'player2': p2Cards}

  // draw card and attach to mouse store temporarily
  async function drawCardFromDeck() {
    console.log(deckId)
    let {code, image} = await drawCard({deckId: deckId}).catch((e)=> {console.log(e)});
    setCardState({cardValue: code, cardImageUrl: image})
  }

  function placeCardInGrid() {
    if (choosingGridSpot) {
      console.log('trying to place')
    }
  }

  // STARTUP CODE 
  const didMount = useFirstRender(null);

  useEffect(() => {
      const getDeck = async () => {
        const deck_id = await createDeck(1);
        setDeckId(deck_id)
      }
      getDeck()
      let deckCard = new CardData({classes:'visible'})
      setCardState(deckCard)
      console.log(deckId)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // only on startup 
  )
  

  // START OF TURN
  useEffect(() => {
    if (didMount) {
      drawCardFromDeck()
      setChoosingGridSpot(true) 
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps 
    [turn]
  )
  

  return (
        <div>
          <div className="grid grid-cols-3 grid-rows-3 grid-rows-auto bg-indigo-blue p-10 place-items-center">
            <div></div>
            <div>
              <CardGrid CardList={p2Cards}/>
            </div>
            <div></div>
            <div></div>
            <div>
              {/* add on click to move image? */}
              <button onClick={() =>  {drawCardFromDeck(); placeCardInGrid();}}>
                <Card cardData={card} />
              </button>
            </div>
            <div></div>
            <div></div>
            <div>
              <CardGrid CardList={p1Cards}/>
            </div>
            <div></div>
          </div>
        </div>
    )
}

export default Game