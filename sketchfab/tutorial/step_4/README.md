# Radical Inside : Tutorial part 4

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

##  Playback the camera postion 
-  By using the api function [setCameraLookAt](https://sketchfab.com/developers/viewer/functions#api-setCameraLookAt) we can set a camera postion. If we have a list of camera positions we can now trigger an animation.  
- make a list of the postions
```
var cameraPositions = [
      {
         "position": [0.17116218147772588,-0.5164971178787727,86.78621693231594],
         "target": [-0.17600697144648275,-1.1942467879311174,74.6853367314544]
      },
      {
          "position": [-0.4866313946699046,-1.8006774176324318,63.857545709273055],
          "target": [-0.4866299583294329,-1.8006767819247784,63.85744572160981],
      },
      {
          "position": [-6.2959436411001,2.5339732345834407,15.220666589705965],
          "target": [-6.295946179228759,2.5339818999264883,15.220566998191604],
      }]
```
- Now make a function iterating the setCameraLookAt() for each position. 
```
function setCamera(api) {
  api.setCameraLookAt(cameraPositions[posIndex].position, cameraPositions[posIndex].target, 3);
  posIndex++; 
}
```
- Add it to the click loop like so: 
```
if (info.position2D[0] < 100) {
  promtCameraPosition(api);
} else {
  setCamera(api);
}
```

- Review the the animation. Nice!

