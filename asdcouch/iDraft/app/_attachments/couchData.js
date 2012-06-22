
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

var reload = function(){
	location.reload();
};

var storeData = function(){
	var apform = $('#addPlayerForm');
	apform.validate({
		invalidHandler: function(form, validator) {},
		submitHandler: function(){
			$('#addPlayerButton').on('click', function(event){
				event.preventDefault();
				var item = {
						_id: $('#position').val() + ":" + $('#pname').val()
				};
			    item.position				= ["Position:", $('#position').val()];
			    item.pname					= ["Player Name:", $('#pname').val()];
			    item.team					= ["Team Name:", $('#team').val()];
			    item.bye					= ["Bye Week:", $('#byeweek').val()];
			    //item.starter				= ["Starter:", starterValue];
			    item.skill					= ["Skill Level:", $('#skill').val()];
			    item.notes					= ["Notes:", $('#notes').val()];
			    
			    console.log(item);
			    
			    $.couch.db("idraft").saveDoc(item, {
			    	success: function() {
			    		console.log(item);
			        	alert("Player Saved!");
			        	location.reload(true);
			    	},
			    	error: function() {
			    		console.log("Not Working!");
			    	}
			    	
			    });
			   
			});
		}
	});
};

//This function grabs the url and matches it with a "key" value
var getPosition = function(){
	var position = (urlVars().QB || urlVars().DEF || urlVars().K || urlVars().RB || urlVars().WR ||
			urlVars().TE);
	if(position === urlVars().QB){
		//var startKey = "QB";
		return "QB";
	} else if (position === urlVars().DEF){
//		var startKey = "DEF";
		return "DEF";
	} else if (position === urlVars().K){
//		var startKey = "K";
		return "K";
	} else if (position === urlVars().RB){
//		var startKey = "RB";
		return "RB";
	} else if (position === urlVars().WR){
//		var startKey = "WR";
		return "WR";
	} else if (position === urlVars().TE){
//		var startKey = "TE";
		return "TE";
	}
};

$("#home").live('pageInit', function(){
	reload();
});

$("#myPlayersButton").live("click", function(){
	$.mobile.changePage("#positions", {
		reloadPage:true
	});
});
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

 

$('#players').live('pageshow', function(index, position){
	var playerPosition = urlVars().position;
	console.log(playerPosition);
	$.couch.db("idraft").view("asdproject/"+ playerPosition, {
		success: function(data){
			console.log(data);
			$('#playersUl').empty();
			$.each(data.rows, function(index, position) {
				var item	= (position.value || position.doc);
				var pname	= position.value.pname[1];
				var pos		= position.value.position[1];
				console.log(pname);
				$('<li>').append($('<a>').attr("href", "info.html?"+playerPosition+"=" + pname).attr("data-rel", "dialog").text(pname)).appendTo('#playersUl');
			});
			$('#playersUl').listview('refresh');
		}
	});
});

$('#info').live('pageshow', function(){
	var player = (urlVars().QB || urlVars().DEF || urlVars().K || urlVars().RB || urlVars().WR ||
					urlVars().TE);
	//var	startKey = ("QB:" || "DEF:"||"K:");
	console.log(player);
	var position = getPosition();
	var myKey = position +":"+ player;
	console.log(myKey);
//	$.couch.db("idraft").view("asdproject/" + position, {
//		success: function(data){
//			$.each(data.rows, function(index, position){
//				var player = position.value.pname[1];
//				console.log(player);
	
	//var data = player.pname;
	/****************************PULL PLAYER DATA FROM COUCHDB*******************************/
	$.couch.db("idraft").view("asdproject/"+ position , {
		
		key: player,
		success: function(data){
			
			console.log(data);
			$('#playerInfo').empty();
			$.each(data.rows, function(index, position) {
				var item	= (position.value || position.doc);
				var pname	= position.value.pname;
				var pos		= position.value.position;
				var team	= position.value.team;
				var bye		= position.value.bye;
				var skill	= position.value.skill;
				var notes	= position.value.notes;
					$(	'<h2>' + pname[1] + "</h2>" +
							'<p>' + pos[0] + " " + pos[1] + "</p>" +
							'<p>' + team[0] + " " + team[1] + "</p>" +
							'<p>' + bye[0] + " " + bye[1] + "</p>" +
							'<p>' + skill[0] + " " + skill[1] + "</p>" +
							'<p>' + notes[0] + " " + notes[1] + "</p>").appendTo('#playerinfo');
			});
		}
	});// END COUCH RETRIEVE
	
	
	function deleteMyPlayer(key){
		var deletePlayer = {
			_id : myKey
		};
		var yes = confirm("Delete Player?");
		if (yes){

			$.couch.db("idraft").removeDoc(deletePlayer, {
				success: function(data) {
					console.log(data);
					alert("Player Was Deleted!");
					reload();
				}
			});

		} else {
			alert("Player was NOT deleted!");
		}
	};
	
	
	$("#deletePlayer").on("click", deleteMyPlayer);
	$("#editPlayer").on("click", function(){
		console.log("page Changed");
		$('#addPlayerButton').off("click", storeData);
		$('#addPlayerButton').val("Edit Player");
		
		$.couch.db("idraft").view("asdproject/"+ position , {
			key: player,
			success: function(data){
				console.log(data);
				$.each(data.rows, function(index, position){
					var item = position.value;
					var pname	= position.value.pname;
					var pos		= position.value.position;
					var team	= position.value.team;
					var bye		= position.value.bye;
					var skill	= position.value.skill;
					var notes	= position.value.notes;
					console.log(pname[1]);
					$('#position').val(pos[1]);
					$('input#pname').val(pname[1]);
			        $('#team').val(team[1]);
			        $('#byeweek').val(bye[1]);
			        $('#skill').val(skill[1]);
			        $('#notes').val(notes[1]);
				});
			}
		});
		
		var apform = $('#addPlayerForm');
		apform.validate({
			invalidHandler: function(form, validator) {},
			submitHandler: function(){
		
				$('#addPlayerButton').on('click', function(event){
					event.preventDefault();
					var edit = {
							_id: $('#position').val() + ":" + $('#pname').val()
					};
				    edit.position				= ["Position:", $('#position').val()];
				    edit.pname					= ["Player Name:", $('#pname').val()];
				    edit.team					= ["Team Name:", $('#team').val()];
				    edit.bye					= ["Bye Week:", $('#byeweek').val()];
				    //item.starter				= ["Starter:", starterValue];
				    edit.skill					= ["Skill Level:", $('#skill').val()];
				    edit.notes					= ["Notes:", $('#notes').val()];
				    
				    console.log(edit);
				    
				    $.couch.db("idraft").saveDoc(edit, {
				    	success: function() {
				    		console.log(edit);
				        	alert("Player Saved!");
				        	reload();
				    	},
				    	error: function() {
				    		console.log("Not Working!");
				    	}
				    	
				    });
				
		//		apform.validate({
		//			invalidHandler: function(form, validator) {},
		//			submitHandler: function(){
		//				$('#addPlayerButton').on("click", storeData);
		//			}
		//		});
		//		$('#position').value = item.position[1];
		//        $('#pname').value = item.pname[1];
		//        $('#team').value = item.team[1];
		//        $('#byeweek').value = item.bye[1];
				});
			}
		});
	});	
});


$("#addPlayerPage").live("pageshow", storeData);
	
//	var apform = $('#addPlayerForm');
//	apform.validate({
//		invalidHandler: function(form, validator) {},
//		submitHandler: function(){
//			$('#addPlayerButton').on('click', function(event){
//				event.preventDefault();
//				var item = {
//						_id: $('#position').val() + ":" + $('#pname').val()
//				};
//			    item.position				= ["Position:", $('#position').val()];
//			    item.pname					= ["Player Name:", $('#pname').val()];
//			    item.team					= ["Team Name:", $('#team').val()];
//			    item.bye					= ["Bye Week:", $('#byeweek').val()];
//			    //item.starter				= ["Starter:", starterValue];
//			    item.skill					= ["Skill Level:", $('#skill').val()];
//			    item.notes					= ["Notes:", $('#notes').val()];
//			    
//			    console.log(item);
//			    
//			    $.couch.db("idraft").saveDoc(item, {
//			    	success: function() {
//			    		console.log(item);
//			        	alert("Player Added!");
//			        	location.reload(true);
//			    	},
//			    	error: function() {
//			    		console.log("Not Working!");
//			    	}
//			    	
//			    });
//			   
//			});
//		}
//	});
	

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
