/* eslint-disable no-param-reassign */
// main declarations
const rightPaddle = document.getElementById('rightPaddle');
const leftPaddle = document.getElementById('leftPaddle');
const ball = document.getElementById('ball');
const score = document.getElementById('score');
const leftScore = document.getElementById('leftScore');
const rightScore = document.getElementById('rightScore');
const buttons = document.querySelector('.buttons');
const easy = document.getElementById('easy');
const medium = document.getElementById('medium');
const hard = document.getElementById('hard');
const play = document.getElementById('play');
const pause = document.getElementById('pause');

const width = window.innerWidth;
const height = window.innerHeight;
const px = 'px';

const paddleHeight = 200;
const paddleWidth = 15;
const paddleSpeed = 4;
const ballRadius = 20;

// function to delete px for calculations
const num = (size) => Number(size.replace('px', ''));

// positive to negative and negative to positive functions
const neg = (int) => -Math.abs(int);
const pos = (int) => Math.abs(int);

// track key strokes and record in an array in order to use more than one key at a time
const keystore = [];
onkeydown = function keySaver(val) {
  keystore[val.key] = val.type === 'keydown';
};
onkeyup = function keySaver(val) {
  keystore[val.key] = val.type === 'keydown';
};

// paddle down function
function movePaddleDown(paddle) {
  if (num(paddle.style.top) + paddleSpeed > height - paddleHeight) {
    paddle.style.top = height - paddleHeight + px;
  } else paddle.style.top = num(paddle.style.top) + paddleSpeed + px;
}

// paddle up function
function movePaddleUp(paddle) {
  if (num(paddle.style.top) - paddleSpeed <= 0) {
    paddle.style.top = 0 + px;
  } else paddle.style.top = num(paddle.style.top) - paddleSpeed + px;
}

// handle keystrokes
function keyPress() {
  // moves paddle down when arrowup key pressed
  if (keystore.ArrowUp) movePaddleUp(rightPaddle);

  // moves paddle down when arrowdown key pressed
  if (keystore.ArrowDown) movePaddleDown(rightPaddle);
}

// ai movement
function aiMovement() {
  if (num(ball.style.left) < width / 2) {
    if (num(leftPaddle.style.top) + (paddleHeight / 2) <= num(ball.style.top)) {
      movePaddleDown(leftPaddle);
    } else movePaddleUp(leftPaddle);
  }
}

// initial positions of paddles and ball
ball.style.left = paddleWidth + px;
ball.style.top = num(leftPaddle.style.top) + (paddleHeight / 2) + px;
leftPaddle.style.top = height / 2 - 100 + px;
rightPaddle.style.top = height / 2 - 100 + px;

// default ball speeds
let speedX = 3;
let speedY = 3;

// tracks scores for each player and shows text
function scored(loc) {
  score.style.visibility = 'visible';

  setTimeout(() => {
    score.style.visibility = 'hidden';
  }, 1000);

  if (loc === 'left') {
    rightScore.innerHTML = Number(rightScore.innerHTML) + 1;
    ball.style.left = paddleWidth + px;
    ball.style.top = num(leftPaddle.style.top) + (paddleHeight / 2) + px;
  } else if (loc === 'right') {
    leftScore.innerHTML = Number(leftScore.innerHTML) + 1;
    ball.style.left = width - paddleWidth - ballRadius + px;
    ball.style.top = num(rightPaddle.style.top) + (paddleHeight / 2) + px;
  }
  speedX *= -1;
}

function ballMovement() {
  // movement formula for the ball
  ball.style.left = num(ball.style.left) + speedX + px;
  ball.style.top = num(ball.style.top) + speedY + px;

  // bounce from upper and lower borders
  if (num(ball.style.top) + ballRadius > height || num(ball.style.top) < 0) {
    speedY *= -1;
  }

  // right side bounce and score
  if (num(ball.style.left) + ballRadius >= width - paddleWidth) {
    if (
      // if ball hits the upper half of the paddle
      num(rightPaddle.style.top) <= num(ball.style.top) + ballRadius
      && num(rightPaddle.style.top) + (paddleHeight / 2) >= num(ball.style.top)
    ) {
      // direct ball to the top
      speedY = neg(speedY);
      speedX *= -1;
    } else if (
      // if ball hits the lower half of the paddle
      num(rightPaddle.style.top) + (paddleHeight / 2) <= num(ball.style.top)
      && num(rightPaddle.style.top) + paddleHeight >= num(ball.style.top)
    ) {
      // direct ball to the bottom
      speedY = pos(speedY);
      speedX *= -1;
    } else if (num(ball.style.left) >= width - ballRadius) scored('right');
  }

  // left side bounce and score
  if (num(ball.style.left) <= paddleWidth) {
    if (
      // if ball hits the upper half of the paddle
      num(leftPaddle.style.top) <= num(ball.style.top) + ballRadius
      && num(leftPaddle.style.top) + (paddleHeight / 2) >= num(ball.style.top)) {
      // direct ball to the top
      speedY = neg(speedY);
      speedX *= -1;
    } else if (
      // if ball hits the upper half of the paddle
      num(leftPaddle.style.top) + (paddleHeight / 2) <= num(ball.style.top)
      && num(leftPaddle.style.top) + paddleHeight >= num(ball.style.top)
    ) {
      // direct ball to the bottom
      speedY = pos(speedY);
      speedX *= -1;
    } else if (num(ball.style.left) <= 0) scored('left');
  }
}

// setting difficulty settings
easy.addEventListener('click', () => {
  speedX = 4;
  speedY = 4;
});
medium.addEventListener('click', () => {
  speedX = 5;
  speedY = 4;
});
hard.addEventListener('click', () => {
  speedX = 6;
  speedY = 4;
});

// play pause button
play.addEventListener('click', () => {
  const keyInterval = setInterval(keyPress, 5);
  const aiInterval = setInterval(aiMovement, 5);
  const ballInterval = setInterval(ballMovement, 1);
  buttons.style.visibility = 'hidden';
  play.style.visibility = 'hidden';
  pause.style.visibility = 'visible';
  pause.addEventListener('click', () => {
    clearInterval(keyInterval);
    clearInterval(aiInterval);
    clearInterval(ballInterval);
    buttons.style.visibility = 'visible';
    play.style.visibility = 'visible';
    pause.style.visibility = 'hidden';
  });
});
