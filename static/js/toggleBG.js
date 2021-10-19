$(function(){
			var leftToggle = $('#left-toggle-bg');
			var rightToggle = $('#right-toggle-bg');
			var imgSrc = [];
			var dir = '../static/img/background/jukebox/';
			var fileExtension = '.jpg';
			var currentImg = 0;

			$.ajax({
			  url: dir,
			  type: 'POST',
			  complete: function(xhr, textStatus) {
			    //called when complete
			  },
			  success: function(data, textStatus, xhr) {
			    //called when successful
			    imgSrc = data;
				resetBG();
			  },
			  error: function(xhr, textStatus, errorThrown) {
			    //called when there is an error
			    console.log(textStatus);
			    console.log(errorThrown);
			  }
			});

			function resetBG(){
				$('body').css(
				'background-image', imgSrc[currentImg]);
			};


			leftToggle.on('click',function(){
				currentImg-=1;
				if(currentImg<0)
				{
					currentImg = imgSrc.length-1;
				}
				resetBG();

			});

			rightToggle.on('click', function() {
				currentImg += 1;
				if(currentImg == imgSrc.length)
				{
					currentImg = 0;
				}
				resetBG();

			});

			
			
		});