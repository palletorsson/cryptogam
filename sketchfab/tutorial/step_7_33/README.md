# Radical Inside : Tutorial part 7

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

##  Make an animation
- To make an animation we first break out the camera event in a function called setCamera.
```
function setCamera() {
    api.setCameraLookAt(
                        currentEventList[posIndex].position,
                        currentEventList[posIndex].target
                        10.0
                      );
    posIndex++;
}
```
- Now we what to make an automatic animation event of each position. We use a recursive function that calls itself every ten seconds. In the function we also call the setCamera event.
```
function animationEvent() {
  var currentAnimation =  setTimeout(function() {
    animationEvent();
  }, 10000);
  setCamera();
}
```
- Last we add a variable  called clickview and set it to false, to control if we want the click logic or the automatic logic to work. Add the variable  at the top of the script under var posIndex = 0;
```
var clickview = false;
```
- In the success function add the conditional like this.
```
if (clickview) {
  api.addEventListener(
      'click',
      function(info) {
        // get the camera position by clicking on the far left of screen
        if (info.position2D[0] < 100) {
          promptCameraPosition(api);
        }
      }
  );
} else {
   animationEvent();
}
```
