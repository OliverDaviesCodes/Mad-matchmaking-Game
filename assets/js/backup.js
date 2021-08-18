function popUp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

class AudioController {
    constructor() {
        // created background music
        this.bgMusic = new Audio('assets/Audio/jungle.mp3');
        this.bgMusic.volume = 0.05;
        // This is what loops the background music
        this.bgMusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
}

const cards = [{
        name: 'hippo',
        alt: 'this is an image of a hippo'
    },
    {
        name: 'lion',
        alt: 'this is an image of a lion'
    },
    {
        name: 'tortoise',
        alt: 'this is an image of a tortoise'
    },
    {
        name: 'Elephant',
        alt: 'this is an image of a elephant'
    },
    {
        name: 'giraffe',
        alt: 'this is an image of a giraffe'
    },
    {
        name: 'monkey',
        alt: 'this is an image of a monkey'
    },
    {
        name: 'panda',
        alt: 'this is an image of a panda'
    },
    {
        name: 'penguin',
        alt: 'this is an image of a penguin'
    },
    {
        name: 'squirrel',
        alt: 'this is an image of a squirrel'
    },
    {
        name: 'zebra',
        alt: 'this is an image of a zebra'
    },
    {
        name: 'dolphin',
        alt: 'this is an image of a dolphin'
    },
    {
        name: 'goat',
        alt: 'this is an image of a goat'
    },
]; // length = 12 unique cards

// easy = 6 unique cards
// hard = 10 unique cards
let cardsDiv = document.getElementsByClassName('card-div');

let randomizer = (n) => {

    let cardsCopy = [...cards];
    let arr = [];
    for (let i = 0; i < n; i++) {
        let randomCards = Math.floor(Math.random() * cardsCopy.length);
        arr.push(cardsCopy[randomCards]);
        cardsCopy.splice(randomCards, 1)
    }

    return arr;
    // randomly select n number of cards from cardsList;
};

let renderCards = () => {
    let difficulty = cardsDiv[0].getAttribute("data-difficulty");
    console.log(difficulty);
    let numCards = difficulty === "advanced" ? 10 : 6;
    let selectedCards = randomizer(numCards);
    let innerHtml = '';

    console.log(selectedCards)

    selectedCards.forEach(({
        name,
        alt
    }) => {
        innerHtml += `<div class="card visible">
        <div class="backface card-face">
            <img src="assets/images/${name}.png" alt="${alt}" class="animals">
        </div>
        <div class="frontface card-face">
            <img src="assets/images/logo.png" alt="mad-matchmaking logo" class="logo">
        </div>
      </div>`;
    })

    innerHtml += innerHtml;

    cardsDiv[0].innerHTML = innerHtml
};

renderCards();




class matchmaking {
    constructor(totalTime, cards) {
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

        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerHTML = this.timeRemaining;
        this.ticker.innerHTML = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.add('visible');
            card.classList.remove('matched');
        });
    }
    // Flipping Cards
    turnCard(card) {
        if (this.canTurnCard(card)) {
            this.totalClicks++;
            this.ticker.innerHTML = this.totalClicks;
            card.classList.remove('visible');

            if (this.cardToCheck)
                this.checkForMatch(card);
            else
                this.cardToCheck = card;
        }
    }

    checkForMatch(card) {
        if (this.cardType(card) === this.cardType(this.cardToCheck))
            // if matched

            this.matched(card, this.cardToCheck);
        else
            this.misMatched(card, this.cardToCheck);

        this.cardToCheck = null;
    }

    matched(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if (this.matchedCards.length === this.cardsArray.length)
            this.victory();

    }

    misMatched(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.add('visible');
            card2.classList.add('visible');
            this.busy = false;
        }, 1000);
    }


    cardType(card) { //maybe an issue at the index value
        return card.getElementsByClassName('animals')[0].src;
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerHTML = this.timeRemaining;
            if (this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

    gameOver() {
        clearInterval(this.countDown);
        document.getElementById('gameover').classList.add('visible');

    }

    victory() {
        clearInterval(this.countDown);
        document.getElementById('win').classList.add('visible');
        this.hideCards();
    }

    // shuffling cards
    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randomCard = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randomCard].style.order = i;
            this.cardsArray[i].style.order = randomCard;
        }
    }

    canTurnCard(card) {
        return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck)
    }
}

function ready() {

    let overlays = Array.from(document.getElementsByClassName('game-overlay'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new matchmaking(50, cards);
    // start game overlay
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();


            let audioController = new AudioController();
            audioController.startMusic();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Turning cards 
            game.turnCard(card);
        });
    });


}
ready();