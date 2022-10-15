import React from "react";
import { importAll } from "./Utils";


const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

export function RulesModal({setShowModal, showModal}) {
  return (<>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
             >
            <div className="relative w-auto my-6 mx-auto max-w-6xl" style={{maxHeight: '50vh'}}>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg modal-header relative flex overflow-y-auto flex-col w-full bg-indigo-blue outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Rules
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-inherit float-right text-3xl leading-none font-semibold outline-none focus:outline-none z-60"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-inherit h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                    <div className="flex flex-col items-center  rounded-lg border shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800">
                        <img src={images['CardBack.png']} className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">General Gameplay</h5>
                            <p className="mb-3 font-normal text-left text-gray-300 ">
                                Your objective is to have the highest point score by the end of the game.
                                The game ends when one player fills their entire 3x3 grid, then total scores are compared
                                Each card has its displayed point value except for face cards which are worth 5.
                                Scores are calculated first by summing the column of a grid and then applying multipliers.

                                When a card is played, if the opponent has a card or multiple cards of the same value in the
                                opposing column it will be removed. Cards that are removed do not get reshuffled into the deck
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative p-6 flex-auto">
                    <div className="flex flex-col items-center rounded-lg border shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800">
                        <div className="flex flex-col justify-center p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Multipliers</h5>
                        </div>
                    </div>
                </div>

                <div className="relative p-6 flex-auto ">
                    <div className="flex flex-col items-center  rounded-lg border shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800">
                        <img src={images['4H.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <img src={images['5S.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <img src={images['6C.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Straights</h5>
                            <p className="mb-3 font-normal text-left text-gray-300">
                                Straights apply an extra 2x multiplier
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative p-6 flex-auto ">
                    <div className="flex flex-col items-center  rounded-lg border shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800">
                        <img src={images['0C.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <img src={images['KC.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <img src={images['3C.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Flushes</h5>
                            <p className="mb-3 font-normal text-left text-gray-300">
                                Flushes apply an extra 2x multiplier
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative p-6 flex-auto ">
                    <div className="flex flex-col items-center  rounded-lg border shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800">
                        <img src={images['7C.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <img src={images['8C.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <img src={images['9C.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Straight Flushes</h5>
                            <p className="mb-3 font-normal text-left text-gray-300">
                                Striaght Flushes apply a 6x multiplier
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative p-6 flex-auto ">
                    <div className="flex flex-col items-center  rounded-lg border shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800">
                        <img src={images['8H.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <img src={images['8C.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <img src={images['8S.png']} className="object-cover w-1/2 h-48 rounded-t-lg md:h-auto md:w-24 md:rounded-none md:rounded-l-lg" alt="Card Back" />                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Doubles and Triples</h5>
                            <p className="mb-3 font-normal text-left text-gray-300">
                                Doubles and triples grant multipliers only to the cards that match.
                                Two 8's are worth (8 + 8) * 2 = 32. If another single card is in the column
                                its value will just be added on top for. if it were a 9 it would just 32 + 9. 
                                Triples just multiply 3x the summed column value 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative p-6 flex-auto">
                    <div className="flex flex-col items-center  rounded-lg border shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800">
                        <div className="flex flex-col justify-center p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Special Cards</h5>
                        </div>
                    </div>
                </div>
                <div className="relative p-6 flex-auto ">
                    <div className="flex flex-col items-center  rounded-lg border shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800">
                        <img src={images['AS.png']} className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Aces</h5>
                            <p className="mb-3 font-normal text-left text-gray-300">
                                Aces can remove any value in the corresponding opponents column.
                                They are still only worth 1.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative p-6 flex-auto ">
                    <div className="flex flex-col items-center  rounded-lg border shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800">
                        <img src={images['2S.png']} className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Twos</h5>
                            <p className="mb-3 font-normal text-left text-gray-300">
                                Twos apply 2x multiplier to the column its in. This multiplier is bonus
                                to the other multipliers like pairs, triples, straights and flushes.
                                They have a base value of 2. 
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative p-6 flex-auto ">
                    <div className="flex flex-col items-center  rounded-lg border shadow-md md:flex-row md:max-w-xl border-gray-700 bg-gray-800">
                        <img src={images['KS.png']} className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" alt="Card Back" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Face Cards</h5>
                            <p className="mb-3 font-normal text-left text-gray-300">
                                While only worth 5 all face cards have higher multipliers than regular cards 
                                for pairs and triples. It is 3x for pairs instead of 2x and 5x for triples instead of 3x
                            </p>
                        </div>
                    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-inherit background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}