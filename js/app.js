import { lamps, lampOnOff } from "./lamps.js";
import {
  startCondition,
  resetStartCondition,
  circleBigger,
} from "./planeStartCondition.js";
import {
  speed,
  player,
  gameStart,
  resetPlane,
  ucakYukseklik,
} from "./planeClass.js";
import { spawnObstacle, obstacles, resetObstacle } from "./obstacle.js";
import { resetIndicator } from "./indicators.js";
export let keys = {};

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const modeValue = document.querySelector("#mode");
const scoreValue = document.querySelector("#score");
const highScoreValue = document.querySelector("#highScore");
let spawnTimer = 140,
  lampOnOffTimer = 50;
let score = 0,
  highScore = 0;

document.addEventListener("keydown", (e) => {
  if (startCondition) keys[e.code] = true;
});
document.addEventListener("keyup", (e) => {
  if (startCondition) keys[e.code] = false;
});

/* Puan - Mod */
const scoreCalc = () => {
  if (speed < 10) score = score + 0.03;
  else score = score + speed * 0.003;
  scoreValue.innerText = `${Math.floor(score)}`;
};

const mode = () => {
  if (speed < 19) modeValue.innerText = `IDLE`;
  else if (speed < 83) modeValue.innerText = `MIL`;
  else modeValue.innerText = `AB`;
};

export const gameOver = () => {
  alert("Oyun Bitti");
  spawnTimer = 140;
  if (score > highScore) {
    highScore = Math.floor(score);
    window.localStorage.setItem("highScore", highScore);
    highScoreValue.innerText = `${highScore}`;
  }
  score = 0;
  keys["KeyW"] = false;
  keys["KeyS"] = false;
  keys["KeyA"] = false;
  keys["KeyD"] = false;
  lamps();
  modeValue.innerText = `IDLE`;
  scoreValue.innerText = `0`;
  resetObstacle();
  resetPlane();
  resetStartCondition();
  resetIndicator();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circleBigger();
};

export const Update = () => {
  if (gameStart) {
    --spawnTimer;
    --lampOnOffTimer;
    if (spawnTimer <= 0) {
      spawnObstacle();
      spawnTimer = 140;
    }
    if (lampOnOffTimer <= 0) {
      lampOnOff();
      lampOnOffTimer = 50;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < obstacles.length; ++i) {
      let o = obstacles[i];
      if (o !== null) {
        o.Update();
        if (
          player.x < o.x + o.w &&
          player.x + player.w > o.x &&
          player.y < o.y + o.h &&
          player.y + player.h > o.y
        ) {
          gameOver();
          player.x = 0;
          player.y = canvas.height - ucakYukseklik;
        }
        if (o.x + o.w < 0) o = null;
      }
    }
    scoreCalc();
    if (speed > 70 && speed < 90) {
      player.SmokeDrawFirstLevel();
      player.ShakeFirstLevel();
    }
    if (speed >= 90) {
      player.SmokeDrawFirstLevel();
      player.SmokeDrawSecondLevel();
      player.ShakeSecondLevel();
    }
    lamps();
    mode();
  }
  player.Animate();
  requestAnimationFrame(Update);
};

export const start = () => {
  if (localStorage.getItem("highScore"))
    highScore = localStorage.getItem("highScore");
  highScoreValue.innerText = `${highScore}`;
  requestAnimationFrame(Update);
};
