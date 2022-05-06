const dino = document.querySelector('.dino');

document.addEventListener('keyup', pressionaTecla);

function pressionaTecla(event) {
    if (event.keyCode === 32) {
        jump();
    }
}

function jump() {
    let posicao = 68;

    let upInterval = setInterval(() => {
        if (posicao >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (posicao <= 68) {
                    clearInterval(downInterval);
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
