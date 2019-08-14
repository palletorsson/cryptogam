var iframe = document.getElementById( 'api-frame' );
var uid = 'c966755a1efe451b80925b19ed6a9318';
var client = new Sketchfab( iframe );
var modelIndexCount = 0;
var currentEventList = ''
var currentModel = '';
var posIndex = 0;
var isClicking = false;

function success( callback ) {
      api = callback;
      api.start();
      isClicking = false;
      posIndex = 0;
      console.log(currentModel);
      api.addEventListener( 'viewerready', function() {

          api.addEventListener(
              'click',
              function(info) {

                if (isClicking == false) {
                  // get the camera position by clicking on the far left of screen
                  if (info.position2D[0] < 100) {
                    promtCameraPosition(api);
                  } else {
                    console.log(posIndex, currentEventList.length);
                    if (posIndex == currentEventList.length) {
                        setNextModelEvents();
                        var uid = currentModel.uid;
                        loadModel( client, uid );
                        api.stop();
                    } else {
                      setCamera(api);
                    }
                  }
                } // end of false clicking
                isClicking = true;
                setTimeout(function(){
                  isClicking = false;
                }, 1000);
              }
          );
      });
  };

function setNextModelEvents() {
  var currentModelname = modelNames[modelIndexCount];
  currentModel = models.models[currentModelname];
  currentEventList = currentModel.events;
  if (modelIndexCount < modelNames.length -1) {
    modelIndexCount++;
  } else {
    modelIndexCount = 0;
  }

}

function setCamera(api) {
  console.log(currentEventList[posIndex]); 
  api.setCameraLookAt(currentEventList[posIndex].position, currentEventList[posIndex].target, currentEventList[posIndex].duration);
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
         success: success,
         internal: 1

     });
 }

loadModel( client, uid );
setNextModelEvents();
