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
    return response.data
}

export const drawCard = async (deckId) => {
    const response = await api.get(`${deckId}draw`, {
        params: {
            count: 1
        }
    })
    return response.data
}