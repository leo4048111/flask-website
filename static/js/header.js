$(function(){
	var shrinkAt = 300;

	$(window).on('scroll',function(){
		var scroll = getCurrentScroll();
		if(scroll >= shrinkAt)
		{
			$('.main-header').addClass('shrink');
		}
		else
		{
			$('.main-header').removeClass('shrink');
		}
	});

	function getCurrentScroll()
	{
		return window.pageYOffset || document.documentElement.scrollTop;
	}
});