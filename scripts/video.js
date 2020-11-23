let video;
let durationControl;
let soundControl;
let intervalId;
let soundLevel;


$().ready(function () {
    initVars();
    initPlayButtons();
    addListeners();

    durationControl.min = 0;
    durationControl.value = 0;
    soundControl.min = 0;
    soundControl.max = 10;
    soundControl.value = soundControl.max;
});

// обработчики событий
function addListeners() {
    durationControl.addEventListener('click', setVideoDuration);
    durationControl.addEventListener('onmousemove', setVideoDuration);
    durationControl.addEventListener('mousedown', setVideoDuration);
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);
}

// управление громкостью
function changeSoundVolume() {
    video.volume = soundControl.value / 10;
}
// управление длительностью
function setVideoDuration() {
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration, 1000 / 66);
}

// инициализация перменных
function initVars() {
    video = document.getElementById('player');
    durationControl = document.getElementById('durationLevel');
    soundControl = document.getElementById('micLevel');
}

// обработчики событий для кнопок play
function initPlayButtons() {
    const playButtons = document.querySelectorAll('.play');

    playButtons.forEach(btn => {
        btn.addEventListener('click', playStop);
    });

    const micControl = document.getElementById('mic');
    micControl.addEventListener('click', soundOf);
}

// запуск\остановка видео
function playStop() {
    $('.video__player-img').toggleClass('video__player-img--active');

    durationControl.max = video.duration;

    if (video.paused) {
        video.play();
        intervalId = setInterval(updateDuration, 1);
    } else {
        video.pause();
        // clearInterval(intervalId);
    }

}

// обвновление timeline-a
function updateDuration() {
    durationControl.value = video.currentTime;
}
// выключение звука в 0 и восстановление прошлого состояния
function soundOf() {
    if (video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel * 10;
    }else{
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }
}

