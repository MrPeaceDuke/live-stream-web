const playVideo = require('./playVideo');
const Peer = require('simple-peer');
const $ = require('jquery');

var clients = []


function openStream(){
    navigator.mediaDevices.getUserMedia({ audio:false, video:true })
    .then(stream => {
        playVideo(stream, 'localStream');

        const p = new Peer({ initiator: true, trickle: false, stream });

        p.on('signal', token => {
            $('#tokenArea').val(JSON.stringify(token));
            clients.push(JSON.stringify(token));
            let url = document.createElement('a');
            url.id = 'tokenID';
            url.href = JSON.stringify(token);
            url.innerText = 'Token ' + clients.length;
            document.getElementById('urls').appendChild(url);
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