export class ContaBancaria {
    constructor(agencia, numero, saldo, tipo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this._saldo = saldo;
    }

    get saldo() {
        return this._saldo
    }

    set saldo(valor) {
        this._saldo = valor;
    }

    sacar(valor) {
        if (valor > this._saldo) {
            return "Operação negada. Saldo insuficiente.";
        }

        this._saldo -= valor;

        return this._saldo;
    }

    depositar(valor) {
        this._saldo += valor;

        return this._saldo;
    }
}
