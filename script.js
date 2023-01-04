let deckId = ''
const shuffleBtn = document.querySelector('#shuffleBtn')
const drawBtn = document.querySelector('#drawBtn')

  
function getDeck() {
  fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
  .then(res => res.json())
  .then(data => {
    deckId = data.deck_id
    document.querySelector('#remainingCards').innerHTML = `Remaining Cards: ${data.remaining}`
    drawBtn.disabled = false;
    drawBtn.classList.remove('btnDisabled')
    shuffleBtn.disabled = true;
    shuffleBtn.classList.add('btnDisabled')
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
        drawBtn.classList.add('btnDisabled')
        shuffleBtn.disabled = false;
        shuffleBtn.classList.remove('btnDisabled')
        document.querySelector('#cardSlot1').innerHTML = ``
        document.querySelector('#cardSlot2').innerHTML = ``
        document.querySelector('#result').innerHTML = `The winner is ____`
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
    return 'Card 1 Wins'
  } else if (cardKey[card1.value] < cardKey[card2.value]) {
    return 'Card 2 Wins'
  } else return 'War!'
}

shuffleBtn.addEventListener('click', getDeck)
drawBtn.addEventListener('click', draw2)