function validaArray(arr, numero) {
    try {
        if (!arr && !numero) {
            throw new ReferenceError("Parâmetros incorretos!");
        }
    
        if (typeof arr !== 'object') {
            throw new TypeError("Tipo incorreto, object esperado.");
        }
    
        if (typeof numero !== 'number') {
            throw new TypeError("Tipo incorreto, number esperado.");
        }
    
        if (arr.length !== numero) {
            throw new RangeError("A quantidade de elementos do array é diferente do numero.")
        }

        return arr;
    } catch (e) {
        if (e instanceof ReferenceError) {
            console.log("O erro é do tipo ReferenceError");
        } else if (e instanceof TypeError) {
            console.log("O erro é do tipo TypeError");
        } else if (e instanceof RangeError) {
            console.log("O erro é do tipo RangeError");
        } else {
            console.log("O tipo do erro é desconhecido.")
        }

        console.log(e);
    }
}

console.log(validaArray([1,2,3,4,5], 'a'));
