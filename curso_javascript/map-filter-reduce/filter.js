function filtraPares(arr) {
    return arr.filter(function(item) {
        return item % 2 === 0;
    });
};

const meuArray = [6, 76, 77, 18, 15, 9];

console.log(filtraPares(meuArray));
