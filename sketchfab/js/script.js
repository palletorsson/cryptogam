
 $('document').ready( function(){

    var iframe = document.getElementById( 'api-frame' );
    // create json of uids and titles, etc
    var uids = ['0cd9b9f9bfa1433c8cfa99d3ab13c11a','8c160beba7d2447dbbba6b0f48595147',  '4e3c2f9dc7b84996bf0f7b32ae55a772']
    var currentNum = 0; 
 
    var client = new Sketchfab( iframe );
    var theTime = 2000; 
    var api = { };

    client.init( 'd809ec01e6234a91a8bae8d6b7b0e438', {
        success: function onSuccess( api ){
            api = api;
            api.start();
            api.addEventListener( 'viewerready', function() {
                api = api;
                setTimeout(function(){
                    loadModel( client, uids[currentNum] );
                    currentNum++;
                    if (currentNum > 2) {
                        currentNum = 0; 
                    }
                    theTime = 10000; 
                }, theTime);
            });
        },
        error: function onError() {
            console.log( 'Viewer error' );
        }
    });

    function loadModel( client, urlid ) {

        client.init( urlid, {
            success: success,
            error: error,
            /* This is where you can add additional options like Autospin */
            //autospin: 0.5
        });
    }

    var success = function( api ) {
        api.start();
        api.lookat(
            [0, 0, 0], // eye position
            [0, 0, 0], // target to lookat
            0.1 // duration of the animation in seconds
        );
       api.lookat(
            [0, 0, 0], // eye position
            [10, 0, 0], // target to lookat
            10.1 // duration of the animation in seconds
        );

api.createAnnotation(
    [-0.16144215216577174, -3.867954799445659, 0.8214845269137563],
    [0.1229991557663267, -3.5779795878788656, -0.5151466147866559],
    camera.position,
    camera.target,
    'mytitle2',
    'mytext2'
);
        api.getCameraLookAt(function(err, camera) {
            console.log(camera.position);
            console.log(camera.target);
        });


    };

    var error = function () {
        console.error( 'Sketchfab API Error!' );
    };





})
