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
const key = [];
onkeydown = function keySaver(e) {
  key[e.key] = e.type === 'keydown';
};
onkeyup = function keySaver(e) {
  key[e.key] = e.type === 'keydown';
};

// paddle down function
const movePaddleDown = (side) => {
  const paddle = side;
  if (num(paddle.style.top) + paddleSpeed > height - paddleHeight) {
    paddle.style.top = height - paddleHeight + px;
  } else paddle.style.top = num(paddle.style.top) + paddleSpeed + px;
};

// paddle up function
const movePaddleUp = (side) => {
  const paddle = side;
  if (num(paddle.style.top) - paddleSpeed <= 0) {
    paddle.style.top = 0 + px;
  } else paddle.style.top = num(paddle.style.top) - paddleSpeed + px;
};

// handle keystrokes
const keyPress = () => {
  // moves paddle up until border when w key pressed
  if (key.w) { movePaddleUp(leftPaddle); }

  // moves paddle down until border when s key pressed
  if (key.s) { movePaddleDown(leftPaddle); }

  // moves paddle down until border when arrowup key pressed
  if (key.ArrowUp) { movePaddleUp(rightPaddle); }

  // moves paddle down until border when arrowdown key pressed
  if (key.ArrowDown) { movePaddleDown(rightPaddle); }
};

// center paddles vertically
leftPaddle.style.top = height / 2 - 100 + px;
rightPaddle.style.top = height / 2 - 100 + px;

const leftScore = document.getElementById('leftScore');
const rightScore = document.getElementById('rightScore');

// tracks scores for each player and shows text
const scored = (loc) => {
  score.style.color = 'white';

  setTimeout(() => {
    score.style.color = 'black';
  }, 1000);

  if (loc === 'left') rightScore.innerHTML = Number(rightScore.innerHTML) + 1;
  else leftScore.innerHTML = Number(leftScore.innerHTML) + 1;

  // returns ball to center and changes its direction
  ball.style.left = width / 2 + px;
  ballSpeedX *= -1;
};

//
let ballSpeedX = 6;
let ballSpeedY = 2.5;

ball.style.left = width / 2 + px;

const ballMovement = () => {
  // initial movement formula for the ball
  ball.style.left = num(ball.style.left) + ballSpeedX + px;
  ball.style.top = num(ball.style.top) + ballSpeedY + px;

  // bounce from upper and lower borders
  if (num(ball.style.top) + 20 > height || num(ball.style.top) < 0) {
    ballSpeedY *= -1;
  }

  // right side bounce and score
  if (num(ball.style.left) >= width - paddleWidth - ballRadius) {
    if (
      num(rightPaddle.style.top) <= num(ball.style.top) + ballRadius
      && num(rightPaddle.style.top) + paddleHeight >= num(ball.style.top)
    ) {
      ballSpeedX *= -1;
    } else if (num(ball.style.left) >= width - ballRadius) scored('left');
  }

  // left side bounce and score
  if (num(ball.style.left) <= paddleWidth) {
    if (
      num(leftPaddle.style.top) <= num(ball.style.top) + ballRadius
      && num(leftPaddle.style.top) + paddleHeight - ballRadius >= num(ball.style.top)
    ) {
      ballSpeedX *= -1;
    } else if (num(ball.style.left) <= 0) scored('right');
  }

  // start ball movement at beginning
  setTimeout(() => {
    ballMovement();
  }, 1);
};

// continuously run keyPress function to track pressed keys
setInterval(() => {
  keyPress();
}, 10);

ballMovement();
