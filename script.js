const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const gameOver = document.getElementById('gameOver');

let score = 0;
let isGameOver = false;
let pipePassed = false;

function checkCollision() {
    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    if (
        marioRect.right > pipeRect.left &&
        marioRect.left < pipeRect.right &&
        marioRect.bottom > pipeRect.top
    ) {
        gameOver.style.display = 'block';
        pipe.style.animationPlayState = 'paused';
        document.querySelector('.clouds').style.animationPlayState = 'paused';
        document.querySelector('.Aguia').style.animationPlayState = 'paused';
        mario.style.animationPlayState = 'paused';
    }
}
function restartGame() {
    window.location.reload()
}

const jump = (Event) => {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(()=> {

    console.log('loop')

    const pipePosition = pipe.offsetLeft;
    console.log(pipePosition)
    const marioPosition = parseInt(window.getComputedStyle(mario).bottom.replace('px', ''),10);
    console.log(marioPosition)

if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;
    
    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = 'images/game-over.png';
    mario.style.width = '75px'
    mario.style.marginLeft = '50px'

    clearInterval(loop);
    setInterval(checkCollision, 100);

    }

    if (pipePosition < 0 && !pipePassed) {
        pipePassed = true;
        score++;
        scoreElement.textContent = `Pontuação: ${score}`;
    }


    if (pipePosition >= 120) {
        pipePassed = false;
    }

}, 10);


document.addEventListener('keydown', jump);