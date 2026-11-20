let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

// Load saved highest score
let highScore = Number(localStorage.getItem("simonHighScore")) || 0;

let h2 = document.querySelector("h2");

// Create highest score display automatically
let highScoreDisplay = document.querySelector("#high-score");

if (!highScoreDisplay) {
    highScoreDisplay = document.createElement("p");
    highScoreDisplay.id = "high-score";
    h2.insertAdjacentElement("afterend", highScoreDisplay);
}

// Display highest score
function updateHighScore() {
    highScoreDisplay.innerText = `Highest Score: ${highScore}`;
}

updateHighScore();

// Start game
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Increase level
function levelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    console.log(gameSeq);

    gameFlash(randBtn);
}

// Game flash
function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// User flash
function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Select all buttons
let allBtns = document.querySelectorAll(".btn");

// Add click events
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Button press
function btnPress() {
    if (!started) return;

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Check answer
function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {

        // Update highest score
        if (level > highScore) {

            highScore = level;

            // Save score permanently
            localStorage.setItem("simonHighScore", highScore);

            updateHighScore();
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b>
        <br> Press any key to start.`;

        document.body.style.backgroundColor = "red";

        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

// Reset game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}