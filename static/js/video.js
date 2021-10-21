// poster frame click event
$(function(){
  var poster = $('.videoPoster');
  var wrapper = $('.videoWrapper');
  var selectionPoster = $('.selection-poster');
  poster.on('click',function(){
    videoPlay(wrapper);
  });

  selectionPoster.on('click',function(){
    var src = $(this).find('a').attr('href');
    $('video').attr('src',src);
    videoStop(wrapper);
    selectionPoster.each(function() {
      $(this).removeClass('selected');
    });
    $(this).addClass('selected');

  })
});

// play the targeted video (and hide the poster frame)
function videoPlay(wrapper) {
  // hide poster
  $('video').get(0).play();
  wrapper.addClass('videoWrapperActive');
}

// stop the targeted/all videos (and re-instate the poster frames)
function videoStop(wrapper) {
  // reveal poster
  $('video').get(0).pause();
  wrapper.removeClass('videoWrapperActive');

}