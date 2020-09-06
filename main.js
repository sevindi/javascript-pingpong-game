/* eslint-disable no-param-reassign */
// main declarations
const rightPaddle = document.getElementById('rightPaddle');
const leftPaddle = document.getElementById('leftPaddle');
const ball = document.getElementById('ball');
const score = document.getElementById('score');

const width = window.innerWidth;
const height = window.innerHeight;
const px = 'px';

const paddleHeight = 200;
const paddleWidth = 15;
const paddleSpeed = 7.5;
const ballRadius = 20;

// function to delete px for calculations
const num = (size) => Number(size.replace('px', ''));

// track key strokes and record in an array in order to use more than one key at a time
const keystore = [];
onkeydown = function keySaver(val) {
  keystore[val.key] = val.type === 'keydown';
};
onkeyup = function keySaver(val) {
  keystore[val.key] = val.type === 'keydown';
};

// paddle down function
const movePaddleDown = (paddle) => {
  if (num(paddle.style.top) + paddleSpeed > height - paddleHeight) {
    paddle.style.top = height - paddleHeight + px;
  } else paddle.style.top = num(paddle.style.top) + paddleSpeed + px;
};

// paddle up function
const movePaddleUp = (paddle) => {
  if (num(paddle.style.top) - paddleSpeed <= 0) {
    paddle.style.top = 0 + px;
  } else paddle.style.top = num(paddle.style.top) - paddleSpeed + px;
};

// handle keystrokes
const keyPress = () => {
  // moves paddle up until border when w key pressed
  if (keystore.w) movePaddleUp(leftPaddle);

  // moves paddle down until border when s key pressed
  if (keystore.s) movePaddleDown(leftPaddle);

  // moves paddle down until border when arrowup key pressed
  if (keystore.ArrowUp) movePaddleUp(rightPaddle);

  // moves paddle down until border when arrowdown key pressed
  if (keystore.ArrowDown) movePaddleDown(rightPaddle);
};

// center paddles vertically
leftPaddle.style.top = height / 2 - 100 + px;
rightPaddle.style.top = height / 2 - 100 + px;

const leftScore = document.getElementById('leftScore');
const rightScore = document.getElementById('rightScore');

// ball speed in both directions
let speedX = 6;
let speedY = 2.5;

ball.style.left = width / 2 + px;

// gravity effect
setInterval(() => {
  speedY += 0.10;
}, 200);

// tracks scores for each player and shows text
const scored = (loc) => {
  score.style.color = 'white';

  setTimeout(() => {
    score.style.color = 'black';
  }, 1000);

  if (loc === 'left') rightScore.innerHTML = Number(rightScore.innerHTML) + 1;
  else if (loc === 'right') leftScore.innerHTML = Number(leftScore.innerHTML) + 1;

  // returns ball to center and changes its direction and reset Y-axis speed to default
  ball.style.left = width / 2 + px;
  speedX *= -1;
  speedY = 3;
};

const ballMovement = () => {
  // initial movement formula for the ball
  ball.style.left = num(ball.style.left) + speedX + px;
  ball.style.top = num(ball.style.top) + speedY + px;

  // bounce from upper and lower borders
  if (num(ball.style.top) + ballRadius > height || num(ball.style.top) < 0) {
    speedY *= -1;
  }

  // right side bounce and score
  if (num(ball.style.left) + ballRadius>= width - paddleWidth) {
    if (
      num(rightPaddle.style.top) <= num(ball.style.top) + ballRadius
      && num(rightPaddle.style.top) + paddleHeight >= num(ball.style.top)
    ) {
      speedX *= -1;
    } else if (num(ball.style.left) >= width - ballRadius) scored('left');
  }

  // left side bounce and score
  if (num(ball.style.left) <= paddleWidth) {
    if (
      num(leftPaddle.style.top) <= num(ball.style.top) + ballRadius
      && num(leftPaddle.style.top) + paddleHeight >= num(ball.style.top)) {
      speedX *= -1;
    } else if (num(ball.style.left) <= 0) scored('right');
  }

  // start ball movement
  setTimeout(() => {
    ballMovement();
  }, 1);
};

// continuously run keyPress function to track pressed keys
setInterval(() => {
  keyPress();
}, 10);

ballMovement();
