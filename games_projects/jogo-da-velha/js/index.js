import { selecionarJogador, trocarJogador } from './jogador.js';
import { retornaResultado } from './resultado.js';

function atualizaLegendaJogadorVencedor() {
    const legendaJogador = document.getElementById('jogador-selecionado');
    const legendaVencedor = document.getElementById('vencedor-selecionado');
    const legendaResultado = document.getElementById('nome-vencedor');

    let resultado = retornaResultado(matrizJogo);

    if (resultado.vencedor !== '') {
        document.getElementById('placar').classList.add('placar-oculto');
        document.getElementById('resultado').classList.remove('resultado-oculto');

        document.getElementById(resultado.quadrado1).classList.add('quadrado-vencedor');
        document.getElementById(resultado.quadrado2).classList.add('quadrado-vencedor');
        document.getElementById(resultado.quadrado3).classList.add('quadrado-vencedor');
    }

    if (deuVelha()) {
        document.getElementById('placar').classList.add('placar-oculto');
        document.getElementById('resultado').classList.remove('resultado-oculto');
        document.querySelector('#resultado h4').innerHTML = '';
        legendaResultado.innerHTML = "Velha";
    } else {
        legendaJogador.innerHTML = jogadorAtual;
        legendaVencedor.innerHTML = resultado.vencedor;
        legendaResultado.innerHTML = resultado.vencedor;
    }

}

function atualizaMatriz(idQuadrado) {
    let posicao =  idQuadrado.split('-');
    let linha = posicao[0];
    let coluna = posicao[1]
    matrizJogo[linha][coluna] = jogadorAtual;
}

function atualizarExibicaoQuadrado(idQuadrado) {
    const quadrado = document.getElementById(idQuadrado);

    if (quadrado.innerHTML !== '' || retornaResultado(matrizJogo).vencedor !== '') {
        return;
    }

    quadrado.innerHTML = jogadorAtual;

    atualizaMatriz(idQuadrado);

    jogadorAtual = trocarJogador(jogadorAtual, jogadores);

    quadrado.classList.add('quadrado-clicado');

    atualizaLegendaJogadorVencedor();
}

function deuVelha() {
    for (let linha = 0; linha <= 2; linha++) {
        for (let coluna = 0; coluna <= 2; coluna++) {
            if (matrizJogo[linha][coluna] === '') {
                return false;
            }
        }
    }

    return true;
}

const quadrados = document.querySelectorAll('.quadrado');
const botaoReiniciar = document.getElementById('reiniciar');

botaoReiniciar.addEventListener('click', () => {
    document.location.reload(true);
});

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

let matrizJogo = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

let jogadorAtual = selecionarJogador(jogadores);

atualizaLegendaJogadorVencedor();

for (let quadrado of quadrados) {
    quadrado.addEventListener('click', (event) => {
        atualizarExibicaoQuadrado(quadrado.id);
    });
}
