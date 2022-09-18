import React, {useEffect, useState, useRef} from "react";
import { CardGrid } from "./CardGrid";
import { Card } from "./Card"
import CardBack from './CardBack.png'
import NullCard from './NullCard.png'
import {createDeck, drawCard} from './Api'
import { useFirstRender } from "./Utils";

export class CardData {
  constructor({cardVal='', cardImageUrl=NullCard} = {}) {
    this.cardImageUrl = cardImageUrl;
    this.cardVal = cardVal;
  }
}

const Game = () => {
  const [turn, setTurn] = useState('player2');
  const [deckId, setDeckId] = useState(null);
  // ADD RESHUFFLING OF DECK AT SOME POINT
  const [p1Cards, setP1Cards] = useState([[],[],[]]);
  const [p2Cards, setP2Cards] = useState([[],[],[]]);
  const [choosingGridSpot, setChoosingGridSpot] = useState(false);
  const [card, setCardState] = useState(new CardData());
  const players = {'player1': p1Cards, 'player2': p2Cards}
  const inversePlayerMap = {'player1': ['player2', p2Cards],
  'player2': ['player1', p1Cards]}
  
  // draw card and attach to mouse store temporarily
  async function drawCardFromDeck() {
    console.log(deckId)
    let {code, image} = await drawCard({deckId: deckId}).catch((e)=> {console.log(e)});
    setCardState(new CardData({cardVal: code, cardImageUrl: image}))
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
    // needs to be here to render the card backing
    setCardState(new CardData()) 
    getDeck()
    console.log(deckId)
    if (!didMount) {
      //MOVE getDeck() BACK IN HERE WHEN NOT DEBUGGING
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // only on startup 
  )
  

  // Main Game Loop
  useEffect(() => {
    if (didMount) {
      console.log('ENTERED MAIN GAME LOOP')
      drawCardFromDeck()
      setChoosingGridSpot(true) 
      // end of turn set to other turn
      setTurn(inversePlayerMap[turn][0])
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  [turn]
  )
  
  console.log('RENDERED THE WHOLE DAMN GAME')
  
  return (
    <div>
          <div className="gameBoard grid grid-cols-3 grid-rows-3 grid-rows-auto bg-indigo-blue p-10 place-items-center">
            <div></div>
            <div>
              <CardGrid setPlayerCards={setP2Cards} 
                        choosingGridSpot={choosingGridSpot}
                        opponentsTurn={turn === 'player1'}
                        potentialCard={card}
                        />
            </div>
            <div></div>
            <div></div>
            <div className="grid grid-cols-2 gap-10">
              {/* add on click to move image? */}
              <button onClick={() =>  {drawCardFromDeck(); placeCardInGrid();}}>
                <Card cardData={new CardData({cardImageUrl:CardBack})} />
              </button>
              <button className="outline-none outline-white">
                <Card cardData={card} />
              </button>
            </div>
            <div></div>
            <div></div>
            <div >
              <CardGrid setPlayerCards={setP1Cards} 
                        choosingGridSpot={choosingGridSpot}
                        opponentsTurn={turn === 'player2'}
                        potentialCard={card}
                        />
            </div>
            <div></div>
          </div>
        </div>
    )
}

export default Game