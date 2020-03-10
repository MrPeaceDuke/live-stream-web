const playVideo = require('./playVideo');
const Peer = require('simple-peer');
const $ = require('jquery');

function openStream(){
    navigator.mediaDevices.getUserMedia({ audio:false, video:true })
    .then(stream => {
        playVideo(stream, 'localStream');

        const p = new Peer({ initiator: location.hash === '#1', 
        config: { iceServers: [{ iceServers:[{url:'stun:stun01.sipphone.com'},
        {url:'stun:stun.ekiga.net'},
        {url:'stun:stun.fwdnet.net'},
        {url:'stun:stun.ideasip.com'},
        {url:'stun:stun.iptel.org'},
        {url:'stun:stun.rixtelecom.se'},
        {url:'stun:stun.schlund.de'},
        {url:'stun:stun.l.google.com:19302'},
        {url:'stun:stun1.l.google.com:19302'},
        {url:'stun:stun2.l.google.com:19302'},
        {url:'stun:stun3.l.google.com:19302'},
        {url:'stun:stun4.l.google.com:19302'},
        {url:'stun:stunserver.org'},
        {url:'stun:stun.softjoys.com'},
        {url:'stun:stun.voiparound.com'},
        {url:'stun:stun.voipbuster.com'},
        {url:'stun:stun.voipstunt.com'},
        {url:'stun:stun.voxgratia.org'},
        {url:'stun:stun.xten.com'},
        {
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
        {
            url: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        {
            url: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        }]}] },
        trickle: false, 
        stream });

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