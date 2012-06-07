/**
 * Created with IntelliJ IDEA.
 * User: jemcphe
 * Date: 6/7/12
 * Time: 1:23 AM
 * To change this template use File | Settings | File Templates.
 */

$('#home').on('pageinit', function() {
    console.log("Home Page Loaded.");

    $("#display").on('click', function(){
        $("#itemList").empty();
        for (var i= 0, j=localStorage.length; i<j ; i++){
            var key = localStorage.key(i);
            var item = JSON.parse(localStorage.getItem(key));
            console.log(item);
            var makeSubList = $("<li></li>");
            var makeSubLi = $( "<h3>"+item.position[1]+"</h3>"+
                "<p><strong>"+item.pname[1]+"</strong></p>"+
                "<p>"+item.team[1]+"</p>" +
                "<p>"+item.notes[1]+"</p>" );
            var makeLink = $("<a href='#' id='"+key+"'>Edit</a>");
            makeLink.on('click', function(){
                console.log("This is my key: "+this.id);
            });
            makeLink.html(makeSubLi);
            makeSubList.append(makeLink).appendTo("#itemList");
        } // end for loop
        //$("ul").listview('refresh');

    })

});