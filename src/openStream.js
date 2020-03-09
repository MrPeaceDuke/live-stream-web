const playVideo = require('./playVideo');
const Peer = require('simple-peer');
const $ = require('jquery');

function openStream(){
    navigator.mediaDevices.getUserMedia({ audio:false, video:true })
    .then(stream => {
        playVideo(stream, 'localStream');

        const p = new Peer({ initiator: location.hash === '#1', trickle: false, stream });

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