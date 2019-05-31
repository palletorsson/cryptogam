  
import processing.sound.*;
Amplitude amp;
AudioIn in;
import processing.video.*;

Capture cam; 
int index = 0; 
int a = 0; 
int val[] = new int[12];
float xoff = 0.0;
float yoff = 0.1;
float zoff = 0.1;
int aa = 6;
int from = 200;
int to = 220;
int colorIndex = 200;
int iter = 1; 
int camon = 1; 
int puls = 4; 
void setup() {
  // fullScreen();
  size(200,800);
  noiseSeed(0);
  stroke(0, 10);
  //background(255);
  amp = new Amplitude(this);
  in = new AudioIn(this, 0);
  in.start();
  amp.input(in);
  for (int i = 0; i > 11; i++) {
    val[i] = 1; 
  }
  frameRate(12);
  rectMode(RADIUS); 
  cam = new Capture(this);
  cam.start();
}      

void draw() { 
  index++; 
  backgroundLerp();
  if (camon == 1) {
    videoCam();
  } else {
   background(mouseX,mouseY);
  }
  // noiseBand();
  // drawRect();
  
  
 
}

void noiseBand() {
  rectMode(RADIUS); 
  xoff = xoff + .05;
  yoff = yoff + .03;
  zoff = zoff + .01;
  float n = noise(xoff) * width/2;
  fill(255,255,168,200);
  rect(width/2, height-100, n, n/7);
  float n2 = noise(yoff) * width/2;
  fill(240,200,255,200);
  rect(width/2, height-100, n2, n2/7);
  float n3 = noise(zoff) * width/2;
  fill(100,255,255,200);
  rect(width/2, height-100, n3, n3/7);
}

void drawRect() {
  rectMode(CORNER);
  float a = amp.analyze();
  aa = int(a * 1000);
  println(aa);
  if (index % 4 == 0) {
  fill(255, aa, aa);
  rect(150, 500, 500, 100);
  }
}


void backgroundLerp() {
    colorIndex = colorIndex + iter * puls;
    if (colorIndex > 255 || colorIndex < 160) {
      iter = iter * -1; 
      puls = int(random(4));
      println(iter);
    }
    fill(colorIndex, mouseY);
    rect(0,0,width, height);
} 
void videoCam() {
    if (index % 1 == 0) {
     if (cam.available()) { 
        cam.read();
        PImage cp = cam.get();
        //image(cp, 0, (index*10% height), width, mouseY);
        image(cp, 0, (index*30% height+400)-400, width, mouseY);
        image(cp, 0, (index*20% height+400)-400, width, mouseY);
        image(cp, 0, (index*40% height+400)-400, width, mouseY);
        //fill(mouseY);
        rect(0, (index*40% height+400)-400, width, mouseY, mouseX);
       
     }
    } else {
       background(mouseX,100);
    }
}
