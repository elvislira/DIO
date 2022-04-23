const quadrados = document.querySelectorAll('.quadrado');

const jogadores = {
    jogador1: {value: 0, name: 'O'},
    jogador2: {value: 1, name: 'X'},
}

function selecionarJogador() {
    const jogador = Math.floor(Math.random() * 2);

    if (jogador == jogadores.jogador1.value) {
        return jogadores.jogador1.name;
    }

    return jogadores.jogador2.name;
}

function trocarJogador(jogador) {
    if (jogador == jogadores.jogador1.name) {
        return jogadores.jogador2.name;
    }

    return jogadores.jogador1.name;
}
 
let jogadorAtual = selecionarJogador();

function atualizarExibicao(id) {
    const quadrado = document.getElementById(id);
    const legendaJogador = document.getElementById('jogador-selecionado');

    quadrado.innerHTML = jogadorAtual;

    jogadorAtual = trocarJogador(jogadorAtual);
    legendaJogador.innerHTML = jogadorAtual;

    quadrado.classList.add('quadrado-clicado');
}

for (let quadrado of quadrados) {
    quadrado.addEventListener('click', (event) => {
        atualizarExibicao(quadrado.id);
    });
}

