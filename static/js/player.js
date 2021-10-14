$(function(){
  var URLROOT = '../static/audio/';
  var trackURL = ["ain't_no_sunshine_john_mayer.mp3",'the_sky_is_crying_gary_bb_coleman.mp3','riviera_paradise_srv.mp3'];
  var playPauseButton = $('#playPause');
  var playBackwardButton = $('#playBackward');
  var playForwardButton = $('#playForward');
  var likeButton = $('#like');
  var likeCount = $('#like-count');

  var disc = $('.disc');
  var playerInfo = $('.player-info');
  var trackName = $('.track-name');
  var albumName = $('.album-name');

  var trackNames = ['Ain\'t No Sunshine','The Sky Is Crying','Riviera Paradise'];
  var albumNames = ['John Mayer - Crossroads 2010','Gary B.B. Coleman - Too Much Weekend','Stevie Ray Vaughan - In Step'];
  var currentIndex = 0;
  var currentTrackName = '';
  var currentAlbumName = '';

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
    audio.src = URLROOT+trackURL[index];
    currentTrackName = trackNames[index];
    currentAlbumName = albumNames[index];
    trackName.text(currentTrackName);
    albumName.text(currentAlbumName);
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

  function initPlayer(){
    audio = new Audio();
    currentIndex = 0;
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
    
  }

  initPlayer();

});