# Radical Inside : Tutorial part 3

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

##  Camera postion 
-  By using the api function [getCameraLookAt](https://sketchfab.com/developers/viewer/functions#api-getCameraLookAt) it is possible to get the camera 3D-vectors postion, consisting of the (x, y, z) position in the 3D space, one for the camera and one for the look target. By promting the values we can save the postions for later use. Let make a function called promtCameraPosition that handle this event. 

```
function promtCameraPosition(api) {
  api.getCameraLookAt(function(err, camera) {
    var pos_log = '"position": ['+ camera.position +'],' + "\n";
    var pos_log = pos_log + '"target": ['+ camera.target + '],'
    prompt("Copy to clipboard: Ctrl+C, Enter", pos_log);
  });
}
```
- we can now trigger this function on click by adding a click addEventListener inside the 'viewerready' function. We also want to limit and control the click position. 
```
api.addEventListener(
    'click',
    function(info) {
      // get the camera position by clicking on the far left of screen
      if (info.position2D[0] < 100) {
        promtCameraPosition(api);
      }
    }
);
```
- Let's recode a number of position.
```
"position": [0.17116218147772588,-0.5164971178787727,86.78621693231594],
"target": [-0.17600697144648275,-1.1942467879311174,74.6853367314544],
```
```
"position": [-0.4866313946699046,-1.8006774176324318,63.857545709273055],
"target": [-0.4866299583294329,-1.8006767819247784,63.85744572160981],
```
```
"position": [-6.2959436411001,2.5339732345834407,15.220666589705965],
"target": [-6.295946179228759,2.5339818999264883,15.220566998191604],
```
