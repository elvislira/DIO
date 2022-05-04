function start() {
    $("#inicio").hide();

    $("#fundo-game").append("<div id='jogador' class='anima1'></div>");
    $("#fundo-game").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundo-game").append("<div id='inimigo2'></div>");
    $("#fundo-game").append("<div id='amigo' class='anima3'></div>");

    var jogo = {};

    jogo.timer = setInterval(loop, 20);

    function loop() {
        moveFundo();
    }

    function moveFundo() {
        esquerda = parseInt($("#fundo-game").css("background-position"));
        $("#fundo-game").css("background-position", esquerda - 1);
    }
};




