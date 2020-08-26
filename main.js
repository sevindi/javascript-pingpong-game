let stickLeft = document.getElementById("stickLeft");
let stickRight = document.getElementById("stickRight");

stickLeft.style.top = window.innerHeight / 2 + "px";
stickRight.style.top = windows.innerHeight / 2 + "px";

document.onkeydown = function (k) {
  switch (k.keyCode) {
    case 87:
      stickLeft.style.top = +10;
  }
};
