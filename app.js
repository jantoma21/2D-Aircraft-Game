    const plane = document.querySelector('#plane');
    const btnInfo = document.querySelector('button');
    const f_page = document.querySelector('.f_page');
    const imlec_oil = document.querySelectorAll('#imlec_oil');
    const imlec_rpm = document.querySelectorAll('#imlec_rpm');
    const imlec_throttle = document.querySelectorAll('#imlec_throttle');
    const imlec_ftit = document.querySelectorAll('#imlec_ftit');
    const lights = document.querySelectorAll('.circle');
    const speedValue = document.querySelector('#speed');
    const modeValue = document.querySelector('#mode');
    const scoreValue = document.querySelector('#score');
    const highScoreValue = document.querySelector('#highScore');
    const info = document.querySelector('.information');
    const btnStart = document.querySelector('#start');
    const gameSec = document.querySelector('#gameSection');
    const circle = document.querySelector('.startEnIc');
    const yazı = document.querySelector('h2');
    const basarili = document.querySelector('h6');
    const oynak = document.querySelector('.oynak');
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    let speed = 0;
    let gameSpeed;
    let player;
    let obstacles = [];
    let keys = {};
    var gameStart = false;
    var score = 0;
    var highScore = 0;
    var startCondition = false;
    let ucakTop = 0;
    let ucakUzunluk = 0;
    let ucakYukseklik = 0;
    let ucakX = 0;
    let agacUzunluk = 0;
    let agacYukseklik = 0;
    let dagYukseklik = 0;
    let dagUzunluk = 0;
    let kusYukseklik = 0;
    let kusUzunluk = 0;
    var sayac = 0;
    /* Giris ve Bilgilendirme Sayfası*/

    /*Giris sayfası uçak animasyonu */

    setInterval(reset_animation, 8000);
    console.log(window.innerHeight, window.innerWidth);

    function reset_animation() {
        plane.style.animation = 'none';
        plane.offsetHeight;
        plane.style.animation = null;
    }
    btnInfo.addEventListener('click', () => {
        plane.classList.add('opacity');
        f_page.style.transform = `translateY(-100%)`;
        info.style.transform = `translateY(-100%)`;
        info.addEventListener('transitionend', () => {
            plane.remove();
            btnStart.style.cursor = 'pointer';
            btnStart.addEventListener('click', () => {
                info.style.transform = `translate(100%, -100%)`;
                info.addEventListener('transitionend', () => {
                    f_page.remove();
                    info.remove();
                    Start();
                    gameSec.classList.add('opacity_off');
                })
            })
        })
    });
    /* Giris ve Bilgilendirme Sayfası Bitis*/
    var shake = false;
    /* Uçağın Ana Fonksiyonları */

    document.addEventListener('keydown', (e) => {
        if (startCondition === true)
            keys[e.code] = true;
    })
    document.addEventListener('keyup', (e) => {
        if (startCondition === true)
            keys[e.code] = false;
    })
    class Player {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.grounded = false;
        }
        Animate() {
            if (keys['KeyW']) {
                if (speed >= 10) {
                    this.grounded = true;
                    this.Up();
                }
            } else if (keys['KeyS']) {
                this.Down();
            } else if (keys['KeyD']) {
                gameStart = true;
                if (speed < 127)
                    this.Right();
            } else if (keys['KeyA']) {
                if (speed > 0)
                    this.Left();
            }
            this.Draw();
        }
        Draw() {
            ctx.beginPath();
            var img = new Image()
            img.src = './images/aircraft.png';
            ctx.drawImage(img, this.x, this.y, this.w, this.h);
            ctx.closePath();
        }
        SmokeDrawFirstLevel() {
            ctx.beginPath();
            var smoke = new Image();
            smoke.src = `./images/background/smoke.jpg`;
            ctx.drawImage(smoke, this.x + this.w / 4, this.y - ucakYukseklik / 8, this.w / 2, this.h / 2)
            ctx.closePath();
        }
        SmokeDrawSecondLevel() {
            ctx.beginPath();
            var smoke2 = new Image();
            smoke2.src = `./images/background/smoke2.jpg`;
            ctx.drawImage(smoke2, this.x + this.w / 8, this.y + 9 * ucakYukseklik / 10, this.w / 2, this.h / 2)
            ctx.closePath();
        }
        ShakeFirstLevel() {
            var randomShake = Math.random() * 1200;
            if (randomShake < 1)
                shake = false;
            if (shake === false && sayac === 0) {
                var up = false;
                shake = true;
                var planeShake = setInterval(() => {
                    if (gameStart === true) {
                        sayac += 1;
                        if (up === false) {
                            if (this.y < canvas.height - ucakYukseklik) {
                                if (speed < 80)
                                    this.y = this.y + 3;
                                else
                                    this.y = this.y + 5;
                                up = true;
                            }
                        } else {
                            if (speed < 80)
                                this.y = this.y - 2;
                            else
                                this.y = this.y - 3;
                            up = false;
                        }
                        if (sayac === 100 || gameStart === false || speed >= 90 || speed < 70) {
                            if (speed >= 90)
                                shake = false;
                            sayac = 0;
                            clearInterval(planeShake);
                        }
                    }
                }, 100)
            }
        }
        ShakeSecondLevel() {
            var randomShake = Math.random() * 300;
            if (randomShake < 1)
                shake = false;
            if (shake === false && sayac === 0) {
                var up = false;
                shake = true;
                var planeShake = setInterval(() => {
                        if (gameStart === true) {
                            sayac += 1;
                            if (up === false) {
                                if (this.y < canvas.height - ucakYukseklik) {
                                    if (speed < 100)
                                        this.y = this.y + 8;
                                    else if (speed < 110)
                                        this.y = this.y + 12;
                                    else
                                        this.y = this.y + 20;
                                    up = true;
                                }
                            } else {
                                if (speed < 100)
                                    this.y = this.y - 5;
                                else if (speed < 110)
                                    this.y = this.y - 7;
                                else
                                    this.y = this.y - 9;
                                up = false;
                            }
                            if (sayac === 100 || gameStart === false || speed < 90) {
                                sayac = 0;
                                clearInterval(planeShake);
                            }
                        }
                    },
                    100)
            }
        }
        Up() {
            if (this.y > 0) {
                if (speed >= 10 && speed < 15)
                    this.y = this.y - 1;
                else if (speed >= 15 && speed < 35)
                    this.y = this.y - 2;
                else if (speed >= 35 && speed < 55)
                    this.y = this.y - 4;
                else if (speed >= 55 && speed < 75)
                    this.y = this.y - 8;
                else if (speed >= 75)
                    this.y = this.y - 10;
            }
        }
        Down() {
            if (this.grounded === true && this.y >= canvas.height - ucakYukseklik) {
                gameOver();
                this.x = 0;
                this.y = ucakTop;
            }
            if (this.y < canvas.height - ucakYukseklik) {
                if (speed >= 10 && speed < 15)
                    this.y = this.y + 1;
                else if (speed >= 15 && speed < 35)
                    this.y = this.y + 2;
                else if (speed >= 35 && speed < 55)
                    this.y = this.y + 4;
                else if (speed >= 55 && speed < 75)
                    this.y = this.y + 8;
                else if (speed >= 75)
                    this.y = this.y + 10;
            }
        }
        Right() {
            gameSpeed = gameSpeed + 0.1;
            speed = Math.floor(gameSpeed / 3);
            speedValue.innerText = `${speed}`;
            // indicators();
            // lamps();
            // mode();
        }
        Left() {
            gameSpeed = gameSpeed - 0.1;
            let lowSpeed = setInterval(() => {
                if (speed > 15 || speed === 0)
                    clearInterval(lowSpeed);
                else {
                    if (this.y < canvas.height - ucakYukseklik)
                        this.y = this.y + 0.1;
                    else {
                        gameOver();
                        this.x = 0;
                        this.y = canvas.height - ucakYukseklik;
                    }
                }

            }, 50);
            speed = Math.floor(gameSpeed / 3);
            speedValue.innerText = `${speed}`;
            //     indicators();
            //     lamps();
            //     mode();
        }
    }
    class Obstacle {
        constructor(x, y, w, h, t, t2) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.type = t;
            this.dx = -gameSpeed;
            this.type2 = t2;
        }
        Update() {
            this.x += this.dx;
            this.Draw();
            this.dx = -gameSpeed * 0.1;
        }
        Draw() {
            ctx.beginPath();
            if (this.type === 0) {
                var treeImg = new Image();
                treeImg.src = `./images/background/tree${this.type2}.jpg`;
                ctx.drawImage(treeImg, this.x, this.y, this.w, this.h);

            } else if (this.type === 1) {
                var mountainImg = new Image();
                mountainImg.src = `./images/background/mountain${this.type2}.jpg`;
                ctx.drawImage(mountainImg, this.x, this.y, this.w, this.h);
            } else {
                var birdImg = new Image();
                birdImg.src = `./images/background/bird.jpg`;
                ctx.drawImage(birdImg, this.x, this.y, this.w, this.h);
            }
            ctx.closePath();
        }

    }

    function SpawnObstacle() {
        var type = Math.floor(Math.random() * 3);
        var type2 = Math.floor(Math.random() * 3) + 1;
        var positionX = Math.random() * canvas.width + canvas.width + 600;
        var positionY = Math.floor(Math.random() * 200);
        if (type == 0) {
            let tree = new Obstacle(positionX, canvas.height - agacYukseklik, agacUzunluk, agacYukseklik, type, type2);
            obstacles.push(tree);

        } else if (type === 1) {
            let mountain = new Obstacle(positionX, canvas.height - dagYukseklik, dagUzunluk, dagYukseklik, type, type2);
            obstacles.push(mountain);

        } else {
            let bird = new Obstacle(positionX, positionY, kusUzunluk, kusYukseklik, 2, 1);
            obstacles.push(bird);
        }
    }

    function Start() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 55 / 100;
        gameSpeed = 0;
        ucakTop = canvas.height - canvas.height / 11.88;
        ucakYukseklik = canvas.height / 11.88;
        ucakUzunluk = canvas.width / 12.8;
        agacYukseklik = canvas.height / 3.96;
        agacUzunluk = canvas.width / 12.8;
        dagYukseklik = canvas.height / 2;
        dagUzunluk = canvas.width / 7.68;
        kusYukseklik = canvas.height / 5.96;
        kusUzunluk = canvas.width / 19.2;
        player = new Player(0, ucakTop, ucakUzunluk, ucakYukseklik);
        if (localStorage.getItem('highScore'))
            highScore = localStorage.getItem('highScore');
        highScoreValue.innerText = `${highScore}`;
        requestAnimationFrame(Update);
    }
    let spawnTimer = 160;

    function Update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (gameStart === true) {
            spawnTimer -= 1;
            if (spawnTimer <= 0) {
                SpawnObstacle();
                spawnTimer = 140;
            }
            for (let i = 0; i < obstacles.length; ++i) {
                let o = obstacles[i];
                if (obstacles[i] != 1) {
                    o.Update();
                    if (o.x + o.w < 0) {
                        obstacles[i] = 1;
                        // obstacles.splice(i, 1);
                    }
                }
                if (player.x < o.x + o.w && player.x + player.w > o.x && player.y < o.y + o.h && player.y + player.h > o.y) {
                    gameOver();
                    player.x = 0;
                    player.y = canvas.height - ucakYukseklik;
                }
            }
        }
        player.Animate();
        if (speed > 70 && speed < 90) {
            player.SmokeDrawFirstLevel();
            player.ShakeFirstLevel();
        }
        if (speed >= 90) {
            player.SmokeDrawFirstLevel();
            player.SmokeDrawSecondLevel();
            player.ShakeSecondLevel();
        }
        requestAnimationFrame(Update);
    }
    /* Uçağın Ana Fonksiyonları Bitti*/
    setInterval(mode, 2000);
    setInterval(lamps, 2000);
    setInterval(indicators, 300);

    /* Puan - Mod */

    let scoreInterval = setInterval(() => {
        score = score + speed * 0.1;
        score = Math.floor(score);
        scoreValue.innerText = `${score}`;
    }, 500)

    function mode() {
        if (speed < 19)
            modeValue.innerText = `IDLE`;
        else if (speed < 83)
            modeValue.innerText = `MIL`;
        else
            modeValue.innerText = `AB`;
    }

    /* Puan - Mod Bitti*/

    /* Göstergeler ve Lambalar */
    var black = false;

    function lampOnOff() {
        if (speed < 70) {
            lights[7].style.backgroundColor = 'white';
        } else {
            if (black === true) {
                lights[7].style.backgroundColor = 'white';
                black = false;
            } else {
                lights[7].style.backgroundColor = 'black';
                black = true;
            }
        }
    }

    setInterval(lampOnOff, 500);

    function lamps() {
        if (speed < 20) {
            lights[5].style.backgroundColor = 'black';
            lights[9].style.backgroundColor = 'white';
        } else {
            lights[5].style.backgroundColor = 'white';
            lights[9].style.backgroundColor = 'black';
        }
        if (speed > 20 && speed < 70)
            lights[6].style.backgroundColor = 'black';
        else
            lights[6].style.backgroundColor = 'white';

        if (speed < 40)
            lights[8].style.backgroundColor = 'black';
        else
            lights[8].style.backgroundColor = 'white';
    }

    var rotate_ftit = 0;
    var rotate_oil = 0;
    var rotate_rpm = 0;
    var newSpeed = 21;

    function indicators() {
        if (keys['KeyD'] === true && newSpeed == speed) {
            if (speed < 21) {
                //bos
            } else if (speed < 31) {
                rotate_rpm = rotate_rpm + 11.37;
                rotate_oil = rotate_oil + 0.946;
                rotate_ftit = rotate_ftit + 2.16;
                ++newSpeed;
            } else if (speed < 41) {
                rotate_rpm = rotate_rpm + 5.68;
                rotate_oil = rotate_oil + 0.958;
                rotate_ftit = rotate_ftit + 4.54;
                ++newSpeed;
            } else if (speed < 51) {
                rotate_rpm = rotate_rpm + 3.62;
                rotate_oil = rotate_oil + 0.771;
                rotate_ftit = rotate_ftit + 4.22;
                ++newSpeed;
            } else if (speed < 61) {
                rotate_rpm = rotate_rpm + 2.79;
                rotate_oil = rotate_oil + 0.81;
                rotate_ftit = rotate_ftit + 4.22;
                ++newSpeed;
            } else if (speed < 71) {
                rotate_rpm = rotate_rpm + 2.7;
                rotate_oil = rotate_oil + 1;
                rotate_ftit = rotate_ftit + 5.95;
                ++newSpeed;
            } else if (speed < 81) {
                rotate_rpm = rotate_rpm + 2.17;
                rotate_oil = rotate_oil + 0.738;
                rotate_ftit = rotate_ftit + 4.33;
                ++newSpeed;
            } else if (speed < 91) {
                rotate_rpm = rotate_rpm + 1.13;
                rotate_oil = rotate_oil + 0.515;
                rotate_ftit = rotate_ftit + 3.03;
                ++newSpeed;
            } else if (speed < 101) {
                rotate_rpm = rotate_rpm + 0.1;
                rotate_oil = rotate_oil + 6.75;
                rotate_ftit = rotate_ftit + 1.4;
                ++newSpeed;
            } else if (speed < 111) {
                rotate_rpm = rotate_rpm + 0.07;
                rotate_oil = rotate_oil + 6.95;
                rotate_ftit = rotate_ftit + 0.032;
                ++newSpeed;
            } else if (speed < 121) {
                rotate_rpm = rotate_rpm + 0.04;
                rotate_oil = rotate_oil + 7.37;
                rotate_ftit = rotate_ftit + 0.59;
                if (rotate_ftit > 300)
                    rotate_ftit = 300;
                ++newSpeed;
            } else if (speed <= 127 && rotate_rpm <= 300) {
                rotate_rpm = rotate_rpm + 0.55;
                rotate_oil = rotate_oil + 4.5;
                rotate_ftit = rotate_ftit - 0.75;
                ++newSpeed;
                if (rotate_rpm > 300)
                    rotate_rpm = 300;
                if (rotate_oil > 300)
                    rotate_oil = 300;
            }
        }
        if (keys['KeyA'] === true && newSpeed - 1 == speed) {
            if (speed < 21) {
                //bos
            } else if (speed < 31) {
                rotate_rpm = rotate_rpm - 11.37;
                rotate_oil = rotate_oil - 0.946;
                rotate_ftit = rotate_ftit - 2.16;
                --newSpeed;
                if (rotate_rpm < 0)
                    rotate_rpm = 0;
                if (rotate_oil < 0)
                    rotate_oil = 0;
                if (rotate_ftit < 0)
                    rotate_ftit = 0;
            } else if (speed < 41) {
                rotate_rpm = rotate_rpm - 5.68;
                rotate_oil = rotate_oil - 0.958;
                rotate_ftit = rotate_ftit - 4.54;
                --newSpeed;
            } else if (speed < 51) {
                rotate_rpm = rotate_rpm - 3.62;
                rotate_oil = rotate_oil - 0.771;
                rotate_ftit = rotate_ftit - 4.22;
                --newSpeed;
            } else if (speed < 61) {
                rotate_rpm = rotate_rpm - 2.79;
                rotate_oil = rotate_oil - 0.81;
                rotate_ftit = rotate_ftit - 4.22;
                --newSpeed;
            } else if (speed < 71) {
                rotate_rpm = rotate_rpm - 2.7;
                rotate_oil = rotate_oil - 1;
                rotate_ftit = rotate_ftit - 5.95;
                --newSpeed;
            } else if (speed < 81) {
                rotate_rpm = rotate_rpm - 2.17;
                rotate_oil = rotate_oil - 0.738;
                rotate_ftit = rotate_ftit - 4.33;
                --newSpeed;
            } else if (speed < 91) {
                rotate_rpm = rotate_rpm - 1.13;
                rotate_oil = rotate_oil - 0.515;
                rotate_ftit = rotate_ftit - 3.03;
                --newSpeed;
            } else if (speed < 101) {
                rotate_rpm = rotate_rpm - 0.1;
                rotate_oil = rotate_oil - 6.75;
                rotate_ftit = rotate_ftit - 1.4;
                --newSpeed;
            } else if (speed < 111) {
                rotate_rpm = rotate_rpm - 0.07;
                rotate_oil = rotate_oil - 6.95;
                rotate_ftit = rotate_ftit - 0.032;
                --newSpeed;
            } else if (speed < 121) {
                rotate_rpm = rotate_rpm - 0.04;
                rotate_oil = rotate_oil - 7.37;
                rotate_ftit = rotate_ftit - 0.59;
                --newSpeed;
            } else if (speed <= 127) {
                rotate_rpm = rotate_rpm - 0.55;
                rotate_oil = rotate_oil - 4.5;
                rotate_ftit = rotate_ftit + 0.75;
                --newSpeed;
            }
        }
        imlec_rpm[1].style.transform = `rotate(${rotate_rpm}deg)`;
        imlec_oil[1].style.transform = `rotate(${rotate_oil}deg)`;
        imlec_ftit[1].style.transform = `rotate(${rotate_ftit}deg)`;
        imlec_throttle[1].style.transform = `rotate(${speed * 2.36}deg)`;
    }
    /* Göstergeler ve Lambalar Bitti*/

    /* Ucak Baslangıc Arızaları */
    let x = 1;

    function circleBig() {
        let circleBigger = setInterval(() => {
            if (x > 1.66)
                x = 1;
            if (ilkKısım == false)
                clearInterval(circleBigger);
            circle.style.transform = `scale(${x})`;
            x = x + 0.01;
        }, 20);
    }
    circleBig();
    let ilkKısım = true;
    let stop1 = false;
    window.addEventListener('keydown', (e) => {
        if (ilkKısım == true) {
            if (e.keyCode == 32 && x > 1.33 && x < 1.66) {
                basarili.innerText = 'Start Başarılı';
                basarili.style.opacity = '1';
                yazı.innerText = 'Siyah işaret iki siyah çubuğun arasına geldiği zaman space (boşluk) tuşuna basın...';
                stop1 = false;
                oynakf();
                ilkKısım = false;
            } else if (e.keyCode == 32 && (x <= 1.33 || x >= 1.66)) {
                basarili.innerText = 'No-Start';
                basarili.style.opacity = '1';
                x = 1;
                clearInterval(circleBigger);
                circleBig();
            }
        } else {
            if (e.keyCode == 32 && (left > 13 && left < 14)) {
                stop1 = true;
                yazı.innerText = 'Motor Çalıştı. (D tuşu ile hızlanabilirsin.)';
                startCondition = true;
            } else if (e.keyCode == 32 && (left < 13)) {
                yazı.innerText = 'Düşük güç verildi-Hugh Start Durumu Oluştu...';
                basarili.style.opacity = '0';
                ilkKısım = true;
                x = 1;
                left = 0;
                stop1 = true;
                circleBig();

            } else if (e.keyCode == 32 && left > 15) {
                yazı.innerText = 'Yüksek Güç Verildi-Hot Start Durumu Oluştu...';
                basarili.style.opacity = '0';
                ilkKısım = true;
                x = 1;
                left = 0;
                stop1 = true;
                circleBig();
            }
        }

    })
    let left = 0;
    let ileri = true;

    function oynakf() {
        let sagaKay = setInterval(() => {
            if (stop1 === true) {
                clearInterval(sagaKay);
            }
            if (left < 19 && ileri == true) {
                oynak.style.left = `${left}vw`;
                left = left + 0.1;
                console.log('içerde');
            } else if (left >= 0) {
                oynak.style.left = `${left}vw`;
                left = left - 0.1;
                ileri = false;
                if (left <= 0) {
                    ileri = true;
                }
            }
        }, 5)
    }
    /* Ucak Baslangıc Arızaları Bitti*/
    /* Oyun Bitis */

    function gameOver() {
        alert('Game Over');
        gameStart = false;
        obstacles = [];
        spawnTimer = 175;
        gameSpeed = 0;
        if (score > highScore) {
            highScore = score;
            window.localStorage.setItem('highScore', highScore);
            highScoreValue.innerText = `${highScore}`;
        }
        speed = 0;
        newSpeed = 21;
        shake = false;
        score = 0;
        keys['KeyW'] = false;
        keys['KeyS'] = false;
        keys['KeyA'] = false;
        keys['KeyD'] = false;
        imlec_oil[1].style.transform = `rotate(0deg)`;
        imlec_rpm[1].style.transform = `rotate(0deg)`;
        imlec_ftit[1].style.transform = `rotate(0deg)`;
        imlec_throttle[1].style.transform = `rotate(0deg)`;
        rotate_oil = 0;
        rotate_rpm = 0;
        rotate_ftit = 0;
        lamps();
        speedValue.innerText = `0`;
        modeValue.innerText = `IDLE`;
        scoreValue.innerText = `0`;
        basarili.style.opacity = '0';
        yazı.innerText = 'Daire iki çemberin arasında kaldığı anda space (boşluk) tuşuna basın...';
        ilkKısım = true;
        stop1 = false;
        x = 1;
        left = 0;
        ileri = true;
        startCondition = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circleBig();
    }
    /* Oyun Bitis Bitti*/