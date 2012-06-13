//refresh Home Page Dynamically
$(document).ready(function() {



// Create StoreData Function
function storeData(key){
    //var id;
    //If there is no key, this is a new item and we need to generate a new key
    if(!key){
        //Create Random Key
        var 	id									= Math.floor(Math.random()*1000001);
        console.log("Key was generated!");
    } else {
        //else, set the id to the existing key we're editing so that it will save over the data.
        //The key is the same key that's been passed along from the editSubmit event handler
        //to the validate function, and then passed here, into the storeData function.
        return key;
    }
    //getCheckboxValue();
    // gather up all our form field values and store in an object.
    // Object properties contain array with the form label and input value.
    var item = {};
    item.position				= ["Position:", $('#position').val()];
    item.pname					= ["Player Name:", $('#pname').val()];
    item.team					= ["Team Name:", $('#team').val()];
    item.bye					= ["Bye Week:", $('#byeweek').val()];
    //item.starter				= ["Starter:", starterValue];
    item.skill					= ["Skill Level:", $('#skill').val()];
    item.notes					= ["Notes:", $('#notes').val()];

    console.log(item);
    //Save Data into Local Storage: Use Stringify to convert our object to a string.
    localStorage.setItem(key, JSON.stringify(item));
    alert("Player Saved!");
}

function autoFillData() {
	$.mobile.changePage("#players");
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
				).appendTo('#playerli');					
			});
			//$('#playerlist').listview('refresh');
		}
	});
    /*for(var n in json) {
     var id = Math.floor(Math.random()* 10000001);
     localStorage.setItem(id, JSON.stringify(json[n]));
    }*/
}

// function to get data from form Values & display in div
function getData() {
    //toggleControls("on");
    if(localStorage.length === 0) {
        alert("There are no players stored, so a default player was added");
        autoFillData();
    }

    for(var i=0, j=localStorage.length; i<j; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var obj = JSON.parse(value);
        console.log(key);
        var makeSubList = $('<li></li>');
        var makeSubLi = $(  '<p>' + obj.position[0] + " " + obj.position[1] +'</p>' +
            '<p>' + obj.pname[0] + " " + obj.pname[1] +'</p>' +
            '<p>' + obj.team[0] + " " + obj.team[1] +'</p>' +
            '<p>' + obj.notes[0] + " " + obj.notes[1] +'</p>' + '<br />'
        );
        makeSubList.append(makeSubLi).appendTo('#playerUl');
    }
    //makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/links for each item in localStorage.
}

//function to clear data from localStorage
function clearLocal() {
    if(localStorage.length === 0) {
        alert("There is no data to clear.");
    }else{
        localStorage.clear();
        alert("All Players have been deleted!");
        window.location.reload();
        return false;
    }
}

$("#addPlayerPage").live("submit", function(){
    storeData();
    //$.mobile.changePage("#players");
    return false;
});

var displayLink = $('#display');
$(displayLink).on("click", getData);

var clearLink = $('#clear');
$(clearLink).on("click", clearLocal);

});
