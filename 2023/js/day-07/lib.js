import { countItems } from '../utils.js';

const cardScores = 'AKQJT98765432';
const jokerScores = 'AKQT98765432J';

/**
 * @param {string[]} cards
 * @param {boolean} countJoker
 * @returns {number}
 * @example score(['3', '2', 'T', '3', 'K'])
 * //=> 5
 * @example score(['3', '2', 'T', '3', 'J'], true)
 * //=> 3
 * @example score(['J', 'J', 'J', '3', 'J'], true)
 * //=> 0
 */
export function score(cards, countJoker) {
  const hand = countItems(cards);

  const [max, next = 0] = Object.values(hand).sort((a, b) => b - a);
  const joker = countJoker ? hand.J ?? 0 : 0;

  switch ((max === joker ? next : max) + joker) {
    case 5:
      return 0;
    case 4:
      return 1;
    case 3:
      return next === 2 ? 2 : 3;
    case 2:
      return next === 2 ? 4 : 5;
    default:
      return 6;
  }
}

/**
 * @param {string} handA
 * @param {string} handB
 * @param {boolean=} joker
 * @returns (-1|0|1)
 * @example rankHands('32T3K', 'T55J5')
 * //=> -1
 * @example rankHands('KTJJT', 'QQQJA', true)
 * //=> 1
 * @example rankHands('KTJJT', 'KTJJT')
 * //=> 0
 */
export function rankHands(handA, handB, joker = false) {
  if (handA === handB) return 0;

  const cardsA = handA.split('');
  const cardsB = handB.split('');

  const handAScore = score(cardsA, joker);
  const handBScore = score(cardsB, joker);

  if (handAScore < handBScore) return 1;
  else if (handAScore > handBScore) return -1;

  for (const [index, card] of cardsA.entries()) {
    const cardAScore = (joker ? jokerScores : cardScores).indexOf(card);
    const cardBScore = (joker ? jokerScores : cardScores).indexOf(
      cardsB[index]
    );
    if (cardAScore < cardBScore) return 1;
    if (cardAScore > cardBScore) return -1;
  }

  return 0;
}
