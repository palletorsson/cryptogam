var iframe = document.getElementById( 'api-frame' );
var uid = 'c966755a1efe451b80925b19ed6a9318';
var client = new Sketchfab( iframe );

function success( api ){
    api = api;
    api.start();
    api.addEventListener( 'viewerready', function() {
        console.log( 'Viewer is ready' );
        api.addEventListener(
            'click',
            function(info) {
              promtCameraPosition(api);
            }
        );
    } );
}

function promtCameraPosition(api) {
  api.getCameraLookAt(function(err, camera) {
    var pos_log = '"position": ['+ camera.position +'],' + "\n";
    var pos_log = pos_log + '"target": ['+ camera.target + '],'
    prompt("Copy to clipboard: Ctrl+C, Enter", pos_log);
  });
}

client.init( uid, {
    success: success,
    error: function onError() {
        console.log( 'Viewer error' );
    }
});
