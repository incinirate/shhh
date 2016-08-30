var dedStr = "You ded";
var prR = "Press [R] to restart";

function Snake() {
    var xp = floor(random(0, gWidth));
    var yp = floor(random(0, gHeight));
    this.tail = [[xp, yp],[xp, yp],[xp, yp]];
    this.ded = false;

    var dirTB = floor(random(0, 4));
    this.dir = [1, 0];
    if (dirTB === 0) {
        this.dir = [1, 0];
    } else if (dirTB === 1) {
        this.dir = [-1, 0];
    } else if (dirTB === 2) {
        this.dir = [0, 1];
    } else if (dirTB === 3) {
        this.dir = [0, -1];
    }

    this.ldir = this.dir.slice(0);

    this.addDir = function(arr, tad) {
        arr[0] += tad[0];
        arr[1] += tad[1];
        if (arr[0] < 0) {
            arr[0] = gWidth - 1;
        } else if (arr[0] >= gWidth) {
            arr[0] = 0;
        }
        if (arr[1] < 0) {
            arr[1] = gHeight - 1;
        } else if (arr[1] >= gHeight) {
            arr[1] = 0;
        }

        for (var i = 1; i < this.tail.length; i++) {
            if (this.tail[i][0] === this.tail[0][0] && this.tail[i][1] === this.tail[0][1]) {
                // Ded
                //singleton = new Snake();
                this.ded = true;
            }
        }
    }

    this.move = function() {
        var lpos = this.tail[0].slice(0);
        this.addDir(this.tail[0], this.dir);
        for (var i = 1; i < this.tail.length; i++) {
            let temp = this.tail[i].slice(0);
            this.tail[i] = lpos;
            lpos = temp;
        }
        this.ldir = this.dir.slice(0);
    }
}

function Apple() {
    var xp = floor(random(0, gWidth));
    var yp = floor(random(0, gHeight));
    this.pos = createVector(xp, yp);
}

var cW = 600;
var cH = 400;
var gridSize = 20;
var gWidth = cW / gridSize;
var gHeight = cH / gridSize;
var singleton;
var apples = [];

function setup() {
    createCanvas(cW, cH);
    singleton = new Snake();
    apples.push(new Apple());
    frameRate(10);
}

function draw() {
    if (singleton.ded) {
        background(50);
        textSize(40);
        fill(255);
        textAlign(LEFT, BOTTOM);
        text(dedStr, cW / 2 - (textWidth(dedStr) / 2), cH / 2);
        textSize(20);
        fill(200);
        textAlign(CENTER, TOP);
        text(prR, cW / 2, cH / 2)
    } else {
        background(0);
        singleton.move();

        for (i = apples.length - 1; i >= 0; i--) {
            if (apples[i].pos.x === singleton.tail[0][0] && apples[i].pos.y === singleton.tail[0][1]) {
                // Eat the apple :)
                apples.splice(i, 1);
                let ntp = singleton.tail[singleton.tail.length - 1];
                singleton.tail.push(ntp.slice(0));

                apples.push(new Apple());
            }
        }

        for (var i = 0; i < singleton.tail.length; i++) {
            let tpiece = singleton.tail[i];
            fill(255);
            rect(tpiece[0]*gridSize, tpiece[1]*gridSize, gridSize, gridSize);
        }

        for (i = 0; i < apples.length; i++) {
            let app = apples[i];
            fill(255, 0, 0);
            rect(app.pos.x*gridSize, app.pos.y*gridSize, gridSize, gridSize);
        }
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW && singleton.ldir[0] !== 1) {
        singleton.dir = [-1, 0];
    } else if (keyCode === RIGHT_ARROW && singleton.ldir[0] !== -1) {
        singleton.dir = [1, 0];
    } else if (keyCode === UP_ARROW && singleton.ldir[1] !== 1) {
        singleton.dir = [0, -1];
    } else if (keyCode === DOWN_ARROW && singleton.ldir[1] !== -1) {
        singleton.dir = [0, 1];
    } else if (key === "R") {
        singleton = new Snake();
    }
}
