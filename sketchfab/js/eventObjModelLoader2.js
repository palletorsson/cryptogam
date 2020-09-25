
var easeIndex = 0;
var eventIndex = 0;
var cooldown = 0.1;
var autom = false;
var rewind = true;
// Model
//$("#api-frame").hide();
var model = '66e3b17ca8d14671a69ac23a9915ee87',
stopEvent = false,
// API version
version = '1.4.0',
// The iframe
iframe = document.getElementById('api-frame'),

// The API client object
client = new Sketchfab(version, iframe),

modelIndexCount = 0,
// The API object
api,

// Defining error and success outside initialization, for easy reading
error = function() {
    console.error('Sketchfab API Error!');
},
// If initilization succeeds, start the model immediately
success = function(callback) {

    api = callback;
  //  api.addEventListener( 'viewerready', function() {
  api.addEventListener(
      'click',
      function(info) {
          console.log('click ' + info.position2D);
          if (info.instanceID) {
              // hit
              console.log('click ' + info.instanceID);
          }
          api.getWorldToScreenCoordinates(worldCoord, function(coord) {
    console.log(coord.glCoord, coord.canvasCoord);
});
      },
      { pick: 'slow' }

  );

   api.addEventListener( 'viewerready', function(e) {



     api.setPostProcessing({
         enable: true,
         sharpenEnable: true
     });
     var iframe = $('#api-frame');

     $(iframe.contents).find("body").on('keydown', function(event) {
         alert('test');
     });
     var roting  = 0;
     setInterval(function() {
       api.getRootMatrixNode( function ( err, id, m ) {

            rootNode = id;
            rootTransform = m;
            api.rotate(rootNode, [Math.PI * 0.05 * roting, 0, 0, 0.001], roting, 'easeInOutCircle', function(
              err,
              rotateTo

           ) {
            //   console.log('Object has been rotated according to', rotateTo);
           });
           roting  = roting + 0.005;
        } );



     }, 42);
     var model = iframe.contents().find(".has-model");  //.css('cursor', 'none');
     $( "#api-frame" ).css('cursor', 'none');

      api.setWireframe(true, {color: '#FF0000FF'});
     console.log(api.getLight(1))

     api.setLight(2, {color: '00FF00FF'});
     api.setLight(1, {color: '00FF00FF'});
     api.setShadingStyle('matcap');
     //api.setEnvironment({color: '#FF000000'}, function(err){console.log(err)});
    setTimeout(function() {
      eventIndex=0;
      api.start();
      api.getAnimations( function ( err, animations ) {
              if (animations)  {
                  if (animations.length > 0) {
                      api.setSpeed(0);
                  }
              }

          });
          //api.setFov(50);

    }, 5000);
    //$("#api-frame").fadeIn(5000);


    easeIndex = 0;
    api.hide(81);

    api.setCameraEasing('easeOutOctic');


    $('.fullscreen').click(function() {
        $('.controls').hide();
        console.log("remove fullscreen");
    });

    $(document).keydown(function(e) {
        console.log(e.which)
        if (e.which == 37) {
            api.getCameraLookAt(function(err, camera) {
                console.log('"position": ['+ camera.position +'],' + '"target": ['+ camera.target + '],');
            });
            return false;
        }
        if (e.which == 87) {
        }
    });
    api.addEventListener(
        'click',
        function(info) {
         console.log("info: ", info);
          if (autom == false) {

                //eventColleted();

            }
       });
  });
};
let autoplay = true;

function eventColleted() {
  // 0. if modellist is done repeat
  modelIndexCount = checkModelIndexCount(modelIndexCount);
  // 1. set current model key.
  var currentModel = modelIndex[modelIndexCount]
  // 2. set current tranform event.
  var currentEvent = allModels.models[currentModel].events[eventIndex]
  nextAnimation(currentEvent);
  stopEvent = true;

  var modeltimeout = setTimeout(function() {

      eventIndex++;
      stopEvent = false;
      if (autoplay == true)  {
        eventColleted();
      }

  }, currentEvent.duration * 600);
}

function nextAnimation(currentEvent) {
  if (stopEvent == false) {
      if (rewind == true)  {
        if (eventIndex == 3)  {
          eventIndex = 0
          rewind = false;
        }
      }
      console.log(currentEvent)
      // check event type
      if (currentEvent.event == 'load') {

          api.stop();
          modelIndexCount++;
          var currentModel = modelIndex[modelIndexCount]
          loadModel(client, allModels.models[currentModel].id);
          eventIndex = 0;
          //api.setFov(1);

      } else if (currentEvent.event == 'setfov') {
          api.setFov(60);

      }   else if (currentEvent.event == 'fadetoblack') {
          $('body').fadeTo("slow", 0.0, function() {});

      } else if (currentEvent.event == 'on') {
          $('body').fadeTo("slow", 1, function() {});
      } else if (currentEvent.event == 'move') {
          api.setCameraLookAt(currentEvent.position, currentEvent.target, currentEvent.duration);
      } else if (currentEvent.event == 'fadein') {
          api.setCameraLookAt(currentEvent.position, currentEvent.target, currentEvent.duration);
      } else if (currentEvent.event == 'rotate') {
        var direction = 1;
        api.getRootMatrixNode(function(err, nodeID) {
          if (!err) {
              api.hide(nodeID);
               t = setInterval(function() {
               direction = direction + currentEvent.direction;
               api.translate(nodeID, [direction * 0.01, 0, 0, 1], {
                   duration: 5,
               });
               api.rotate(nodeID, [Math.PI * 0.05 * direction, 0, 0, 1], {
                   duration: direction === -1 ? 2 : 8
               });
               }, 10);
               setTimeout(function(){ clearInterval(t); }, currentEvent.duration *1000);
          }

        });
      } else {
          console.log("---->");
      }

  }
} 

function checkModelIndexCount(modelIndexCount) {
  if (modelIndexCount > modelIndex.length - 1) {
      modelIndexCount = 0;
  }
  return modelIndexCount
} 

function checkeEaseIndex(easeIndex) {
  if (easeIndex > easings.lenght - 1) {
      easeIndex = 0;
  }
  return easeIndex;
} 
// A function to load a model
function loadModel(client, urlid) {
    //$('body').fadeOut("slow" , function() {
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
    //});

}

function randomEasing(easeIndex) {
  var rand = Math.floor(Math.random()*(easings.length))
  console.log(easings[rand]);
  api.setCameraEasing(easings[rand]);
}

// Listen for click events on the buttons
setTimeout(function() {
    loadModel(client, model);
}, 3000);
