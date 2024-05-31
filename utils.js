function minWindowSize(){
    return min(windowWidth,windowHeight);
  }

  let phase = 0;

function PerlinNoiseCircle (centerX, centerY, Rmin, Rmax){
  push();
  translate(centerX,centerY);
 
  beginShape();
  let noiseMax = slider.value();
  let zoff = 0;
  for(let a = 0; a < TWO_PI; a += radians(5)){
      let xoff = map(centerX + cos(a + phase), -1, 1, 0, noiseMax);
      let yoff = map(centerY + sin(a + phase), -1, 1, 0, noiseMax);
      let r = map(noise(xoff, yoff, zoff), 0, 1, Rmin, Rmax);
      let x = r * cos(a);
      let y = r * sin(a);
      vertex(x, y);
  }
  endShape(CLOSE);
  phase += 0.002;
  zoff += 0.01;
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
    
    return {
      r: map(noise(x * 0.01, y * 0.01), 0, 1, 0, 255),
      g: map(noise((x + 1000) * 0.01, (y + 1000) * 0.01), 0, 1, 0, 255),
      b: map(noise((x + 2000) * 0.01, (y + 2000) * 0.01), 0, 1, 0, 255)
    };
  }

  getValue() {
    return {
      r: map(noise(this.offsetR + millis() * 0.001), 0, 1, this.baseColor.r, 255),
      g: map(noise(this.offsetG + millis() * 0.001), 0, 1, this.baseColor.g, 255),
      b: map(noise(this.offsetB + millis() * 0.001), 0, 1, this.baseColor.b, 255)
    };
  }
}

function getPerlinColor(perlinColor) {
  const colorValues = perlinColor.getValue();
  return color(colorValues.r, colorValues.g, colorValues.b);
}

//draw line and dots for circle1 & 2
function drawCircleDots(centerX, centerY, radius, numDots, dot) {
    let angleStep = TWO_PI / numDots;
    noStroke();
    push();
    translate(centerX,centerY);
    let noiseMax= slider.value();
    for (let i = 0; i < numDots; i++) {
      let angle = i *angleStep;
      let xoff = map(centerX + cos(angle + phase), -1, 1, 0, noiseMax);
      let yoff = map(centerY + sin(angle + phase), -1, 1, 0, noiseMax);
      let r = map(noise(xoff, yoff), 0, 1, radius-10, radius);
      let x =  cos(angle) * r ;
      let y =  sin(angle) * r ;
      ellipse(x, y, dot, dot); 
    
    }
    pop();
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

  function circleRing(centerX, centerY){
    let radius = 35;
    let numRects = 20; 
    let rectWidth = 5;
    let rectHeight = 7;
    let cornerRadius = 8;
    let layerNum = random(4,5);
    let s = 5/layerNum;
    stroke(0,0);
    for(let a = 0; a < layerNum; a++){
        let r = map(noise(centerX*0.1+a,centerY*0.1+a), 0, 1, 100, 255); 
        let g = map(noise(centerX*0.2+a,centerY*0.2+a), 0, 1, 100, 255); 
        let b = map(noise(centerX*0.3+a,centerY*0.3+a), 0, 1, 100, 255); 
        fill(r,g,b);
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
  
  function drawConcentricCircles(centerX, centerY, maxDiameter, numCircles) {
    let step = maxDiameter / numCircles;
    for (let i = 0; i < numCircles; i++) {
      let diameter = maxDiameter - i * step;
      let offsetX = random(-1, 1);
      let offsetY = random(-1, 1);
      
      fill(getPerlinColor(perlinColors[i]));
      strokeWeight(1);
      ellipse(centerX + offsetX, centerY + offsetY, diameter, diameter);
    }
  }