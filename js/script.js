const words = ["piano", "tigre", "luzes", "banjo", "folha", "vento", "cinza", "fruta", "limpo", "verde"];
let secret = "";
let maxAttempts = 6;
let attempts = 0;

const board = document.getElementById("game-board");
const input = document.getElementById("guess-input");

function startGame() {
    board.innerHTML = "";
    attempts = 0;
    secret = words[Math.floor(Math.random() * words.length)];
    input.value = "";
    input.disabled = false;
    input.focus();
    removeEndMessage();
    console.log("Palavra secreta:", secret); // Para testes
}

input.addEventListener("input", () => {
    const guess = input.value.toLowerCase();

    if (guess.length === 5) {
        handleGuess(guess);
        input.value = "";
    }
});

function handleGuess(guess) {
    if (attempts >= maxAttempts) return;

    const row = document.createElement("div");
    row.className = "row";

    const secretArray = secret.split("");
    const guessArray = guess.split("");

    guessArray.forEach((letter, i) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");

        if (letter === secretArray[i]) {
            tile.classList.add("correct");
        } else if (secretArray.includes(letter)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }

        tile.textContent = letter;
        row.appendChild(tile);
    });

    board.appendChild(row);
    attempts++;

    if (guess === secret) {
        showEndMessage("🎉 Você acertou!");
    } else if (attempts === maxAttempts) {
        showEndMessage("❌ Você perdeu! A palavra era: " + secret.toUpperCase());
    }
}

function showEndMessage(message) {
    input.disabled = true;

    const msg = document.createElement("div");
    msg.id = "end-message";
    msg.textContent = message;
    msg.className = "end-message";
    document.body.appendChild(msg);

    const btn = document.createElement("button");
    btn.id = "new-game-btn";
    btn.textContent = "Novo Jogo";
    btn.className = "new-game-btn";
    btn.addEventListener("click", startGame);
    document.body.appendChild(btn);
}

function removeEndMessage() {
    document.getElementById("new-game-btn")?.remove();
    document.getElementById("end-message")?.remove();
}

window.addEventListener("load", () => {
    input.focus();
    startGame();
});

document.body.addEventListener("click", () => input.focus());
