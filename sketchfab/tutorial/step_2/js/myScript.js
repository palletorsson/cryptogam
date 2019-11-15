var iframe = document.getElementById( 'api-frame' );
var uid = 'c966755a1efe451b80925b19ed6a9318';
var client = new Sketchfab( iframe );

function success( api ){
    api = api;
    api.start();
    api.addEventListener( 'viewerready', function() {
        console.log( 'Viewer is ready' );
    });
}

client.init( uid, {
    success: success,
    error: function onError() {
        console.log( 'Viewer error' );
    }
});
