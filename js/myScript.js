var iframe = document.getElementById( 'api-frame' );
console.log(allModels.models.asley)
model = allModels.models.alitaBattleAngel;
var uid = model.id;
var version = '1.5.1';
var client = new Sketchfab( iframe );
var currentEventList = model.events
console.log(currentEventList[0])
var modelIndexCount = 0;
var currentModel = '';
var posIndex = 0;
var isClicking = false;
var autoplay = true;
var cooldown = false;
var isLoading = false;
var iframeName = '';
var indexlist = [1,2,3,4,5,6,7,6,5,4,3,2,1];
$(document).ready(function(){
        $('iframe').css('opacity','0');
});

function success( callback ) {
      api = callback;
      api.load();
      api.start();
      isClicking = false;
      cooldown = false;
      console.log("success");
      api.addEventListener( 'viewerready', function() {
           animationEvent();
      });
      setTimeout(function(){
        $('iframe').css('opacity','1');
      }, 14000);
  };


function screenEvent(info) {
  if (isClicking == false) {
    // get the camera position by clicking on the far left of screen
    if (info.position2D[0] < 100) {
      promtCameraPosition();
    } else {
      animationEvent()
    }
  } // end of false clicking
  isClicking = true;
  setTimeout(function(){
    isClicking = false;
  }, 1000);



}

function animationEvent() {

      if (autoplay == true) {
        var currentAnimation =  setTimeout(function() {
              animationEvent();
            }, currentEventList[indexlist[posIndex]].duration * 300);
      }
      setCamera();
    }




function setCamera() {
  if (isLoading == false) {

    api.setCameraLookAt(currentEventList[indexlist[posIndex]].position, currentEventList[indexlist[posIndex]].target, currentEventList[indexlist[posIndex]].duration);
    if (cooldown == false) {
      posIndex++;
      cooldown = true;
    } else {

      setTimeout(function(){
        cooldown = false;
      }, 1000);
    }
    if (posIndex > indexlist.length - 1)
        posIndex = 0;


  }
}



function promtCameraPosition() {
  api.getCameraLookAt(function(err, camera) {
    var pos_log = '"position": ['+ camera.position +'],' + "\n";
    var pos_log = pos_log + '"target": ['+ camera.target + '],'
    prompt("Copy to clipboard: Ctrl+C, Enter", pos_log);
  });
}



function loadModel(client, urlid) {
    client.init(urlid, {
        success: success,
    });
}

loadModel( client, uid );
