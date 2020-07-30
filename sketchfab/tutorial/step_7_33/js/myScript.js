var iframe = document.getElementById( 'api-frame' );
model = allModels.models.dreamwordSexygirlNvwang;
var uid = model.id;
var version = '1.5.1';
var client = new Sketchfab( iframe );
var currentEventList = model.events
var posIndex = 0;
var clickview = false;
var myMaterials;
function success( callback ) {
      api = callback;
      api.load();
      api.start();

      api.addEventListener( 'viewerready', function() {
           if (clickview) {
             api.addEventListener(
                 'click',
                 function(info) {
                   // get the camera position by clicking on the far left of screen
                   if (info.position2D[0] < 100) {
                     promtCameraPosition(api);
                   }
                 }
             );
           } else {
              animationEvent();
           }

      });


  };

function animationEvent() {
  if(posIndex > currentEventList.length-1) {
    posIndex=1;
  }
  var currentAnimation =  setTimeout(function() {
    animationEvent();
  }, 10000);
  setCamera();

}

function setCamera() {
    api.setCameraLookAt(
                        currentEventList[posIndex].position,
                        currentEventList[posIndex].target,
                        10.0
                      );
    posIndex++;
    if (currentEventList[posIndex].interface != undefined) {
      changeWireframe(currentEventList[posIndex]);

    }
    if (currentEventList[posIndex].post != undefined) {
      api.setPostProcessing({
          bloom: true,
          bloomFactor: 0.9,
          bloomRadius: 0.9,
          sharpenEnable: true
      }, function() {
        api.getPostProcessing(function(settings) {
          console.log(settings);
        });
      });

    }

}

function promtCameraPosition() {
  api.getCameraLookAt(function(err, camera) {
    var pos_log = '"position": ['+ camera.position +'],' + "\n";
    var pos_log = pos_log + '"target": ['+ camera.target + '],'
    prompt("Copy to clipboard: Ctrl+C, Enter", pos_log);
  });
}



client.init(uid, {
    success: success,
    internal: 1,
    blending:1,
    ui_infos: 0,
    ui_controls: 1,
    ui_vr: 0,
    ui_help: 0,
    ui_setttings: 0,
    ui_stop: 0,
    watermark: 0,
    fullscreen: 1,
    preload: 1,
    wireframe_preload: 1
});

function changeWireframe(model) {

  if (model.interface == "wireframeon") {
    api.setWireframe(true, {color: '#FF00FFFF'}, function(err) {
        if(!err) {
            console.log('Set wireframe');
        }
    });
  }
  if (model.interface == "wireframeoff")  {
    api.setWireframe(false, {color: '#FF00FFFF'}, function(err) {
        if(!err) {
            console.log('Set wireframe');
        }
    });
  }


}
