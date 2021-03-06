var iframe = document.getElementById( 'api-frame' );
var uid = 'c966755a1efe451b80925b19ed6a9318';
var client = new Sketchfab( iframe );
var cameraPositions = [
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
      }];
var posIndex = 0;

client.init( uid, {
    success: function onSuccess( api ){
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
    },
    error: function onError() {
        console.log( 'Viewer error' );
    }
});

function setCamera(api) {
  api.setCameraLookAt(cameraPositions[posIndex].position, cameraPositions[posIndex].target, 3);
  posIndex++; 
}


function promtCameraPosition(api) {
  api.getCameraLookAt(function(err, camera) {
    var pos_log = '"position": ['+ camera.position +'],' + "\n";
    var pos_log = pos_log + '"target": ['+ camera.target + '],'
    prompt("Copy to clipboard: Ctrl+C, Enter", pos_log);
  });
}
