  
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
            const clickedPosition = (e.originalEvent.layerX);
            console.log(clickedPosition);
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

        interval = setInterval(() => {
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

    let dimensions = {
        height: "390",
        width: "660"
    };

    const isTablets = window.matchMedia("(max-width: 768px)").matches;
    const isMobile = window.matchMedia("(max-width: 480px)").matches;
    
    if(isTablets) {
        dimensions = {
            height: "351",
            width: "594"
        }
    } 
    
    if(isMobile) {
        dimensions = {
            height: "233",
            width: "394"
        }
    }

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
            ...dimensions,
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
        
    let soundControl;
    let soundLevel;

    $().ready(function () {
        initVars();
        soundControl.min = 0;
        soundControl.max = 100;
        soundControl.value = soundControl.max;
    });

    // инициализация перменных
    function initVars() {
        player = document.getElementById('yt-player');
        soundControl = document.getElementById('micLevel');
    }

    $('#mic').on('click', function() {      
        if(player.isMuted()){
            soundControl.value = soundLevel * 100;
            player.unMute();
        }
        
        else{
            soundControl.value = 0;
            player.mute();
        }    
    });

    $('#micLevel').on('change', function () {
        player.setVolume($(this).val());
    });
            