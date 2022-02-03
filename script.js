const front = "card-front";
const back = "card-back";
const CARD = "card"
const FLIP = "flip"
const ICON = "icon" 

startGame();

function startGame(){
    iniciarCartas(game.criarCartas());
}

function iniciarCartas(){
    let gameArea = document.getElementById("game-area")
     gameArea.innerHTML = '';
    game.cards.forEach(card =>{
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        criarCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameArea.appendChild(cardElement);
    }) 
}

function criarCardContent(card, cardElement){
    criarCardFace(front, card, cardElement);
    criarCardFace(back, card, cardElement);
}

function criarCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === front){
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON);
        iconElement.src = "./images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = "";
    }
    element.appendChild(cardElementFace);
}

function flipCard(){
    if (game.setCard(this.id)){
    this.classList.add(FLIP);
    if(game.segundaCard){
    if (game.checkMatch()){
        game.clearCards();
        if (game.checkGameOver()) {
            let gameOverLayer = document.getElementById("game-over");
            gameOverLayer.style.display = 'flex';
        };
    }else{
        setTimeout(() => {
        let primeiraCardView = document.getElementById(game.primeiraCard.id);
        let segundaCardView = document.getElementById(game.segundaCard.id);

        primeiraCardView.classList.remove("flip");
        segundaCardView.classList.remove("flip");
        game.unflipCards()
    }, 1000)
    };
    };
};
function restart(game) {
    game.clearCards();
    
    startGame()
    let gameOverLayer = document.getElementById("game-over");
    gameOverLayer.style.display = 'none';
}
};
