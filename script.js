let deckId = ''
const shuffleBtn = document.querySelector('#shuffleBtn')
const drawBtn = document.querySelector('#drawBtn')
const scores = {
  player1: 0,
  player2: 0
}

  
function getDeck() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id
    document.querySelector('#remainingCards').innerHTML = `Remaining Cards: ${data.remaining}`
    drawBtn.disabled = false;
    shuffleBtn.disabled = true;
    document.querySelector('#result').innerHTML = ``
  })
}

function draw2() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.success) {
        document.querySelector('#cardSlot1').innerHTML = `
        <img src=${data.cards[0].image}>`
        document.querySelector('#cardSlot2').innerHTML = `
        <img src=${data.cards[1].image}>
        `
        document.querySelector('#result').innerHTML = getWinner(data.cards[0], data.cards[1])
        document.querySelector('#remainingCards').innerHTML = `Remaining Cards: ${data.remaining}`
      } 
      else {
        drawBtn.disabled = true;
        shuffleBtn.disabled = false;
        document.querySelector('#cardSlot1').innerHTML = ``
        document.querySelector('#cardSlot2').innerHTML = ``
        
        let winner = ''
        if (scores.player1 > scores.player2) {
          winner = 'Player 1'
        } if (scores.player1 < scores.player2) {
          winner = 'Player 2'
        }
        document.querySelector('#result').innerHTML = `${
          scores.player1 === scores.player2 ? 'Tie Game' : winner + ' wins!'
        }`
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
    return 'Card 1 Wins'
  } else if (cardKey[card1.value] < cardKey[card2.value]) {
    scores.player2++
    return 'Card 2 Wins'
  } else return 'War!'
}

shuffleBtn.addEventListener('click', getDeck)
drawBtn.addEventListener('click', draw2)