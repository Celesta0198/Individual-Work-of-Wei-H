function minWindowSize(){
    return min(windowWidth,windowHeight);
  }
  
  function randomColor(){
    return color(random(255),random(255),random(255));
    
  }
  
  function circleRing(centerX, centerY){
    let radius = 35;
    let numRects = 20; 
    let rectWidth = 5;
    let rectHeight = 7;
    let cornerRadius = 8;
    let layerNum = random(4,6);
    let s = 5/layerNum;
    fill(randomColor());
    stroke(0,0);
    for(let a = 0; a < layerNum; a++){
  
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
  function PerlinNoiseCircle (centerX, centerY){
    push();
    translate(centerX, centerY);
    fill(randomColor());
    stroke(randomColor());
    strokeWeight()
    beginShape();
    let noiseMax = 2;
    for(let a = 0; a < TWO_PI; a += radians(5)){
        let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
        let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
        let r = map(noise(xoff, yoff), 0, 1, 60, 80);
        let x = r * cos(a);
        let y = r * sin(a);
        vertex(x, y);
    }
    endShape(CLOSE);
    phase += 0.003;
    pop();
  }