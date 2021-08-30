import { keys, gameOver } from "./app.js";
import { indicators } from "./indicators.js";
export let gameSpeed = 0;
export let gameStart = false;
export let speed = 0;
const speedValue = document.querySelector("#speed");
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = (window.innerHeight * 55) / 100;
const ucakTop = Math.floor(canvas.height - canvas.height / 11.88);
export const ucakYukseklik = Math.floor(canvas.height / 11.88);
const ucakUzunluk = Math.floor(canvas.width / 12.8);
const ctx = canvas.getContext("2d");
let shake = false;

class Player {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.grounded = false;
  }
  Animate() {
    if (keys["KeyW"]) this.Up();
    else if (keys["KeyS"]) this.Down();
    else if (keys["KeyD"]) this.Right();
    else if (keys["KeyA"]) this.Left();
    else {
    }
    this.Draw();
  }
  Draw() {
    ctx.beginPath();
    const img = new Image();
    img.src = "./images/aircraft.png";
    ctx.drawImage(img, this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
  Up() {
    if (this.y > 0 && speed >= 10) {
      this.grounded = true;
      if (speed < 15) this.y = this.y - 1;
      else if (speed >= 15 && speed < 35) this.y = this.y - 2;
      else if (speed >= 35 && speed < 55) this.y = this.y - 4;
      else if (speed >= 55 && speed < 75) this.y = this.y - 8;
      else if (speed >= 75) this.y = this.y - 10;
      else {
      }
    }
  }
  Down() {
    if (this.grounded && this.y >= canvas.height - ucakYukseklik) {
      gameOver();
      this.x = 0;
      this.y = ucakTop;
    }
    if (this.y < canvas.height - ucakYukseklik) {
      if (speed >= 10 && speed < 15) this.y = this.y + 1;
      else if (speed >= 15 && speed < 35) this.y = this.y + 2;
      else if (speed >= 35 && speed < 55) this.y = this.y + 4;
      else if (speed >= 55 && speed < 75) this.y = this.y + 8;
      else if (speed >= 75) this.y = this.y + 10;
      else {
      }
    }
  }
  Right() {
    gameStart = true;
    if (speed < 127) {
      gameSpeed = gameSpeed + 0.01;
      gameSpeed = parseFloat(gameSpeed.toFixed(3));
      speed = Math.floor(gameSpeed / 0.3);
      indicators();
      speedValue.innerText = `${speed}`;
    }
  }
  Left() {
    if (speed > 0) {
      gameSpeed = gameSpeed - 0.01;
      gameSpeed = parseFloat(gameSpeed.toFixed(3));
      const lowSpeed = setInterval(() => {
        if (speed > 15 || speed === 0) clearInterval(lowSpeed);
        else {
          if (this.y < canvas.height - ucakYukseklik) this.y = this.y + 0.1;
          else {
            gameOver();
            this.x = 0;
            this.y = canvas.height - ucakYukseklik;
          }
        }
      }, 50);
      speed = Math.floor(gameSpeed / 0.3);
      indicators();
      speedValue.innerText = `${speed}`;
    }
  }
  SmokeDrawFirstLevel() {
    ctx.beginPath();
    const smoke = new Image();
    smoke.src = `./images/background/smoke.png`;
    ctx.drawImage(
      smoke,
      this.x + this.w / 4,
      this.y - ucakYukseklik / 8,
      this.w / 2,
      this.h / 2
    );
    ctx.closePath();
  }
  SmokeDrawSecondLevel() {
    ctx.beginPath();
    const smoke2 = new Image();
    smoke2.src = `./images/background/smoke2.png`;
    ctx.drawImage(
      smoke2,
      this.x + this.w / 8,
      this.y + (9 * ucakYukseklik) / 10,
      this.w / 2,
      this.h / 2
    );
    ctx.closePath();
  }
  ShakeFirstLevel() {
    if (shake === false && gameStart) {
      let up = false;
      shake = true;
      const planeShake = setInterval(() => {
        if (up === false && this.y < canvas.height - ucakYukseklik) {
          if (speed < 80) this.y = this.y + 3;
          else this.y = this.y + 5;
          up = true;
          if (this.y >= canvas.height - ucakYukseklik) {
            gameOver();
            this.x = 0;
            this.y = ucakTop;
          }
        } else {
          if (speed < 80) this.y = this.y - 2;
          else this.y = this.y - 3;
          up = false;
        }
        if (gameStart === false || speed >= 90 || speed < 70) {
          if (speed < 70) shake = false;
          clearInterval(planeShake);
        }
      }, 100);
    }
  }
  ShakeSecondLevel() {
    if (shake) {
      let up = false;
      shake = false;
      let planeShake = setInterval(() => {
        if (gameStart) {
          if (up === false) {
            if (this.y < canvas.height - ucakYukseklik) {
              if (speed < 100) this.y = this.y + 8;
              else if (speed < 110) this.y = this.y + 12;
              else this.y = this.y + 20;
              up = true;
              if (this.y >= canvas.height - ucakYukseklik) {
                gameOver = true;
                this.x = 0;
                this.y = ucakTop;
              }
            }
          } else {
            if (speed < 100) this.y = this.y - 5;
            else if (speed < 110) this.y = this.y - 7;
            else this.y = this.y - 9;
            up = false;
          }
          if (gameStart === false || speed < 90) {
            clearInterval(planeShake);
          }
        }
      }, 100);
    }
  }
}

export const resetPlane = () => {
  gameStart = false;
  gameSpeed = 0;
  speed = 0;
  shake = false;
  speedValue.innerText = `0`;
};

export const player = new Player(0, ucakTop, ucakUzunluk, ucakYukseklik);
