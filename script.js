const jogador = document.getElementById("jogador");

const inimigos = document.querySelectorAll(".inimigo");

const pontosTexto = document.getElementById("pontos");

const gameOver = document.getElementById("gameOver");

let jogadorX = 175;

let pontos = 0;

let velocidade = 4;

let jogoAtivo = true;


// ==========================
// MOVIMENTO DO JOGADOR
// ==========================

document.addEventListener("keydown", function(event) {

    if (!jogoAtivo) return;

    if (event.key === "ArrowLeft") {

        jogadorX -= 20;
    }

    if (event.key === "ArrowRight") {

        jogadorX += 20;
    }

    // Limites da pista

    if (jogadorX < 10) {
        jogadorX = 10;
    }

    if (jogadorX > 335) {
        jogadorX = 335;
    }

    jogador.style.left = jogadorX + "px";
});


// ==========================
// MOVIMENTO DOS INIMIGOS
// ==========================

function movimentarInimigos() {

    if (!jogoAtivo) return;

    inimigos.forEach(function(inimigo) {

        let y = parseInt(
            getComputedStyle(inimigo).top
        );

        y += velocidade;

        // Quando sai da pista

        if (y > 600) {

            y = -100 - Math.random() * 300;

            let novaPosicao =
                Math.random() * 300 + 20;

            inimigo.style.left =
                novaPosicao + "px";

            pontos += 10;

            pontosTexto.textContent = pontos;
        }

        inimigo.style.top = y + "px";

        verificarColisao(inimigo);
    });

    requestAnimationFrame(movimentarInimigos);
}


// ==========================
// COLISÃO
// ==========================

function verificarColisao(inimigo) {

    const jogadorRect =
        jogador.getBoundingClientRect();

    const inimigoRect =
        inimigo.getBoundingClientRect();

    if (
        jogadorRect.left < inimigoRect.right &&
        jogadorRect.right > inimigoRect.left &&
        jogadorRect.top < inimigoRect.bottom &&
        jogadorRect.bottom > inimigoRect.top
    ) {

        terminarJogo();
    }
}


// ==========================
// GAME OVER
// ==========================

function terminarJogo() {

    jogoAtivo = false;

    gameOver.style.display = "block";
}


// ==========================
// REINICIAR
// ==========================

function reiniciar() {

    pontos = 0;

    velocidade = 4;

    jogadorX = 175;

    jogador.style.left =
        jogadorX + "px";

    inimigos[0].style.top = "-100px";
    inimigos[1].style.top = "-300px";
    inimigos[2].style.top = "-500px";

    gameOver.style.display = "none";

    pontosTexto.textContent = "0";

    jogoAtivo = true;

    movimentarInimigos();
}


// ==========================
// AUMENTA A DIFICULDADE
// ==========================

setInterval(function() {

    if (jogoAtivo && velocidade < 12) {

        velocidade += 0.5;
    }

}, 5000);


// Começa o jogo

movimentarInimigos();