let leftPlayer = document.getElementById("leftPlayer");
let rightPlayer = document.getElementById("rightPlayer");

leftPlayer.style.top = window.innerHeight / 2 + "px";
rightPlayer.style.top = window.innerHeight / 2 + "px";

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 87:
      console.log("w");
      break;
    case 83:
      console.log("s");
      break;
    case 38:
      console.log("up");
      break;
    case 40:
      console.log("down");
      break;
  }
};
