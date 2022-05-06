$("#inicio").click(start);

function start() {
    $("#inicio").hide();

    $("#fundo-game").append("<div id='jogador' class='anima1'></div>");
    $("#fundo-game").append("<div id='inimigo1' class='anima2'></div>");
    $("#fundo-game").append("<div id='inimigo2'></div>");
    $("#fundo-game").append("<div id='amigo' class='anima3'></div>");
    $("#fundo-game").append("<div id='placar'></div>");

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
    var gameOver = false;
    var pontos = 0;
    var salvos = 0;
    var perdidos = 0;

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
        colisao();
        placar();
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
        let posicaoX = parseInt($("#inimigo1").css("left"));
        
        $("#inimigo1").css("left", posicaoX - velocidadeInimigo);
        $("#inimigo1").css("top", posYInimigo);

        if (posicaoX <= 0) {
            posYInimigo = parseInt(Math.random() * 334);

            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posYInimigo);
        }
    }

    function moveCaminhaoInimigo() {
        let posicaoX = parseInt($("#inimigo2").css("left"));

        $("#inimigo2").css("left", posicaoX - 3);

        if (posicaoX <= 0) {
            $("#inimigo2").css("left", 775);
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

    function colisao() {
        let colisao1 = ($("#jogador").collision($("#inimigo1")));
        let colisao2 = ($("#jogador").collision($("#inimigo2")));
        let colisao3 = ($("#disparo").collision($("#inimigo1")));
        let colisao4 = ($("#disparo").collision($("#inimigo2")));
        let colisao5 = ($("#jogador").collision($("#amigo")));
        let colisao6 = ($("#inimigo2").collision($("#amigo")));
        
        if (colisao1.length > 0) {
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 334);

            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }

        if (colisao2.length > 0) {
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X,inimigo2Y);
                    
            $("#inimigo2").remove();
                
            reposicionaInimigo2();
        }

        if (colisao3.length > 0) {
            pontos += 100;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
                
            explosao1(inimigo1X,inimigo1Y);
            $("#disparo").css("left",950);
                
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);     
        }

        if (colisao4.length > 0) {
            pontos += 50;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();
        
            explosao2(inimigo2X,inimigo2Y);
            $("#disparo").css("left",950);
            
            reposicionaInimigo2();  
        }

        if (colisao5.length > 0) {	
            salvos++;
            reposicionaAmigo();
            $("#amigo").remove();
        }

        if (colisao6.length > 0) {
            perdidos++;
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX,amigoY);
            $("#amigo").remove();
                    
            reposicionaAmigo();       
        }
    }

    function explosao1(inimigo1X, inimigo1Y) {
        $("#fundo-game").append("<div id='explosao1'></div>");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");

        let div = $("#explosao1");

        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width: 200, opacity: 0}, "slow");

        let tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }

    function reposicionaInimigo2() {
        let tempoColisao4 = window.setInterval(reposiciona4, 5000);
            
        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
                
            if (gameOver == false) {
                $("#fundo-game").append("<div id='inimigo2'></div");
            }  
        }	
    }

    function explosao2(inimigo2X,inimigo2Y) {
        $("#fundo-game").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");

        let div2=$("#explosao2");

        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
        
        let tempoExplosao2=window.setInterval(removeExplosao2, 1000);

        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2=null;
        }
    }

    function reposicionaAmigo() {
		let tempoAmigo = window.setInterval(reposiciona6, 6000);
	
		function reposiciona6() {
			window.clearInterval(tempoAmigo);
			tempoAmigo = null;
			
			if (gameOver == false) {
			    $("#fundo-game").append("<div id='amigo' class='anima3'></div>");
		    }
	    }
    }

    function explosao3(amigoX,amigoY) {
        $("#fundo-game").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);

        let tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);

        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3=null;       
        }    
    }

    function placar() {
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");   
    }
};

