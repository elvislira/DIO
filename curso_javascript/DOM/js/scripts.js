const titulo = document.getElementById('page-title');
const botao = document.getElementById('mode-selector');
const rodape = document.getElementsByTagName('footer')[0];
const corpo = document.getElementsByTagName('body')[0];

function mudaClasses () {
    titulo.classList.toggle('dark-mode');
    botao.classList.toggle('dark-mode');
    rodape.classList.toggle('dark-mode');
    corpo.classList.toggle('dark-mode');
};

function mudaTextos () {
    const lightMode = 'Light Mode';
    const darkMode = 'Dark Mode';

    if (corpo.classList.contains('dark-mode')) {
        titulo.innerHTML = `${darkMode} ON`;
        botao.innerHTML = lightMode;
        return;
    }

    titulo.innerHTML = `${lightMode} ON`;
    botao.innerHTML = darkMode;
}

function alteraModo () {
    mudaClasses();
    mudaTextos();
}

botao.addEventListener('click', alteraModo);
