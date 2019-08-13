# Radical Inside : Tutorial part 5

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

##  Dynamically load a 3d model
-  We want to make an animation from several 3d models, so lets try to load one dynamically. Expand our list of positions with the current model. 
```
var themodel = {
      uid: 'c966755a1efe451b80925b19ed6a9318', 
      title: 'Candleman', 
      cameraPositions: [
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
      }
```
- Let's wrapp the init function in a load function so we can load models dynamically. 
```
function loadModel( client, urlid ) {
            console.log( 'loading a model' );
            client.init( urlid, {
                success: success
            });
        }
```
- The new success function look like this:  
```
function success( callback ) {
      api = callback;
      api.start();
      api.addEventListener( 'viewerready', function() {
          api.addEventListener(
              'click',
              function(info) {
                // get the camera position by clicking on the far left of screen
                if (info.position2D[0] < 100) {
                  promtCameraPosition(api);
                } else {
                  setCamera(api);
                }
              }
          );
      });
  };

