/* eslint-disable no-param-reassign */
// main declarations
const rightPaddle = document.getElementById('rightPaddle');
const leftPaddle = document.getElementById('leftPaddle');
const ball = document.getElementById('ball');
const score = document.getElementById('score');
const leftScore = document.getElementById('leftScore');
const rightScore = document.getElementById('rightScore');

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
  // moves paddle down when arrowup key pressed
  if (keystore.ArrowUp) movePaddleUp(rightPaddle);

  // moves paddle down when arrowdown key pressed
  if (keystore.ArrowDown) movePaddleDown(rightPaddle);
};

// ai movement
const aiMovement = () => {
  if (num(ball.style.left) < width / 2) {
    if (num(leftPaddle.style.top) + (paddleHeight / 2) <= num(ball.style.top)) {
      movePaddleDown(leftPaddle);
    } else movePaddleUp(leftPaddle);
  }
};

// initial positions of paddles and ball
leftPaddle.style.top = height / 2 - 100 + px;
rightPaddle.style.top = height / 2 - 100 + px;
ball.style.left = width / 2 + px;
ball.style.top = height / 2 - 100 + px;

// ball speed in both directions
let speedX = 4.5;
let speedY = 4;

// tracks scores for each player and shows text
const scored = (loc) => {
  score.style.visibility = 'visible';

  setTimeout(() => {
    score.style.visibility = 'hidden';
  }, 1000);

  if (loc === 'left') rightScore.innerHTML = Number(rightScore.innerHTML) + 1;
  else if (loc === 'right') leftScore.innerHTML = Number(leftScore.innerHTML) + 1;

  // reset positions
  leftPaddle.style.top = height / 2 - 100 + px;
  rightPaddle.style.top = height / 2 - 100 + px;
  ball.style.left = width / 2 + px;
  ball.style.top = height / 2 - 100 + px;
  speedX *= -1;
};

const ballMovement = () => {
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
};

// continuously run keyPress and ballMovement functions
setInterval(keyPress, 5);
setInterval(aiMovement, 5);
setInterval(ballMovement, 1);
