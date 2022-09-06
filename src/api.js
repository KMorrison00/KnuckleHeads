import axios from "axios";

const api = axios.create({
    baseURL: 'https://www.deckofcardsapi.com/api/deck/'
})

export const createDeck = async (numDecks) => {
    const response = await api.get(`new/shuffle/`, {
        params: {
            deck_count: numDecks
        }
    })
    console.log(response.data.deck_id)
    return response
}

