
if(document.readyState === "loading"){
    document.addEventListener('DOMContentLoader');
}else {
    (ready);
}


class AudioController {
    constructor(){
        // created background music
        this.bgMusic = new Audio('/workspace/Mad-matchmaking-Game/assets/Audio/jungle.mp3');
        this.bgMusic.volume = 0.8;
        // This is what loops the background music
        this.bgMusic.loop = true;
    }
    startMusic(){
        this.bgMusic.play();
    }
}

function ready(){
    let overlays = Array.from(document.getElementsByClassName('game-overlay'));
    let cards = Array.from(document.getElementsByClassName('card'));
// start game overlay
    overlays.forEach (overlay =>  {
        overlay.addEventListener('click', () =>{
            overlay.classList.remove('visible');

            let audioController = new AudioController();
            audioController.startMusic();
        });
    });
    cards.forEach(card =>{
        card.addEventListener('click', () => {
            // Turning cards 
        });
    });
    console.log('working');
}

