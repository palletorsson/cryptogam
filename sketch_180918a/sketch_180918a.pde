int j = 0; 
void setup() {
  size(400, 400);
  background(123, 0, 0); 
  frameRate(-1);
}

void draw() {
  for (int i = 0; i < 23; i++) {
    frameRate(random(255));
    background(random(255)); 
    frameRate(random(255));
    background(random(255));
    frameRate(random(255));
    background(random(255)); 
    frameRate(random(255));
    background(-1*i*j); 
    text("how low can the color value get?", 180, j%height);
    text(str(-1*i*j), 180, 16+j%height);
    fill(0);
    rect(100, -14+j%height, 40, 40);
  }
  j=j+100;
}
