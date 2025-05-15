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

"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/
let tileSet;
let lavaSet;
let treeSet;
let treeSet2;
let bonSet;
let furnaceSet;
let fireSet;
let t = 0;

function p3_preload() {
  tileSet = loadImage(
    'https://cdn.glitch.global/87432fec-f895-41b0-a03b-501f4a6b22bd/25101045-29e2-407a-894c-e0243cd8c7c6_tileset.png?v=1745810192038'
  );
  lavaSet = loadImage(
    'https://cdn.glitch.global/2516bd14-e8a7-49bd-a8bd-641c956232e9/25101045-29e2-407a-894c-e0243cd8c7c6_tileset2.png?v=1745984368784'
  );
  treeSet = loadImage('https://cdn.glitch.global/87432fec-f895-41b0-a03b-501f4a6b22bd/Size_03.png?v=1745888706956')
  treeSet2 = loadImage('https://cdn.glitch.global/87432fec-f895-41b0-a03b-501f4a6b22bd/Size_04.png?v=1745889288681')
  bonSet = loadImage('https://cdn.glitch.global/87432fec-f895-41b0-a03b-501f4a6b22bd/Bonfire_02-Sheet.png?v=1745909631629');
  furnaceSet = loadImage('https://cdn.glitch.global/2516bd14-e8a7-49bd-a8bd-641c956232e9/Iron_03-Sheet.png?v=1745989012258');
  fireSet = loadImage('https://cdn.glitch.global/87432fec-f895-41b0-a03b-501f4a6b22bd/Fire_01-Sheet.png?v=1745910683294');
  
  //image(tileSet, screenX, screenY, tileWidth, tileHeight, 8 * 0, 8 * 0, 8, 8)
}

function p3_setup() {
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 16;
}
function p3_tileHeight() {
  return 8;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};
let tiles = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_tileRandom(i, j, k) {
  return XXH.h32("tile:" + i + "," + j, worldSeed) % k; // 4 tile types
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);
  translate(0, tiles[[i, j]]*2)
  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
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

function p3_drawBefore() {}

function p3_drawTile(i, j, o, p, tileType) {
  currentWorld.functions.drawTile(i, j, o, p, tileType);
}

function p3_drawAfter(offsetX, offsetY) {
  currentWorld.functions.drawAfter(offsetX, offsetY);
}

function p3_worldChanged(world) {
  currentWorld = world;
}

/////////////////////////////
// All World Functions
/////////////////////////////

function p3_drawNormalTile(i, j, o, p, tileType) {
  randomSeed(i*j)
  imageMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  let y = 0;
  let z = 0;
  let scaleD = 0.02;
  let nFunc = noise(0.2*i, 0.2*j);
  let riverCenter = noise(j * scaleD) * 100;  // horizontal river path
  if (abs(i - riverCenter)%100 < 4) {
    z = 13;
    tileType = 8*(((noise(millis()/5000 + 1  + random(10))))%3);
    y = 4;
  } else if (abs(i - riverCenter) > 90 && abs(i - riverCenter) < 100) {
    z = 13;
    tileType = 8*(((noise(millis()/5000 + 1  + random(10))))%3);
    y = 4;
  } else if (nFunc > 0.6) {
    stroke(0, 0, 0);
    z = 23;
    tileType += 8;
    y = -4;
    push();
    scale(1, 1.5);
    shearY(PI*6)
  
    image(tileSet, screenX-8, screenY+3, p3_tileWidth(), p3_tileHeight(), 8*(11+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
    push();
    scale(1, 1.5);
    shearY(-PI*6)
    image(tileSet, screenX+8, screenY+3, p3_tileWidth(), p3_tileHeight(), 8*(11+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
    noStroke();
      
  } else if (nFunc<0.4) {
    if (nFunc<0.25) {
      z = 13;
      tileType = 8*(((noise(millis()/5000 + 1  + random(10))))%3);
      y = 4;
    } else {
      z = 3;
      y = 2;
    }
  }
  if (z!=13) {
    push();
    scale(1, 1.5);
    shearY(PI*6)
    let yL = z == 3 ? 3 : 0;
    image(tileSet, screenX-8, screenY+9+yL, p3_tileWidth(), p3_tileHeight(), 8*(1+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
    push();
    scale(1, 1.5);
    shearY(-PI*6)
    image(tileSet, screenX+8, screenY+9+yL, p3_tileWidth(), p3_tileHeight(), 8*(1+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
  }
  push();

  rotate(30)
  scale(1.14, 1.94)
  shearX(-PI*15)
  
  let tile = image(tileSet, screenX+2*y, screenY+y, p3_tileWidth(), p3_tileHeight(), tileType, 8*z, 8, 8);
  
  pop();
  let l = noise(0.5*i, 0.5*j);
  let ls = random(50)
  if (z == 0 && l<0.3) {
    fill(0, 0, 0, 42);
    ellipse(2, -7, 50, 20);
    image(l < 0.17 ? treeSet : treeSet2, screenX, screenY-50+0.5*ls, 100-ls, 100-ls, 78*(((l*21)|0)%2), 78*(((nFunc*21)|0)%2), 78, 78, COVER, CENTER)
  } else if (z != 13 && l > 0.84) {
    image(bonSet, screenX, screenY-5+y, 32, 32, 32*(((millis()/2000 + random(3))|0)%3), 0, 32, 32)
  }

  
  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1 && l > 0.84) {
    stroke(1, 1, 1, 1)
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    //translate(0, -10);
    fill(255, 255, 100, 128);
    ellipse(0, -10, 10, 10);
    image(fireSet, screenX, screenY-10, 32, 32, 32*(((millis()/200)|0)%3), 0, 32, 32)
  }
  tiles[[i, j]] = y;
}

function p3_normalDrawAfter(offsetX, offsetY) {
  noStroke();
  let scale = 0.01;
  let cloudAlpha = 200;
  for (let y = 0; y < height+20; y += 3) {
    for (let x = 0; x < width+20; x += 3) {
      let n = noise((x+offsetX) * scale, (y-offsetY) * scale, 0.25*t);
      if (n > 0.6) {
        fill(255, 255, 255, cloudAlpha * (n - 0.5) * 2);
        rect(x, y, 3, 3);
      }
    }
  }

  t += 0.01; 
}

/////////////////////////////
//Infernal World
/////////////////////////////

function p3_drawLavaTile(i, j, o, p, tileType) {
  randomSeed(i*j)
  imageMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  let y = 0;
  let z = 23;
  let scaleD = 0.02;
  let nFunc = noise(0.2*i, 0.2*j);
  let riverCenter = noise(j * scaleD) * 100;  // horizontal river path
  if (abs(i - riverCenter)%100 < 4) {
    z = 13;
    tileType = 8*(((noise(millis()/5000 + 1  + random(10))))%3);
    y = 4;
  } else if (abs(i - riverCenter) > 90 && abs(i - riverCenter) < 100) {
    z = 13;
    tileType = 8*(((noise(millis()/5000 + 1  + random(10))))%3);
    y = 4;
  } else if (nFunc > 0.6) {
    stroke(0, 0, 0);
    if (nFunc > 0.7) z = 0;
    else z = 3;
    
    y = -4;
    push();
    scale(1, 1.5);
    shearY(PI*6)
  
    image(lavaSet, screenX-8, screenY+3, p3_tileWidth(), p3_tileHeight(), 8*(21+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
    push();
    scale(1, 1.5);
    shearY(-PI*6)
    image(lavaSet, screenX+8, screenY+3, p3_tileWidth(), p3_tileHeight(), 8*(21+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
    noStroke();
      
  } else if (nFunc<0.4) {
    if (nFunc<0.25) {
      z = 13;
      tileType = 8*(((noise(millis()/5000 + 1  + random(10))))%3);
      y = 4;
    } else {
      z = 23;
      tileType += 21*8;
      y = 2;
    }
  }
  if (z!=13) {
    push();
    scale(1, 1.5);
    shearY(PI*6)
    let yL = tileType >= 6*8 ? 3 : 0;
    image(lavaSet, screenX-8, screenY+9+yL, p3_tileWidth(), p3_tileHeight(), 8*(11+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
    push();
    scale(1, 1.5);
    shearY(-PI*6)
    image(lavaSet, screenX+8, screenY+9+yL, p3_tileWidth(), p3_tileHeight(), 8*(11+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
  }
  push();

  rotate(30)
  scale(1.14, 1.94)
  shearX(-PI*15)
  
  let tile = image(lavaSet, screenX+2*y, screenY+y, p3_tileWidth(), p3_tileHeight(), tileType, 8*z, 8, 8);
  
  pop();
  let l = noise(0.5*i, 0.5*j);
  let ls = random(25)
  if (z == 0 && l<0.25) {
    fill(0, 0, 0, 42);
    ellipse(2, -7, 50, 20);
    image(l < 0.17 ? treeSet : treeSet2, screenX, screenY-60+0.5*ls, 100-ls, 100-ls, 78*(((l*21)|0)%2), 78*(((nFunc*21)|0)%2), 78, 78, COVER, CENTER)
  } else if (z != 13 && l > 0.84) {
    image(furnaceSet, screenX, screenY-15+y, 32, 32, 64*(((millis()/2000 + random(3))|0)%3), 0, 64, 64)
  }

  
  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1 && l > 0.84) {
    stroke(1, 1, 1, 1)
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    //translate(0, -10);
    fill(255, 255, 100, 128);
    ellipse(0, -10, 10, 10);
    image(furnaceSet, screenX, screenY-15+y, 32, 32, 64*(((millis()/400 + random(3))|0)%3), 0, 64, 64)
    image(fireSet, screenX-8, screenY-30, 8, 16, 32*(((millis()/200)|0)%3), 0, 32, 32)
    image(fireSet, screenX, screenY-33, 12, 20, 32*(((millis()/200)|0)%3), 0, 32, 32)
    image(fireSet, screenX+8, screenY-30, 8, 16, 32*(((millis()/200)|0)%3), 0, 32, 32)
  }
  tiles[[i, j]] = y;
}

function p3_lavaDrawAfter(offsetX, offsetY) {
  noStroke();
  let scale = 0.01;
  let cloudAlpha = 255;
  for (let y = 0; y < height+20; y += 3) {
    for (let x = 0; x < width+20; x += 3) {
      let n = noise((x+offsetX) * scale, (y-offsetY) * scale, 0.25*t);
      if (n > 0.6) {
        fill(255, 220, 200, cloudAlpha * (n - 0.5) * 2);
        rect(x, y, 3, 3);
      }
    }
  }

  t += 0.01; 
}

/////////////////////////////
//Snowy World
/////////////////////////////

function p3_drawSnowyTile(i, j, o, p, tileType) {
  randomSeed(i*j)
  imageMode(CENTER);
  angleMode(DEGREES);
  noStroke();
  let y = 0;
  let z = 0;
  let scaleD = 0.02;
  let nFunc = noise(0.2*i, 0.2*j);
  let riverCenter = noise(j * scaleD) * 100;  // horizontal river path
  if (abs(i - riverCenter)%100 < 4) {
    z = 13;
    tileType = 8*(((noise(millis()/5000 + 1  + random(10))))%3);
    y = 4;
  } else if (abs(i - riverCenter) > 90 && abs(i - riverCenter) < 100) {
    z = 13;
    tileType = 8*(((noise(millis()/5000 + 1  + random(10))))%3);
    y = 4;
  } else if (nFunc > 0.6) {
    stroke(0, 0, 0);
    if (XXH.h32("tile:" + i + "," + j, worldSeed)) {
      z = 23;
      tileType += 8;
    } else {
      z = 12;
    }
    
    y = -4;
    push();
    scale(1, 1.5);
    shearY(PI*6)
  
    image(tileSet, screenX-8, screenY+3, p3_tileWidth(), p3_tileHeight(), 8*(11+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
    push();
    scale(1, 1.5);
    shearY(-PI*6)
    image(tileSet, screenX+8, screenY+3, p3_tileWidth(), p3_tileHeight(), 8*(11+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
    noStroke();
      
  } else if (nFunc<0.4) {
    if (nFunc<0.25) {
      z = 13;
      tileType = 8*(((noise(millis()/5000 + 1  + random(10))))%3);
      y = 4;
    } else {
      z = 3;
      y = 2;
    }
  } if (XXH.h32("tile:" + i + "," + j, worldSeed) % 2) {
    z = 12;
  }
  if (y<1) {
    push();
    scale(1, 1.5);
    shearY(PI*6)
    let yL = z == 3 ? 3 : 0;
    image(tileSet, screenX-8, screenY+9+yL, p3_tileWidth(), p3_tileHeight(), 8*(1+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
    push();
    scale(1, 1.5);
    shearY(-PI*6)
    image(tileSet, screenX+8, screenY+9+yL, p3_tileWidth(), p3_tileHeight(), 8*(1+random(3)|0), 8*(22+random(3)|0), 8, 8)
    pop();
  }
  push();

  rotate(30)
  scale(1.14, 1.94)
  shearX(-PI*15)
  
  let tile = image(tileSet, screenX+2*y, screenY+y, p3_tileWidth(), p3_tileHeight(), tileType, 8*z, 8, 8);
  
  pop();
  let l = noise(0.5*i, 0.5*j);
  let ls = random(50)
  if (z == 0 && l<0.3) {
    fill(0, 0, 0, 42);
    ellipse(2, -7, 50, 20);
    image(l < 0.17 ? treeSet : treeSet2, screenX, screenY-50+0.5*ls, 100-ls, 100-ls, 78*(((l*21)|0)%2), 78*(((nFunc*21)|0)%2), 78, 78, COVER, CENTER)
  } else if (z != 13 && l > 0.84) {
    image(bonSet, screenX, screenY-5+y, 32, 32, 32*(((millis()/2000 + random(3))|0)%3), 0, 32, 32)
  }

  
  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1 && l > 0.84) {
    stroke(1, 1, 1, 1)
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    //translate(0, -10);
    fill(255, 255, 100, 128);
    ellipse(0, -10, 10, 10);
    image(fireSet, screenX, screenY-10, 32, 32, 32*(((millis()/200)|0)%3), 0, 32, 32)
  }
  tiles[[i, j]] = y;
}

function p3_snowyDrawAfter(offsetX, offsetY) {
  noStroke();
  let scale = 0.004;
  let cloudAlpha = 400;
  for (let y = 0; y < height+20; y += 3) {
    for (let x = 0; x < width+20; x += 3) {
      let n = noise((x+offsetX) * scale, (y-offsetY) * scale, 0.25*t);
      if (n > 0.6) {
        fill(200, 220, 255, cloudAlpha * (n - 0.5) * 2);
        rect(x, y, 3, 3);
      }
    }
  }

  t += 0.01; 
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    // code to run when mouse is pressed
}