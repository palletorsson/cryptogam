# Radical Inside : Tutorial part 8

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

## Atomatic animation
-  We want to trigger the animation automatically without a click. To do so we need to make a function out of the logic in the click function. Take it out an wrap it in a new function call animationEvent.
```
function animationEvent(info, api) {
  if (isClicking == false) {
    // get the camera position by clicking on the far left of screen
    if (info.position2D[0] < 100) {
      promtCameraPosition(api);
    } else {
      console.log(posIndex, currentEventList.length);
      if (posIndex == currentEventList.length) {
          setNextModelEvents();
          var uid = currentModel.uid;
          loadModel( client, uid );
          api.stop();
      } else {
        setCamera(api);
      }
    }
  } // end of false clicking
  isClicking = true;
  setTimeout(function(){
    isClicking = false;
  }, 1000);
}
```
- Inside the click function we call the function.
```
  api.addEventListener(
              'click',
              function(info) {
                  animationEvent(info, api)
                }
          );
```
- Now lets make a recursive a function that run the animation automatically.
```
function atomaticAnimation() {
  setTimeout(function() {
      posIndex++;
      if (autoplay == true)  {
        eventColleted();
      }
  }, currentEventList[posIndex].duration * 1000);
}
```
