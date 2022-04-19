const usuarios = new Map();

usuarios.set("João", "User");
usuarios.set("Elisa", "Admin");
usuarios.set("Vanessa", "Admin");
usuarios.set("Erika", "User");
usuarios.set("Paulo", "Admin");

function getAdmin(usuarios) {
    let admins = [];

    for ([chave, valor] of usuarios) {
        if (valor == "Admin") {
            admins.push(chave);
        }
    }

    return admins;
}

console.log(getAdmin(usuarios));
