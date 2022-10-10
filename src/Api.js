import axios from "axios";
import CardBack from './images/CardBack.png'

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/deck/",
});

export const createDeck = async (numDecks) => {
  const response = await api.get(`new/shuffle/`, {
    params: {
      deck_count: numDecks,
    },
  });
  return await response.data.deck_id;
};

export const drawCard = async ({ deckId }) => {
  if (deckId != null) {
    const { data } = await api.get(`${deckId}/draw`, {
      params: {
        count: 1,
      },
    });
    
    const { code, image } = data.cards[0];
    console.log(code)
    return { code, image };
  }
  const code = ''
  const image = CardBack
  return {code, image}
};
