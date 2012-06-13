$(document).ready(function(){
	$.ajax({
		url  	:"_view/players",
		dataType: "json",
		success : function(data) {
			$.each(data.rows, function(index, player) {
				var position = player.value.position;
				$('playerlist').append($.html(position));
			});
			
		}
	});
});