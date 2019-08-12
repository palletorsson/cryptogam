# Radical Inside : Tutorial part 2

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

##  Camera postion 
-  By using the api function [getCameraLookAt](https://sketchfab.com/developers/viewer/functions#api-getCameraLookAt) it is possible to get the camera 3D-vectors postion, consisting of the (x, y, z) position in the 3D space, one for the camera and one for the look target. By promting the values we can save the postions for later use. 
```
api.addEventListener(
    'click',
    function(info) {
      api.getCameraLookAt(function(err, camera) {
        var pos_log = '"position": ['+ camera.position +'],' + "\n";
        var pos_log = pos_log + '"target": ['+ camera.target + '],'
        prompt("Copy to clipboard: Ctrl+C, Enter", pos_log);
      });
    }
);
```
