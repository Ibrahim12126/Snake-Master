const playBoard = document.querySelector(".play-board");
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameInterval;
let gameSpeed = 150;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

const gameOver = () => {
  clearInterval(gameInterval);
  alert("Game Over 😢");
  location.reload();
}

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0; velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0; velocityY = 1;
  } else if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1; velocityY = 0;
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1; velocityY = 0;
  }
}

const initGame = () => {
  let html = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;

    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("highScore", highScore);

    document.querySelector(".score").innerText = "Score: " + score;
    document.querySelector(".highscore").innerText = "High Score: " + highScore;
  }

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return gameOver();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="body" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
  }

  html += `<div class="head" style="grid-area:${snakeY}/${snakeX}"></div>`;

  playBoard.innerHTML = html;
}

function startGame() {
  changeFoodPosition();
  gameInterval = setInterval(initGame, gameSpeed);
}

window.onload = startGame;
document.addEventListener("keydown", changeDirection);

/* 🎮 Mobile buttons */
const Snake = {
  action: function (dir) {
    if (dir === "up" && velocityY !== 1) {
      velocityX = 0; velocityY = -1;
    }
    else if (dir === "down" && velocityY !== -1) {
      velocityX = 0; velocityY = 1;
    }
    else if (dir === "left" && velocityX !== 1) {
      velocityX = -1; velocityY = 0;
    }
    else if (dir === "right" && velocityX !== -1) {
      velocityX = 1; velocityY = 0;
    }
  }
};
