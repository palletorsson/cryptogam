// Imaginary connects ... 3D. 

// before I started this tutorial I been researching the visual inside of 3d models what I use. 
// models have different size and scales to figure what points in 3D space the camera should connect 
// I use a Sketchfab lab experiments screenshots example
// Google "Sketchfab lab experiments screenshots exemple" and click on the first link
// *  ------------------------------------------------ *
// MAKE A SCREENSHOT BUY EDIT THE POSITION WITH THE MOUSE AND STAY IN POSITION. THEN CLICK ON EXPORT. 
// save the last to positions and go back to the editor
// For this example I will only be only using two pionts. 
// Paste the condinates into to the document
// wrapp the the corrinates in a json variable. 

var pos2 = [{
    "position": [
        1.2578362727082122,
        2.6278095730192965,
        74.27314617715676
    ],
    "target": [
        1.2578356914874944,
        2.627811032259047,
        74.27304618949351
    ]
},
{
    "position": [
        1.2765012272180496,
        2.5809484706496724,
        77.48408675273954
    ],
    "target": [
        1.2492237147932466,
        2.6494326612497585,
        72.79152393940045
    ]
}];


// return the webpage an get the id of the model and past it into a variable     
var model = '56cce93abd8a485cbdc5bfff37a59f11',


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

            if (info.position2D[0] < 100 && info.position2D[1] > 1000) {
                api.setCameraLookAt(pos2[0].position, pos2[0].target, 10.0);
                index++;

            }
            if (info.position2D[0] > 100 && info.position2D[1] > 1000) {
                api.setCameraLookAt(pos2[1].position, pos2[1].target, 5.1);
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
loadModel(client, model);

// get pos here https://labs.sketchfab.com/experiments/screenshots/#model/74f6b21bb0fc4a31bf53cc947b94eb15
// http://jsoneditoronline.org/
// https://gltf-viewer.donmccurdy.com/
