import axios from "axios";

const api = axios.create({
  baseURL: "https://www.deckofcardsapi.com/api/deck/",
});

export const createDeck = async (numDecks) => {
  const response = await api.get(`new/shuffle/`, {
    params: {
      deck_count: numDecks,
    },
  });
  return response.data.deck_id;
};

export const drawCard = async ({ deckId }) => {
  const { data } = await api.get(`${deckId}draw`, {
    params: {
      count: 1,
    },
  });

  const { value, image } = data.cards[0];
  return { deck_id: deckId, value, image };
};
