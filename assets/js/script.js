
class AudioController {
    constructor(){
        // created background music
        this.bgMusic = new Audio('assets/Audio/jungle.mp3');
        this.bgMusic.volume = 0.05;
        // This is what loops the background music
        this.bgMusic.loop = true;
    }
    startMusic(){
        this.bgMusic.play();
    }
    stopMusic(){
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
}

class matchmaking {
    constructor(totalTime, cards){
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;

        setTimeout(()=> {
            this.audioController.startMusic();
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        },500);
        this.hideCards();
        this.timer.innerHTML = this.timeRemaining;
        this.ticker.innerHTML = this.totalClicks;
    }
    hideCards(){
        this.cardsArray.forEach(card => {
            card.classList.add('visible');
            card.classList.add('matched');
        });
    }
// Flipping Cards
    turnCard(card){
        if(this.canTurnCard(card)) {
            this.totalClicks++;
            this.ticker.innerHTML = this.totalClicks;
            card.classList.remove('visible');

            if(this.cardToCheck)
                this.checkForMatch(card);
            else
                this.cardToCheck = card;
        }
    }
    checkForMatch(card){
        if(this.cardType(card) === this.cardType(this.cardToCheck))
            // if matched
            this.matched(card, this.cardToCheck);
        else
            this.misMatch(card, this.cardToCheck);
    
    }
    matched(card1, card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray) 
            this.victory();

    }
    misMatched(card){

    }


    cardType(){//maybe an issue at the index value
        return card.getElementsByClassName('animals')[0].src;
    }

    startCountDown(){
        return setInterval(()=> {
            this.timeRemaining--;
            this.timer.innerHTML = this.timeRemaining;
            if(this.timeRemaining === 0)
            this.gameOver();
        }, 1000);
    }

    gameOver(){
        clearInterval(this.countDown);
        document.getElementById('gameover').classList.add('visible');

    }
    victory(){
        clearInterval(this.countDown);
        document.getElementById('win').classList.add('visible');
    }
// shuffling cards
    shuffleCards() {
        for( let i = this.cardsArray.length -1 ; i > 0; i--) {
            let randomCard = Math.floor(Math.random()*(i+1));
            this.cardsArray[randomCard].style.order = i;
            this.cardsArray[i].style.order = randomCard;
        }
    }

    canTurnCard(card) {
        return true;
      // return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck)
    }
}

function ready() {
    
    let overlays = Array.from(document.getElementsByClassName('game-overlay'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new matchmaking(75, cards);
    // start game overlay
    overlays.forEach (overlay =>  {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();


            let audioController = new AudioController();
            audioController.startMusic();
        });
    });
    cards.forEach(card =>{
        card.addEventListener('click', () => {
            // Turning cards 
            game.turnCard(card);
        });
    });
}
ready();
