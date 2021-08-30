import { keys } from "./app.js";
import { speed } from "./planeClass.js";

let oilImlec = null,
  rpmImlec = null,
  throttleImlec = null,
  ftitImlec = null;
let rotateFtit = 0,
  rotateOil = 0,
  rotateRpm = 0;
let newSpeed = 21;

const styleImlec = (imlec) => {
  imlec.style.transition = "transform .75s linear";
  imlec.style.transformOrigin = "center";
};

export const indicators = () => {
  if (keys["KeyD"] && newSpeed == speed) {
    if (speed > 20 && speed < 31) {
      rotateRpm = rotateRpm + 11.37;
      rotateOil = rotateOil + 0.946;
      rotateFtit = rotateFtit + 2.16;
      ++newSpeed;
    } else if (speed < 41) {
      rotateRpm = rotateRpm + 5.68;
      rotateOil = rotateOil + 0.958;
      rotateFtit = rotateFtit + 4.54;
      ++newSpeed;
    } else if (speed < 51) {
      rotateRpm = rotateRpm + 3.62;
      rotateOil = rotateOil + 0.771;
      rotateFtit = rotateFtit + 4.22;
      ++newSpeed;
    } else if (speed < 61) {
      rotateRpm = rotateRpm + 2.79;
      rotateOil = rotateOil + 0.81;
      rotateFtit = rotateFtit + 4.22;
      ++newSpeed;
    } else if (speed < 71) {
      rotateRpm = rotateRpm + 2.7;
      rotateOil = rotateOil + 1;
      rotateFtit = rotateFtit + 5.95;
      ++newSpeed;
    } else if (speed < 81) {
      rotateRpm = rotateRpm + 2.17;
      rotateOil = rotateOil + 0.738;
      rotateFtit = rotateFtit + 4.33;
      ++newSpeed;
    } else if (speed < 91) {
      rotateRpm = rotateRpm + 1.13;
      rotateOil = rotateOil + 0.515;
      rotateFtit = rotateFtit + 3.03;
      ++newSpeed;
    } else if (speed < 101) {
      rotateRpm = rotateRpm + 0.1;
      rotateOil = rotateOil + 6.75;
      rotateFtit = rotateFtit + 1.4;
      ++newSpeed;
    } else if (speed < 111) {
      rotateRpm = rotateRpm + 0.07;
      rotateOil = rotateOil + 6.95;
      rotateFtit = rotateFtit + 0.032;
      ++newSpeed;
    } else if (speed < 121) {
      rotateRpm = rotateRpm + 0.04;
      rotateOil = rotateOil + 7.37;
      rotateFtit = rotateFtit + 0.59;
      if (rotateFtit > 300) rotateFtit = 300;
      ++newSpeed;
    } else if (speed <= 127 && rotateRpm <= 300) {
      rotateRpm = rotateRpm + 0.55;
      rotateOil = rotateOil + 4.5;
      rotateFtit = rotateFtit - 0.75;
      ++newSpeed;
      if (speed == 127) {
        newSpeed = 127;
      }
    }
    rpmImlec.style.transform = `rotate(${rotateRpm}deg)`;
    oilImlec.style.transform = `rotate(${rotateOil}deg)`;
    ftitImlec.style.transform = `rotate(${rotateFtit}deg)`;
  }
  if (keys["KeyA"] && newSpeed - 1 == speed) {
    if (speed > 20 && speed < 31) {
      rotateRpm = rotateRpm - 11.37;
      rotateOil = rotateOil - 0.946;
      rotateFtit = rotateFtit - 2.16;
      if (rotateRpm < 0) rotateRpm = 0;
      if (rotateOil < 0) rotateOil = 0;
      if (rotateFtit < 0) rotateFtit = 0;
      --newSpeed;
    } else if (speed < 41) {
      rotateRpm = rotateRpm - 5.68;
      rotateOil = rotateOil - 0.958;
      rotateFtit = rotateFtit - 4.54;
      --newSpeed;
    } else if (speed < 51) {
      rotateRpm = rotateRpm - 3.62;
      rotateOil = rotateOil - 0.771;
      rotateFtit = rotateFtit - 4.22;
      --newSpeed;
    } else if (speed < 61) {
      rotateRpm = rotateRpm - 2.79;
      rotateOil = rotateOil - 0.81;
      rotateFtit = rotateFtit - 4.22;
      --newSpeed;
    } else if (speed < 71) {
      rotateRpm = rotateRpm - 2.7;
      rotateOil = rotateOil - 1;
      rotateFtit = rotateFtit - 5.95;
      --newSpeed;
    } else if (speed < 81) {
      rotateRpm = rotateRpm - 2.17;
      rotateOil = rotateOil - 0.738;
      rotateFtit = rotateFtit - 4.33;
      --newSpeed;
    } else if (speed < 91) {
      rotateRpm = rotateRpm - 1.13;
      rotateOil = rotateOil - 0.515;
      rotateFtit = rotateFtit - 3.03;
      --newSpeed;
    } else if (speed < 101) {
      rotateRpm = rotateRpm - 0.1;
      rotateOil = rotateOil - 6.75;
      rotateFtit = rotateFtit - 1.4;
      --newSpeed;
    } else if (speed < 111) {
      rotateRpm = rotateRpm - 0.07;
      rotateOil = rotateOil - 6.95;
      rotateFtit = rotateFtit - 0.032;
      --newSpeed;
    } else if (speed < 121) {
      rotateRpm = rotateRpm - 0.04;
      rotateOil = rotateOil - 7.37;
      rotateFtit = rotateFtit - 0.59;
      --newSpeed;
    } else if (speed < 128) {
      rotateRpm = rotateRpm - 0.55;
      rotateOil = rotateOil - 4.5;
      rotateFtit = rotateFtit + 0.75;
      --newSpeed;
    }
    if (speed < 21) {
      rotateRpm = 0;
      rotateOil = 0;
      rotateFtit = 0;
    }
    rpmImlec.style.transform = `rotate(${rotateRpm}deg)`;
    oilImlec.style.transform = `rotate(${rotateOil}deg)`;
    ftitImlec.style.transform = `rotate(${rotateFtit}deg)`;
  }
  throttleImlec.style.transform = `rotate(${speed * 2.36}deg)`;
};

window.onload = () => {
  const oilPressureIndicator = document.getElementById("oilPressureIndicator");
  const oilPressureDoc = oilPressureIndicator.contentDocument;
  oilImlec = oilPressureDoc.getElementById("imlecOil");
  styleImlec(oilImlec);
  const rpmIndicator = document.getElementById("rpmIndicator");
  const rpmDoc = rpmIndicator.contentDocument;
  rpmImlec = rpmDoc.getElementById("imlecRpm");
  styleImlec(rpmImlec);
  const ftitIndıcator = document.getElementById("ftitIndicator");
  const ftitDoc = ftitIndıcator.contentDocument;
  ftitImlec = ftitDoc.getElementById("imlecFtit");
  styleImlec(ftitImlec);
  const throttleIndıcator = document.getElementById("throttleIndicator");
  const throttleDoc = throttleIndıcator.contentDocument;
  throttleImlec = throttleDoc.getElementById("imlecThrottle");
  styleImlec(throttleImlec);
};
export const resetIndicator = () => {
  newSpeed = 21;
  oilImlec.style.transform = `rotate(0deg)`;
  rpmImlec.style.transform = `rotate(0deg)`;
  ftitImlec.style.transform = `rotate(0deg)`;
  throttleImlec.style.transform = `rotate(0deg)`;
  rotateOil = 0;
  rotateRpm = 0;
  rotateFtit = 0;
};
