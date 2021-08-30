const btnInfo = document.querySelector("button");
const plane = document.querySelector("#plane");
const f_page = document.querySelector(".firstPage");
const info = document.querySelector(".information");
const btnStart = document.querySelector("#start");
const gameSec = document.querySelector("#gameSection");
import { start as startFuc } from "./app.js";
import { circleBigger } from "./planeStartCondition.js";

/*Giris sayfası uçak animasyonu */
let start = false;
const animation = setInterval(() => {
  if (start) clearInterval(animation);
  reset_animation();
}, 8000);

function reset_animation() {
  plane.style.animation = "none";
  plane.offsetHeight;
  plane.style.animation = null;
}

/* Giris ve Bilgilendirme Sayfası*/
btnInfo.addEventListener("click", () => {
  plane.classList.add("opacity");
  f_page.style.transform = `translateY(-100%)`;
  info.style.transform = `translateY(-100%)`;
  info.addEventListener("transitionend", () => {
    plane.remove();
    btnStart.addEventListener("click", () => {
      info.style.transform = `translate(100%, -100%)`;
      info.addEventListener("transitionend", () => {
        f_page.remove();
        info.remove();
        startFuc();
        circleBigger();
        start = true;
        gameSec.classList.add("opacity_off");
      });
    });
  });
});
