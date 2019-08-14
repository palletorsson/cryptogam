# Radical Inside : Tutorial part 6

- This tutorial explores how to make animations inside the 3d-models of the website sketchfab.com.
- The sketchfab viewer api are used for the exploration: https://sketchfab.com/developers/viewer

##  Adding dynamic duration 
-  We can control how long the animation should be, add a new key to the model data called duration in the modeldata.js.
```
var models = {
    "models": {
      "Candleman": {
          "uid":  "c966755a1efe451b80925b19ed6a9318",
          "events": [
            {
               "position": [0.17116218147772588,-0.5164971178787727,86.78621693231594],
               "target": [-0.17600697144648275,-1.1942467879311174,74.6853367314544], 
               "duration": 0.1
            },
            {
                "position": [-0.4866313946699046,-1.8006774176324318,63.857545709273055],
                "target": [-0.4866299583294329,-1.8006767819247784,63.85744572160981],
                "duration": 10.0
            },
            {
                "position": [-6.2959436411001,2.5339732345834407,15.220666589705965],
                "target": [-6.295946179228759,2.5339818999264883,15.220566998191604],
                "duration": 4.0
            }]
          },
        "nudeMan": {
            "uid":  "5ecaebeeb2264ebaa08bc0addeff18c8",
            "events": [
              {
                 "position": [1.2050851695453755,0.35610451065083815,23.458024920999648],
                 "target": [0.4713177552963772,0.2253916276847266,21.932639133384615],
                 "duration": 0.1
              },
              {
                 "position": [1.2050851695453755,0.35610451065083815,23.458024920999648],
                 "target": [0.4713177552963772,0.2253916276847266,21.932639133384615],
                 "duration": 1.0

              },
              {
                 "position": [0.11087075370661757,-0.20044267233765672,14.44895172097236],
                 "target": [0.13731880157914786,-0.2574600630303609,13.97829167254557],
                 "duration": 4.0
              }]
            }
          }
        }
```
- Now add the add the duration to the setCamera function. 
```
function setCamera(api) {
  api.setCameraLookAt(currentEventList[posIndex].position, currentEventList[posIndex].target, currentEventList[posIndex].duration);
  posIndex++;
}
```
