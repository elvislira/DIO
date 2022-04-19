const meuArray = [30, 30, 40, 5, 223, 2049, 3034, 5];

function retornaConjuntoComoArray(array) {
    const meuConjunto = new Set(array);

    //Spred
    return [...meuConjunto];
}

console.log(retornaConjuntoComoArray(meuArray));