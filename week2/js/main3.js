/*James E. McPherson III
 * Visual Frameworks
 * Project 3
 * 1203
 * 03/15/2012
 */

// jQuery Function

// Wait until the DOM is ready.
$(document).ready(function() {


    //Find value of selected checkbox
    function getCheckboxValue(){
    if($('#starter').checked) {
    starterValue = $("#starter").val();
    }else {
    starterValue = "No";
    }
    }
    //Toggle ON/OFF used for displaying data
    function toggleControls(n){
        switch(n){
            case"on":
                $('#addPlayerForm').css('display', "none");
                $('#clear').css('display', "inline");
                $('#display').css('display', 'none');
                $('#addNew').css('display', 'inline');
                break;
            case "off":
                $('#addPlayerForm').css('display',"block");
                $('#clear').css("display", "inline");
                $('#display').css("display", "inline");
                $('#addNew').css("display", "none");
                $('#players').css("display", "none");
                break;
            default:
                return false;
        }
    }
    // Create StoreData Function
    function storeData(key){
        //If there is no key, this is a new item and we need to generate a new key
        if(!key){
            //Create Random Key
            var 	id									= Math.floor(Math.random()*1000001);
        } else {
            //else, set the id to the existing key we're editing so that it will save over the data.
            //The key is the same key that's been passed along from the editSubmit event handler
            //to the validate function, and then passed here, into the storeData function.
            id = key;
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
        localStorage.setItem(id, JSON.stringify(item));
        alert("Player Saved!");
        reload();
    }

    // function to get data from form Values & display in div
    function getData() {
        //toggleControls("on");
        if(localStorage.length === 0) {
            alert("There are no players stored, so a default player was added");
            autoFillData();
        }
        //Create Div/ul/li tags to display data
        /*var makeDiv = $('<div></div>');
        makeDiv.attr("id", "players");
        $('body').append(makeDiv);
        var makeList = $('<ul></ul>');
        makeDiv.append(makeList);*/
        $('#players').empty();
        for(var i=0, j=localStorage.length; i<j; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            console.log(key);
            var makeSubList = $('<li></li>');
            var makeSubLi = $(  '<p>' + player.position[0] + " " + player.position[1] +'</p>' +
                '<p>' + player.pname[0] + " " + player.pname[1] +'</p>' +
                '<p>' + player.team[0] + " " + player.team[1] +'</p>' +
                '<p>' + player.starter[0] + " " + player.starter[1] +'</p>' +
                '<p>' + player.notes[0] + " " + player.notes[1] +'</p>' + '<br />'
            );
            makeSubList.append(makeSubLi).appendTo('#playerUL');
            }
            //makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/links for each item in localStorage.
        }

    //Function to get the image based on position selection
   /* function getImage(positionName, makeSubList) {
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImage = document.createElement('img');
        var setSrc = newImage.setAttribute("src", "images/"+ positionName + ".png");
        imageLi.appendChild(newImage);
    } */

    //Auto populate local storage w/ JSON Object
    function autoFillData() {
        /*for(var n in json) {
            var id = Math.floor(Math.random()* 10000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        */
                //$('#jsonUL').empty();
                $.ajax({
                    url: 'xhr/players.json',
                    type: 'GET',
                    dataType: 'json',
                    success: function(result) {
                        console.log("JSON Data Loaded");
                        for(var i= 0, j= result.players.length; i<j; i++){
                            var player = result.players[i];
                            var makeSubList = $('<li></li>');
                            var makeSubLi = $(  '<p>' + player.position[0] + " " + player.position[1] +'</p>' +
                                '<p>' + player.pname[0] + " " + player.pname[1] +'</p>' +
                                '<p>' + player.team[0] + " " + player.team[1] +'</p>' +
                                '<p>' + player.starter[0] + " " + player.starter[1] +'</p>' +
                                '<p>' + player.notes[0] + " " + player.notes[1] +'</p>' + '<br />'
                            );
                            makeSubList.append(makeSubLi).appendTo('#playerUl');
                        }
                        $('#playerUl').listview('refresh');
                    }
                });
    }

    // Create the edit/delete links for each stored item when displayed.
    function makeItemLinks(key, linksLi) {
        //edit Item Link
        var editLink = $('<a></a>');
        editLink.prop("href", "#");
        editLink.key = key;
        var editText = "Edit Player";
        $(editLink).on('click', function() {
            editItem(key);
            console.log("Edit Link Pushed.")
        })
        editLink.html(editText);
        linksLi.append(editLink);

        //add line break
        var breakTag = $('<br>');
        linksLi.append(breakTag);

        //Delete Item Link
        var deleteLink = $('<a></a>');
        deleteLink.prop("href", "#");
        deleteLink.key = key;
        var deleteText = "Delete Player";
        $(deleteLink).on('click', function() {
            deleteItem(key);
            console.log("Delete Link Pressed.")
        })
        deleteLink.html(deleteText);
        linksLi.append(deleteLink);
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
        //$(saveLink).off("click", storeData);
        //Change submit button value to "Edit Player"
        $('#submit').value = "Edit Player";
        var editSubmit = $('#submit');
        editSubmit.key = this.key;
        //Save the key value established in this function as a property of the editSubmit event
        //So we can use that value when we save the data we edited.
        $(editSubmit).on("click", function(){
            storeData(key);
        });

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

    /*	function validate (e) {
     //Define the elements we want to check
     var getPosition = $('position');
     var getPname = $('pname');
     var getTeam = $('team');

     //Reset Error Mesages
     errMsg.innerHTML = "";
     getPosition.style.border = "1px solid black";
     getPname.style.border = "1px solid black";

     //Get error messages
     var messageAry = [ ];
     //Position Validation
     if(getPosition.value === "--Select Position--") {
     var positionError = "* Please Choose A Position";
     getPosition.style.border = "3px solid #a31d1d";
     messageAry.push(positionError);
     }

     //Check for Player Name Validation
     if(getPname.value === "") {
     var pNameError = "* Please Enter A Player Name";
     getPname.style.border = "3px solid #a31d1d";
     messageAry.push(pNameError);
     }

     //Team Validation
     if(getTeam.value === "") {
     var teamError = "* Please Enter A Team Name";
     getTeam.style.border = "3px solid #a31d1d";
     messageAry.push(teamError);
     }
     //If there were errors, display them on the screen
     if(messageAry.length >= 1) {
     for(var i=0, j=messageAry.length; i < j; i++) {
     var txt = document.createElement('li');
     txt.innerHTML = messageAry[i];
     errMsg.appendChild(txt);
     }
     e.preventDefault();
     return false;
     }else{
     //If all is OK, save our data
     storeData(this.key);
     }
     }

     //variable defaults
     var 	positions = ["--Select Position--", "QB", "RB", "WR", "TE", "K", "DEF"],
     starterValue = "No",
     errMsg = $('errors');
     ;*/
    //makeDropDown();

    var apform = $('#addPlayerForm');

    apform.validate({
        invalidHandler: function(form, validator) {},
        submitHandler: function(){
            storeData();
        }
    });

    //Set Link & submit Click Events
    var displayLink = $('#display');
    $(displayLink).on("click", function(getData){
        $.mobile.changePage('#players'), {
            type:"post",
            data:$(apform).serialize(),
            reloadPage:true
        }
        });

    var clearLink = $('#clear');
    $(clearLink).on("click", clearLocal);

    var saveLink = $("#submit");
    $(saveLink).on("click", storeData);

});


