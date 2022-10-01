import React, {useEffect, useState, useCallback} from "react";
import { CardGrid } from "./CardGrid";
import { Card } from "./Card"
import CardBack from './images/CardBack.png'
import {createDeck, drawCard} from './Api';
import { ChooseCardModal } from "./ChooseCardModal";
import { CardData, getCardValueFromCode } from './Constants';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const Game = () => {
  const [turn, setTurn] = useState('player1');
  const [deckId, setDeckId] = useState(null);
  // ADD RESHUFFLING OF DECK AT SOME POINT
  const [p1Cards, setP1Cards] = useState([[],[],[]]);
  const [p2Cards, setP2Cards] = useState([[],[],[]]);
  const [p1Scores, setP1Scores] = useState([0,0,0,0]);
  const [p2Scores, setP2Scores] = useState([0,0,0,0]);
  const [hasOpponent, setHasOpponent] = useState(false);
  const [choosingGridSpot, setChoosingGridSpot] = useState(false);
  const [card, setCardState] = useState(new CardData());
  const playerMap = {'player1': [p1Cards, setP1Scores], 'player2': [p2Cards, setP2Scores]}
  const inversePlayerMap = {'player1': ['player2', p2Cards, setP2Scores],
                            'player2': ['player1', p1Cards, setP1Scores]}
  const [sentDeck, setSentDeck] = useState(false)
  const [share, setShare] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paramsRoom = params.get('room');
  const [room, setRoom] = useState();
  const socket = io('http://localhost:4000');
  
  // draw card and attach to mouse store temporarily
  async function drawCardFromDeck() {
    console.log(deckId)
    let {code, image} = await drawCard({deckId: deckId}).catch((e)=> {console.log(e)});
    setCardState(new CardData({cardVal: code, cardImageUrl: image}));
    setChoosingGridSpot(true);
  }

  const random = () => {
    return Array.from(Array(8), () => Math.floor(Math.random() * 36).toString(36)).join('');
  };

  const restart = () => {
    setP1Cards([[],[],[]])
    setP2Cards([[],[],[]])
    setChoosingGridSpot(false)
    setTurn('player1');
  };

  const changeTurn = () => {
    console.log('HIIIIII IM CHANGEING TURN', room)
    socket.emit('reqTurn', JSON.stringify({ 'p1Cards': p1Cards, 'p2Cards': p2Cards, 'room':room}));
  };


  function calculateAndUpdateScores(cardList, setScore) {
    let scores = [0,0,0,0];
    for (let col=0; col < 3; col++){
      let colArr = []
      let valuesArr = []
      let strValuesArr = []
      let multiplier = 1;
      let flush = false
      let straight = false

      // convert entries into column format
      for(let row=0; row < 3; row++) {
        // account for columns that arent full
        let valDict = getCardValueFromCode(cardList[row][col].cardVal)
        if (isNaN(valDict.val)) {
          valDict.val = 0
        }
        colArr.push(valDict)
        valuesArr.push(valDict.val)
        strValuesArr.push(valDict.strVal)
      }
      // check for 2's
      for (let i = 0; i < 3; i++) {
        multiplier *= valuesArr[i] === 2 ? 2 : 1
      }
      console.log('MULTIPLIER', multiplier)
      // if any entries aren't populated skip checking flush/straights
      if (!valuesArr.includes(NaN)) {
        // if all entries in col make a flush then x 2
        if (colArr[0].suit === colArr[1].suit &&
          colArr[1].suit === colArr[2].suit) {
            multiplier *= 2; 
            flush = true
          }
          // if all entries in col make a flush then x 2
          if (isStraight(colArr)) {
            multiplier *= 2;
            straight = true;  
          }
          // straight flush gives 6x multiplier
          multiplier = flush && straight ? 6 : multiplier
          
          // calculate score and exit iteration
          // you cant have doubles or triples if you have a straight or flush
          if (flush || straight) {
            scores[col] = (valuesArr[0] + valuesArr[1] + valuesArr[2]) * multiplier
            continue
          }
      }

      // now calculate pure numerical value      
      console.log('CHECKING FOR DUBS/TRIPS', strValuesArr)
      if (strValuesArr[0] === strValuesArr[1]) {
        // triples detected
        if (strValuesArr[1] === strValuesArr[2]) {
          // face card triples are worth more (4x)
          // otherwise just x3, but make sure to account for 2's
          scores[col] = isFaceCard(strValuesArr[0]) ? 4 * valuesArr[0] : 3 * valuesArr[0] * multiplier
          continue
        }
        // check for face card doubles
        let faceMultiplier = isFaceCard(strValuesArr[0]) ? 3 : 2
        scores[col] = (((2 * valuesArr[0] * faceMultiplier) + valuesArr[2]) * multiplier)
        console.log('FIRST TWO WERE DOUBLES', (((2 * valuesArr[0] * faceMultiplier) + valuesArr[2]) * multiplier))
      } 
      else if (strValuesArr[0] === strValuesArr[2]) {
        let faceMultiplier = isFaceCard(strValuesArr[2]) ? 3 : 2
        scores[col] = ((2 * valuesArr[2] * faceMultiplier) + valuesArr[1]) * multiplier
      } 
      else if (strValuesArr[1] === strValuesArr[2]) {
        let faceMultiplier = isFaceCard(strValuesArr[1]) ? 3 : 2
        scores[col] = ((2 * valuesArr[1] * faceMultiplier) + valuesArr[0]) * multiplier
      } 
      else {
        scores[col] = (valuesArr[0] + valuesArr[1] + valuesArr[2]) * multiplier
      }
    }
    scores[3] = scores[0] + scores[1] + scores[2]
    // update the scores (map contains the set function)
    setScore(scores)
    console.log(scores)
  }

  function isFaceCard(str) {
    if (str === 'J' || str === 'Q' || str === 'K') {
      return true;
    }
    return false;
  }
  
  function isStraight(col) {
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

  function isGameOver() {
    let cards = inversePlayerMap[turn][1];
    let cardCount = 0;
    cards.forEach((col) => {
      col.forEach((card) => {
        if (card.cardVal !== '') {
          cardCount += 1;
        }
      })
    })
    if (cardCount === 9) {
      return true
    }
    return false
  }


  // STARTUP CODE 
  useEffect(() => {
    
    socket.on('playerTurn', (json) => {
      // flip because other player has flipped representation
      setP1Cards(JSON.parse(json).p2Cards)
      setP2Cards(JSON.parse(json).p1Cards)
    });

    socket.on('restart', () => {
      restart();
    });

    socket.on('opponent_joined', () => {
      console.log('OPPONENT JOINED')
      setHasOpponent(true);
      setShare(false);
    });
    
    socket.on('deckID', (deckID) => {
      console.log('GOT SENT A DECK ID', JSON.parse(deckID).deckId)
      setDeckId(JSON.parse(deckID).deckId)
    })
  
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // only on startup 
  )

  // Main Game Loop
  useEffect(() => {
      console.log('ENTERED MAIN GAME LOOP')
      // make sure card lists have been instantiated
      if (p2Cards[0].length > 0){
        calculateAndUpdateScores(inversePlayerMap[turn][1], inversePlayerMap[turn][2])
        // update both grids so that things like card changes get registered
        calculateAndUpdateScores(playerMap[turn][0], playerMap[turn][1])
        if (isGameOver()) {
          console.log('GAME OVER')
        }
      }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps 
    [turn]
  )

  
  useEffect(() => {
    if (deckId && !sentDeck) {
      console.log('SENDING DECKID', deckId)
      socket.emit('setDeck', JSON.stringify({'deckId': deckId, 'room': room}));
      setSentDeck(true)
    }
  }, [deckId, sentDeck])


  useEffect(() => {
    if (paramsRoom) {
      const getDeck = async () => {
        const deck_id = await createDeck(1);
        setDeckId(deck_id)
      }
      // means you are player 2
      if (!deckId) {
        getDeck()
      }
      if (!room) {
        socket.emit('join', paramsRoom);
        setRoom(paramsRoom);
        setTurn('player2');
        console.log('JOINED THE ROOM', paramsRoom)
      }
    } else {
      // means you are player 1
      const newRoomName = random();
      console.log('CREATED THE ROOM:', newRoomName)
      socket.emit('create', newRoomName);
      setRoom(newRoomName);      
    }
  }, [paramsRoom]);
  
  
  return (
    <div className="Game">
      <div id="wait-for-opponent" className={hasOpponent? 'hidden':''}>

      <button className="btn" onClick={() => setShare(!share)}>
        Share
      </button>
        {share ? (
          <>
            <br />
            <br />
            Share link: 
            <br />
            {window.location.href}?room={room}
          </>
        ) : null}
        <br />
        <br />
        <br />
        {hasOpponent ? '' : 'Waiting for opponent...'}
        </div>
        <div className="gameBoard grid grid-cols-3 grid-rows-3 grid-rows-auto bg-indigo-blue p-10 place-items-center text-apple-green">
            <div></div>
            <div className="text-inherit">
              <CardGrid setPlayerCards={setP2Cards} 
                        choosingGridSpot={choosingGridSpot}
                        setChoosingGridSpot={setChoosingGridSpot}
                        opponentsTurn={turn === 'player1'}
                        opponentCardList={p1Cards}
                        setOpponentsCards={setP1Cards}
                        potentialCard={card}
                        setTurn={()=>{
                          setTurn(inversePlayerMap[turn][0]);
                          changeTurn();
                        }}
                        />
              <div className="grid grid-cols-3 place-items-center gap-4 mt-4 text-inherit">
                <div className="text-inherit">{p2Scores[0]}</div>
                <div className="text-inherit">{p2Scores[1]}</div>
                <div className="text-inherit">{p2Scores[2]}</div>
              </div>
              <div className="grid place-items-center">
                Total: {p2Scores[3]}
              </div>
            </div>
            <div></div>
            <div></div>
            <div className="grid grid-cols-2 gap-10">
              {/* add on click to move image? */}
              <button onClick={() =>  {drawCardFromDeck();}}>
                <Card cardData={new CardData({cardImageUrl:CardBack})} />
              </button>
              <button className={"transition outline-none outline-white ease-in-out" + (choosingGridSpot? '':' brightness-50')}>
                  <Card cardData={card} />
              </button>
            </div>
            <div></div>
            <div></div>
            <div className="text-apple-green">
              <div className="grid place-items-center text-inherit">
                Total: {p1Scores[3]}
              </div>
              <div className="grid grid-cols-3 place-items-center gap-4 mb-4 text-inherit">
                <div className="text-inherit">{p1Scores[0]}</div>
                <div className="text-inherit">{p1Scores[1]}</div>
                <div className="text-inherit">{p1Scores[2]}</div>
              </div>
              <CardGrid setPlayerCards={setP1Cards}
                        choosingGridSpot={choosingGridSpot}
                        setChoosingGridSpot={setChoosingGridSpot}
                        opponentsTurn={turn === 'player2'}
                        opponentCardList={p2Cards}
                        setOpponentsCards={setP2Cards} 
                        potentialCard={card}
                        setTurn={()=>{
                          setTurn(inversePlayerMap[turn][0]);
                          changeTurn();
                        }}
                        />
            </div>
            <div></div>
          </div>
      </div>
    )
}

export default Game