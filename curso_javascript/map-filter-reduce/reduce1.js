function somaNumeros(arr) {
    return arr.reduce((prev, current) => {
        return prev + current;
    });
}

numeros = [1, 2, 3, 4, 5];

console.log(somaNumeros(numeros));
