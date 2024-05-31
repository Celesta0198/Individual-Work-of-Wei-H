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
let Colors = [];

function setup() {
  let Size = minWindowSize();
  createCanvas(Size, Size);
  
  background(0, 84, 121);
  slider = createSlider(0, 10, 2, 0.01);

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

// circle of lines
function Circle1(centerX, centerY,col){
  
  let r = 35; 
  let radiusIncrement = 5;
  let numLayers = 4; 
 //circle out side
  fill(255, 204, 0);
  noStroke();
  PerlinNoiseCircle(centerX,centerY, 70, 73);

  // circle inside
  fill(col);
  noStroke();
  PerlinNoiseCircle(centerX,centerY, 20, 25);

  
  for (let i = 0; i < numLayers; i++) {
    let col2= getPerlinColor(perlinColors[i]);
    fill(col2);

    drawCircleDots(centerX, centerY, r + i * radiusIncrement, 30 + i * 7, 5); 
  drawCircleLines(centerX, centerY, 30+ numLayers * radiusIncrement, 200, 20); 
  
}}

//circle of dots
function Circle2(centerX, centerY){
  let numLayers = 8;       
  let initialRadius = 30;  
  let radiusStep = 4;     
  let initialNumDots = 40;  
  let dotsIncrement = 6;  
  const Colors =['pink', 'red', 'blue', 'yellow', 'orange','white','green'];
  fill(255,116,155);
  noStroke();
  PerlinNoiseCircle(centerX, centerY,60,80);

  fill(255);
  PerlinNoiseCircle(centerX,centerY, 10, 15);

  for (let i = 0; i < numLayers; i++) {
    
    let col = Colors[i% Colors.length];
    fill(col);
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
  //the origin circle
  for(let i = 0; i < centerXs.length; i++){
    let x = centerXs[i];
    let y = centerYs[i];
    let r = map(noise(x * 0.1, y * 0.1), 0, 1, 0, 255);
    let g = map(noise(x * 0.1 + 100, y * 0.1 + 100), 0, 1, 0, 255);
    let b = map(noise(x * 0.1 + 200, y * 0.1 + 200), 0, 1, 0, 255);
    fill(getPerlinColor(perlinColors[i]));
    stroke(r,g,b);
    strokeWeight(random(1,4));
    PerlinNoiseCircle(x,y, 60, 80);
    
    drawConcentricCircles(x, y, 60, 8);
 
    circleRing(x,y);

  }
  //circle of lines
  for(let i = 0; i < circle1Xs.length; i++){
    let x = circle1Xs[i];
    let y = circle1Ys[i];
    col = getPerlinColor(perlinColors[i]);
    Circle1(x,y,col);
  
  }
  //circle of dots
  for(let i = 0; i < circle2Xs.length; i++){
    let x = circle2Xs[i];
    let y = circle2Ys[i];
    Circle2(x,y);
  
  }
  //circle of vertex
  for(let i = 0; i < circle3Xs.length; i++){
    let x = circle3Xs[i];
    let y = circle3Ys[i];
    let r = map(noise(x * 0.1, y * 0.1), 0, 1, 0, 255);
    let g = map(noise(x * 0.1 + 100, y * 0.1 + 100), 0, 1, 0, 255);
    let b = map(noise(x * 0.1 + 200, y * 0.1 + 200), 0, 1, 0, 255);
    fill(r,g,b);
    stroke(255);
    PerlinNoiseCircle(x,y, 63, 80);
    Circle3(x,y);
    fill(getPerlinColor(perlinColors[i]));
    PerlinNoiseCircle(x,y, 30,40);
    drawConcentricCircles(x, y, 30, 5);
  }
}
function windowResized(){
  let Size = minWindowSize();
  resizeCanvas(Size, Size);
}