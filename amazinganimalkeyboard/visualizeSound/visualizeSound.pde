  
import processing.sound.*;
Amplitude amp;
AudioIn in;

int index = 0; 
int a = 0; 
int val[] = new int[12];
float xoff = 0.0;
float yoff = 0.1;
float zoff = 0.1;
void setup() {
  size(800, 800);
  noiseSeed(0);
  stroke(0, 10);
  background(255);
  amp = new Amplitude(this);
  in = new AudioIn(this, 0);
  in.start();
  amp.input(in);
  for (int i = 0; i > 11; i++) {
    val[i] = 1; 
  }
  frameRate(12);
  rectMode(RADIUS); 
}      

void draw() {

  background(0, 100); 
  index++; 
  noiseBand();
  drawRect();
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
  int aa = int(a * 3000);
  val[index%11] = aa; 
  fill(255,val[3],val[3],val[3]);
  rect(100, 100, 600, 600);
  fill(val[8],val[8],255,val[8]);
  rect(200, 200, 400, 400);
  fill(255,val[3],val[3],val[3]);
  rect(300, 300, 200, 200);
}
