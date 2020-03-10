const playVideo = require('./playVideo');
const Peer = require('simple-peer');
const $ = require('jquery');

// var peer1 = new Peer({ initiator: true });
// var peer2 = new Peer();

function openStream(){
    navigator.mediaDevices.getUserMedia({ audio:false, video:true })
    .then(stream => {
        playVideo(stream, 'localStream');

        const p = new Peer();

        p.on('signal', token => {
            $('#tokenArea').val(JSON.stringify(token))
        });

        $('#btnConnect').click(() => {
            const friendSignal = JSON.parse($('#tokenYourFriend').val());
            p.signal(friendSignal);
        });
        
        p.on('stream', friendStream => playVideo(friendStream, 'friendStream'));
    })
    .catch(err => console.log(err))
}

module.exports = openStream;