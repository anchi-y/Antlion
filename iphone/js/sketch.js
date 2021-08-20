let img = [];
let ant;
let antsize;
let antX;
let antY;
let touchFlag;
let spX;
let spY;
let pmX;
let pmY;
let angle;
let num;
let count;
let wid;
let hed;
let maxDist;
let theta;
let posX;
let posY;
let Ants;
let size;
let antimg;
let myant;
let start;
let startimg;


function setup() {
    window.addEventListener(
        "touchstart",
        function(event) {
            event.preventDefault();
        }, { passive: false }
    );
    window.addEventListener(
        "touchmove",
        function(event) {
            event.preventDefault();
        }, { passive: false }
    );
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    for (let i = 0; i < 20; i++) {
        if (i < 11) {
            img[i] = loadImage('img/backimg' + i + '.JPG');
        } else {
            img[i] = loadImage('img/backimg' + (20 - i) + '.JPG');
        }
    }
    stratimg = loadImage('startimg.JPG')
    num = 5;
    ant = loadImage('img/ant.png');
    myant = loadImage('img/White_ant.png');
    antsize = 10;
    touchFlag = false;
    antX = width / 2 + 100;
    antY = height / 6;
    angle = 0;
    count = 0;
    wid = width;
    hed = height;
    Ants = new Array(num);
    start = false;
    maxDist = sqrt(wid * wid + hed * hed);
    for (let i = 0; i < num; i++) {
        Ants[i] = new ants();
    }
    frameRate(30);
}


function draw() {
    background(255);
    image(img[count % 20], wid / 2, hed / 2, wid, hed);
    if (touchFlag) {
        antcluc();
    }
    hoolcluc();
    imgcluc();
    for (let i = 0; i < num; i++) {
        Ants[i].antshool();
    }
    push();
    translate(antX, antY);
    rotate(angle);
    image(myant, 0, 0, antsize, antsize);
    pop();
    count++;
}

function mousePressed() {
    if (mouseY > height / 2) {
        touchFlag = true;
    }
    pmX = mouseX;
    pmY = mouseY;
}


function mouseReleased() {
    touchFlag = false;
    spX = 0;
    spY = 0;
    pmX = 0;
    pmY = 0;
}


function antcluc() {
    spX = (mouseX - pmX) / 5;
    spY = (mouseY - pmY) / 5;
    pmX = mouseX;
    pmY = mouseY;
    antX += spX;
    antY += spY;

}


function imgcluc() {
    if (antX < antsize / 2) {
        antX = antsize / 2;
    } else if (antX > width - antsize / 2) {
        antX = width - antsize / 2;
    }
    if (antY < antsize / 2) {
        antY = antsize / 2;
    } else if (antY > height - antsize / 2) {
        antY = height - antsize / 2;
    }
    antsize = dist(width / 2, height / 3, antX, antY) / 5;
    angle = atan2(height / 3 - antY, width / 2 - antX) - PI / 2;
}


function hoolcluc() {
    antX -= 2 * sin(angle);
    antY += 2 * cos(angle);
}

class ants {
    constructor() {
        this.posX = random(0, width);
        this.posY = random(0, 2 * height / 3);
        this.theta = atan2(height / 3 - this.posY, width / 2 - this.posX) - PI / 2;
        this.size = dist(width / 2, height / 3, this.posX, this.posY) / 5;
    }

    antshool() {
        push();
        translate(this.posX, this.posY);
        rotate(this.theta);
        image(ant, 0, 0, this.size, this.size);
        pop();
        this.posX -= 2 * sin(this.theta);
        this.posY += 2 * cos(this.theta);
        this.size = dist(width / 2, height / 3, this.posX, this.posY) / 5;
        if (this.posX > width / 2 - 10 && this.posX < width / 2 + 10 && this.posY < height / 3 + 10 && this.posY > height / 3 - 10) {
            this.posX = random(0, width);
            this.posY = random(0, 2 * height / 3);
            this.theta = atan2(height / 3 - this.posY, width / 2 - this.posX) - PI / 2;
        }
    }
}