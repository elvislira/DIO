function start() {
    $("#inicio").hide();

    $("#fundo-game").append("<div id='jogador' class='anima1'></div>");
    $("#fundo-game").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundo-game").append("<div id='inimigo2'></div>");
    $("#fundo-game").append("<div id='amigo' class='anima3'></div>");

    var jogo = {};
    var TECLA = {
        W: 87, //para cima
        S: 83, //para baixo
        D: 68, //atirar
    };

    jogo.pressionou = [];

    $(document).keydown(function(event) {
        jogo.pressionou[event.which] = true;
    });

    $(document).keyup(function(event) {
        jogo.pressionou[event.which] = false;
    });

    jogo.timer = setInterval(loop, 20);

    function loop() {
        moveFundo();
        moveJogador();
    }

    function moveFundo() {
        esquerda = parseInt($("#fundo-game").css("background-position"));
        $("#fundo-game").css("background-position", esquerda - 1);
    }

    function moveJogador() {
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            if (topo > 0) {
                $("#jogador").css("top", topo - 10);
            }
        }

        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            if (topo < 434) {
                $("#jogador").css("top", topo + 10);
            }
        }

        if (jogo.pressionou[TECLA.D]) {
            //Disparo
        }
    }
};

