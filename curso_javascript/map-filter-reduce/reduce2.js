const listaDeProdutos = [
    {
        produto: 'mouse',
        preco: 15.00,
    },
    {
        produto: 'Teclado',
        preco: 75.00,
    },
    {
        produto: 'SSD 240GB',
        preco: 180.00,
    },
    {
        produto: 'Pendrive 32GB',
        preco: 50.00
    },
    {
        produto: 'Monitor Philips 23.8',
        preco: 950.00,
    },
];

const saldoDisponivel = 1500.00;

function calculaSaldo(listaDeProdutos, saldoDisponivel) {
    return listaDeProdutos.reduce((prev, current) => {
        return prev - current.preco;
    }, saldoDisponivel);
};

console.log(calculaSaldo(listaDeProdutos, saldoDisponivel));
