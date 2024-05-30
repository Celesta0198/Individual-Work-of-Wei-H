//group of all center positions
let centerXs = [70,  490,  320, 430, 240,  -20 ];
let centerYs = [70, 490,  130, 240,  430, 370];
let circle1Xs = [210, 540,  130];
let circle1Ys = [20,  350,  320];
let circle2Xs = [350, 480, 280, 20];
let circle2Ys = [540, 100, 280, 215];
let circle3Xs = [175, 385, 370,  90];
let circle3Ys = [175, 385, -15, 470];

function setup() {
  let Size = minWindowSize();
  createCanvas(Size, Size);
  
  background(0, 84, 121);
  
  noLoop();
}



function drawConcentricCircles(centerX, centerY, maxDiameter, numCircles) {
  let step = maxDiameter / numCircles;
  let e = random(1,255);
  for (let i = 0; i < numCircles; i++) {
    let diameter = maxDiameter - i * step;
    let offsetX = random(-1, 1);
    let offsetY = random(-1, 1);
    if(i<6){
      fill(e, e, e);
    }
     else{
      fill(randomColor());
     } 
    stroke(randomColor());
    strokeWeight(random(0,5));
    ellipse(centerX + offsetX, centerY + offsetY, diameter, diameter);
  }
}
//draw line and dots for circle1 & 2
function drawCircleDots(centerX, centerY, radius, numDots, dot) {
  let angleStep = TWO_PI / numDots;
  fill(randomColor());
  noStroke();
  for (let i = 0; i < numDots; i++) {
    let angle = i * angleStep;
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    ellipse(x, y, dot, dot); 
  }
}

function drawCircleLines(centerX, centerY, startRadius, numLines, lineLength) {
  strokeWeight(1);
  for (let i = 0; i < numLines; i++) {
    let angle = TWO_PI / numLines * i;
    stroke(randomColor());
    let xStart = centerX + cos(angle) * startRadius; 
    let yStart = centerY + sin(angle) * startRadius; 
    let xEnd = centerX + cos(angle) * (startRadius + lineLength); 
    let yEnd = centerY + sin(angle) * (startRadius + lineLength); 
    line(xStart, yStart, xEnd, yEnd); 
  }
}


// circle of lines
function Circle1(centerX, centerY){
  
  let baseRadius = 30; 
  let radiusIncrement = 5;
  let numLayers = 4; 
 //circle out side
  fill(255, 204, 0);
  noStroke();
  circle(centerX, centerY, 140); 

  // circle inside
  fill(randomColor());
  noStroke();
  circle(centerX, centerY, 70); 


  for (let i = 0; i < numLayers; i++) {
    drawCircleDots(centerX, centerY, baseRadius + i * radiusIncrement, 30 + i * 7, 5); 
  drawCircleLines(centerX, centerY, 30+ numLayers * radiusIncrement, 200, 20); 
  
}}

//circle of dots
function Circle2(centerX, centerY){
  let numLayers = 10;       
  let initialRadius = 30;  
  let radiusStep = 4;     
  let initialNumDots = 40;  
  let dotsIncrement = 6;  

  fill(randomColor());
  noStroke();
  circle(centerX, centerY, 140);

  fill(randomColor());
  ellipse(centerX, centerY, 30, 30);  

  for (let i = 0; i < numLayers; i++) {
    let radius = initialRadius + i * radiusStep;  
    let numDots = initialNumDots + i * dotsIncrement;  
    drawCircleDots(centerX, centerY, radius, numDots, 3);
  }
}

//circle of vertex
function Circle3(centerX, centerY){
  let innerRadius = 35;
  let outerRadius = 65;
  let numPoints = 120; 
  
  let points = [];
  
  for (let i = 0; i < numPoints; i++) {
    let angle = TWO_PI / numPoints * i;
    if (i % 2 == 0) {
      
      let x = centerX + cos(angle) * innerRadius;
      let y = centerY + sin(angle) * innerRadius;
      points.push(createVector(x, y));
    } else {
      
      let x = centerX + cos(angle) * outerRadius;
      let y = centerY + sin(angle) * outerRadius;
      points.push(createVector(x, y));
    }
  }
  strokeWeight(1);
  stroke(randomColor());
  noFill();
  
  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
}

//pink curve
function drawPinkCurve(centerX, centerY, radius) {
  let angle = random(TWO_PI);
  let x1 = centerX + cos(angle) * radius;
  let y1 = centerY + sin(angle) * radius;
  let cp1x = centerX + cos(angle + PI / 4) * radius / 2;
  let cp1y = centerY + sin(angle + PI / 4) * radius / 2;
  
  stroke(255, 105, 180);
  strokeWeight(3);
  noFill();
  bezier(centerX, centerY, cp1x, cp1y, cp1x, cp1y, x1, y1);
}

function draw() {
  background(0, 84, 121);
  let Size = minWindowSize();
  scale(Size/500);
  for(let i = 0; i < centerXs.length; i++){
    let x = centerXs[i];
    let y = centerYs[i];
    fill(color(random(180,255),random(180,255),random(180,255)));
    stroke(randomColor());
    strokeWeight(random(1,4));
    PerlinNoiseCircle(x,y);
    
  
    drawConcentricCircles(x, y, 60, 8);

 
    circleRing(x,y);
      
  if (random() < 0.2) {
    drawPinkCurve(x, y, 75);
    }
  }

  for(let i = 0; i < circle1Xs.length; i++){
    let x = circle1Xs[i];
    let y = circle1Ys[i];
    Circle1(x,y);
    
    
  if (random() < 0.2) {
    drawPinkCurve(x, y, 75);
    }
  }

  for(let i = 0; i < circle2Xs.length; i++){
    let x = circle2Xs[i];
    let y = circle2Ys[i];
    Circle2(x,y);
    
    
  if (random() < 0.2) {
    drawPinkCurve(x, y, 75);
    }
  }

  for(let i = 0; i < circle3Xs.length; i++){
    let x = circle3Xs[i];
    let y = circle3Ys[i];
    fill(color(random(180,255),random(180,255),random(180,255)));
    
    circle(x,y,140);
    Circle3(x,y);
    fill(randomColor());
    circle(x,y, 60);
    drawConcentricCircles(x, y, 30, 5);
    
  if (random() < 0.2) {
    drawPinkCurve(x, y, 75);
    }
  }
}

function windowResized(){
  let Size = minWindowSize();
  resizeCanvas(Size, Size);

}