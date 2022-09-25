import NullCard from './images/NullCard.png'

export class CardData {
    constructor({cardVal='', cardImageUrl=NullCard} = {}) {
      this.cardImageUrl = cardImageUrl;
      this.cardVal = cardVal;
    }
}
export const CARDVALUES = [
    'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS',
    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '0D', 'JD', 'QD', 'KD',
    'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '0C', 'JC', 'QC', 'KC',
    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH'
]

export function getCardValueFromCode(code) {
    let val = code.slice(0, 1);
    let suit = code.slice(-1);
    if (val === 'J' || val === 'Q' || val === 'K' || val === '0' || val === 'A') {
        if (val === '0') {
            return {'val': 10, 'suit':suit, 'strVal' : val}
        } else if (val === 'A') {
            return {'val': 1, 'suit':suit, 'strVal' : val}
        }
        return {'val':5, 'suit':suit, 'strVal' : val}
    }
    return {'val':parseInt(val), 'suit': suit, 'strVal': val}
}
  