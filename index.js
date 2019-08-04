
//var getUserMedia = require('getusermedia')
var Peer = require('simple-peer')
var video = document.createElement('video')
    document.body.appendChild(video)
  // getMedia();

   /* function getMedia() {
      let stream = null;
    
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
       
        gotMedia(stream);
      } catch(err) {
       
      }
    } */
    /* navigator.mediaDevices.getUserMedia({ video: true, audio: true }, gotMedia, () => {




    }) */
    var constraints = { audio: true, video: { width: 1280, height: 720 } }; 
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      /* use the stream */
      gotMedia(stream);
    })
    .catch(function(err) {
      /* handle the error */
      console.log(err);
    });


// get video/voice stream
//todo : navigator.getUserMedia({ video: true, audio: true }, gotMedia, () => {})
/* getUserMedia({video: true, audio: true}, function (err, stream) {
  // if the browser doesn't support user media
  // or the user says "no" the error gets passed
  // as the first argument.
  if (err) {
     console.log('failed mediaman');
  } else {

var Peer = require('simple-peer')
  var video = document.createElement('video')
    document.body.appendChild(video)
    gotMedia(stream);
  }

}); */


/* // first deal with browser prefixes
var getUserMedia = navigator.getUserMedia || 
    navigator.mozGetUserMedia || 
    navigator.webkitGetUserMedia;

    // make sure it's supported and bind to navigator
if (getUserMedia) {
     gotMedia = getUserMedia.bind(navigator);
} else {
  // have to figure out how to handle the error somehow
} */


 function gotMedia (stream) {
              var peer1 = new Peer(
                {
                  initiator: location.hash === '#host',
                  trickle: false,
                  //wrtc: wrtc,
                  stream: stream 
                })
              peer1.on('signal', data => {
                //GET MY DATA ON THE 
                document.getElementById('yourId').value = JSON.stringify(data)
              })

              document.getElementById('connect').addEventListener('click', function () {
                var otherId = JSON.parse(document.getElementById('otherId').value)
                peer1.signal(otherId)

                alert('connect: '+otherId);
              })
              peer1.on('data', data => {

                document.getElementById('messages').textContent += data + '\n'
                console.log('got a message from peer1: ' + data)
              })
            
              peer1.on('stream', stream => {
                // got remote video stream, now let's show it in a video tag
                var video = document.querySelector('video')
            
                if ('srcObject' in video) {
                  video.srcObject = stream
                } else {
                  video.src = window.URL.createObjectURL(stream) // for older browsers
                }
            
                video.play()
              })

                document.getElementById('send').addEventListener('click', function () {
                  var yourMessage = document.getElementById('yourMessage').value
                  console.log("yourMessage JSON.stringify(data): "+JSON.stringify(yourMessage));
                  peer1.send(yourMessage)
                })
  }