var iframe = document.getElementById( 'api-frame' );
model = allModels.models.angle;
var uid = model.id;
var version = '1.5.1';
var client = new Sketchfab( iframe );
var currentEventList = model.events
var modelIndexCount = 0;
var currentModel = '';
var posIndex = 0;
var isClicking = false;
var cooldown = false;
var isLoading = false;
var iframeName = '';
var playanimation = true;
var clickview = true;

function success( callback ) {
      api = callback;
      api.load();
      api.start();
      isClicking = false;
      cooldown = false;
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
           }
           if (playanimation) {
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
  }, currentEventList[posIndex].duration * 300);
  setCamera();
}

function setCamera() {
  if (isLoading == false) {
    api.setCameraLookAt(
      currentEventList[posIndex].position,
      currentEventList[posIndex].target,
      currentEventList[posIndex].duration
    );
    if (cooldown == false) {
      posIndex++;
      cooldown = true;
    } else {
      setTimeout(function(){
        cooldown = false;
      }, 1000);
    }
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
    ui_infos: 0,
    ui_controls: 1,
    ui_vr: 0,
    ui_help: 0,
    ui_setttings: 0,
    ui_stop: 0,
    watermark: 0,
    fullscreen: 1,
    preload: 1
});
