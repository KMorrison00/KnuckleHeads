import axios from "axios";
import CardBack from './images/CardBack.png'
import  {importAll} from './Utils'

const api = axios.create({
  baseURL: 'https://deckofcards-api.fly.dev/api/deck/',
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
  if (deckId) {
    const { data } = await api.get(`${deckId}/draw`, {
      params: {
        count: 1,
      },
    });
    
    const { code } = data.cards[0];
    const {remaining} = data.remaining
    const image = images[`${code}.png`]
    
    return { code, image, remaining };
  }
  const code = ''
  const image = CardBack
  return {code, image}
};

export const shuffleDeck = async ({deckId}) => {
  if (deckId) {
    await api.get(`${deckId}/shuffle/`);
  }
}
