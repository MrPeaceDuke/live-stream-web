const playVideo = require('./playVideo');
const Peer = require('simple-peer');
const $ = require('jquery');

function openStream(){
    navigator.mediaDevices.getUserMedia({ audio:false, video:true })
    .then(stream => {
        playVideo(stream, 'localStream');

        const p = new Peer({ initiator: location.hash === '#1', 
        config: { iceServers: [{ iceServers:[{urls:'stun:stun01.sipphone.com'},
        {urls:'stun:stun.ekiga.net'},
        {urls:'stun:stun.fwdnet.net'},
        {urls:'stun:stun.ideasip.com'},
        {urls:'stun:stun.iptel.org'},
        {urls:'stun:stun.rixtelecom.se'},
        {urls:'stun:stun.schlund.de'},
        {urls:'stun:stun.l.google.com:19302'},
        {urls:'stun:stun1.l.google.com:19302'},
        {urls:'stun:stun2.l.google.com:19302'},
        {urls:'stun:stun3.l.google.com:19302'},
        {urls:'stun:stun4.l.google.com:19302'},
        {urls:'stun:stunserver.org'},
        {urls:'stun:stun.softjoys.com'},
        {urls:'stun:stun.voiparound.com'},
        {urls:'stun:stun.voipbuster.com'},
        {urls:'stun:stun.voipstunt.com'},
        {urls:'stun:stun.voxgratia.org'},
        {urls:'stun:stun.xten.com'}]}] },
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