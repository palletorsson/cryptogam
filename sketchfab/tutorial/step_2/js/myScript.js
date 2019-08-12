var iframe = document.getElementById( 'api-frame' );
var uid = 'c966755a1efe451b80925b19ed6a9318';
var client = new Sketchfab( iframe );
client.init( uid, {
    success: function onSuccess( api ){
        api.start();
        api.addEventListener( 'viewerready', function() {

            // API is ready to use
            // Insert your code here
            console.log( 'Viewer is ready' );

        } );
    },
    error: function onError() {
        console.log( 'Viewer error' );
    }
} );
