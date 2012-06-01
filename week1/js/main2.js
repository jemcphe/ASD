


// 	
	// var parsePlayerForm = function(data){
		// //uses form data here
		// console.log(data);
	// }
// 	
		// // Create StoreData Function
	// function storeData(key){
		// //If there is no key, this is a new item and we need to generate a new key
		// if(!key){ 
		// //Create Random Key
		// var 	id									= Math.floor(Math.random()*1000001);
		// } else {
			// //else, set the id to the existing key we're editing so that it will save over the data.
			// //The key is the same key that's been passed along from the editSubmit event handler
			// //to the validate function, and then passed here, into the storeData function.
			// id = key;
		// }
// 		
		// var apform = $('#addPlayerForm');
// 		
		// //getCheckboxValue();
		// // gather up all our form field values and store in an object.
		// // Object properties contain array with the form label and input value.
		// var item = {};
				// item.position				= ["Position:", $('#position').value];
				// item.pname					= ["Player Name:", $('#pname').value];
				// item.team					= ["Team Name:", $('#team').value];
				// item.bye						= ["Bye Week:", $('#byeweek').value];
				// item.starter					= ["Starter:", starterValue];
				// item.skill						= ["Skill Level:", $('#skill').value];
				// item.notes					= ["Notes:", $('#notes').value];
		// //Save Data into Local Storage: Use Stringify to convert our object to a string.
		// localStorage.setItem(id, JSON.stringify(item));
		// alert("Player Saved!");
	// };
	
	// jQuery Function	
	$(document).ready(function() {
		
		var apform = $('#addPlayerForm');
		
		apform.validate({
			invalidHandler: function(form, validator) {},
			submitHandler: function(){
				var id = Math.floor(Math.random()*1000001);
				var data = apform.serializeArray();
				localStorage.setItem(id, JSON.stringify(data));
				console.log(data);
				alert("Player Saved!");
				window.location.reload(apform);
			}
		});

        var clearData = $('#clear');

        clearData.bind('click', function(){
            if(localStorage.length === 0) {
                alert("There is no data to clear.");
            }else{
                localStorage.clear();
                alert("All Players have been deleted!");
                window.location.reload();
                return false;
            }
        });

        var displayData = $('#display');

        displayData.bind('click', function(){
            if(localStorage.length === 0) {
                alert("There are no players stored, so a default player was added");
                autoFillData();
            }
            //Create Div/ul/li tags to display data
            var makeDiv = $('<div id="players"/>');
            //makeDiv.setAttribute("id", "players");
            $('body').append(makeDiv);
            //document.body.appendChild(makeDiv);
            var makeList = $('<ul id="list"/>');
            //makeDiv.appendChild(makeList);
            $('#players').append(makeList);
            $('#players').css('display', 'block');
            //$('players').style.display = "display";
            for(var i=0, j=localStorage.length; i<j; i++) {
                var makeLi = $('<li id="playerItems"/>');
                var linksLi = $('<li id="links"/>');
                makeList.append(makeLi);
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                var makeSubList = $('<ul id="sublist"/>');
                makeLi.append(makeSubList);
                //getImage(obj.position[1], makeSubList);
                for(var n in obj) {
                    var makeSubLi = $('<li id="subLi"/>');
                    makeSubList.append(makeSubLi);
                    var optSubText = obj[n][0] +" "+ obj[n][1];
                    makeSubLi.innerHTML = optSubText;
                    makeSubList.append(linksLi);
                }
                makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/links for each item in localStorage.
            }
        });

        // Create the edit/delete links for each stored item when displayed.
        function makeItemLinks(key, linksLi) {
            //edit Item Link
            var editLink = $('<a href="#"/>');
            editLink.key = key;
            var editText = "Edit Player";
            editLink.bind("click", editItem);
            editLink.innerHTML = editText;
            linksLi.append(editLink);

            //add line break
            var breakTag = $('<br>');
            linksLi.append(breakTag);

            //Delete Item Link
            var deleteLink = $('<a href="#"/> ');
            deleteLink.key = key;
            var deleteText = "Delete Player";
            deleteLink.bind("click", deleteItem);
            deleteLink.innerHTML = deleteText;
            linksLi.append(deleteLink);
        }

        function autoFillData() {
            for(var n in json) {
                var id = Math.floor(Math.random()* 10000001);
                localStorage.setItem(id, JSON.stringify(json[n]));
            }
        }

        //Edit Item Function
        function editItem() {
            //Get data from our item in local storage
            var  value = localStorage.getItem(this.key);
            var item = JSON.parse(value);

            //show the form
            toggleControls("off");

            //populate form fields with current localStorage values
            $('#position').value = item.position[1];
            $('#pname').value = item.pname[1];
            $('#team').value = item.team[1];
            $('#byeweek').value = item.bye[1];
            if(item.starter[1] == "Yes") {
                $('#starter').setAttribute("checked", "checked");
            }
            $('#skill').value = item.skill[1];
            $('#notes').value = item.notes[1];

            //Remove the initial listener from the input 'save contact' button.
            saveLink.unbind("click", storeData);
            //Change submit button value to "Edit Player"
            $('#submit').value = "Edit Player";
            var editSubmit = $('#submit');
            //Save the key value established in this function as a property of the editSubmit event
            //So we can use that value when we save the data we edited.
            editSubmit.bind("click", validator);
            editSubmit.key = this.key;
        }

        function deleteItem () {
            var ask = confirm("Are you sure you want to release this player?");
            if(ask){
                localStorage.removeItem(this.key);
                alert("Player was released!");
                window.location.reload();
            }else {
                alert("Player was NOT released");
            }
        }
	});