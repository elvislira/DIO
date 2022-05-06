const dino = document.querySelector('.dino');
const fundoGame = document.querySelector('.fundo-game');

let posicao = 68;
let isJumping = false;

document.addEventListener('keyup', pressionaTecla);
criarCactus();

function pressionaTecla(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (posicao >= 200) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (posicao <= 68) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    posicao -= 20;
                    dino.style.bottom = posicao + 'px';
                }
            }, 20);
        } else {
            posicao += 20;
            dino.style.bottom = posicao + 'px';
        }
    }, 20);
}

function criarCactus() {
    const cactus = document.createElement('div');
    let posicaoCactus = 1000;
    let tempoAleatorio = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = posicaoCactus + 'px';
    fundoGame.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (posicaoCactus < -60) {
            clearInterval(leftInterval);
            fundoGame.removeChild(cactus);
        } else if (posicaoCactus > 0 && posicaoCactus < 68 && posicao <= 68) {
            clearInterval(leftInterval);
            const principal = document.querySelector('.principal');
            principal.classList.add('painel-game-over');
            principal.innerHTML = '<div id="game-over">Game Over</div>';
        } else {
            posicaoCactus -= 10;
            cactus.style.left = posicaoCactus + 'px';
        }
    }, 20);

    setTimeout(criarCactus, tempoAleatorio);
}