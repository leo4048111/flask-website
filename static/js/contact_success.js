$(function(){
	var comment_count = $('#comment-count');
	var comment_section = $('.comment-view');
	var refresh = $('.refresh-button');

	refresh.on('click',updateComment);


	function updateComment(){
		$.get("get_comments",function(data){
	}).done(function(data){
		//got data as json
		/*alert(JSON.stringify(data))*/

		comment_count.text(data[0]);

		function random(min, max){
  			return Math.floor(Math.random() * (max - min)) + min;
		}

		comment_section.each(function(){
			var index = random(1,data.length);
			var comment = data[index].comment;
			var name = data[index].name;
			var time = data[index].time;
			$(this).find('.comment-text').text(comment);
			$(this).find('.comment-name').text(name);
			$(this).find('.comment-time').text(time);

		});

	})
};

updateComment();

		
});