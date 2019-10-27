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

function success( callback ) {
      api = callback;
      api.load();
      api.start();
      isClicking = false;
      cooldown = false;
      api.addEventListener( 'viewerready', function() {
           animationEvent();
      });
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
            }, currentEventList[posIndex].duration * 300);
      }
      setCamera();
    }




function setCamera() {
  if (isLoading == false) {
    console.log(posIndex, currentEventList.length);
    api.setCameraLookAt(currentEventList[posIndex].position, currentEventList[posIndex].target, currentEventList[posIndex].duration);
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

function loadModel( client, urlid ) {
     console.log( 'loading a model' );

     client.init( urlid, {
         success: success,
         camera: 0,
         preload: 1,
         error: function onError() {
              console.log( 'Viewer error' );
          }
     });
 }

function rebuildIframe() {
  var iframes = document.querySelectorAll('iframe');
  for (var i = 0; i < iframes.length; i++) {
      iframes[i].parentNode.removeChild(iframes[i]);
  }
  var r = Math.floor(Math.random()*90000) + 10000;
  iframeName = "iframe-"+r;
  var ifrm = document.createElement("iframe");
  ifrm.setAttribute('id', 'iframeName');
  ifrm.setAttribute('class', 'iframeName');
  ifrm.style.width = "800px";
  ifrm.style.height = "800px";
  document.body.appendChild(ifrm);
  var client = new Sketchfab( ifrm );
}



function loadModel(client, urlid) {
    client.init(urlid, {
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
}

loadModel( client, uid );
