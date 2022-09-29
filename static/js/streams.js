const APP_ID = 'c201ad8a1da440789c89161a13b43bf7'
const CHANNEL = 'test'
const TOKEN = '007eJxTYMgOOfI/Zt2N95PCvs1zO90y+bXptF+Nt0Q/Sc91WzghdFe3AkOykYFhYopFomFKoomJgbmFZbKFpaGZYaKhcZKJcVKa+eu1psnZ/82ST1/cxMAIhSA+C0NJanEJAwMAnRYl4g=='
let UID;

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    client.on('user-published', handleUserJoined)
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()
    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper" ><span class="user-name" > My Name </span></div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
    localTracks[1].play(`user-${UID}`)
    
    await client.publish([localTracks[0], localTracks[1]])
}
let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)

    if(mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)
        if(player != null){
            player.remove()
        }
        player = `<div class="video-container" id="user-container-${user.uid}">
        <div class="username-wrapper" ><span class="user-name" > My Name </span></div>
        <div class="video-player" id="user-${user.uid}"></div>
    </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
        user.videoTrack.play(`user-${user.uid}`)
    }
    if(mediaType === 'audio'){
        user.audioTrack.play()
    }
}
joinAndDisplayLocalStream()