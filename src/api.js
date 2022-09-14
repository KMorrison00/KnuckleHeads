import axios from "axios";

const api = axios.create({
  baseURL: "https://www.deckofcardsapi.com/api/deck/",
});

export const createDeck = async (numDecks) => {
  console.log('MADE A DECK API CALL TO MAKE A DECK')
  const response = await api.get(`new/shuffle/`, {
    params: {
      deck_count: numDecks,
    },
  });
  return await response.data.deck_id;
};

export const drawCard = async ({ deckId }) => {
  console.log("InsideDrawCardApi", deckId)
  const { data } = await api.get(`${deckId}/draw`, {
    params: {
      count: 1,
    },
  });

  const { code, image } = data.cards[0];
  return { code, image };
};
