const lights = document.querySelectorAll(".circle");
import { speed } from "./planeClass.js";
let black = false;

export function lamps() {
  if (speed < 20) {
    lights[5].style.backgroundColor = "black";
    lights[9].style.backgroundColor = "white";
  } else {
    lights[5].style.backgroundColor = "white";
    lights[9].style.backgroundColor = "black";
  }
  if (speed > 20 && speed < 70) {
    lights[7].style.backgroundColor = "white";
    lights[6].style.backgroundColor = "black";
  } else lights[6].style.backgroundColor = "white";
  if (speed < 40) lights[8].style.backgroundColor = "black";
  else lights[8].style.backgroundColor = "white";
}
export function lampOnOff() {
  if (speed > 70) {
    if (black) {
      lights[7].style.backgroundColor = "white";
      black = false;
    } else {
      lights[7].style.backgroundColor = "black";
      black = true;
    }
  }
}
