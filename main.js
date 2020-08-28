let leftPlayer = document.getElementById("leftPlayer");
let rightPlayer = document.getElementById("rightPlayer");

let ball = document.getElementById("ball");

let leftScore = document.getElementById("leftScore");
let rightScore = document.getElementById("rightScore");

let innerHeight = window.innerHeight;
let innerWidth = window.innerWidth;

function addPx(num) {
  return num + "px";
}

leftPlayer.style.top = innerHeight / 2 + "px";
rightPlayer.style.top = innerHeight / 2 + "px";

document.onkeydown = function (k) {
  switch (k.keyCode) {
    case 87:
      if (parseInt(leftPlayer.style.top) <= 0) {
        leftPlayer.style.top = leftPlayer.style.top;
      } else leftPlayer.style.top = parseInt(leftPlayer.style.top) - 30 + "px";
      break;
    case 83:
      if (parseInt(leftPlayer.style.top) + 150 >= innerHeight) {
        leftPlayer.style.top = leftPlayer.style.top;
      } else leftPlayer.style.top = parseInt(leftPlayer.style.top) + 30 + "px";
      break;
    case 38:
      if (parseInt(rightPlayer.style.top) <= 0) {
        rightPlayer.style.top = rightPlayer.style.top;
      } else
        rightPlayer.style.top = parseInt(rightPlayer.style.top) - 30 + "px";
      break;
    case 40:
      if (parseInt(rightPlayer.style.top) + 150 >= innerHeight) {
        rightPlayer.style.top = rightPlayer.style.top;
      } else
        rightPlayer.style.top = parseInt(rightPlayer.style.top) + 30 + "px";
      break;
  }
};
