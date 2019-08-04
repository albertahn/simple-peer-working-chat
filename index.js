
var getUserMedia = require('getusermedia')


// get video/voice stream
navigator.getUserMedia({ video: true, audio: true }, gotMedia, () => {})

  /* var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })
 */

var Peer = require('simple-peer')
var wrtc = require('wrtc')
//me


/* 
peer1.on('signal', function (data) {
    console.log("signal : ");
    document.getElementById('yourId').value = JSON.stringify(data)
    peer2.signal(data);
    console.log("signal JSON.stringify(data): "+JSON.stringify(data));
  })

  otherpeer2.on('signal', data => {
    // when otherpeer2 has signaling data, give it to peer1 somehow
    peer1.signal(data)
  })

  peer1.on('connect', () => {
    // wait for 'connect' event before using the data channel
    console.log("peer1.on('connect': ");
    peer1.send('hey peer2, how is it going?')
  })


  otherpeer2.on('data', data => {
    // got a data channel message
    console.log('got a message from peer1: ' + data)
  })

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    
    peer1.signal(otherId)
  }) */

  /* document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('yourMessage').value
    console.log("yourMessage JSON.stringify(data): "+JSON.stringify(yourMessage));
    peer1.send(yourMessage)
  }) */

  /* peer1.on('data', function (data) {
    console.log("data JSON.stringify(data): "+JSON.stringify(data));
    document.getElementById('messages').textContent += data + '\n'
  }) */

  /* peer1.on('stream', function (stream) {
    console.log("streamstream");
    var video = document.createElement('video')
    document.body.appendChild(video)
    video.src = window.URL.createObjectURL(stream)
    video.play()
  }) */

  var video = document.createElement('video')
    document.body.appendChild(video)
  
  function gotMedia (stream) {

    var peer1 = new Peer(
      {
        
        initiator: location.hash === '#init',
        trickle: false,
        wrtc: wrtc,
        stream: stream 
      })
    //var otherpeer2 = new Peer({ wrtc: wrtc })

    //var peer1 = new Peer({ initiator: true, stream: stream })
    //var otherpeer2 = new Peer()
  
    peer1.on('signal', data => {
      //otherpeer2.signal(data)

      //GET MY DATA ON THE 
      document.getElementById('yourId').value = JSON.stringify(data)

    })
  
    /* otherpeer2.on('signal', data => {
      peer1.signal(data)
    }) */

    document.getElementById('connect').addEventListener('click', function () {
      var otherId = JSON.parse(document.getElementById('otherId').value)
      peer1.signal(otherId)

      alert('connect: '+otherId);
    })
  

    /* otherpeer2.on('data', data => {
      // got a data channel message
      console.log('got a message from peer1: ' + data)
    }) */

    peer1.on('data', data => {

      document.getElementById('messages').textContent += data + '\n'

      // got a data channel message
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


    /* window.localConnection = localConnection =
          new RTCPeerConnection(configuration); // configuration.iceServer

      localChannel = localConnection.createDataChannel('data');
      localChannel.onopen = function () { // never triggered
        var readyState = localChannel.readyState;
        console.log('Local channel state is: ' + readyState);
      } */

      document.getElementById('send').addEventListener('click', function () {
        var yourMessage = document.getElementById('yourMessage').value
        console.log("yourMessage JSON.stringify(data): "+JSON.stringify(yourMessage));
        peer1.send(yourMessage)
      })
  }