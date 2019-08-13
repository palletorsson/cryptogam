# Radical Inside : Tutorial part 6

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

##  Dynamically load models
-  We want to make an animation from several 3d models - load multiple models dynamically. In order to do so we need to restructure the list and it will become longer, so let's separate the model data from the script file. 
```
var models = {
    "models": {
      "Candleman": {
          "uid":  "d8b7b27ec323428e9a1d86692d5d8466",
          "events": [
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
        },
        "Candleman2": {
            "uid":  "d8b7b27ec323428e9a1d86692d5d8466",
            "events": [
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
          }
```
- Copy and paste the list above or make your own in the same fashion. Past you model data into a new empty file and save it as modeldata.js in the js folder. 
```
/sketchfab3d/js/modeldata.js
```
- Now link the file before the myscript.js line in the index.html document. 
```
<script type="text/javascript" src="./js/modeldata.js"></script>
<script type="text/javascript" src="./js/myscript.js"></script>
```
- Ok, we also need a modelsnames list to keep track of the models, at the top of your modeldata file add. 
```
var modelNames = ["Candleman", "Candleman2"];
```
- Save the files. 
- Go back to myscript.js and add indexes and variables for keeping count of the models and events. 
- Near the top of the script write: 
```
var modelIndexCount = 0;
var currentEventList = ''
var currentModel = ''; 
```
- Now make a function that changes model. 
```
function setNextModelEvents() {
  var currentModelname = modelNames[modelIndexCount];
  currentModel = models.models[currentModelname];
  currentEventList = currentModel.events;
  if (modelIndexCount < models.models.length-1) {
    modelIndexCount++;
  }
}
```
In the click function we need to keep track of if the list of event is at the end and the load a new model. 
```
if (posIndex == currentEventList.length) {
    setNextModelEvents();
    posIndex = 0;
    var uid = currentModel.uid;
    loadModel( client, uid );
  } else {
    setCamera(api);
  }
```
