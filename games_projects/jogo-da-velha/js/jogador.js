export function selecionarJogador(jogadores) {
    //Escolhe o id(0 ou 1) do jogador aleatoriamente
    const idJogador = Math.floor(Math.random() * 2);

    //Retorna o jogador cujo id foi sorteado.
    if (idJogador === jogadores.jogador1.value) {
        return jogadores.jogador1.name;
    }

    return jogadores.jogador2.name;
}

export function trocarJogador(nomeJogador, jogadores) {
    if (nomeJogador === jogadores.jogador1.name) {
        return jogadores.jogador2.name;
    }

    return jogadores.jogador1.name;
}
