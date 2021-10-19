$(function(){
	var scrollButton = $('#scroll-button');
	var showAt = 300;
	$(window).on('scroll',function(){
		var scroll = getCurrentScroll();
		if(scroll>showAt)
		{
			scrollButton.addClass('show');
		}
		else
		{
			scrollButton.removeClass('show');
		}
	});

	function getCurrentScroll()
	{
		return window.pageYOffset || document.documentElement.scrollTop;
	}
});