let game = {
    tecnologias: ['bootstrap','css','electron','firebase','html','javascript','jquery','mongo','node','react'],
    cards: null,
    lockMode: false,
    primeiraCard: null,
    segundaCard: null,
    
setCard: function(id){
        let card = this.cards.filter(card=>card.id===id) [0];
        console.log(card);
        if(card.flipped || this.lockMode ) {
            return false;
        };
        if(!this.primeiraCard){
            this.primeiraCard = card;
            this.primeiraCard.flipped = true;
            return true
        }else{
            this.segundaCard = card;
            this.lockMode = true;
            this.segundaCard.flipped = true;
            return true;
     }
},
checkMatch: function(){
    if(!this.primeiraCard || !this.segundaCard ) {
        return false;
    }
    return this.primeiraCard.icon === this.segundaCard.icon;
},

clearCards: function(){        
        this.primeiraCard = null;
        this.segundaCard = null;
        this.lockMode = false;
},

unflipCards: function(){
    this.primeiraCard.flipped = false;
    this.segundaCard.flipped = false;
    this.clearCards();
},
  

criarCartas: function () {
        this.cards = [];

            this.tecnologias.forEach((tecnologia) => {
                this.cards.push(this.criarPar(tecnologia));
            })
                this.cards = this.cards.flatMap(par => par);
                this.embaralharCartas();
        return this.cards;    
},
     
    criarPar: function(tecnologia) {
    
        return [{
            id: this.criarId(tecnologia),
            icon: tecnologia,
            flip: false
        },{
            id: this.criarId(tecnologia),
            icon: tecnologia,
            flip: false
        }]
    },
    
    criarId: function (tecnologias){
        return tecnologias + parseInt(Math.random()*1000)
    },

     embaralharCartas: function (cards) {
         let currentIndex = this.cards.length;
         let randomIndex = 0;

         while (currentIndex !== 0) {

             randomIndex = Math.floor(Math.random() * currentIndex);
             currentIndex--;
             [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
         };
     },

    checkGameOver: function(){

        return this.cards.filter(card => !card.flipped).length == 0;
}

};