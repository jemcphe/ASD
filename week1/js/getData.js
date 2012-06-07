/**
 * Created with IntelliJ IDEA.
 * User: jemcphe
 * Date: 6/7/12
 * Time: 1:26 PM
 * To change this template use File | Settings | File Templates.
 */

$('#jsonPage').live('pageinit', function(){


    $('#getJson').on('click', function(){
        $('#jsonPlayer').empty();
        $.ajax({
            url:'xhr/json.js',
            type: 'GET',
            dataType: 'json',
            success: function(jsonData) {
                for(var i= 0, j=jsonData.players.length; i<j; i++) {
                    var player= jsonData.players[i];
                    var makeSubList = $("<li></li>");
                    var makeSubLi = $("<h3>"+player.position+"</h3>"+
                        "<p>"+player.pname+"</p>" +
                        "<p>"+player.team+"</p>");
                };
                $('#jsonPlayer').html(makeSubLi);
                makeSubList.append(makeLink).appendTo("#jsonPlayer");
                $('#jsonPlayer').listview('refresh');
            },
            error: function() {
                console.log("Did Not Work!! And I have no clue why! All of my hair is gone.");
            }

        })
    });
});

$('#xmlPage').live('pageinit', function(){

    $('#getXML').on('click', function(){
        $.ajax({
            url: 'xhr/players.xml',
            type: 'GET',
            dataType: 'xml',
            success: function(xml){
                var data = $.parseXML(xml);
                var players = $(data);
                players.find("player").each(function(){
                    var player = $(this);
                    console.log("Position: "+player.find("position"));
                })
            }
        });
    });

    //var displayData = function(xml){

    //}
});