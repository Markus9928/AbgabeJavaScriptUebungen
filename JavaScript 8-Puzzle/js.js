window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    addEventListener('click', clicked, false);
    //ctx.drawImage(document.getElementById("img"),0,0);
    initialize();
}

function initialize() {
    
        createTiles();
        counter = 0;
        reloadAll();
   
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
function clicked(ev) {
    var x = ev.clientX - document.getElementById("canvas").offsetLeft;
    var y = ev.clientY - document.getElementById("canvas").offsetTop;
    if (x < 900) {
        xpos = Math.floor(x / 300);
    } else {
        return;
    }
    if (y < 900) {
        ypos = Math.floor(y / 300);
    } else {
        return;
    }
    swapPos(xpos, ypos);
}
let tiles = new Array();
var counter = 0;

function createTiles() {

    var counter = 0;
    var ctx = document.getElementById("canvas").getContext("2d");
    var img = document.getElementById("img");

    for (var i = 0; i < 3; ++i) {
        for (var j = 0; j < 3; j++) {
            var temp = new Tile();
            temp.addinfo(i, j, counter, ctx, img);
            temp.setUp();
            tiles.push(temp);


            ++counter;

        }
    }
    scramble();
}

function scramble() {
    /*let usedPlaces = Array();

    for (var i = 0; i < 9; ++i) {
        do {
            var a = Math.floor(Math.random() * 9);
        } while (check(a, usedPlaces));
        console.log(usedPlaces);
        tiles[i].setPosition(Math.floor(a / 3), a % 3);
        usedPlaces.push(a);

    }
    reloadAll();*/
    for (var i= 0; i < 200;i++){
        rnd = Math.floor(Math.random() * 4 + 1);
        sleep(1);
        switch (rnd) {
            case 1: swapPos(tiles[0].xpos + 1, tiles[0].ypos); break;
            case 2: swapPos(tiles[0].xpos -1, tiles[0].ypos); break;
            case 3: swapPos(tiles[0].xpos, tiles[0].ypos+1); break;
            case 4: swapPos(tiles[0].xpos, tiles[0].ypos-1); break;

        }
        
    }
    

}
function check(a, arr) {
    for (var i = 0; i <= arr.length; i++) {
        if (arr[i] == a) {
            return true;
        }
    }
    return false;
}
function reloadAll() {
    for (var i = 8; i >= 0; i--) {
        tiles[i].setUp();
    }
    if (checkforwin()) {

        document.getElementById("canvas").getContext("2d").drawImage(document.getElementById("img"), 0, 0);
    }
    document.getElementById("counter").innerHTML = counter + " Züge"
}
function swapPos(xpos, ypos) {
    if (xpos > 2 || xpos < 0 || ypos > 2 || ypos < 0) {
        return ;
    }
    for (var i = 0; i < 9; ++i) {

        if ((tiles[i].xpos == xpos) && (tiles[i].ypos == ypos)) {

            if (hasWhiteTile(i)) {
                var xtemp = tiles[0].xpos;
                var ytemp = tiles[0].ypos;
                counter++;
                tiles[0].xpos = tiles[i].xpos;
                tiles[0].ypos = tiles[i].ypos;

                tiles[i].xpos = xtemp;
                tiles[i].ypos = ytemp;
                
                reloadAll();
                break;
            }
        }
    }
}
function hasWhiteTile(i) {
    if ((tiles[i].xpos - 1 == tiles[0].xpos) && (tiles[i].ypos == tiles[0].ypos)) {
        return true;
    }
    if ((tiles[i].xpos + 1 == tiles[0].xpos) && (tiles[i].ypos == tiles[0].ypos)) {
        return true;
    }
    if ((tiles[i].xpos == tiles[0].xpos) && (tiles[i].ypos + 1 == tiles[0].ypos)) {
        return true;
    }
    if ((tiles[i].xpos == tiles[0].xpos) && (tiles[i].ypos - 1 == tiles[0].ypos)) {
        return true;
    }
    return false;
}
function checkforwin() {
    for (var i = 0; i < 9; ++i) {
        var a = tiles[i].ypos * 3 + tiles[i].xpos;

        if (a != tiles[i].number) {
            return false;
        }
    }
    return true;
}
function reset() {
    
    initialize();
    counter = 0;
    reloadAll();
}

//----------Klassen-------------

class Tile {

    constructor(tiles) {
        this.tiles = tiles;
        for (var i = 0; i < 9; i++) {

        }
    }
    positionNumber() {
        return this.xpos + this.ypos * 3;
    }


    addinfo(ypos, xpos, number, ctx, img) {
        this.number = number; //Number used to identify the piece
        this.xpos = xpos; // Current Position in the array
        this.ypos = ypos; // Current Position in the array
        this.ctx = ctx; //Context for drawing on the Canvas
        this.img = img; //Img to be used
        this.picxpos = xpos;
        this.picypos = ypos;

    }
    setUp() {
        if (this.number == 0) {


            this.ctx.strokeStyle = "#000000";
            this.ctx.rect(this.picxpos * 300, this.picypos * 300, 300, 300);
            this.ctx.stroke();
            this.ctx.fillStyle = "rgb(255,255,255)";
            this.ctx.fillRect(this.xpos * 300, this.ypos * 300, 300, 300);

        }
        else {
            //draw picture part
            //                  Image       xpos of original    yposof original height width    xpos and ypos on canvas 
            this.ctx.drawImage(this.img, this.picxpos * 300, this.picypos * 300, 300, 300, this.xpos * 300, this.ypos * 300, 300, 300);
            this.ctx.rect(this.picxpos * 300, this.picypos * 300, 300, 300);
            this.ctx.stroke();

        }

    }
    setPosition(ypos, xpos) {
        this.xpos = xpos;
        this.ypos = ypos;
        console.log(this.number + " has: x = " + this.xpos + " vs " + this.picxpos + " y = " + this.ypos + " vs " + this.picypos);
    }
    showInfo() {
        return "----------\nNumber: " + this.number + "\nXpos: " + this.xpos + "\nYpos: " + this.ypos + "\n----------"
    }

}
