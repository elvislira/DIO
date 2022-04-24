export function retornaResultado(matrizJogo) {
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
