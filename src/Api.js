import axios from "axios";
import CardBack from './images/CardBack.png'
import  {importAll} from './Utils'

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/deck/",
});

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

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
    
    const { code } = data.cards[0];
    const image = images[`${code}.png`]
    
    console.log(code)
    return { code, image };
  }
  const code = ''
  const image = CardBack
  return {code, image}
};
