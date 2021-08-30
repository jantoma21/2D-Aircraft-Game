import { gameSpeed } from "./planeClass.js";
export let obstacles = [];

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const agacUzunluk = Math.floor(canvas.width / 12.8),
  agacYukseklik = Math.floor(canvas.height / 3.96);
const dagYukseklik = Math.floor(canvas.height / 2),
  dagUzunluk = Math.floor(canvas.width / 7.68);
const kusYukseklik = Math.floor(canvas.height / 5.96),
  kusUzunluk = Math.floor(canvas.width / 19.2);
let trees = [],
  mountains = [],
  birds = [];
let i = 0,
  j = 0,
  k = 0;

class Obstacle {
  constructor(o, x, y, w, h, t, t2) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = t;
    this.type2 = t2;
    this.object = o;
  }
  Update() {
    this.dx = -gameSpeed;
    this.x += this.dx;
    this.x = parseFloat(this.x.toFixed(3));
    this.Draw();
  }
  Draw() {
    ctx.beginPath();
    if (this.type === 0)
      ctx.drawImage(this.object, this.x, this.y, this.w, this.h);
    else if (this.type === 1)
      ctx.drawImage(this.object, this.x, this.y, this.w, this.h);
    else ctx.drawImage(this.object, this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}

export const spawnObstacle = () => {
  const type = Math.floor(Math.random() * 3);
  const type2 = Math.floor(Math.random() * 3) + 1;
  const positionX = Math.floor(Math.random() * canvas.width + canvas.width);
  const positionY = Math.floor(Math.random() * 200);
  if (type == 0) {
    trees[i] = new Image();
    trees[i].src = `./images/background/tree${type2}.png`;
    const tree = new Obstacle(
      trees[i],
      positionX,
      canvas.height - agacYukseklik,
      agacUzunluk,
      agacYukseklik,
      type,
      type2
    );
    obstacles.push(tree);
    ++i;
  } else if (type === 1) {
    mountains[j] = new Image();
    mountains[j].src = `./images/background/mountain${type2}.png`;
    const mountain = new Obstacle(
      mountains[j],
      positionX,
      canvas.height - dagYukseklik,
      dagUzunluk,
      dagYukseklik,
      type,
      type2
    );
    obstacles.push(mountain);
    ++j;
  } else {
    birds[k] = new Image();
    birds[k].src = `./images/background/bird.png`;
    const bird = new Obstacle(
      birds[k],
      positionX,
      positionY,
      kusUzunluk,
      kusYukseklik,
      2,
      1
    );
    obstacles.push(bird);
    ++k;
  }
};

export const resetObstacle = () => {
  obstacles = [];
};
