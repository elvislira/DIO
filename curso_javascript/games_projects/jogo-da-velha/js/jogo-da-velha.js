const quadrados = document.querySelectorAll('.quadrado');

const jogadores = {
    jogador1: {
        value: 0, 
        name: 'O'
    },
    jogador2: {
        value: 1, 
        name: 'X'
    },
}

function selecionarJogador() {
    //Escolhe o id(0 ou 1) do jogador aleatoriamente
    const idJogador = Math.floor(Math.random() * 2);

    //Retorna o jogador cujo id foi sorteado.
    if (idJogador == jogadores.jogador1.value) {
        return jogadores.jogador1.name;
    }

    return jogadores.jogador2.name;
}

function trocarJogador(nomeJogador) {
    if (nomeJogador == jogadores.jogador1.name) {
        return jogadores.jogador2.name;
    }

    return jogadores.jogador1.name;
}
 
let jogadorAtual = selecionarJogador();

atualizaLegendaJogador();

function atualizaLegendaJogador() {
    const legendaJogador = document.getElementById('jogador-selecionado');

    legendaJogador.innerHTML = jogadorAtual;
}

function atualizarExibicaoQuadrado(idQuadrado) {
    const quadrado = document.getElementById(idQuadrado);

    quadrado.innerHTML = jogadorAtual;

    jogadorAtual = trocarJogador(jogadorAtual);

    quadrado.classList.add('quadrado-clicado');
}

for (let quadrado of quadrados) {
    quadrado.addEventListener('click', (event) => {
        atualizarExibicaoQuadrado(quadrado.id);
        atualizaLegendaJogador();
    });
}

