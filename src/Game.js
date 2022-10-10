/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { CardGrid } from "./CardGrid";
import { OppCardGrid } from "./OppCardGrid";
import { Card } from "./Card";
import CardBack from "./images/CardBack.png";
import { createDeck, drawCard } from "./Api";
import { ChooseCardModal } from "./ChooseCardModal";
import { CardData, getCardValueFromCode } from "./Constants";
import { Fireworks } from "./Fireworks";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:4000");

const initGrid = () => {
  let initGrid = [[], [], []];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let newCard = new CardData();
      initGrid[i].push(newCard);
    }
  }
  return initGrid;
};

export class GameObj {
  constructor({
    p1Cards = initGrid(),
    p1Scores = [0, 0, 0, 0],
    p2Cards = initGrid(),
    p2Scores = [0, 0, 0, 0],
  } = {}) {
    this.p1Cards = p1Cards;
    this.p1Scores = p1Scores;
    this.p2Cards = p2Cards;
    this.p2Scores = p2Scores;
    this.Cards = [this.p1Cards, this.p2Cards];
    this.Scores = [this.p1Scores, this.p2Scores];
  }
}

const random = () => {
  return Array.from(Array(8), () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");
};

const Game = () => {
  const [turn, setTurn] = useState("player1");
  const [deckId, setDeckId] = useState(null);
  const deckIsCreated = useRef(false);
  // ADD RESHUFFLING OF DECK AT SOME POINT
  const [gameState, setGameState] = useState(new GameObj());
  const [acePlayed, setAcePlayed] = useState(false);
  const [hasOpponent, setHasOpponent] = useState(false);
  const [choosingGridSpot, setChoosingGridSpot] = useState(false);
  const [card, setCardState] = useState(new CardData());
  const [share, setShare] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paramsRoom = params.get("room");
  const [room, setRoom] = useState();

  // draw card and attach to mouse store temporarily
  async function drawCardFromDeck() {
    console.log(deckId);
    let { code, image } = await drawCard({ deckId: deckId }).catch((e) => {
      console.log(e);
    });
    setCardState(new CardData({ cardVal: code, cardImageUrl: image }));
    setChoosingGridSpot(true);
  }

  const restart = () => {
    setGameState(new GameObj());
    setCardState(new CardData());
    setChoosingGridSpot(false);
    setTurn("player1");
  };

  const endTurn = () => {
    setChoosingGridSpot(false);
    setTurn("player2");
    socket.emit(
      "reqTurn",
      JSON.stringify({ gameState: gameState, room: room })
    );
  };

  function calculateAndUpdateScores() {
    let newGameState = { ...gameState };
    let newScores = [];
    for (let cardList of [newGameState.p1Cards, newGameState.p2Cards]) {
      let scores = [0, 0, 0, 0];
      for (let col = 0; col < 3; col++) {
        let colArr = [];
        let valuesArr = [];
        let strValuesArr = [];
        let multiplier = 1;
        let flush = false;
        let straight = false;

        // convert entries into column format
        for (let row = 0; row < 3; row++) {
          // account for columns that arent full
          let valDict = getCardValueFromCode(cardList[row][col].cardVal);
          if (isNaN(valDict.val)) {
            valDict.val = 0;
          }
          colArr.push(valDict);
          valuesArr.push(valDict.val);
          strValuesArr.push(valDict.strVal);
        }
        // check for 2's
        for (let i = 0; i < 3; i++) {
          multiplier *= valuesArr[i] === 2 ? 2 : 1;
        }
        // if any entries aren't populated skip checking flush/straights
        if (!valuesArr.includes(NaN)) {
          // if all entries in col make a flush then x 2
          let FSMultiplier = 1;
          if (
            colArr[0].suit === colArr[1].suit &&
            colArr[1].suit === colArr[2].suit
          ) {
            FSMultiplier *= 2;
            flush = true;
          }
          // if all entries in col make a flush then x 2
          if (isStraight(colArr)) {
            FSMultiplier *= 2;
            straight = true;
          }
          // straight flush gives 6x multiplier
          FSMultiplier = flush && straight ? 6 : FSMultiplier;

          // calculate score and exit iteration
          // you cant have doubles or triples if you have a straight or flush
          if (flush || straight) {
            scores[col] =
              (valuesArr[0] + valuesArr[1] + valuesArr[2]) *
              multiplier *
              FSMultiplier;
            continue;
          }
        }

        // now calculate pure numerical value
        if (strValuesArr[0] === strValuesArr[1]) {
          // triples detected
          if (strValuesArr[1] === strValuesArr[2]) {
            // face card triples are worth more (4x)
            // otherwise just x3, but make sure to account for 2's
            // make sure to sum the value as 3x first
            scores[col] = isFaceCard(strValuesArr[0])
              ? 5 * (3 * valuesArr[0])
              : 3 * (3 * valuesArr[0]) * multiplier;
            continue;
          }
          // check for face card doubles
          let faceMultiplier = isFaceCard(strValuesArr[0]) ? 3 : 2;
          scores[col] =
            (2 * valuesArr[0] * faceMultiplier + valuesArr[2]) * multiplier;
        } else if (strValuesArr[0] === strValuesArr[2]) {
          let faceMultiplier = isFaceCard(strValuesArr[2]) ? 3 : 2;
          scores[col] =
            (2 * valuesArr[2] * faceMultiplier + valuesArr[1]) * multiplier;
        } else if (strValuesArr[1] === strValuesArr[2]) {
          let faceMultiplier = isFaceCard(strValuesArr[1]) ? 3 : 2;
          scores[col] =
            (2 * valuesArr[1] * faceMultiplier + valuesArr[0]) * multiplier;
        } else {
          scores[col] =
            (valuesArr[0] + valuesArr[1] + valuesArr[2]) * multiplier;
        }
      }
      scores[3] = scores[0] + scores[1] + scores[2];
      newScores.push(scores);
    }

    newGameState.p1Scores = newScores[0];
    newGameState.p2Scores = newScores[1];
    setGameState(new GameObj({ ...newGameState }));
  }

  function isFaceCard(str) {
    if (str === "J" || str === "Q" || str === "K") {
      return true;
    }
    return false;
  }

  function isStraight(col) {
    let strVals = [];
    let numVals = [];
    for (let i = 0; i < 3; i++) {
      strVals.push(col[i].strVal);
      numVals.push(col[i].val);
    }
    // this covers all the face card straight possibilities
    if (strVals.includes("J")) {
      if (strVals.includes("Q")) {
        if (strVals.includes("K") || numVals.includes(10)) {
          return true;
        }
      } else if (numVals.includes(10)) {
        if (numVals.includes(9)) {
          return true;
        }
      }
    }
    // now calculate the pure num possibilities
    if (
      (numVals.includes(numVals[0] + 1) && numVals.includes(numVals[0] + 2)) ||
      (numVals.includes(numVals[0] - 1) && numVals.includes(numVals[0] - 2)) ||
      (numVals.includes(numVals[0] - 1) && numVals.includes(numVals[0] + 1))
    ) {
      return true;
    }
    return false;
  }

  function isGameOver() {
    for (let cardList of gameState.Cards) {
      let cardCount = 0;
      cardList.forEach((col) => {
        col.forEach((card) => {
          if (card.cardVal !== "") {
            cardCount += 1;
          }
        });
      });
      if (cardCount === 9) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    calculateAndUpdateScores();
  }, [gameState.p1Cards, gameState.p2Cards]);

  // STARTUP CODE
  useEffect(
    () => {
      socket.on("playerTurn", (json) => {
        // flip because other player has flipped representation of the game
        let newGameState = new GameObj(JSON.parse(json).gameState);
        let tmp1 = newGameState.p1Cards.slice();
        newGameState.p1Cards = newGameState.p2Cards.slice();
        newGameState.p2Cards = tmp1;
        let tmp2 = newGameState.p1Scores.slice();
        newGameState.p1Scores = newGameState.p2Scores.slice();
        newGameState.p2Scores = tmp2;
        setGameState(newGameState);
        setTurn("player1");
      });

      socket.on("restart", () => {
        restart();
      });

      socket.on("opponent_joined", () => {
        setHasOpponent(true);
        setShare(false);
      });

      socket.on("deckID", (deckID) => {
        setDeckId(JSON.parse(deckID).deckId);
        deckIsCreated.current = true;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // only on startup
  );

  // Main Game Loop
  useEffect(
    () => {
      // check if game is over
      if (isGameOver()) {
        setChoosingGridSpot(false);
        setTurn("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turn]
  );

  useEffect(() => {
    if (deckId && !deckIsCreated.current) {
      console.log("SENDING DECKID", deckId);
      socket.emit("setDeck", JSON.stringify({ deckId: deckId, room: room }));
      deckIsCreated.current = true;
    }
  }, [deckId]);

  useEffect(() => {
    if (paramsRoom) {
      const getDeck = async () => {
        const deck_id = await createDeck(1);
        setDeckId(deck_id);
      };
      // means you are player 2
      if (!deckId) {
        getDeck();
      }
      if (!room) {
        socket.emit("join", paramsRoom);
        setRoom(paramsRoom);
        setTurn("player2");
        console.log("JOINED THE ROOM", paramsRoom);
      }
    } else {
      // means you are player 1
      const newRoomName = random();
      console.log("CREATED THE ROOM:", newRoomName);
      socket.emit("create", newRoomName);
      setRoom(newRoomName);
    }
  }, [paramsRoom]);

  return (
    <div className="Game bg-indigo-blue text-apple-green">
      <div
        id="waiting"
        className={
          "flex flex-col justify-around place-items-center w-screen h-screen " +
          (hasOpponent ? " hidden" : "")
        }
      >
        <div className=" text-center">
          <h1 className="text-3xl">Knuckle Heads</h1>
          <h2 className='text-lg'> (Logo Pending)</h2>
        </div>
        <div className="text-center text-xl mb-2">
          <div >
            <button
              className={"" + (share ? " hidden" : "")}
              onClick={() => setShare(!share)}
              >
              Create Game
            </button>
            {share ? (
              <>
                <br />
                Send This Link To a Friend!:
                <br />
                <br />
                {window.location.href}?room={room}
              </>
            ) : null}
            <br />
            <br />
            <button
              className={"" + (share ? "" : " hidden")}
              onClick={() => setShare(!share)}
              >
              Back
            </button>
          </div>
          <div className="mt-2">
            <button>
              Rules
              {/* rules modal? */}
            </button>
          </div>
        </div>
      </div>
      <div className={"z-0" + (isGameOver() ? "" : " hidden")}>
        <Fireworks />
      </div>
      <div
        className={
          "gameBoard grid grid-cols-2 grid-rows-2 grid-rows-auto p-10 place-items-center text-inherit" +
          (hasOpponent ? " " : " hidden")
        }
      >
        <div className="text-inherit z-10">
          <OppCardGrid
            opponentsTurn={turn === "player1"}
            gameState={gameState}
          />
          <div className="grid grid-cols-3 place-items-center gap-4 mt-4 text-inherit z-10">
            <div>{gameState.p2Scores[0]}</div>
            <div>{gameState.p2Scores[1]}</div>
            <div>{gameState.p2Scores[2]}</div>
          </div>
          <div className="grid place-items-center z-10">
            Total: {gameState.p2Scores[3]}
          </div>
        
          {/* Game finished stats and buttons */}
          <br />
          <div className={"text-inherit text-xl " + (isGameOver() ? "z-10" : "hidden") }>
            <div className="grid grid-cols-3 place-items-center">
              <button
                className={"p-1 rounded-sm outline-none outline-white bg-indigo-blue" + (isGameOver() ? "" : " hidden")}
                onClick={() => {
                  setRoom(null);
                  window.location.reload(true);
                }}
              >
                Home
              </button>
              {gameState.p2Scores[3] > gameState.p1Scores[3]
                ? "P2 Wins!"
                : "P1 Wins!"}
              <button
                className={"p-1 rounded outline-none outline-white bg-indigo-blue" + (isGameOver() ? "" : " hidden")}
                onClick={() => {
                  socket.emit("reqRestart", room);
                }}
              >
                Play Again?
              </button>
            </div>
          </div>
        </div>
        {/* needs elevated z-level once the game over animation starts, but not during game due to modal conflicts*/}
        <div className={"text-inherit " + (isGameOver() ? "z-10" : "") }>
          <div className="z-10">
            <div className="grid place-items-center text-inherit">
              Total: {gameState.p1Scores[3]}
            </div>
            <div className="grid grid-cols-3 place-items-center gap-4 mb-4 text-inherit">
              <div>{gameState.p1Scores[0]}</div>
              <div>{gameState.p1Scores[1]}</div>
              <div>{gameState.p1Scores[2]}</div>
            </div>
          </div>
          <ChooseCardModal
            aceColumn={acePlayed}
            gameState={gameState}
            setGameState={setGameState}
            setAcePlayed={setAcePlayed}
            endTurn={endTurn}
          />
          <CardGrid
            gameState={gameState}
            setGameState={setGameState}
            choosingGridSpot={choosingGridSpot}
            potentialCard={card}
            opponentsTurn={turn === "player2"}
            setAcePlayed={setAcePlayed}
            endTurn={endTurn}
          />
        </div>
        <div className="z-10 row-span-2 row-start-1">
        <div className="z-10">
          
          <div className="grid grid-rows-2 gap-10">
            <button
              onClick={() => {
                drawCardFromDeck();
              }}
            >
              <Card cardData={new CardData({ cardImageUrl: CardBack })} />
            </button>
            <button
              className={
                "transition outline-none outline-white ease-in-out" +
                (choosingGridSpot ? "" : " brightness-50")
              }
            >
              <Card cardData={card} />
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
