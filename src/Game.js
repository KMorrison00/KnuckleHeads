import React, {useEffect, useState, useRef} from "react";
import { CardGrid } from "./CardGrid";
import { Card } from "./Card"
import CardBack from './CardBack.png'
import {createDeck, drawCard} from './Api';
import { useFirstRender } from "./Utils";
import { CardData, getCardValueFromCode } from './Constants';

const Game = () => {
  const [turn, setTurn] = useState('player1');
  const [deckId, setDeckId] = useState(null);
  // ADD RESHUFFLING OF DECK AT SOME POINT
  const [p1Cards, setP1Cards] = useState([[],[],[]]);
  const [p2Cards, setP2Cards] = useState([[],[],[]]);
  const [p1Scores, setP1Scores] = useState([0,0,0,0]);
  const [p2Scores, setP2Scores] = useState([0,0,0,0]);
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

  function UpdateScores() {
    
  }

  function calculateScores(cardList) {
    let scores = [0,0,0,0];
    let colArr = [[],[],[]]
    for (let col=0; col < 3; col++){

      let multiplier = 1;
      let flush = false
      let straight = false

      // convert entries into column format
      for(let row=0; row < 3; row++) {
        colArr[col].push(getCardValueFromCode(cardList[row][col].cardVal))
      }
      // if all entries in col make a flush then x 2
      if (colArr[col][0].suit === colArr[col][1].suit &&
           colArr[col][1].suit === colArr[col][2].suit) {
            multiplier *= 2; 
            flush = true
      }
      // if all entries in col make a flush then x 2
      if (checkForStraight(colArr[col])) {
        multiplier *= 2;
        straight = true;  
      }
      // straight flush give 6x multiplier
      if (flush && straight) {
        multiplier = 6
      }
      // now calculate pure numerical value
      // first check face value doubling because its different
      let tmpNumStorage = [];
      for (let i = 0; i< 3; i++){
        if (!isFaceCard(colArr[col][0].strVal)) {
          
        }
      }
      if (colArr[col][0].strVal === 'J' || colArr[col][0].strVal === 'Q' || colArr[col][0].strVal === 'K') {

      }



      console.log(turn, colArr[col])
    }
  }

  function isFaceCard(str) {
    if (str === 'J' || str === 'Q' || str === 'K') {
      return true;
    }
    return false;
  }
  
  function checkForStraight(col) {
    let strVals = []
    let numVals = []
    for (let i =0; i < 3; i++) {
      strVals.push(col[i].strVal)
      numVals.push(col[i].val)
    }
    // this covers all the face card straight possibilities
    if (strVals.includes('J')) {
      if (strVals.includes('Q')) {
        if (strVals.includes('K') || numVals.includes(10)) {
          return true
        }
      } else if (numVals.includes(10)) {
        if (numVals.includes(9)) {
          return true
        }
      }
    }
    // now calculate the pure num possibilities
    if ((numVals.includes(numVals[0] + 1) && numVals.includes(numVals[0] + 2)) || 
        (numVals.includes(numVals[0] - 1) && numVals.includes(numVals[0] - 2))) {
          return true
      }
    return false
  }


  // STARTUP CODE 
  useEffect(() => {
    const getDeck = async () => {
      const deck_id = await createDeck(1);
      setDeckId(deck_id)
    }
    setCardState(new CardData()) 
    getDeck()
    console.log(deckId)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // only on startup 
  )
  

  // Main Game Loop
  useEffect(() => {
      console.log('ENTERED MAIN GAME LOOP')
      // make sure card lists have been populated
      if (p2Cards[0].length > 0){
        calculateScores(inversePlayerMap[turn][1])
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
                        setChoosingGridSpot={setChoosingGridSpot}
                        opponentsTurn={turn === 'player1'}
                        potentialCard={card}
                        setTurn={()=>{setTurn(inversePlayerMap[turn][0]);}}
                        />
              <div className="grid grid-cols-3 place-items-center gap-4 mt-4">
                <div>{p1Scores[0]}</div>
                <div>{p1Scores[1]}</div>
                <div>{p1Scores[2]}</div>
              </div>
              <div className="grid place-items-center">
                Total: {p1Scores[3]}
              </div>
            </div>
            <div></div>
            <div></div>
            <div className="grid grid-cols-2 gap-10">
              {/* add on click to move image? */}
              <button onClick={() =>  {drawCardFromDeck(); setChoosingGridSpot(true);}}>
                <Card cardData={new CardData({cardImageUrl:CardBack})} />
              </button>
              <button className="outline-none outline-white">
                <Card cardData={card} />
              </button>
            </div>
            <div></div>
            <div></div>
            <div >
              <div className="grid place-items-center">
                Total: {p1Scores[3]}
              </div>
              <div className="grid grid-cols-3 place-items-center gap-4 mb-4">
                <div>{p1Scores[0]}</div>
                <div>{p1Scores[1]}</div>
                <div>{p1Scores[2]}</div>
              </div>
              <CardGrid setPlayerCards={setP1Cards} 
                        choosingGridSpot={choosingGridSpot}
                        setChoosingGridSpot={setChoosingGridSpot}
                        opponentsTurn={turn === 'player2'}
                        potentialCard={card}
                        setTurn={()=>{setTurn(inversePlayerMap[turn][0]);}}
                        />
            </div>
            <div></div>
          </div>
        </div>
    )
}

export default Game