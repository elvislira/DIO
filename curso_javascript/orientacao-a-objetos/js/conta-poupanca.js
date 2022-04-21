import { ContaBancaria } from "./conta-bancaria.js";

export class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, saldo);
        this.tipo = 'poupanca'
    }
}