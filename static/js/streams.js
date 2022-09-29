const APP_ID = 'c201ad8a1da440789c89161a13b43bf7'
const CHANNEL = 'main'
const TOKEN = '007eJxTYHh6ICbb67qDreeZN5MY/sXf4La47pXkmV97x646a5XZ4lkKDMlGBoaJKRaJhimJJiYG5haWyRaWhmaGiYbGSSbGSWnmt7+ZJEd7mCWr7qtmZmSAQBCfhSE3MTOPgQEAevQgmw=='
let UID;

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
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

joinAndDisplayLocalStream()