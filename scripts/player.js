let player;
const playerContainer = $('.player');

let eventsInit = () => {
    $(".player__start").click( e => {
        e.preventDefault();
        
        if (playerContainer.hasClass('paused')) {
            player.pauseVideo()
        } else {
            player.playVideo();
        }        
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPositionSec);

    });

    $(".player__splash").click(e => {
        player.playVideo();
    });
};

const formatTime = timeSec => {
    const round = Math.round(timeSec);

    const minutes = Math.floor(roundTime / 60);
    const seconds = roundTime - minutes * 60;

    return `${minutes} : ${seconds}`; 
}

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    if (typeof interval != "undefined") {
        clearInterval(interval);
    }

    interval =setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        })
    }, 1000)

}

const onPlayerStateChange = event => {
    /* 
        -1 – воспроизведение видео не началось
        0 – воспроизведение видео завершено
        1 – воспроизведение
        2 – пауза
        3 – буферизация
        5 – видео находится в очереди
    */
    switch (event.data) {
        case 1:
            playerContainer.addClass('active');
            playerContainer.addClass("paused");
            $('#play').css("display", "none");
            $('#pause').css("display", "block");
            break;

        case 2:
            playerContainer.removeClass('active');
            playerContainer.removeClass("paused");
            $('#pause').css("display", "none");
            $('#play').css("display", "block");
            break;
    }
};

function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '405',
        width: '660',
        videoId: 'LXb3EKWsInQ',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showInfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0,
        }
    });
}


eventsInit();







let video;
let durationControl;
let soundControl;
let intervalId;
let soundLevel;


$().ready(function () {
    initVars();
    initPlayButtons();
    addListeners();

    // durationControl.min = 0;
    // durationControl.value = 0;
    soundControl.min = 0;
    soundControl.max = 10;
    soundControl.value = soundControl.max;
});

// обработчики событий
function addListeners() {
    // durationControl.addEventListener('click', setVideoDuration);
    // durationControl.addEventListener('onmousemove', setVideoDuration);
    // durationControl.addEventListener('mousedown', setVideoDuration);
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);
}

// управление громкостью
function changeSoundVolume() {
    video.volume = soundControl.value / 10;
}
// управление длительностью
// function setVideoDuration() {
//     video.currentTime = durationControl.value;
//     intervalId = setInterval(updateDuration, 1000 / 66);
// }

// инициализация перменных
function initVars() {
    video = document.getElementById('yt-player');
    // durationControl = document.getElementById('durationLevel');
    soundControl = document.getElementById('micLevel');
}

// обработчики событий для кнопок play
function initPlayButtons() {
    // const playButtons = document.querySelectorAll('.play');

    // playButtons.forEach(btn => {
    //     btn.addEventListener('click', playStop);
    // });

    const micControl = document.getElementById('mic');
    micControl.addEventListener('click', soundOf);
}

// // запуск\остановка видео
// function playStop() {
//     $('.video__player-img').toggleClass('video__player-img--active');

//     durationControl.max = video.duration;

//     if (video.paused) {
//         video.play();
//         intervalId = setInterval(updateDuration, 1);
//     } else {
//         video.pause();
//         // clearInterval(intervalId);
//     }

// }

// // обновление timeline-a
// function updateDuration() {
//     durationControl.value = video.currentTime;
// }
// выключение звука в 0 и восстановление прошлого состояния
function soundOf() {
    if (video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
    }else{
        // soundLevel = video.volume;
        // video.volume = 0;
        // soundControl.value = 0;
    }
}

