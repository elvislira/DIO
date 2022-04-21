import { ContaBancaria } from './conta-bancaria.js';

export class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, saldo);
        this.tipo = 'universitaria';
    }

    sacar(valor) {
        if (valor > 500) {
            return 'Operação negada. Valor de saque excedido.';
        }

        if (valor > this._saldo) {
            return 'Operação negada. Saldo insuficiente.';
        }

        this._saldo -= valor;

        return this._saldo;
    }
}