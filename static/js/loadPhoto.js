$(function(){
	var dir = '../static/img/gallery/';
	var images = [];
	var image_box = $('.image-box');

	$.ajax({
	  url: dir,
	  type: 'POST',
	  complete: function(xhr, textStatus) {
	    //called when complete
	  },
	  success: function(data, textStatus, xhr) {
	    //called when successful
		images = data	  
		loadPhoto();
		bindClick();
	  },
	  error: function(xhr, textStatus, errorThrown) {
	    //called when there is an error
		console.log(textStatus);
		console.log(errorThrown);	  
	  }
	});

	var loadPhoto = function(){
		for(index in images)
		{
		image_box.append('<img loading="lazy" width="2048" height="1638" src="'+images[index]+
			'" sizes="(min-width: 0px) and (max-width: 480px) 480px, (min-width: 481px) and (max-width: 980px) 980px, (min-width: 981px) and (max-width: 1280px) 1280px, (min-width: 1281px) 2048px, 100vw" class="image">');
		};
	}
})

function bindClick(){
(function(){
	$(".image").click(function(){
		var _this = $(this);
		imgDisplay("#outerdiv","#innerdiv","#bigimg",_this);
	});
})();

function imgDisplay(outerdiv,innerdiv,bigimg,_this){
	var src = _this.attr("src");
	$(bigimg).attr("src",src);  //set src for the current img

	$("<img/>").attr("src",src).on("load",(function(){
		var windowW = $(window).width();
		var windowH = $(window).height();
		var realWidth = this.width;
		var realHeight = this.height;
		var imgWidth = realWidth;
		var imgHeight = realHeight;
		var scale = 0.6; //if real > window, scale

		if(realHeight>windowH*scale){
			imgHeight = windowH*scale;
			imgWidth = imgHeight/realHeight*realWidth;
			if(imgWidth>windowW*scale){
				imgWidth = windowW*scale;
			}
		}
		else if(realWidth>windowW*scale){
			imgWidth = windowW*scale;
			imgHeight = imgWidth/realWidth*realHeight;
		}
		else{
			imgWidth = realWidth;
			imgHeight = realHeight;
		}

		$(bigimg).css("width",imgWidth);

		var w = (windowW-imgWidth)/2;
		var h = (windowH-imgHeight)/2;
		$(innerdiv).css({"top":h,"left":w});
		$(outerdiv).fadeIn("fast");
	}));

$(outerdiv).click(function(){
	$(this).fadeOut("fast");
});

}
}

