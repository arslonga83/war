let deckId = ''
  
function getDeck() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
  .then(res => res.json())
  .then(data => deckId = data.deck_id)
}

function draw2() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      console.log(data.cards)
      document.querySelector('#cardSlot1').innerHTML = `
      <img src=${data.cards[0].image}>`
      document.querySelector('#cardSlot2').innerHTML = `
      <img src=${data.cards[1].image}>
      `
      document.querySelector('#result').innerHTML = getWinner(data.cards[0], data.cards[1])
    })
}

function getWinner(card1, card2) {
  const cardKey = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'JACK': 11,
    'QUEEN': 12,
    'KING': 13,
    'ACE': 14
  }
  if (cardKey[card1.value] > cardKey[card2.value]) {
    return 'Computer Wins'
  } else if (cardKey[card1.value] < cardKey[card2.value]) {
    return 'You Win'
  } else return 'War!'
}

document.querySelector('#shuffleBtn').addEventListener('click', getDeck)
document.querySelector('#drawBtn').addEventListener('click', draw2)