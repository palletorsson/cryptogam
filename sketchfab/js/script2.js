// Imaginary connects ... 3D. 

// get pos here https://labs.sketchfab.com/experiments/screenshots/#model/74f6b21bb0fc4a31bf53cc947b94eb15
// http://jsoneditoronline.org/
// https://gltf-viewer.donmccurdy.com/

// Imaginary connects ... continue. 
// before I started this tutorial I been researching the visual inside of 3d models what I use. 
// models have different size and scales to figure what points in 3D space the the camera must connect I use a
// for this example I am only using two pionts. 

    var pos2 = [{
            "position": [3, -112, 46],
            "target": [-1, 4, 33]
        },
        {
            "position": [-1, -1, 68],
            "target": [-1, 4, 33]
        },
        {
            "position": [0, 1, 4],
            "target": [-0, -0, -4]
        },
        {
            "position": [0, 0, -4],
            "target": [0, 0, -4]
        },
        {
            "position": [0, 0, 0],
            "target": [0, 0, 0]
        },
        {
            "position": [0.09, -0.01, 1.36],
            "target": [0.08, -0.01, 0.97]
        },
        {
            "position": [0, 0, 0],
            "target": [0, 0, 0]
        },
        {
            "position": [0.08, 0.03, 0.83],
            "target": [0.08, 0.03, 0.83]
        },
        // model : '38710d36d8254af69b0d8ab99e1cc1ec'
        {
            "position": [0.7965377472993016, -3.6551350132719236, 131.8535622634526],
            "target": [-0.16222331224440895, -2.544987200553334, 38.47862781230249]
        },
        {
            "position": [-2.5054568559317376, .307368407995564, 29.326049679061672],
            "target": [-2.5054651573296964, .3073634412127, 29.325950148072227]
        }
    ];
    var index = 0;
    // Model

    var model = '56cce93abd8a485cbdc5bfff37a59f11',

        // Two buttons
        startButton = document.getElementById('start'),
        leftButton = document.getElementById('left'),
        rightButton = document.getElementById('right'),

        // API version
        version = '1.4.0',

        // The iframe
        iframe = document.getElementById('api-frame'),

        // The API client object
        client = new Sketchfab(version, iframe),

        // The API object
        api,

        // Defining error and success outside initialization, for easy reading
        error = function() {
            console.error('Sketchfab API Error!');
        },

        // If initilization succeeds, start the model immediately
        success = function(callback) {
            api = callback;

            api.start();
            api.addEventListener(
                'click',
                function(info) {
                    // console.log(info.position2D[0], info.position2D[1])
                    if (info.position2D[0] < 100 && info.position2D[1] > 1000) {
                        api.setCameraLookAt(pos2[index].position, pos2[index].target, 10.0);
                        index++;

                    }
                    if (info.position2D[0] > 100 && info.position2D[1] > 1000) {
                        api.setCameraLookAt(pos2[index - 1].position, pos2[index - 1].target, 5.1);
                        index--;

                    }

                }
            );
        };

    // A function to load a model
    function loadModel(client, urlid) {
        client.init(urlid, {
            success: success,
            error: error,
            internal: 1,
            ui_infos: 0,
            ui_controls: 1,
            ui_vr: 0,
            ui_help: 0,
            ui_setttings: 0,
            ui_stop: 0,
            watermark: 0,
            fullscreen: 1
        });
    }

    // Listen for click events on the buttons
    startButton.addEventListener('click', function() {
        loadModel(client, model);
    });