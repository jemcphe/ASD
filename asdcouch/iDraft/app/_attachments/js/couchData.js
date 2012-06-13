$(document).ready(function(){
	$.ajax({
		url  	:"_view/players",
		dataType: "json",
		success : function(data) {
			$.each(data.rows, function(index, player) {
				var position 	= player.value.position;
				var pname		= player.value.pname;
				var team		= player.value.team;
				var notes		= player.value.notes;
				$(		'<p>' + position[0] +" "+ position[1] +'</p>' +
						'<p>' + pname[0] +" "+ pname[1] + '</p>' +
						'<p>' + team[0] +" "+ team[1] + '</p>' +
						'<p>' + notes[0] +" "+ notes[1] + '</p>' + '<br />'
				).appendTo('#playerlist');					
			});
			$('#playerlist').listview('refresh');
		}
	});
});