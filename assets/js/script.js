
class AudioController {
    constructor(){
        // created background music
        this.bgMusic = new Audio('assets/Audio/jungle.mp3');
        this.bgMusic.volume = 0.2;
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

function ready() {

    console.log("FUNCTION READY IS TRIGGERED")
    
    let overlays = Array.from(document.getElementsByClassName('game-overlay'));
    let cards = Array.from(document.getElementsByClassName('card'));
// start game overlay
    overlays.forEach (overlay =>  {
        overlay.addEventListener('click', () => {
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
ready();
