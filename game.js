let game = {

    //depois que eu seleciono a segunda carta em em lockmode eu checo ela pra da tempo de fazer a animação etc
    lockMode: false,
    firstCard: null,
    secondCard: null,

    personagens: [
        'Nami',
        'MarcoOnePiece',
        'Usop',
        'Shanks',
        'Law',
        'Asce',
        'TripulacaoToda',
        'Zoro',
        'Luffy',
        'Irmaos'],

    cards: null,

    setCard: function (id) {
       
        let card = this.cards.filter(card => card.id === id)[0];    
        console.log(card);
        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function () {

        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards(){

        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    //Função que cria as cartas dos personagens.
    createCardsFromCharacters: function () {
    
        this.cards = [];

        //for(let personagem of personagens){
            //cards.push(createPairFromCharacter(personagem)); da pra usar esse modo tmb
        //}           I
                //    I
                //    V  

        this.personagens.forEach(personagem =>{
            this.cards.push(this.createPairFromCharacter(personagem));
        })

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    //Função que cria o par do personagem.
    createPairFromCharacter: function(personagem){
    
        return [{
            id: this.createIdWithPersonagem(personagem),
            icon: personagem,
            flipped: false,
        }, {
            id: this.createIdWithPersonagem(personagem),
            icon: personagem,
            flipped: false,
        }]
    },

    createIdWithPersonagem: function(personagem){
        return personagem + parseInt(Math.random() * 1000);
    },

    //função que embaralha as cartas.
    shuffleCards: function(cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while(currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }
}