# Radical Inside : Tutorial part 6

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

##  Load and keep track more then one model
-  In order to dynamically keep track and load of the diffrent model we need to restructure the list to include current models. The list will grow and  become longer, so it is a good idea to separate the model data from the script file. 
```
var models = {
    "models": {
      "Candleman": {
          "uid":  "c966755a1efe451b80925b19ed6a9318",
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
          },
        "nudeMan": {
            "uid":  "5ecaebeeb2264ebaa08bc0addeff18c8",
            "events": [
              {
                 "position": [1.2050851695453755,0.35610451065083815,23.458024920999648],
                 "target": [0.4713177552963772,0.2253916276847266,21.932639133384615],
              },
              {
                 "position": [1.2050851695453755,0.35610451065083815,23.458024920999648],
                 "target": [0.4713177552963772,0.2253916276847266,21.932639133384615],

              },
              {
                 "position": [0.11087075370661757,-0.20044267233765672,14.44895172097236],
                 "target": [0.13731880157914786,-0.2574600630303609,13.97829167254557],
              }]
            }
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
- Ok, we also need a modelsnames list variable to keep track of the models, at the top of your modeldata file add. 
```
var modelNames = ["Candleman", "nudeMan"];
```
- Save the files. 
- Go back to myscript.js and add indexes and variables for keeping count of the models and events. 
- Near the top of the script write: 
```
var modelIndexCount = 0;
var currentEventList = ''
var currentModel = ''; 
```
- Now make a function that changes model and update the animations events. 
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
-  In the click function we need to keep track of when the event list for each models ends and then load a new model. 
```
if (posIndex == currentEventList.length) {
    if (isLoading == false) {
      setNextModelEvents();
      posIndex = 0;
      var uid = currentModel.uid;
      loadModel( client, uid );
      api.stop();
    }
    isLoading = true;
  } else {
    setCamera(api);
  }
```
- We need a variable called isLoading at the top so that the api only load once. 
```
var isLoading = false;
```
- Also when the in the beginning of the success fuction we new to reset the loading flag. 
```
api.start();
isLoading = false;
```
- Nice, you should be able to load your models dynamically.
