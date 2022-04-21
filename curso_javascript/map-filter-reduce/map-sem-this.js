function mapSemThis(arr) {
    return arr.map(function(item) {
        return item * 2;
    });
};

const numeros = [1, 2, 3, 4, 5];

console.log(mapSemThis(numeros));
