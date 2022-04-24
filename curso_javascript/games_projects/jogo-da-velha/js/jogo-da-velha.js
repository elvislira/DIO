function selecionarJogador() {
    //Escolhe o id(0 ou 1) do jogador aleatoriamente
    const idJogador = Math.floor(Math.random() * 2);

    //Retorna o jogador cujo id foi sorteado.
    if (idJogador === jogadores.jogador1.value) {
        return jogadores.jogador1.name;
    }

    return jogadores.jogador2.name;
}

function trocarJogador(nomeJogador) {
    if (nomeJogador === jogadores.jogador1.name) {
        return jogadores.jogador2.name;
    }

    return jogadores.jogador1.name;
}

function atualizaLegendaJogadorVencedor() {
    const legendaJogador = document.getElementById('jogador-selecionado');
    const legendaVencedor = document.getElementById('vencedor-selecionado');
    const legendaResultado = document.getElementById('nome-vencedor');

    let resultado = retornaResultado();

    if (resultado.vencedor !== '') {
        document.getElementById('placar').classList.add('placar-oculto');
        document.getElementById('resultado').classList.remove('resultado-oculto');

        document.getElementById(resultado.quadrado1).classList.add('quadrado-vencedor');
        document.getElementById(resultado.quadrado2).classList.add('quadrado-vencedor');
        document.getElementById(resultado.quadrado3).classList.add('quadrado-vencedor');
    }

    legendaJogador.innerHTML = jogadorAtual;
    legendaVencedor.innerHTML = resultado.vencedor;
    legendaResultado.innerHTML = resultado.vencedor;
}

function atualizaMatriz(idQuadrado) {
    let posicao =  idQuadrado.split('-');
    let linha = posicao[0];
    let coluna = posicao[1]
    matrizJogo[linha][coluna] = jogadorAtual;
}

function atualizarExibicaoQuadrado(idQuadrado) {
    const quadrado = document.getElementById(idQuadrado);

    if (quadrado.innerHTML !== '' || retornaResultado().vencedor !== '') {
        return;
    }

    quadrado.innerHTML = jogadorAtual;

    atualizaMatriz(idQuadrado);

    jogadorAtual = trocarJogador(jogadorAtual);

    quadrado.classList.add('quadrado-clicado');

    atualizaLegendaJogadorVencedor();
}

function retornaResultado() {
    let objetoRetorno = {
        vencedor: '',
        quadrado1: '',
        quadrado2: '',
        quadrado3: '',
    };
    
    for (let indice = 0; indice <= 2; indice++) {
        if (matrizJogo[indice][0] === matrizJogo[indice][1] && 
            matrizJogo[indice][1] === matrizJogo[indice][2]) {
                objetoRetorno.vencedor = matrizJogo[indice][0];
                objetoRetorno.quadrado1 = indice + '-' + '0';
                objetoRetorno.quadrado2 = indice + '-' + '1';
                objetoRetorno.quadrado3 = indice + '-' + '2';
                return objetoRetorno;
        }

        if (matrizJogo[0][indice] === matrizJogo[1][indice] && 
            matrizJogo[1][indice] === matrizJogo[2][indice]) {
                objetoRetorno.vencedor = matrizJogo[0][indice];
                objetoRetorno.quadrado1 = '0' + '-' + indice;
                objetoRetorno.quadrado2 = '1' + '-' + indice;
                objetoRetorno.quadrado3 = '2' + '-' + indice;
                return objetoRetorno;
        }

        if (indice === 0) {
            if (matrizJogo[indice][indice] === matrizJogo[indice+1][indice+1] && 
                matrizJogo[indice][indice] === matrizJogo[indice+2][indice+2]) {
                    objetoRetorno.vencedor = matrizJogo[indice][indice];
                    objetoRetorno.quadrado1 = indice + '-' + indice;
                    objetoRetorno.quadrado2 = (indice+1) + '-' + (indice+1);
                    objetoRetorno.quadrado3 = (indice+2) + '-' + (indice+2);
                    return objetoRetorno;
            }
        }

        if (indice === 2) {
            if (matrizJogo[indice-2][indice] === matrizJogo[indice-1][indice-1] &&
                matrizJogo[indice-2][indice] === matrizJogo[indice][indice-2]) {
                    objetoRetorno.vencedor = matrizJogo[indice-2][indice];
                    objetoRetorno.quadrado1 = indice + '-' + (indice-2);
                    objetoRetorno.quadrado2 = (indice-1) + '-' + (indice-1);
                    objetoRetorno.quadrado3 = (indice-2) + '-' + indice;
                    return objetoRetorno;
            }
        }
    }

    return objetoRetorno;
}

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

let matrizJogo = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

let jogadorAtual = selecionarJogador();

atualizaLegendaJogadorVencedor();

for (let quadrado of quadrados) {
    quadrado.addEventListener('click', (event) => {
        atualizarExibicaoQuadrado(quadrado.id);
    });
}

