var iframe = document.getElementById( 'api-frame' );
var uid = 'c966755a1efe451b80925b19ed6a9318';
var client = new Sketchfab( iframe );
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
                  }
                }
            );
        });
    },
    error: function onError() {
        console.log( 'Viewer error' );
    }
});

function promtCameraPosition(api) {
  api.getCameraLookAt(function(err, camera) {
    var pos_log = '"position": ['+ camera.position +'],' + "\n";
    var pos_log = pos_log + '"target": ['+ camera.target + '],'
    prompt("Copy to clipboard: Ctrl+C, Enter", pos_log);
  });
}