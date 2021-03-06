var iframe = document.getElementById( 'api-frame' );
var uid = 'c966755a1efe451b80925b19ed6a9318';
var version = '1.5.1';
var client = new Sketchfab( version, iframe );

var modelIndexCount = 0;
var currentEventList = ''
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

 setTimeout(function() {
         isLoading = false;
         posIndex = 0;
        if (autoplay == true) {
           console.log("autoplay");

             posIndex = 0;

                    animationEvent();


        }
          }, 2000);

          api.addEventListener(
              'click',
              function(info) {
                  screenEvent(info)
                }
          );
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
  if (isLoading == false) {
    console.log("not loading");
    if (posIndex == currentEventList.length) {
        api.stop();
        isLoading = true;
        setNextModelEvents();
        var uid = currentModel.uid;
        clearTimeout(currentAnimation);
        var client = new Sketchfab( version, iframe );
        setTimeout(function() {
          loadModel( client, uid  )
        }, 1000);
    } else {
      if (autoplay == true) {
        var currentAnimation =  setTimeout(function() {
              animationEvent();
            }, currentEventList[posIndex].duration * 1000);
      }
      setCamera();
    }
  }
}


function setNextModelEvents() {
  var currentModelname = modelNames[modelIndexCount];
  currentModel = models.models[currentModelname];
  currentEventList = currentModel.events;
  if (modelIndexCount < modelNames.length -1) {
    modelIndexCount++;
  } else {
    modelIndexCount = 0;
  }
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

loadModel( client, uid );
setNextModelEvents();
