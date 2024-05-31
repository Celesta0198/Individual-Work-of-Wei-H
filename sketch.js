//group of all center positions
let centerXs = [70,  490,  320, 430, 240,  -20 ];
let centerYs = [70, 490,  130, 240,  430, 370];
let circle1Xs = [210, 540,  130];
let circle1Ys = [20,  350,  320];
let circle2Xs = [350, 480, 280, 20];
let circle2Ys = [540, 100, 280, 215];
let circle3Xs = [175, 385, 370,  90];
let circle3Ys = [175, 385, -15, 470];
let perlinColors = [];


let offsetX = 0.0; // 初始值为 0.0

function randomColor(offset) {
  let r = map(noise(offset), 0, 1, 0, 255);
  let g = map(noise(offset + 1000), 0, 1, 0, 255);
  let b = map(noise(offset + 2000), 0, 1, 0, 255);
  return color(r, g, b);
 
}


function setup() {
  let Size = minWindowSize();
  createCanvas(Size, Size);
  
  background(0, 84, 121);


  
  for (let i = 0; i < centerXs.length; i++) {
    perlinColors.push(new PerlinColor(centerXs[i], centerYs[i]));
  }

  for (let i = 0; i < circle1Xs.length; i++) {
    perlinColors.push(new PerlinColor(circle1Xs[i], circle1Ys[i]));
  }

  for (let i = 0; i < circle2Xs.length; i++) {
    perlinColors.push(new PerlinColor(circle2Xs[i], circle2Ys[i]));
  }

  for (let i = 0; i < circle3Xs.length; i++) {
    perlinColors.push(new PerlinColor(circle3Xs[i], circle3Ys[i]));
  }

}

function minWindowSize(){
  return min(windowWidth,windowHeight);
}


let lastColorUpdateTime = 0;




function circleRing(centerX, centerY){
  let radius = 35;
  let numRects = 20; 
  let rectWidth = 5;
  let rectHeight = 7;
  let cornerRadius = 8;
  let layerNum = 5;
  let s = 5/layerNum;
  stroke(0,0);
  for(let a = 0; a < layerNum; a++){
      let hue = map(a, 0, 9, 0, 360); 
      let saturation = map(a, 0, 360, 50, 100); 
      let brightness = 100; 
      let alpha = map(a, 0, 9, 255, 0); 

      fill(hue, saturation, brightness, alpha);
    for (let i = 0; i < numRects; i++) {
      let angle = TWO_PI / numRects * i;
      let x = centerX + cos(angle) * radius;
      let y = centerY + sin(angle) * radius;

      
     
      push();
      translate(x, y);
      rotate(angle);
      rectMode(CENTER);
      rect(0, 0, rectWidth*s, rectHeight*s, cornerRadius);
      pop();
  }
   radius = radius + 32/layerNum;
   numRects = numRects +3;
  }
  
}

let phase = 0;
function PerlinNoiseCircle (centerX, centerY, Rmin, Rmax){
  push();
  translate(centerX,centerY);
  stroke(randomColor());
  strokeWeight()
  beginShape();
  let noiseMax = 2;

  for(let a = 0; a < TWO_PI; a += radians(5)){
      let xoff = map(centerX + cos(a + phase), -1, 1, 0, noiseMax);
      let yoff = map(centerY + sin(a + phase), -1, 1, 0, noiseMax);
      let r = map(noise(xoff, yoff), 0, 1, Rmin, Rmax);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
      fill(random(180,255),random(180,255),random(180,255)); // 设置填充颜色
  }
  endShape(CLOSE);
  phase += 0.001;
  pop();
}

class PerlinColor {
  constructor(x, y) {
    this.offsetR = random(1000);
    this.offsetG = random(1000);
    this.offsetB = random(1000);
    this.baseColor = this.calculateBaseColor(x, y);
  }

  calculateBaseColor(x, y) {
    // 根据圆心位置生成初始颜色值
    return {
      r: map(noise(x * 0.01, y * 0.01), 0, 1, 0, 255),
      g: map(noise((x + 1000) * 0.01, (y + 1000) * 0.01), 0, 1, 0, 255),
      b: map(noise((x + 2000) * 0.01, (y + 2000) * 0.01), 0, 1, 0, 255)
    };
  }

  getValue() {
    return {
      r: map(noise(this.offsetR + millis() * 0.0001), 0, 1, this.baseColor.r, 255),
      g: map(noise(this.offsetG + millis() * 0.0001), 0, 1, this.baseColor.g, 255),
      b: map(noise(this.offsetB + millis() * 0.0001), 0, 1, this.baseColor.b, 255)
    };
  }
}

// 使用 Perlin 噪声生成平滑变化的颜色
function getPerlinColor(perlinColor) {
  const colorValues = perlinColor.getValue();
  return color(colorValues.r, colorValues.g, colorValues.b);
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
  noStroke();
  for (let i = 0; i < numDots; i++) {
    let angle = i *angleStep;
    
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    ellipse(x, y, dot, dot); 
  
  }
  
}

function drawCircleLines(centerX, centerY, startRadius, numLines, lineLength) {
  strokeWeight(1);
  for (let i = 0; i < numLines; i++) {
    let angle = TWO_PI / numLines * i;
    stroke(color(random(255),random(255),random(255)));
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
  PerlinNoiseCircle(centerX,centerY, 60, 75);

  // circle inside
  fill(randomColor());
  noStroke();
  PerlinNoiseCircle(centerX,centerY, 30, 50);


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

  fill(255,116,155);
  noStroke();
  circle(centerX, centerY, 140);

  fill(255);
  ellipse(centerX, centerY, 30, 30);  

  for (let i = 0; i < numLayers; i++) {
    let r= map(noise(i), 0, 1, 0,255);
    let g= map(noise(i), 0, 1, 0,255);
    let b= map(noise(i), 0, 1, 0,255);
    fill(r,g,b);
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
  stroke(255);
  noFill();
  
  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
}



function draw() {
  background(0, 84, 121);
  let Size = minWindowSize();
  scale(Size/500);
  for(let i = 0; i < centerXs.length; i++){
    let x = centerXs[i];
    let y = centerYs[i];
    fill(color(random(180,255),random(180,255),random(180,255)));
    stroke(getPerlinColor(perlinColors[i]));
    strokeWeight(random(1,4));
    PerlinNoiseCircle(x,y, 60, 80);
    
  
    drawConcentricCircles(x, y, 60, 8);

 
    circleRing(x,y);
      
  
  }

  for(let i = 0; i < circle1Xs.length; i++){
    let x = circle1Xs[i];
    let y = circle1Ys[i];
    fill(getPerlinColor(perlinColors[i]));
    Circle1(x,y);
    
    
  
  }

  for(let i = 0; i < circle2Xs.length; i++){
    let x = circle2Xs[i];
    let y = circle2Ys[i];
    Circle2(x,y);
    
    
  
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
    
  
  }
  offsetX += 0.01;
}

function windowResized(){
  let Size = minWindowSize();
  resizeCanvas(Size, Size);

}