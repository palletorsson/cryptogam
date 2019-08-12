# Radical Inside : Tutorial part 2

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

##  Load a sketchfab 3D model
- Lets load a model we can use for exploration.
- Open myScript.js in the js folder.
- Add to a reference to the iframe in the html document.
```
var iframe = document.getElementById( 'api-frame' );
```
- Go to Sketchfab.com and choose any model you would like to explore.
- I will go with https://sketchfab.com/3d-models/candleman-c966755a1efe451b80925b19ed6a9318
- Now we need the id of the model with is the last part in the web link.
```
var uid = 'c966755a1efe451b80925b19ed6a9318';
```
- create a sketchfab object:
```
var client = new Sketchfab( iframe );
```
- and inti the client:
```
client.init( uid, {
    success: function onSuccess( api ){
        api.start();
        api.addEventListener( 'viewerready', function() {

            // API is ready to use
            // Insert your code here
            console.log( 'Viewer is ready' );

        } );
    },
    error: function onError() {
        console.log( 'Viewer error' );
    }
} );
```
