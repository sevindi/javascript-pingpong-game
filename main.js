// main declarations
let rightPaddle = document.getElementById("rightPaddle");
let leftPaddle = document.getElementById("leftPaddle");

let ball = document.getElementById("ball");

let leftScore = document.getElementById("leftScore");
let rightScore = document.getElementById("rightScore");
let score = document.getElementById("score");

let width = window.innerWidth;
let height = window.innerHeight;

let px = "px";

let paddleHeight = 200;
let paddleWidth = 15;
let paddleSpeed = 5;

// function to delete px for calculations
function rmv(size) {
  return parseInt(size.replace("px", ""));
}

// track key strokes and record in an array in order to use more than one key at a time
let key = [];
onkeydown = onkeyup = function (e) {
  e = e || event;
  key[e.keyCode] = e.type == "keydown";
};

// center paddles vertically
leftPaddle.style.top = height / 2 - 100 + px;
rightPaddle.style.top = height / 2 - 100 + px;

// move paddle divs according to keystrokes
function keyPressed() {
  // moves paddle up until border when w key pressed
  if (key[87]) {
    if (rmv(leftPaddle.style.top) - paddleSpeed <= 0) {
      leftPaddle.style.top = 0 + px;
    } else {
      leftPaddle.style.top = rmv(leftPaddle.style.top) - paddleSpeed + px;
    }
  }

  // moves paddle down until border when s key pressed
  if (key[83]) {
    if (rmv(leftPaddle.style.top) + paddleSpeed > height - paddleHeight) {
      leftPaddle.style.top = height - paddleHeight + px;
    } else {
      leftPaddle.style.top = rmv(leftPaddle.style.top) + paddleSpeed + px;
    }
  }

  // moves paddle down until border when arrowup key pressed
  if (key[38]) {
    if (rmv(rightPaddle.style.top) - paddleSpeed <= 0) {
      rightPaddle.style.top = 0 + px;
    } else {
      rightPaddle.style.top = rmv(rightPaddle.style.top) - paddleSpeed + px;
    }
  }

  // moves paddle down until border when arrowdown key pressed
  if (key[40]) {
    if (rmv(rightPaddle.style.top) + paddleSpeed > height - paddleHeight) {
      rightPaddle.style.top = height - paddleHeight + px;
    } else {
      rightPaddle.style.top = rmv(rightPaddle.style.top) + paddleSpeed + px;
    }
  }
}


setInterval(function () {
  keyPressed();
}, 10);
