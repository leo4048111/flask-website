$(function(){
  var trackURL = [];
  var playPauseButton = $('#playPause');
  var playBackwardButton = $('#playBackward');
  var playForwardButton = $('#playForward');
  var likeButton = $('#like').find('i');
  var likeCount = $('#like-count');
  var selectionPoster = $('.selection-poster');

  var disc = $('.disc');
  var playerInfo = $('.player-info');
  var trackName = $('.track-name');
  var albumName = $('.album-name');

  var currentTime = $('.current-time');
  var durationTime = $('.duration-time');
  var barOuter = $('.bar-outer');
  var barInner = $('.bar-inner');

  var trackNames = [];
  var albumNames = [];
  var currentIndex = 0;

  function playPause(){
    if(audio.paused)
    {
      audio.play();
      playPauseButton.find('i').attr('class','fa fa-pause-circle');
    }
    else
    {
      audio.pause();
      playPauseButton.find('i').attr('class','fa fa-play-circle');
    }

    toggleDiscSpin();
    toggleInfo();
  }

  function toggleTrack(index){
    audio.src = trackURL[index];
    trackName.text(trackNames[index]);
    albumName.text(albumNames[index]);
    audio.play();
    playPauseButton.find('i').attr('class','fa fa-pause-circle');
    toggleDiscSpin();
    toggleInfo();
    like(0);
  }

  function playBackward(){
    currentIndex--;
    if(currentIndex<0)
      currentIndex = trackURL.length-1;
    toggleTrack(currentIndex);
  }

  function playForward(){
    currentIndex++;
    if(currentIndex==trackURL.length)
      currentIndex = 0;
    toggleTrack(currentIndex);
  }

  function toggleDiscSpin(){
    if(audio.paused)
    {
        disc.css('animation-play-state','paused');
        disc.removeClass('active');
    }
    else
    {
      disc.css('animation-play-state','running');
      disc.addClass('active');
    }
  }

  function toggleInfo(){
      if(audio.paused)
      {
        playerInfo.removeClass('active');
      }
      else
      {
        playerInfo.addClass('active');
      }
  }

  function like(para){
    $.get("like",{index:currentIndex,isUpdate:para}).done(function(data){
       likeCount.text(data);
    });
  }

  function getUrlAndInfo(){
      selectionPoster.each(function() {
      var url = $(this).find('a').attr('href');
      var track = $(this).find('.description').find('.track').text();
      var album = $(this).find('.description').find('.album').text()
      trackURL.push(url);
      trackNames.push(track);
      albumNames.push(album);
    });
  }

  function updateTime(){
    currentMin = Math.floor(audio.currentTime/60);
    currentSec = Math.floor(audio.currentTime - currentMin*60);

    durationMin = Math.floor(audio.duration/60);
    durationSec = Math.floor(audio.duration - durationMin*60);

    if(currentMin<10)
      currentMin ='0' + currentMin;
    if(currentSec<10)
      currentSec = '0' + currentSec;
    if(durationMin<10)
      durationMin = '0' + durationMin;
    if(durationSec<10)
      durationSec = '0' + durationSec;

    if(isNaN(currentMin)||isNaN(currentSec))
      currentTime.text('00:00');
    else
      currentTime.text(currentMin+':'+currentSec);


    if(isNaN(durationMin)||isNaN(durationSec))
      durationTime.text('00:00');
    else
      durationTime.text(durationMin+':'+durationSec);

    if(isNaN(currentMin)||isNaN(currentSec)||isNaN(durationMin)||isNaN(durationSec))
      barInner.css('width',0);
    else
    {
      var percentage = audio.currentTime/audio.duration*100;
      barInner.css('width',percentage+'%');
    }

    if(percentage == 100)
      playForward();
  }

  function initPlayer(){
    audio = new Audio();
    $(audio).on('timeupdate',updateTime);
    currentIndex = 0;
    getUrlAndInfo();
    toggleTrack(currentIndex);
    audio.pause();
    toggleDiscSpin();
    toggleInfo();
    playPauseButton.find('i').attr('class','fa fa-play-circle');
    playPauseButton.on("click",playPause);
    playBackwardButton.on('click',playBackward);
    playForwardButton.on('click',playForward);
    likeButton.on('click',function(){
      like(1);
    });
    selectionPoster.on('click',function(){
      for(let i = 0;i<trackNames.length;i++)
      {
         if(trackNames[i] == $(this).find('.description').find('.track').text())
         {
            currentIndex = i;
            toggleTrack(currentIndex);
         }
      }
    })

    barOuter.on('click',function(ev){
      var barOffset = $(this).offset();
      var clickedX = ev.clientX;
      var gap = clickedX - barOffset.left;
      audio.currentTime = audio.duration*(gap/$(this).outerWidth());
    })
    
  }

  initPlayer();

});