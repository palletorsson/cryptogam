# Radical Inside : Tutorial part 2

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

##  Load a sketchfab 3D model
- Let's load a model we can use for exploration.
- Open myScript.js in the js folder.
- Add a reference to the iframe in the html document.
```
var iframe = document.getElementById( 'api-frame' );
```
- Go to Sketchfab.com and choose any model you would like to explore.
- I will go with https://sketchfab.com/3d-models/candleman-c966755a1efe451b80925b19ed6a9318
- From the web link we use the unique identifier (uid) of the model.
```
var uid = 'c966755a1efe451b80925b19ed6a9318';
```
- Create a sketchfab client API object:
```
var client = new Sketchfab( iframe );
```
- The is how one activate the viewer api functions with the model-uid.
```
client.init( uid, {
    success: success,
    error: function onError() {
        console.log( 'Viewer error' );
    }
});
```
- To make the code more readable we break out the success function.
```
function success( api ){
    api = api;
    api.start();
    api.addEventListener( 'viewerready', function() {
        console.log( 'Viewer is ready' );
    } );
}
```
- if open the index.html page in your web browser you should see a 3d model.

### proceed to the next step
* https://github.com/palletorsson/cryptogam/edit/master/sketchfab/tutorial/step_3
