const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");

const paddleWidth = 10, paddleHeight = 100;
const player = { x: 0, y: 150, width: paddleWidth, height: paddleHeight, color: "white", dy: 6 };
const ai = { x: canvas.width - paddleWidth, y: 150, width: paddleWidth, height: paddleHeight, color: "white", dy: 4 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 8, speed: 4, dx: 4, dy: 4, color: "white" };

let playerScore = 0;
let aiScore = 0;
const winningScore = 5;
let gameOver = false;

const keys = {
  up: false,
  down: false
};

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") keys.up = true;
  if (e.key === "ArrowDown") keys.down = true;
});

document.addEventListener("keyup", e => {
  if (e.key === "ArrowUp") keys.up = false;
  if (e.key === "ArrowDown") keys.down = false;
});

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

function drawText(text, x, y, size = "30px", color = "white", align = "center") {
  ctx.fillStyle = color;
  ctx.font = `${size} Arial`;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function collision(b, p) {
  return b.x - b.radius < p.x + p.width &&
         b.x + b.radius > p.x &&
         b.y - b.radius < p.y + p.height &&
         b.y + b.radius > p.y;
}

function update() {
  if (gameOver) return;

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }

  const paddle = (ball.x < canvas.width / 2) ? player : ai;
  if (collision(ball, paddle)) {
    let angle = (ball.y - (paddle.y + paddle.height / 2)) * 0.25;
    ball.dx = -ball.dx;
    ball.dy = angle;
  }

  if (ball.x < 0) {
    aiScore++;
    resetBall();
  } else if (ball.x > canvas.width) {
    playerScore++;
    resetBall();
  }

  if (playerScore === winningScore || aiScore === winningScore) {
    gameOver = true;
  }

  if (ball.y < ai.y + ai.height / 2) ai.y -= ai.dy;
  else ai.y += ai.dy;
  ai.y = Math.max(Math.min(ai.y, canvas.height - ai.height), 0);

  if (keys.up && player.y > 0) player.y -= player.dy;
  if (keys.down && player.y < canvas.height - player.height) player.y += player.dy;
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "#222");
  drawRect(player.x, player.y, player.width, player.height, player.color);
  drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);

  drawText(playerScore, canvas.width / 4, 30);
  drawText(aiScore, canvas.width * 3 / 4, 30);

  if (gameOver) {
    const winner = playerScore === winningScore ? "Jucătorul" : "AI-ul";
    drawText(`${winner} a câștigat!`, canvas.width / 2, canvas.height / 2, "40px", "yellow");
    drawText("Apasă butonul pentru a reîncepe", canvas.width / 2, canvas.height / 2 + 40, "20px", "lightgray");
    restartBtn.style.display = "block";
  }
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

restartBtn.addEventListener("click", () => {
  playerScore = 0;
  aiScore = 0;
  gameOver = false;
  resetBall();
  restartBtn.style.display = "none";
});

gameLoop();