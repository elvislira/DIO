function start() {
    $("#inicio").hide();

    $("#fundo-game").append("<div id='jogador' class='anima1'></div>");
    $("#fundo-game").append("<div id='helicoptero-inimigo' class='anima2'></div>");
    $("#fundo-game").append("<div id='caminhao-inimigo'></div>");
    $("#fundo-game").append("<div id='amigo' class='anima3'></div>");

    var jogo = {};
    var TECLA = {
        W: 87, //para cima
        S: 83, //para baixo
        D: 68, //atirar
    };
    var velocidadeInimigo = 5;
    var posYInimigo = parseInt(Math.random() * 334);
    var podeAtirar = true;
    let tempoDisparo;

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
        moveHelicopteroAmigo();
        moveHelicopteroInimigo();
        moveCaminhaoInimigo();
        moveAmigo();
    }

    function moveFundo() {
        let esquerda = parseInt($("#fundo-game").css("background-position"));
        $("#fundo-game").css("background-position", esquerda - 1);
    }

    function moveHelicopteroAmigo() {
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
            disparo();
        }
    }

    function moveHelicopteroInimigo() {
        let posicaoX = parseInt($("#helicoptero-inimigo").css("left"));
        
        $("#helicoptero-inimigo").css("left", posicaoX - velocidadeInimigo);
        $("#helicoptero-inimigo").css("top", posYInimigo);

        if (posicaoX <= 0) {
            posYInimigo = parseInt(Math.random() * 334);

            $("#helicoptero-inimigo").css("left", 694);
            $("#helicoptero-inimigo").css("top", posYInimigo);
        }
    }

    function moveCaminhaoInimigo() {
        let posicaoX = parseInt($("#caminhao-inimigo").css("left"));

        $("#caminhao-inimigo").css("left", posicaoX - 3);

        if (posicaoX <= 0) {
            $("#caminhao-inimigo").css("left", 775);
        }
    }

    function moveAmigo() {
        let posicaoX = parseInt($("#amigo").css("left"));

        $("#amigo").css("left", posicaoX + 1);

        if (posicaoX > 906) {
            $("#amigo").css("left", 0);
        }
    }

    function disparo() {
        if (podeAtirar) {
            podeAtirar = false;

            let topo = parseInt($("#jogador").css("top"));
            let posicaoX = parseInt($("#jogador").css("left"));
            let tiroX = posicaoX + 190;
            let topoTiro = topo + 37;

            $("#fundo-game").append("<div id='disparo'></div>");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            tempoDisparo = window.setInterval(executaDisparo, 30);
        }
    }
    
    function executaDisparo() {
        posicaoX = parseInt($("#disparo").css("left"));

        $("#disparo").css("left", posicaoX + 15);

        if (posicaoX > 900) {
            window.clearInterval(tempoDisparo);
            tempoDisparo = null;
            $("#disparo").remove();
            podeAtirar = true;
        }
    }

};

