let posX;
let posY;
let sx;
let sy;
let thita;
let n;
let t;
let d;
let flag;
let flag_change;


function setup() {
    createCanvas(windowWidth, windowHeight);
    posX = width / 2;
    posY = height / 2;
    sx = width / 2;
    sy = height - 150;
    thita = 0;
    n = 0;
    t = 0;
    d = 50;
    flag = Boolean(false);
    noStroke();
}

function draw() {
    if (t % 3 == 0) {
        background(255);
        for (let i = 0; i < 50; i++) {
            fill((250 / 25) * (((25 - i) % 25 + n) % 25));
            circle(width / 2, height / 2, width / 25 * (50 - i));
        }
        n++;

        fill(200);
        if (flag) {
            comtcluc();
        }
        curcluc();
        circle(width / 2, height - 150, 200);
        fill(0);
        circle(sx, sy, 100);
        fill(255, 0, 0);
        circle(posX, posY, d);
    }
    t++;
}


function touchStarted() {
    if (dist(sx, sy, touches[0].x, touches[0].y) <= 50) {
        flag = true;
    }
}

function touchMoved() {
    sx = touches[0].x;
    sy = touches[0].y;
}

function touchEnded() {
    flag = false;
    sx = width / 2;
    sy = height - 150;
}


function comtcluc() {

    let thita_s = atan2(sx - width / 2, sy - (height - 150));



    if (dist(sx, sy, width / 2, height - 150) > 50) {
        sx = width / 2 + 50 * sin(thita_s);
        sy = height - 150 + 50 * cos(thita_s);
    }
}

function curcluc() {

    posX += (sx - width / 2) / 10;
    posY += (sy - (height - 150)) / 10;
    thita = atan2(posX - width / 2, posY - height / 2);

    if (posX < 25) {
        posX = 25;
    } else if (posX > width - 25) {
        posX = width - 25;
    }

    if (posY < 25) {
        posY = 25;
    } else if (posY > height - 25) {
        posY = height - 25;
    }

    posX -= 4 * sin(thita);
    posY -= 4 * cos(thita);

    d = dist(width / 2, height / 2, posX, posY) / 5 + 10;

}