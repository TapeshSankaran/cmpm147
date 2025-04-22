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
let gfx;

  /* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let seed = 0;
let tilesetImage;
let currentGrid = [];
let currentGrid2 = [];
let numRows, numCols;

function preload() {
  tilesetImage = loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  randomSeed(seed);
  noiseSeed(seed);
  select("#seedReport").html("Seed: " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  select("#asciiBox2").value(gridToString(generateGrid2(numCols, numRows)));
  select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid2 = stringToGrid(select("#asciiBox2").value());
  currentGrid = stringToGrid(select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

function placeTile(i, j, ti, tj) {
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

function placeTile2(i, j, ti, tj) {
  gfx.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}

/* exported generateGrid, drawGrid */
/* global placeTile */

const lookup = [
  [0, 13], [10, 0], [10, 2], [10, 0, 10, 2],
  [11, 1], [11, 0], [11, 2], [11, 0],
  [9, 1], [9, 0], [9, 2], [9, 0],
  [11, 1, 9, 1], [10, 0, 9, 1, 11, 1], [11, 1, 9, 1, 10, 2], [10, 0, 10, 2]
];

const lookup2 = [
  [0, 0],   [21, 7], [21, 7], [21, 7],
  [21, 8], [21, 8], [21, 8], [21, 8],
  [21, 9], [21, 9], [21, 9], [21, 9],
  [21, 10], [21, 10], [21, 10], [21, 10]
];


function generateGrid(numCols, numRows) {
  let grid = [];
  let scale = 0.1;
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      if (noise(i * scale, j * scale) > 0.5) {
        row.push('.');
      } else {
        row.push('_');
      }
    }
    grid.push(row);
  }
  
  return grid;
}

function generateGrid2(numCols, numRows) {
  let grid = [];
  let scale = 0.2;
  for (let i = 0; i < numRows; i++) {
    let row = [];
    for (let j = 0; j < numCols; j++) {
      if (noise(i * scale, j * scale) > 0.45) {
        row.push('.');
      } else {
        row.push('_');
      }
    }
    grid.push(row);
  }
  
  return grid;
}

function drawGrid(grid) {
  noStroke();
  fill('#ffffff75')
  background("#161616");

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (gridCheck(grid, i, j, '_')) {
        placeTile(i, j, random(4)|0, 0);
        if (random() < 0.01) {
          placeTile(i, j, 26, random(4)|0);
        } else if (random() < 0.05) {
          placeTile(i, j, 14, 6);
        } 
      } else {
        placeTile(i, j, random(4)|0, 13);
        drawContext(grid, i, j, '_', 0, 0, lookup, false);
      }
    }

  }

  for (let i = 0; i < 10; i++) {
    let z = random(40)
    
    ellipse(500*(random()+(millis()/(z*6000)))%500-50, random(16*numRows), 40+z, 10+z)
  }
}

function drawGrid2(grid) {
  gfx.noStroke();
  gfx.fill('#00000075')
  gfx.background(128);

  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if (gridCheck(grid, i, j, '_')) {
        placeTile2(i, j, random(4) | 0, 3);
      } else {
        drawContext(grid, i, j, '_', 0, 14, lookup2, true);
      }
    }

  }
  
  for (let i = 0; i < 5; i++) {
    let z = 30 + random(40)
    
    gfx.ellipse(500*(random()+(millis()/(z*6000)))%500-50, random(16*numRows), 40+z, 10+z)
  }
}

function gridCheck(grid, i, j, target) {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
    return false;
  }
  return grid[i][j] === target;
}


function gridCode(grid, i, j, target) {
  const northBit = gridCheck(grid, i - 1, j, target) ? 1 : 0;
  const southBit = gridCheck(grid, i + 1, j, target) ? 1 : 0;
  const eastBit  = gridCheck(grid, i, j + 1, target) ? 1 : 0;
  const westBit  = gridCheck(grid, i, j - 1, target) ? 1 : 0;

  return (northBit << 0) + (southBit << 1) + (eastBit << 2) + (westBit << 3);
}


function drawContext(grid, i, j, target, ti, tj, look, second) {
  const code = gridCode(grid, i, j, target);
  //const [tiOffset, tjOffset] = look[code];
  if (second) {
    if (code == 0) {
      placeTile2(i, j, ti + ((millis()/5000 + random(4))|0)%4, tj + look[code][1])
    } else {
      for (let k=0; k<look[code].length; k+=2) {
        placeTile2(i, j, ti + look[code][k], tj + look[code][k+1]);
      }
    }
  } else {
    if (code == 0) {
      placeTile(i, j, ti + ((millis()/2000 + random(4))|0)%4, tj + look[code][1])
    } else {
      for (let k=0; k<look[code].length; k+=2) {
        placeTile(i, j, ti + look[code][k], tj + look[code][k+1]);
      }
    }
    
  }
  
}

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  //redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  //canvasContainer = $("#canvas-container")
  numCols = select("#asciiBox").attribute("cols") | 0;
  numRows = select("#asciiBox").attribute("rows") | 0;
  console.log(numCols);
  createCanvas(16 * numCols, 16 * numRows * 2 + 50).parent("canvasContainer");
  /*
  
  createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer2");
  
  */
  select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;
  gfx = createGraphics(16 * numCols, 16 * numRows);
  gfx.imageSmoothingEnabled = false;
  gfx.noSmooth();

  select("#reseedButton").mousePressed(reseed);
  select("#asciiBox").input(reparseGrid);
  //select("#asciiBox2").input(reparseGrid);
/*
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
*/
  reseed();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  drawGrid(currentGrid);
  drawGrid2(currentGrid2);
  image(gfx, 0 , 16 * numRows + 50)
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}