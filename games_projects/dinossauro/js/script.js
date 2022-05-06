const dino = document.querySelector('.dino');
const fundoGame = document.querySelector('.fundo-game');

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
    let posicao = 68;
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
        } else {
            posicaoCactus -= 10;
            cactus.style.left = posicaoCactus + 'px';
        }
    }, 20);

    setTimeout(criarCactus, tempoAleatorio);
}