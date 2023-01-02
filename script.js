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
      document.querySelector('#img-container').innerHTML = `
      <img src=${data.cards[0].image}>
      <img src=${data.cards[1].image}>
      `
    })
}

document.querySelector('#shuffleBtn').addEventListener('click', getDeck)
document.querySelector('#drawBtn').addEventListener('click', draw2)