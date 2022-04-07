// Player Elements //
const player = document.getElementById('player')

const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const stopBtn = document.getElementById("stop");
const previousBtn = document.getElementById("previous")
const nextBtn = document.getElementById("next")

const totalSongs = document.getElementById("total-songs");
const progressBar = document.getElementById("player-bar");
const progressSeeking = document.getElementById("player-progress");
const timeProgress = document.querySelectorAll("#time-progress p")

const playlist = document.querySelectorAll("#playlist li a")


// Player Initialization //
let minutes = "0";
let seconds = "00";
let totalPlaytime = 0;
let refList = [];
let activeSample = 0

playlist.forEach((el) => {
    refList.push(el.href)
})


player.src = document.querySelector("#playlist li a");
pauseBtn.style.display = "none";

timeProgress[0].innerHTML = `${Number.isInteger(minutes) ? minutes: '0'}:${Number.isInteger(seconds) ? seconds : '00'}`

const getPlaytime = (ref) =>{

        audio.src = ref;
        audio.preload = "metadata"
        console.log(audio)

}

  
const getPlaytimeTotalPlaytime = (refList) => {
    refList.map((ref) => {
        const audio = new Audio();
        audio.addEventListener("loadedmetadata", ()=>{
            totalPlaytime += audio.duration;
            totalSongs.innerHTML = `${document.getElementById('playlist').children.length} songs, ${Math.trunc( totalPlaytime/ 60)} minutes, ${Math.trunc(totalPlaytime % 60)} seconds`;
        });
        audio.src = ref;
        
    })

}
getPlaytimeTotalPlaytime(refList)

// Player Controls //


playBtn.addEventListener('click', (ev)=>{
    ev.preventDefault
    player.play();
    togglePlay()
    //sampleTimer.start()
})
pauseBtn.addEventListener('click', (ev)=>{
    ev.preventDefault
    player.pause();
    togglePause()
})

stopBtn.addEventListener('click', (ev)=>{
    ev.preventDefault
    player.pause();
    progressReset();
    togglePause()

})
previousBtn.addEventListener('click', (ev)=>{
    ev.preventDefault
    playlist[activeSample].classList.remove("active-sample")
    if(activeSample == 0){ 

        activeSample = playlist.length -1;

    } else {

        activeSample--;
    }

    progressReset();
    playlist[activeSample].classList.add("active-sample")
    player.src = refList[activeSample]
    togglePlay()
    player.play();

})

nextBtn.addEventListener('click', (ev)=>{
    ev.preventDefault()
    playlist[activeSample].classList.remove("active-sample")
    activeSample++;
    if(activeSample == playlist.length){
        activeSample = 0;

    }
    playlist[activeSample].classList.add("active-sample")
    progressReset()
    player.src = refList[activeSample]
    togglePlay()
    player.play();

})

progressSeeking.addEventListener('click', (ev)=>{
    player.currentTime = (ev.offsetX / progressSeeking.offsetWidth) * player.duration;
    player.play();
    togglePlay();
})



// Player Behaviors //

const progressReset =()=>{
    progressBar.style.width = `0%`;
    player.currentTime = 0;
}

const togglePlay =()=>{
    pauseBtn.style.display = "block";
    playBtn.style.display = "none";
}
const togglePause =()=>{
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
}

player.addEventListener("durationchange", ()=>{

    minutes = Math.trunc(player.duration / 60);
    seconds = Math.trunc(player.duration % 60);

    timeProgress[1].innerHTML = `${minutes}:${seconds}`;
    timeProgress[0].innerHTML = `0:00`;

})

player.addEventListener('timeupdate', ()=>{

    let durationPosition = parseInt(((player.currentTime / player.duration) * player.duration), 10)

    minutes =  Math.trunc(durationPosition / 60);
    seconds =  Math.trunc(durationPosition % 60);

    timeProgress[0].innerHTML = `${Number.isInteger(minutes) ? minutes: '0'}:${Number.isInteger(seconds) ? seconds >= 10 ? seconds : "0" + seconds : '00'}`
    progressBar.style.width = `${parseInt(((player.currentTime / player.duration) * 100), 10)}%`;

})
player.addEventListener("ended", ()=>{
    playlist[activeSample].classList.remove("active-sample")
    activeSample++;
    if(activeSample == playlist.length){
        activeSample = 0;

    }
    playlist[activeSample].classList.add("active-sample")
    progressReset()
    player.src = refList[activeSample]
    player.play();
})


// Playlist Selection //

playlist.forEach((el) => {
    el.addEventListener('click', (ev) =>{

        ev.preventDefault()

        togglePlay()
        player.src = el;
        progressReset()

        player.play();

        //sampleTimer.end()
        //sampleTimer.start()

        playlist[activeSample].classList.remove("active-sample")
        el.classList.add("active-sample")
        activeSample = Array.from(playlist).indexOf(el);

    })
})


// Sampling //


const sampleTimer = {

    start: function(){
        if (typeof this.timeoutID === 'number') {
            this.end();
          }
        this.timerID = setTimeout(()=>{
            player.pause()
            togglePause()
            progressReset();
        }, 30000)
    },
    end: function(){

        clearInterval(this.timerID);
    }

}
