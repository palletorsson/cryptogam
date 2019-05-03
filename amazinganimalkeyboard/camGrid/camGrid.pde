import processing.video.*;

Capture cam; 

int index = 0; 
int colorindex = 0; 
int nPics = 16;
PImage img[] = new PImage[nPics];

void setup() {
  size(1400, 1000);   
  background(255);  
  cam = new Capture(this);
  cam.start();
  
}

void draw() { 
  if (cam.available()) { 
    cam.read();
    PImage cp = cam.get();
    img[index % 15] = cp;
    index++; 

    // tint(255,255,255,150);
    drawSixteen();
    float rand = random(255);
    int randColor = int(r);
    fill(mouseX, mouseY, randColor); 
  }
}


void drawSixteen() {
  if (index > 19) {
    for (int i=0; i < 4; i++) {
      for (int j=0; j < 4; j++) {  

        colorindex++; 

        if (colorindex % 5 == 0) {
          rect(i*320, j*240, 640, 480);
        } else {
          image(img[(i*j)+i], j*320, i*240, 320, 240);
        }
      }
    }
  }
}
