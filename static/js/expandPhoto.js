$(function(){
	$(".image").click(function(){
		var _this = $(this);
		imgDisplay("#outerdiv","#innerdiv","#bigimg",_this);
	});
});

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