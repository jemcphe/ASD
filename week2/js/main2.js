
// jQuery Function
$('#home').on('pageinit', function() {
    console.log("Home Page Loaded!");// Only runs on first load, unless refresh occurs.
})

$('#addPlayerPage').on('click', function() {
    console.log("Add Player Page Loaded!");
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

    clearData.on('click', function(){
        if(localStorage.length === 0) {
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("All Players have been deleted!");
            window.location.reload();
            return false;
        }
    });

    $('#display').on('click', function(){
        if(localStorage.length === 0) {
            alert("There are no players stored, so a default player was added");
            autoFillData();
        }
        //$("#playerUl").empty();
        //Create Div/ul/li tags to display data
        /*var makeDiv = $('<div id="players"/>');
        //makeDiv.setAttribute("id", "players");
        $('body').append(makeDiv);
        //document.body.appendChild(makeDiv);
        var makeList = $('<ul id="list"/>');
        //makeDiv.appendChild(makeList);
        $('#players').append(makeList);
        $('#players').css('display', 'block');
        //$('players').style.display = "display";
        */
        for(var i=0, j=localStorage.length; i<j; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            console.log(obj);
            var makeSubList = $('<li></li>');
            var makeSubLi = $("<h3>"+obj.position[1]+"</h3>"+"<p>"+obj.pname[1]+"</p>"+
                "<p>"+obj.team[1]+"</p>"+"<p>"+obj.bye[1]+"</p>"+"<p>"+obj.starter[1]+"</p>"+
                "<p>"+obj.skill[1]+"</p>"+"<p>"+obj.notes+"</p>");
            var makeLink = $("<a href='#' id='"+key+"'>Edit</a>");
            makeLink.on('click', function(){
                console.log("This is the key: " +this.id);
            });
            makeLink.html(makeSubLi);
            makeSubList.append(makeLink).appendTo("#playerData");
        };
        $("ul").listview('refresh');
            //makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/links for each item in localStorage.
    });

    // Create the edit/delete links for each stored item when displayed.
    function makeItemLinks(key, linksLi) {
        //edit Item Link
        var editLink = $('<a href="#"/>');
        editLink.key = key;
        var editText = "Edit Player";
        editLink.on("click", editItem);
        editLink.innerHTML = editText;
        linksLi.append(editLink);

        //add line break
        var breakTag = $('<br>');
        linksLi.append(breakTag);

        //Delete Item Link
        var deleteLink = $('<a href="#"/> ');
        deleteLink.key = key;
        var deleteText = "Delete Player";
        deleteLink.on("click", deleteItem);
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
        editSubmit.on("click", validator);
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

    var toChangePage = function (getData) {
        $.mobile.changePage("#player") , {
            type:"post",
            data:$(apform).serialize(),
            reloadPage:true
        };
    };

});

$("#players").on('click', function() {
    console.log("Players Page Loaded!")
});

$("#proj").on('click', function() {
    console.log("Projections Page Loaded!")
});

$("#news").on('click', function() {
    console.log("News Page Loaded!")
});