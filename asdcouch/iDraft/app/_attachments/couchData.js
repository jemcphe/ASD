
var urlVars = function() {
	var urlData = $($.mobile.activePage).data("url");
	console.log(urlData);
	var urlParts = urlData.split('?');
	//?a=1&b=2&c=3
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for(var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}	
	return urlValues;
};

$('#positions').live('pageshow', function(){
	$.couch.db('idraft').view('asdproject/positions', {
		success: function(data) {
//			console.log(data);
			$('#positionUl').empty();
			$.each(data.rows, function(index, position){
				var item	=	(position.value || position.doc);
				var pos		=	position.value.pos;
				var abrev	=	position.value.abrev;
				$('<li>').append($('<a>').attr("href", "players.html?position=" + item.abrev).text(pos)).appendTo('#positionUl');
			});
			$('#positionUl').listview('refresh');
		}
	});
});

/******************DISPLAY PLAYERS ON PLAYERS PAGE*******************/

 

$('#players').live('pageshow', function(){
	var player = urlVars().position;
	console.log(player);
	$.couch.db("idraft").view("asdproject/"+ player, {
		success: function(data){
			console.log(data);
			$('#playersUl').empty();
			$.each(data.rows, function(index, position) {
				var item	= (position.value || position.doc);
				var pname	= position.value.pname[1];
				var pos		= position.value.position[1];
				console.log(pname);
				$('<li>').append($('<a>').attr("href", "info.html?position=" + pos).attr("data-rel", "dialog").text(pname)).appendTo('#playersUl');
			});
			$('#playersUl').listview('refresh');
		}
	});
});

$('#info').live('pageshow', function(){
	var player = urlVars().position;
	console.log(player);
	$.couch.db("idraft").view("asdproject/"+ player, {
		success: function(data){
			console.log(data);
			$('#playerInfo').empty();
			$.each(data.rows, function(index, position) {
				var item	= (position.value || position.doc);
				var pname	= position.value.pname;
				var pos		= position.value.position;
				var team	= position.value.team;
				var notes	= position.value.notes;
				$(	'<h2>' + pname[1] + "</h2>" +
					'<p>' + pos[0] + " " + pos[1] + "</p>" +
					'<p>' + team[0] + " " + team[1] + "</p>" +
					'<p>' + notes[0] + " " + notes[1] + "</p>").appendTo('#playerinfo');
			});
		}
	});
});
	/*$.couch.db('idraft').view('asdproject/players', {
        success : function(data) {
        	var position	 = urlVars().player;
            console.log("Players page loaded Successfully!!");
            $.each(data.rows, function(index, position) {
                //var position     = player.value.position;
                var pname        = position.value.pname;
                //var team        = player.value.team;
                //var notes        = player.value.notes;
                $(        '<li><a href="#">' + pname[1] + '</a></li>').appendTo('#playersUl');
            });
        } 
	});*/

	/*$.ajax({
		url  	:"_view/players",
		dataType: "json",
	*/
	/*$.couch.db('idraft').view('asdproject/players', {
		success : function(data) {
			console.log("Players page loaded Successfully!!");
			$.each(data.rows, function(index, player) {
				var position 	= player.value.position;
				var pname		= player.value.pname;
				var team		= player.value.team;
				var notes		= player.value.notes;
				$(		'<li><a href="#">' + pname[1] + '</a></li>').appendTo('#playersUl');
						'<p>' + pname[0] +" "+ pname[1] + '</p>' +
						'<p>' + team[0] +" "+ team[1] + '</p>' +
						'<p>' + notes[0] +" "+ notes[1] + '</p>' + '<br />'
									
			});
			$('#playersUl').listview('refresh');
		}
	});*/
