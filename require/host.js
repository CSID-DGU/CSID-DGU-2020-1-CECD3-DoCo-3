const express = require('express');
const router = express.Router();
const Room = require('../room.js');
const navigator = require('navigator')

router.get('/', async (req, res, _) => {
    const roomId = req.query.roomId;
    const currentRoom = rooms[roomId]
    if (currentRoom === undefined) { 
        res.send('CANNOT FIND')
        return 
    }  
    
    let stream;

    async function getUserMedia(transport, isWebcam) {
        if (!device.canProduce('video')) {
          console.error('cannot produce video');
          return;
        }
      
        let stream;
        try {
          stream = isWebcam ?
            await navigator.mediaDevices.getUserMedia({ video: true }) :
            await navigator.mediaDevices.getDisplayMedia({ video: true });
        } catch (err) {
          console.error('getUserMedia() failed:', err.message);
          throw err;
        }
        return stream;
      }


    try {
      stream =  await navigator.mediaDevices.getUserMedia({ video: true });
      const track = stream.getVideoTracks()[0];
      const params = { track };
    //   if ($chkSimulcast.checked) {
    //     params.encodings = [
    //       { maxBitrate: 100000 },
    //       { maxBitrate: 300000 },
    //       { maxBitrate: 900000 },
    //     ];
        params.codecOptions = {
          videoGoogleStartBitrate : 1000
      //  };
      }
      producer = await transport.produce(params);
    } catch (err) {
        console.log(err)
            return
      //$txtPublish.innerHTML = 'failed';
    }
    
    document.querySelector('#my_video').srcObject = await stream;

    res.render('host')
})

module.exports = router;