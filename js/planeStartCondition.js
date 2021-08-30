const circle = document.querySelector(".startEnIc");
const oynak = document.querySelector(".oynak");
const basarili = document.querySelector("h6");
const yazı = document.querySelector("h2");
let x = 1,
  left = 0,
  ileri = true,
  stop1 = false,
  circleBiggerCondition = true;
export let startCondition = false;

export const circleBigger = () => {
  const circleInterval = setInterval(() => {
    if (x > 1.66) x = 1;
    if (circleBiggerCondition === false) clearInterval(circleInterval);
    circle.style.transform = `scale(${x})`;
    x = x + 0.01;
  }, 10);
};

const backToFirstCondition = (text) => {
  yazı.innerText = `${text}`;
  basarili.style.opacity = "0";
  circleBiggerCondition = true;
  x = 1;
  left = 0;
  stop1 = true;
  circleBigger();
};

const oynakf = () => {
  const sagaKay = setInterval(() => {
    if (stop1) clearInterval(sagaKay);
    if (left < 19 && ileri) {
      oynak.style.left = `${left}vw`;
      left = left + 0.2;
    } else {
      oynak.style.left = `${left}vw`;
      left = left - 0.2;
      ileri = false;
      if (left <= 0) ileri = true;
    }
  }, 10);
};

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 32) {
    if (circleBiggerCondition) {
      console.log("burda");
      if (x > 1.33 && x < 1.66) {
        basarili.innerText = "Start Başarılı";
        basarili.style.opacity = "1";
        yazı.innerText =
          "Siyah işaret iki siyah çubuğun arasına geldiği zaman space (boşluk) tuşuna basın...";
        circleBiggerCondition = false;
        stop1 = false;
        oynakf();
      } else {
        basarili.innerText = "No-Start";
        basarili.style.opacity = "1";
        x = 1;
      }
    } else {
      if (left > 13 && left < 14) {
        stop1 = true;
        yazı.innerText = "Motor Çalıştı. (D tuşu ile hızlanabilirsiniz.)";
        startCondition = true;
        circleBiggerCondition = false;
      } else if (left < 13)
        backToFirstCondition("Düşük güç verildi-Hugh Start Durumu Oluştu...");
      else
        backToFirstCondition("Yüksek Güç Verildi-Hot Start Durumu Oluştu...");
    }
  }
});

export const resetStartCondition = () => {
  basarili.style.opacity = "0";
  yazı.innerText =
    "Daire iki çemberin arasında kaldığı anda space (boşluk) tuşuna basın...";
  circleBiggerCondition = true;
  stop1 = false;
  x = 1;
  left = 0;
  ileri = true;
  startCondition = false;
};
