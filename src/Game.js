import React, {useEffect, useState, useRef} from "react";
import { CardGrid } from "./CardGrid";
import { Card } from "./Card"
import CardBack from './CardBack.png'
import {createDeck, drawCard} from './Api'
import { useFirstRender } from "./Utils";

export class CardData {
  constructor({cardVal='', cardImageUrl=CardBack} = {}) {
    this.cardImageUrl = cardImageUrl;
    this.cardVal = cardVal;
  }
}

const Game = () => {
  const [turn, setTurn] = useState('player1');
  const [deckId, setDeckId] = useState(null);
  // ADD RESHUFFLING OF DECK AT SOME POINT
  const [p1Cards, setP1Cards] = useState([[],[],[]]);
  const [p2Cards, setP2Cards] = useState([[],[],[]]);
  const [choosingGridSpot, setChoosingGridSpot] = useState('');
  
  const [card, setCardState] = useState(new CardData());
  const players = {'player1': p1Cards, 'player2': p2Cards}
  const inversePlayerMap = {'player1': ['player2', p2Cards],
                            'player2': ['player1', p1Cards]}

  // draw card and attach to mouse store temporarily
  async function drawCardFromDeck() {
    console.log(deckId)
    let {code, image} = await drawCard({deckId: deckId}).catch((e)=> {console.log(e)});
    var newCard = new CardData({cardValue: code, cardImageUrl: image, classes:card.classes})
    setCardState(newCard)
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
      console.log(deckId)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // only on startup 
  )
  

  // Main Game Loop
  useEffect(() => {
    if (didMount) {
      drawCardFromDeck()
      setChoosingGridSpot(true) 
      // end of turn set to other turn
      setTurn(inversePlayerMap[turn][0])
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
              <CardGrid setPlayerCards={setCardState}/>
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
              <CardGrid setPlayerCards={setCardState}/>
            </div>
            <div></div>
          </div>
        </div>
    )
}

export default Game