/**
 * Created with IntelliJ IDEA.
 * User: jemcphe
 * Date: 6/7/12
 * Time: 1:26 PM
 * To change this template use File | Settings | File Templates.
 */

$('#jsonPage').on('pageinit', function(){
    $("#getJson").on("click", function(){
        $.ajax({
            url: 'xhr/json.js',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                for(var i= 0, j= response.players.length; i<j; i++){
                    var player = response.players[i];
                    var makeSubList = $('<li></li>');
                    var makeSubLi = $(  '<p>' + player.position[0] + " " + player.position[1] +'</p>' +
                                        '<p>' + player.pname[0] + " " + player.pname[1] +'</p>' +
                                        '<p>' + player.team[0] + " " + player.team[1] +'</p>' +
                                        '<p>' + player.starter[0] + " " + player.starter[1] +'</p>' +
                                        '<p>' + player.notes[0] + " " + player.notes[1] +'</p>'
                                     );
                    makeSubList.append(makeSubLi).appendTo('#jsonUL');
                }
            },
            error: function() {
                console.log("This is not working!!!");
            }
        });
    })
});
$('#xmlPage').on('pageinit', function(){

    $('#getXML').on('click', function(){
        $.ajax({
            url: 'xhr/players.xml',
            type: 'GET',
            dataType: 'xml',
            success: function(response){
                $(response).find("player").each(function(){
                    var player = {};
                        player.position = $(this).find("position").text();
                        player.pname = $(this).find("pname").text();
                        player.team = $(this).find("team").text();
                        player.starter = $(this).find("starter").text();
                        player.notes = $(this).find("notes").text();
                    var makeSubList = $('<li></li>');
                    var makeSubLi = $(  '<p>'+player.position+'</p>'+
                                        '<p>'+player.pname+'</p>' +
                                        '<p>'+player.team+'</p>' +
                                        '<p>'+player.starter+'</p>' +
                                        '<p>'+player.notes+'</p>' + '<br />'
                        );
                    makeSubList.append(makeSubLi).appendTo('#xmlDiv');
                });
            }
        });
        return false;
    });
});

$('#csvPage').on('pageinit', function() {
    $('#getCSV').on("click", function () {
        $.ajax({
            url: 'xhr/players.csv',
            type: 'GET',
            dataType: 'text',
            success: function(response) {
                var lines = response.split('\n');
                for (var lineNum= 0; lineNum < lines.length; lineNum++) {
                    var row = lines[lineNum];
                    var columns = row.split(",");
                    var makeSubList = $('<li></li>');
                    var makeSubLi = $(  '<p>'+ "Position: " + position[0] + '</p>' +
                                        '<p>'+ "Player: " + name[0] + '</p>' +
                                        '<p>'+ "Team: " + team[0] + '</p>' +
                                        '<p>'+ "Starter: " + starter[0] + '</p>' +
                                        '<p>'+ "Notes: " + notes[0] + '</p>' + '<br />'
                    );
                    makeSubList.append(makeSubLi).appendTo('#csvDiv');
                }
            }
        });
    });
});
