// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

/* exported setup, draw */
let seed = 0;

const cloudColor1 = "#CE6A87";
const cloudColor2 = "#5F5188";
const cloudColor3 = "#573B67";
const cloudColor4 = "#3C2847";
const skyColor = "#B5BCF0";
const sunColor = "#FFFC86";
const rockColor1 = "#080607";
const rockColor2 = "#231817";
const sandColor1 = "#986853";
const sandColor2 = "#683A22";
const waterColor = "#2D4156";
const waterfColor = "#BDACB3";
const grassColor1 = "#414f0d";
const grassColor2 = "#4d6105";

const steps = 5;

function setup() {
  canvasContainer = $("canvas-container");
  let canvas = createCanvas(
      400,
      200
    );
  canvas.parent("canvas-container");
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}


function draw() {
  randomSeed(seed);
  background(100);

  noStroke();

  fill(skyColor);
  rect(0, 0, width, (height * 1.75) / 3);

  fill(sunColor);
  rect(0, height / 2, width, height / 2);

  fill(waterColor);
  rect(0, (height * 1.1) / 2, width, height / 2);

  fill(sandColor2);
  rect(0, (height * 1.3) / 2, width, height / 2);

  fill(cloudColor2);
  beginShape();
  vertex(0, 0);
  vertex(0, height * 0.4);
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height * 0.4 +
      (random() * random() * random() * height) / 4 +
      height / 75;
    vertex(x, y);
  }
  vertex(width, 0);
  endShape(CLOSE);

  fill(skyColor);
  const skies = steps * 2 * random();
  for (let i = 0; i < skies; i++) {
    if (random() < 0.5) {
      let x = width;
      let y = height * 0.1 + height * 0.2 * random();
      let z = y + height * 0.1 * random();
      triangle(
        x,
        y,
        (x / 2) * random() - 400 * random() * noise(millis() / 3000.0),
        z + 10 * noise(millis() / 7000.0),
        x,
        z + height * 0.2 * random()
      );
    } else {
      let x = 0;
      let y = height * 0.1 + height * 0.2 * random();
      let z = y + height * 0.1 * random();
      triangle(
        x,
        y,
        width / 2 +
          width * 0.2 * random() +
          400 * random() * noise(millis() / 3000.0),
        z + 10 * noise(millis() / 7000.0),
        x,
        z + height * 0.2 * random()
      );
    }
  }

  fill(cloudColor1);
  const clouds = steps * 1 * random();
  for (let i = 0; i < clouds; i++) {
    if (i % 2) {
      let x = 0;
      let y = height * 0.1 + height * 0.2 * random();
      let z = y + height * 0.1 * random();
      triangle(
        x,
        y,
        width / 2 +
          width * 0.2 * random() +
          100 * random() * noise(millis() / 2000.0),
        z + 10 * noise(millis() / 4000.0),
        x,
        z + height * 0.2 * random()
      );
    } else {
      let x = width;
      let y = height * 0.4 * random();
      let z = y * random();
      triangle(
        x,
        y,
        (x / 2) * random() - 100 * random() * noise(millis() / 2000.0),
        z + 10 * noise(millis() / 4000.0),
        x,
        z * random()
      );
    }
  }

  let hillTop = [];

  fill(cloudColor3);
  beginShape();
  vertex(0, (height * 1.1) / 2);
  for (let i = 0; i < steps + 1; i++) {
    let x = (((width * 0.8) / 2) * i) / (steps);
    let y =
      (height * 1.1) / 2 -
      (random() * random() * random() * height) / 3 -
      height / 50;
    vertex(x, y);
    hillTop.push([x, y]);
  }
  vertex(width / 2, (height * 1.1) / 2);
  hillTop.push([width / 2, (height * 1.1) / 2])
  endShape(CLOSE);

  fill(cloudColor4);
  beginShape();
  vertex(0, (height * 1.1) / 2);
  for (let i = 0; i < steps*10 + 1; i++) {
    let x = (((width * 0.8) / 2) * i) / (steps*10);
    let k = x - hillTop[Math.floor(i/10)][0];
    let m = (hillTop[Math.ceil(i/10)][1] - hillTop[Math.floor(i/10)][1])/(hillTop[Math.ceil(i/10)][0] - hillTop[Math.floor(i/10)][0]);
    let y = m*k + hillTop[Math.floor(i/10)][1];
    vertex(x, y+10*(1-sin(k*PI)));
  }
  vertex(width/2, (height * 1.1) / 2);
  endShape(CLOSE);

  fill(sandColor1);
  beginShape();
  vertex(0, height);
  let prevY = 0;
  for (let i = 0; i < steps * 2 + 1; i++) {
    let x = (width * 0.5 * i) / (steps * 2);
    let y =
      height -
      10 -
      (random() * random() * random() * height) / 16 -
      height / 30;
    vertex(x, y);
    prevY = y;
  }

  for (let i = 1; i < steps + 1; i++) {
    let x = width / 2 + (width * 0.5 * i) / steps;
    let y = prevY - (random() * random() * random() * height) / 4 - height / 50;
    vertex(x, y);
    prevY = y;
  }
  vertex(width, height);
  endShape(CLOSE);

  let waterFoam = [];

  fill(waterfColor);
  beginShape();
  vertex(width / 5, height * 0.6);
  prevY = height * 0.6;
  for (let i = 1; i < steps * 1.5 + 1; i++) {
    let x = width / 5 + (((width * 0.4) / 2) * i) / (steps * 1.5);
    let y =
      prevY +
      (random() * random() * random() * height +
        5 * sin((2 * PI * millis()) / 10000.0)) /
        8 +
      height / 100;
    vertex(x, y + (height* 0.1 * (1 - sin(2 * PI * millis()))) / 10000.0);
    prevY = y;
    waterFoam.push([x, y]);
  }
  for (let i = 1; i < steps * 1.5 + 1; i++) {
    let x =
      width * 0.4 +
      (((width * 0.8) / 2) * i) / (steps * 1.5) +
      width*0.01 * (1 + sin((2 * PI * millis()) / 10000.0));
    let y = prevY - (random() * random() * random() * height) / 8 - height / 50;
    if (y < height * 0.55) {
      break;
    }
    vertex(x + (width* 0.2 * (1 - sin(2 * PI * millis()))) / 10000.0, y);
    prevY = y;
    waterFoam.push([x, y]);
  }

  vertex((width * 2.5) / 3, height * 0.6);
  endShape(CLOSE);

  fill(waterColor);
  beginShape();
  vertex(width / 5, height * 0.6);
  for (let i = 1; i < waterFoam.length; i++) {
    vertex(waterFoam[i][0] - 3, waterFoam[i][1]/1.5 + height*0.25);
  }
  vertex(width, height * 0.6);
  endShape(CLOSE);

  rect(0, height * 0.55, width, height / 12);

  let leftRock = [];
  let rightRock = [];

  fill(rockColor2);
  beginShape();
  prevY = height * 0.4;
  vertex(0, prevY);
  leftRock.push([0, prevY]);
  for (let i = 1; i < steps * 2 + 1; i++) {
    let x = (width * 0.35 * i) / (steps * 2);
    let y =
      prevY + (random() * random() * random() * height) / 16 + height / 100;
    vertex(x, y);
    prevY = y;
    leftRock.push([x, y]);
  }
  vertex(width * 0.4, height * 0.7);
  prevY = height * 0.75;
  for (let i = steps; i > 0; i--) {
    let x = (width * 0.2 * i) / steps;
    let y = prevY + (random() * random() * random() * height) / 8 + height / 50;
    vertex(x, y);
    prevY = y;
  }
  vertex(0, prevY);
  endShape(CLOSE);

  beginShape();
  prevY = height * 0.45;
  vertex(width, prevY);
  rightRock.push([width, prevY]);
  for (let i = 1; i < steps * 4 + 1; i++) {
    let x = width - (width * 0.5 * i) / (steps * 4);
    let y =
      prevY + (random() * random() * random() * height) / 32 + height / 125;
    if (y > height*0.65){
      break;
    }
    vertex(x, y);
    prevY = y;
    rightRock.push([x, y]);
  }
  vertex(width * 0.4, height * 0.65);
  prevY = height * 0.7;
  for (let i = steps; i > 0; i--) {
    let x = width - (width * 0.5 * i) / steps;
    let y =
      height * 0.7 +
      (random() * random() * random() * height) / 16 +
      height / 100;
    vertex(x, y);
    prevY = y;
  }
  vertex(width, prevY);
  endShape(CLOSE);

  fill(grassColor2);
  beginShape();
  vertex(leftRock[0][0], leftRock[0][1]);
  for (let i = 1; i < leftRock.length-1; i++) {
    vertex(
      leftRock[i][0],
      leftRock[i][1] - (random() * random() * random() * height) / 64
    );
  }
  vertex(leftRock[leftRock.length-1][0], leftRock[leftRock.length - 1][1]);
  vertex(leftRock[0][0], leftRock[leftRock.length - 1][1] + 20 * random());
  endShape(CLOSE);

  beginShape();
  vertex(rightRock[0][0], rightRock[0][1]);
  for (let i = 1; i < rightRock.length - 3; i++) {
    vertex(
      rightRock[i][0],
      rightRock[i][1] - (random() * random() * random() * height) / 32
    );
  }
  vertex(rightRock[rightRock.length-2][0], rightRock[rightRock.length-2][1]);
  vertex(rightRock[0][0], rightRock[rightRock.length - 2][1] + 20 * random());
  endShape(CLOSE);

  fill(sandColor1);
  quad(
    (width / 6) * random(),
    height * 0.7 + 20 * random(),
    width / 4,
    height * 0.6 + 20 * random(),
    0,
    height * 0.65 + 20 * random(),
    0,
    height + 20 * random()
  );

  fill(rockColor1);
  const scrub = mouseX / width;
  for (let i = 0; i < leftRock.length; i++) {
    if (random() < 0.4) {
      let y = random() * 5;
      let x = leftRock[i][0] - 5 * random();
      let z = x + 5 + 18 * (random() * scrub);
      let yTop = leftRock[i][1] - 100 + 50 * random();
      quad(
        leftRock[i][0],
        leftRock[i][1] + 5 + y,
        x,
        leftRock[i][1] + y,
        z - 10,
        yTop,
        z,
        yTop + 5 * random()
      );
      let k = random()+0.5;
      fill(grassColor1);
      quad(z - 2, yTop, z + 50*k, yTop + 15*k, z - 5, yTop + 10*k, z - 50*k, yTop);
      quad(z - 2, yTop, z + 50*k, yTop - 15*k, z - 5, yTop + 10*k, z - 50*k, yTop + 15*k);
      quad(z - 2, yTop, z + 40*k, yTop + 25*k, z - 5, yTop + 10*k, z - 40*k, yTop - 20*k);
      fill(rockColor1);
    }
  }

  for (let i = 0; i < rightRock.length; i++) {
    if (random() < 0.4) {
      let y = random() * 5;
      let x = rightRock[i][0] + 2 * random();
      let z = x - 5 + 18 * (random() * scrub);
      let yTop = rightRock[i][1] - 100 + 50 * random();
      quad(
        rightRock[i][0],
        rightRock[i][1] + 5 + y,
        x,
        rightRock[i][1] + y,
        z,
        yTop,
        z - 10,
        yTop + 5 * random()
      );
      let k = random()+0.5;
      fill(grassColor1);
      quad(z - 2, yTop, z - 50*k, yTop + 15*k, z - 5, yTop + 10*k, z + 50*k, yTop);
      quad(z - 2, yTop, z - 50*k, yTop - 15*k, z - 5, yTop + 10*k, z + 50*k, yTop + 15*k);
      quad(z - 2, yTop, z - 40*k, yTop + 25*k, z - 5, yTop + 10*k, z + 40*k, yTop - 20*k);
      fill(rockColor1);
    }
  }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

$("#reimagine").click(function() {

  seed++
  draw()
});

//draw();
