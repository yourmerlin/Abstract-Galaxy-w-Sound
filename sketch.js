// Merlin Enriquez
// Section C
// Title: Abstract solar system 
// fyi pls move your mouse around the screen


//star grids
let xStar = [50, 61, 83, 69, 71, 50, 29, 31, 17, 39];
let yStar = [18, 37, 43, 60, 82, 73, 82, 60, 43, 37];

//mousePressed starburst
let starX = [50,61,83,69,71,50,29,31,17,39];
let separation = 125;
let radius = 50;
let nPoints = 20;
let starBursts = [];
let burstSize = 0.2;

// sounds
let twinkle;
let twinkle2;
let whimsy

let twinkleStartSecond;
let twinkleDuration = 30;

let bgsize = 10;
let milkyAngle = 0;
let mySecond;


function preload(){
    twinkle = loadSound("http://localhost:8000/electric-cicadas01.wav");
    twinkle2 = loadSound("http://localhost:8000/twinkle-swoosh.wav");
    whimsy = loadSound("http://localhost:8000/whimsy.wav");
}
function setup(){
    createCanvas(400, 400);
    frameRate(10);
    background(220);
    useSound();
    earthX = width / 2;
    earthY = height / 2;
    mySecond = second();
    twinkleStartSecond = second();
}
function soundSetup(){
    twinkle.setVolume(0.5);
    twinkle2.setVolume(0.75);
    whimsy.setVolume(0.75);

}

function draw(){

    backgroundGradient();
    backgroundCircleMove(0, 0);
    milkyway4loop(milkyAngle, mySecond);
    randomstars4loop();
    starsGrid();
    earth(mouseX,mouseY);
    saturn(mouseX,50);
    starburstMouse();
    twinkle.play();
    changeSound();
 
}

function backgroundGradient() {
    
    let purple = { r: 75, g: 0, b: 130 }; 

    let navyBlue = { r: 11, g: 23, b: 63 }; 

    for (let r = -10; r <= height / bgsize; r++) {
        for (let g = -10; g <= width / bgsize; g++) {
            noStroke();

            let bgR = map(r, -10, height / bgsize, purple.r, navyBlue.r);
            let bgG = map(g, -10, width / bgsize, purple.g, navyBlue.g);
            let bgB = map(r + g, -10, (width / bgsize) + (height / bgsize), purple.b, navyBlue.b);

            fill(bgR, bgG, bgB);
            square(g * bgsize + bgsize / 2, r * bgsize + bgsize / 2, bgsize);
        }
    }
}

function backgroundCircle(){
    let purple = [145,77,223];
    let yellow = [255,243,206];

    for (let c = 0; c < height; c++) {
        let r = map(c, 0, height, purple[0], yellow[0]);
        let g = map(c, 0, height, purple[1], yellow[1]);
        let b = map(c, 0, height, purple[2], yellow[2]);
        noFill();
        stroke(r, g, b, 100);
        circle(width / 2, height / 2, c);
    }

    let lineLength = width / 2;  
    let numLines = 12;  
    let angleIncrement = TWO_PI / numLines;

    let r2 = random(240,255);
    let g2 = random(154,250);
    let b2 = random(138,145);
    let opacity = random(50, 200);
    
    stroke(r2, g2, b2, opacity);  
    for (let i = 0; i < numLines; i++) {
        let angle = angleIncrement * i;  
        let x1 = width / 2 + cos(angle) * 0;  
        let y1 = height / 2 + sin(angle) * 0;
        let x2 = width / 2 + cos(angle) * lineLength;  
        let y2 = height / 2 + sin(angle) * lineLength;

        line(x1, y1, x2, y2);  
    }
}

function backgroundCircleMove(x,y){
    push();
    translate(x,y);
    scale(random(0.5,1));
    backgroundCircle();
    pop();
}

function stars(x,y){
    push();
    translate(x,y);
    scale(random(.5,1.5));
    let r = random(240,255);
    let g = random(154,250);
    let b = random(138,145);
    fill(r,g,b);
    noStroke();
    beginShape();
    for(let i = 0; i < xStar.length;i++){
        vertex(xStar[i]+ random(-5,5),yStar[i] + random(-5,5));
    }
    endShape(CLOSE);
    pop();
}

function starsGrid(x,y){
    for(let sRow = 0; sRow < 5; sRow++){
        for(let sCol = 0; sCol < 5; sCol++){
            stars(sRow*100,sCol*100);
        }
    }

}

function earth(x,y){
    push();
    translate(x - 50,y - 50);
    fill(141,164,239);
    noStroke();
    circle(x,y,100);
    // water 
    fill(60,114,51);
    noStroke();
    circle(x+10,y,25);
    circle(x+25,y+25,10);
    rect(x+20,y-20,20,20);
    square(x-10,y-25,10);
    circle(x-25,y+30,20);
    square(x-10,y-10,30,10);
    square(x-40,y-25,15,5);
    pop();
}

function saturn(x,y){
    push();
    translate(x,y);
    fill(225,197,150);
    noStroke();
    circle(x,y,50);
    fill(183,86,71);
    noStroke();
    ellipse(x,y,80,10);
    pop();
}

function lineStarBurst(xS, yS) {

    push();
    translate(xS, yS);
    strokeWeight(2);
    stroke(255, 153, 204, 100);
        for (let i = 0; i < nPoints; i++) {
            let theta = map(i, 0, nPoints, 0, TWO_PI);
            let px = radius * cos(theta);
            let py = radius * sin(theta);
            let r = random(240,255);
            let g = random(154,250);
            let b = random(138,145);
            stroke(r,g,b,100);
            line(0, 0, px, py);
        }

    pop(); 
}

function starburstMouse(){
    let xS = mouseX;
    let yS = mouseY;
    let movefX = constrain(mouseX / 8.0, 0,50);
    lineStarBurst(xS, yS);
    
    for (let burst of starBursts) {
        lineStarBurst(burst.x, burst.y);
    }


}

function milkyway(x, y){
    push();
    translate(x,y);
    let opacity = random(25,150);

    fill(255, 255, 255, opacity);
    noStroke();

    circle(100,100,10);
    rect(103,103,20,5);
    rect(123,85,3,20);
    rect(93,83,30,3);
    rect(110,90,10,10);
    rect(90,85,5,10);
    rect(85,95,5,10);
    rect(90,105,5,10);
    rect(95,115,35,3);
    rect(130,80,3,35);
    rect(110,77,20,3);
    rect(100,74,10,3);
    rect(85,77,15,3);
    rect(82,80,3,10);
    rect(79,88,3,20);
    rect(82,108,5,3);
    fill(255,255,255,0);
    stroke(255,255,255);
    circle(100,100,25);
    circle(100,100,12.5);
    circle(100,100,18.75);
    // second star 
    push();
    translate(43,75);
    fill(255, 255, 255, opacity);
    noStroke();
    circle(25,25,5);
    ellipse(25,25,5,20);
    ellipse(25,25,20,5);
    pop();
    // second star
    push();
    translate(100,40);
    fill(255, 255, 255, opacity);
    noStroke();
    circle(25,25,5);
    ellipse(25,25,5,20);
    ellipse(25,25,20,5);
    pop();
    
    pop();
}

function randomStars(x,y){
    push();
    translate(x,y);
    let opacity = random(25,150);
    fill(255, 255, 255, opacity);
    textSize(25);
    textAlign(CENTER);
    text('✷',100,60);
    pop();
}

function milkyway4loop(milkyAngle, scaleFactor, mySecond){
    let minScale = 0.1;
    let maxScale = 2.0;

    for (let row2 = -50; row2 < 6 ; row2++){
        for(let col2 = -50; col2 < 6 ; col2++){

            let scaleFactor = map(mySecond,0,59,minScale,maxScale);

            milkyway(row2*100,col2*100);
        
        }
    }
}

function randomstars4loop(){
    for (let row3 = -50; row3 <5; row3++){
        for (let col3 = -50; col3 <5; col3++){
            randomStars(row3*100,col3*50);
        }
    }

}
function changeSound(){
    let currentSecond = second();

    let elapsedTime = currentSecond - twinkleStartSecond;

    if (elapsedTime < 0) {
        elapsedTime += 60; 
    }

    if (elapsedTime >= twinkleDuration) {
        if (twinkle.isPlaying()) {
            twinkle.stop(); 
        }

        if (!whimsy.isPlaying()) {
            whimsy.play();  
        }
    }
}

function mousePressed(){
    starBursts.push({ x: mouseX, y: mouseY });
    if (starBursts.length > 5) {
        starBursts.shift(); 
    }
    twinkle2.play();
    burstSize += 0.1;
    burstSize = (constrain(burstSize,0.1,2.0));
 
}

//I wanted to create something more abstract. There isn't really a story to this but its more so a calming effect for people to listen to. I think this is a representation of what the galaxy will look / sound like.  
