const shuffleBtn = document.querySelector('#shuffleBtn')
const drawBtn = document.querySelector('#drawBtn')
const result = document.querySelector('#result')
const cardSlot1 = document.querySelector('#cardSlot1')
const cardSlot2 = document.querySelector('#cardSlot2')
const score1 = document.querySelector('#score1')
const score2 = document.querySelector('#score2')
const remainingCards = document.querySelector('#remainingCards')

let deckId = ''
const scores = {
  player1: 0,
  player2: 0
}

function getDeck() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id
    remainingCards.innerHTML = `Remaining Cards: ${data.remaining}`
    drawBtn.disabled = false;
    shuffleBtn.disabled = true;
    result.innerHTML = ``
    cardSlot1.innerHTML = ``
    cardSlot2.innerHTML = ``
    score1.textContent = `Player 1 - 0 wins`
    score2.textContent = `Player 2 - 0 wins`
  })
}

function draw2() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        cardSlot1.innerHTML = `
        <img src=${data.cards[0].image}>`
        cardSlot2.innerHTML = `
        <img src=${data.cards[1].image}>
        `
        result.innerHTML = getWinner(data.cards[0], data.cards[1])
        remainingCards.textContent = `Remaining Cards: ${data.remaining}`
        score1.textContent = `Player 1 - ${scores.player1} wins`
        score2.textContent = `Player 2 - ${scores.player2} wins`
       
      if (data.remaining === 0) {
        drawBtn.disabled = true;
        shuffleBtn.disabled = false;
        getFinalResult()
      }
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
    scores.player1++
    return `${card1.value} Wins`
  } else if (cardKey[card1.value] < cardKey[card2.value]) {
    scores.player2++
    return `${card2.value} Wins`
  } else return 'War!'
}

function getFinalResult() {
  let winner = ''
        if (scores.player1 > scores.player2) {
          winner = 'Player 1'
        } if (scores.player1 < scores.player2) {
          winner = 'Player 2'
        }
        result.innerHTML = `${
          scores.player1 === scores.player2 ? 'Tie Game' : winner + ' wins!'
        }`
}

shuffleBtn.addEventListener('click', getDeck)
drawBtn.addEventListener('click', draw2)