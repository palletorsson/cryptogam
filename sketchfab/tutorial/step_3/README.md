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
- From the web link we use the unique idenifier (uid) of the model.
```
var uid = 'c966755a1efe451b80925b19ed6a9318';
```
- create a sketchfab client API object: 
```
var client = new Sketchfab( iframe );
```
- The is the way one can initilize the api functions with the model id
```
client.init( uid, {
    success: function onSuccess( api ){
        api.start();
        api.addEventListener( 'viewerready', function() {

            // the API is ready to use
            // Insert your code here
            console.log( 'Viewer is ready' );

        } );
    },
    error: function onError() {
        console.log( 'Viewer error' );
    }
} );
```

