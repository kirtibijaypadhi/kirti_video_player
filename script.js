const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
const themeColor = document.getElementById('theme-color')

// Play & Pause ----------------------------------- //

function showPlayIcon(){
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay()
{

    if(video.paused)
    {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    }
    else{
        video.pause();
        showPlayIcon();
    }
}

//On video end
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time){
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

//update progress bar as videos play
function updateProgress(){
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// click to seek in video
function setProgress(e)
{
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //
let currVolume = 1;
// volume bar
function changeVolume(e)
{
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Round volume up or down
    if(volume < 0.1)
    {
        volume = 0;
    }
    if(volume > 0.9)
    {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    // change icon depending on volume 
    volumeIcon.className = '';
    if(volume > 0.7)
    {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    }
    else if(volume < 0.7 && volume > 0)
    {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    }
    else if(volume === 0)
    {
        volumeIcon.classList.add('fas','fa-volume-off');
    }
    currVolume = volume;
}



// mute / play function
function mute_play()
{
    volumeIcon.className = '';
    if(video.volume)
    {
        // currVolume = video.volume;
        
        volumeIcon.classList.add('fas', 'fa-volume-off');
        video.volume = 0;
        volumeBar.style.width = `${video.volume * 100}%`;
    }
    else{
        video.volume = currVolume;
        volumeBar.style.width = `${currVolume * 100}%`;
        // volumeIcon.className = '';
        if(currVolume > 0.7)
        {
            volumeIcon.classList.add('fas', 'fa-volume-up');
        }
        else if(currVolume < 0.7 && currVolume > 0)
        {
            volumeIcon.classList.add('fas', 'fa-volume-down');
        }
        else if(currVolume === 0)
        {
            volumeIcon.classList.add('fas','fa-volume-off');
        }
    }  
}



// Change Playback Speed -------------------- //

function changeSpeed()
{
    video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

// set theme function
function setTheme()
{
    const root = document.querySelector(':root');
    if (themeColor.value === 'red') {
        root.style.setProperty('--primary-color', '#ff0000');
      }
      else if (themeColor.value === 'blue') {
        root.style.setProperty('--primary-color', '#005A9C');
      }
      else if (themeColor.value === 'purple') {
        root.style.setProperty('--primary-color', '#800080');
      }
}

let fullscreen = false;

// toggle fullscreen
function toggleFullscreen(){
    if(!fullscreen)
    {
        openFullscreen(player);
    }
    else{
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}


// event listener
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', mute_play);
speed.addEventListener('change', changeSpeed);
themeColor.addEventListener('change', setTheme);
fullscreenBtn.addEventListener('click', toggleFullscreen);
