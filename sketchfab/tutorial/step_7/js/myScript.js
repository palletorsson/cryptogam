var iframe = document.getElementById( 'api-frame' );
var uid = 'c966755a1efe451b80925b19ed6a9318';
var client = new Sketchfab( iframe );
var modelIndexCount = 0;
var currentEventList = ''
var currentModel = '';
var posIndex = 0;


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
                  if (posIndex == currentEventList.length) {
                    setNextModelEvents();
                    posIndex = 0;
                    var uid = currentModel.uid;
                    loadModel( client, uid );
                  } else {
                    setCamera(api);
                  }
                }
              }
          );
      });
  };

function setNextModelEvents() {
  var currentModelname = modelNames[modelIndexCount];
  currentModel = models.models[currentModelname];
  currentEventList = currentModel.events;
  console.log(currentModel.uid);
  if (modelIndexCount < models.models.length) {
    modelIndexCount++;
  }
}

function setCamera(api) {
  api.setCameraLookAt(currentEventList[posIndex].position, currentEventList[posIndex].target, 3);
  posIndex++;
}


function promtCameraPosition(api) {
  api.getCameraLookAt(function(err, camera) {
    var pos_log = '"position": ['+ camera.position +'],' + "\n";
    var pos_log = pos_log + '"target": ['+ camera.target + '],'
    prompt("Copy to clipboard: Ctrl+C, Enter", pos_log);
  });
}

function loadModel( client, urlid ) {
     console.log( 'loading a model' );
     client.init( urlid, {
         success: success
     });
 }

loadModel( client, uid );
setNextModelEvents();
