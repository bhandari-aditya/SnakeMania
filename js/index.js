//game constants & variables
let inputDir = { x: 0, y: 0 };
<!--This Way Must let Repository Public-->
<script>
const foodSound = new Audio("https://bhandari-aditya.github.io/SnakeMania/music/food.mp3");
const gameOverSound = new Audio("https://bhandari-aditya.github.io/SnakeMania/music/gameover.mp3");
const moveSound = new Audio("https://bhandari-aditya.github.io/SnakeMania/music/move.mp3");
const musicSound = new Audio("https://bhandari-aditya.github.io/SnakeMania/music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 8, y: 8 }];
food = { x: 10, y: 15 };

//game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  //if the snake bumps into itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  //if the snake bumps into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  musicSound.play();
  //part 1: Updating the snake array & food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game over. Press any key to play again!");
    snakeArr = [{ x: 8, y: 8 }];
    musicSound.play();
    score = 0;
  }

  //if snake ate the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hscoreVal) {
      hscoreVal = score;
      localStorage.setItem("hscore", JSON.stringify(hscoreVal));
      highScoreBox.innerHTML = "High Score:" + hscoreVal;
    }
    let scr = document.getElementById("score");
    scr.innerHTML = "Score:" + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //part 2: Display the snake and food
  board.innerHTML = "";
  //Display the snake
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement); //append 'snakeElement' to '.board'
  });

  //Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement); //append 'foodElement' to '.board'
}

//main logic starts here
let hscore = localStorage.getItem("hscore");
if (hscore === null) {
  hscoreVal = 0;
  localStorage.setItem("hscore", JSON.stringify(hscoreVal));
  console.log(hscore);
} else {
  hscoreVal = JSON.parse(hscore);
  let a = document.getElementById("highScoreBox");
  a.innerHTML = "High Score:" + hscoreVal;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("arrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});
