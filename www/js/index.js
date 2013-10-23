$(function(){

   
///////////////////Ajax jsonp function to get data from json file////////////////
		
    
function jsonTitles(holdData){

    $.ajax({
        /*type: 'GET',*/
        url: 'content.json',
        /*async: false,*/
        jsonpCallback: 'jsonCallback',
        /*contentType: "application/json",*/
        dataType: 'jsonp',
        timeout: 5000,
        success: function(data) {
            holdData(data);
            
        },
        error: function() {
            $('body').css({
                'background-color': '#393939',
                'margin': '200px auto',
                'display': 'block'
            });
            $('body').empty().append($('<div/>', {
                
            }).html('<div id="disconnect"><img id="noconnect" src="icon.png"/><div>'));
            setTimeout(function(){
                   alert('Unable to connect! Please try again.');
            }, 500)
        }
        
    });
}
    
///////////////////Calls the ajax jsonp function which retreives the data////////////////
    
jsonTitles(function(content){
  
        var	pagelist = [],
            pageidlist = [],
            appTitle = $(content.app).attr('appTitle'),
            subTitle = $(content.app).attr('subTitle'),
            newsTitle = $('#newsTitle'),
            newsList = $('#newsList'),
            collapseList = $('#collapseList'),
            homeList = $('#homeList'),
            logLeft = $('#loglistLeft'),
            $body = $('body'),
            section = $(content.app.section),
            article = section.attr('article');
    
            console.log(appTitle);
            console.log(subTitle);
    
    
///////////////////Assigning Titles from json array//////////////////////
    
    
        $('#home div h1').html(appTitle);
        $('#home div h2').html(subTitle);
            
    
///////////////////Parsing through the json file and applying variables to the different titles////////////////
            
        section.each(function(i){
                    var num = i + 1,
                        pageid = $(this).attr('id'),
                        pagetitle = $(this).attr('title'),
                        membership = this.news,
                        transferlist = this.transferlist,
                        coaching = this.coaching;
            
                        pagelist.push(pagetitle);
                        pageidlist.push(pageid);
            
////////////////////Create List navigation in left panel on home page///////////////////////
            
            homeList.append(
                $('<li />', {
                    'data-theme': 'c'
                }).html('<a href="#' + pageid + '"><span>' + pagetitle + '</span></a>')).listview('refresh');
                
            
///////////////////Creates the individual pages for each section////////////////
                        $body.append($('<div />', {
                            id: pageid,
                            'data-role': 'page'
                        }).append($('<div />', {
                            'data-role': 'header',
                            'data-position': 'fixed',
                            id: pageid + 'header',
                            'data-theme': 'c'
                        }).html('<a href="#left-panel" id="menuNav" class="ui-nodisc-icon" data-role="none"><img src="images/nav_g.png"/>Menu</a><h1 id="sectionTitle">'+ pagetitle +'</h1><a href="#home" id="homeNav" class="ui-icon-nodisc" data-role="none">Home</a>')).each(function(){
                        
                            $(this).append($('<div />', {
                                'data-role': 'content',
                                'id': pageid + 'Content'
                            })).append($('<div />', {
                                    'data-role': 'panel',
                                    'class': 'ui-icon-alt',
                                    id: 'left-panel'
                                    }).each(function(){
                                
                                            $(this).append($('<div />', {
                                            'data-role': 'controlgroup'
                                            }).html('<p>Menu</p>')).append($('<div />', {
                                                                        'data-role': 'content' 
                                                                        }).append($('<ul />', {
                                                                        'data-role': 'listview',
                                                                        'data-icon': 'false',
                                                                        'class': 'ui-nodisc-icon ui-alt-icon',
                                                                        'id': 'listLeft'
                                                                        })))
                                            }))
                                        }));
            


        });//////End of Section Loop//////
    
//////////////////Apply class "app" to news section for responsive css/////////////////////
    var newspage = $('#news');
    newspage.attr('class', 'app');
    
    
///////////////////Add list of current articles to news page/////////////////////////////// 
    var newsContent = $('#newsContent');
    
    newsContent.append($('<ul/>', {
                    'data-role': 'listview',
                    'id': 'newslist',
                    'class': 'ui-nodisc-icon ui-alt-icon'
                
                        }));
    
    var newslist = $('#newslist');
    
    $(article).each(function(i){
                
                var num = i + 1,
                    articleid = $(this).attr('id')
                    headline = $(this).attr('headline'),
                    desc = $(this).attr('description'),
                    story = $(this).attr('story');
                    
                console.log(articleid);
                
                $body.append($('<div />', {
                            id: articleid,
                            'data-role': 'page'
                        }).append($('<div />', {
                            'data-role': 'header',
                            'data-position': 'fixed',
                            id: articleid + 'header',
                            'data-theme': 'c'
                        }).html('<a href="#left-panel" id="menuNav" class="ui-nodisc-icon" data-role="none"><img src="images/nav_g.png"/>Menu</a><h1 id="sectionTitle">Latest News</h1><h2 id="subTitle">'+ headline +'</h2><a href="#home" id="homeNav" class="ui-icon-nodisc" data-role="none">Home</a>')).each(function(){
                        
                            $(this).append($('<div />', {
                                'data-role': 'content',
                                'id': articleid + 'Content',
                                'class': 'feature'
                            }).html('<img src="images/news/news_'+ num +'.png"/><p>'+ desc +'</p>')).append($('<div />', {
                                    'data-role': 'panel',
                                    'class': 'ui-icon-alt',
                                    id: 'left-panel'
                                    }).each(function(){
                                
                                            $(this).append($('<div />', {
                                            'data-role': 'controlgroup'
                                            }).html('<p>Menu</p>')).append($('<div />', {
                                                                        'data-role': 'content' 
                                                                        }).append($('<ul />', {
                                                                        'data-role': 'listview',
                                                                        'data-icon': 'false',
                                                                        'class': 'ui-nodisc-icon ui-alt-icon',
                                                                        'id': 'listLeft'
                                                                        })))
                                            }))
                                        }));
                
                newslist.append(
                        $('<li />', {
                            'data-theme': 'c',
                            'data-icon': 'false',
                            'class': 'ui-icon-alt ui-icon-nodisc'
                        }).html('<a href="#' + articleid + '"><img src="images/news/news_' + num + '.png"><h2>' + headline + '</h2><p>' + desc +'</p><p class="ui-li-aside">more...</p></a>'));
            
    });
    
    
////////////////////Left Panel List of sections/////////////////////
    
                    $(pagelist).each(function(i){
                           
                            $('[data-role="panel"] ul:not(#homeList)').append(
                                        $('<li />', {
                                            'data-theme': 'c'
                                        }).html('<a href="#' + pageidlist[i] +'"><span>' + this + '</span></a>'));
                               
                    });
               
       
    });///End jsonTitles Function///


<<<<<<< HEAD


=======
    
 
    
>>>>>>> dca17b9d9242a7eca4f70c2f12e2e4d71eb930b1
});///End jQuery Function///

    
//////////////////////Initiate Maps///////////////////
    
        $( document ).on( "pageinit", "#maps", function() {
       
    var defaultLatLng = new google.maps.LatLng(53.3954533, -6.355980);  // Default to PFAI offices, Dublin when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $('#mapsContent').gmap('addMarker', defaultLatLng);
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mapsContent"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "You are here!"
        });
    }
});
    
//////////////////////End Maps//////////////////////////

/////////////Apply click styling to communication buttons on homepage//////////////

/*if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){};*/

 if( /Chrome|Safari|IE/i.test(navigator.userAgent) ) {
     $('#com a').on('mousedown', function(){
         $(this).css('background', 'rgba(129, 129, 129, 0.8)');
            }).on('mouseup', function(){
                $(this).css('background', 'rgba(20, 20, 20, 0.8)');
                });
           
        }else{
            $('#com a').on('touchstart', function(){
         $(this).css('background', 'rgba(129, 129, 129, 0.8)');
            }).on('touchend', function(){
                $(this).css('background', 'rgba(20, 20, 20, 0.8)');
                });
            
        }

/*$('#com a').on('click', function(){
    $(this).css('background', 'rgba(129, 129, 129, 0.8)');
}).on('mouseup', function(){
    $(this).css('background', 'rgba(20, 20, 20, 0.8)');
});*/

/////////////Apply click events to communication buttons on homepage//////////////

$('#mail').on('click', function(){
    $(this).attr('href', 'mailto:info@pfai.ie');
    });

$('#call').on('click', function(){
    $(this).attr('href', 'tel:0035318999350');
    });

$('#twitter').on('click', function(){
window.open('https://twitter.com/PFAIOfficial');
    });

$('#face').on('click', function(){
window.open('https://www.facebook.com/pages/PFAIOfficial/137333183069003');
    });

    
////////////////////Fix page while scrolling left menu///////////////////////
<<<<<<< HEAD

/*$('#menuNav').on('click', function(){
    $('#home').attr('data-position', 'fixed');
});*/

////////////////////Create Table for Transfer List///////////////////////

   
$( document ).on( "pageinit", "#transferlist", function() {
    
    var translistContent = $('#transferlistContent');

    translistContent.append($('<table/>', {
        'data-role': 'table',
    }).append($('<thead/>').append($('<tr/>').html('<th>#</th><th>Name</th><th>Club</th><th>Pos</th><th>Age</th><th>dob</th><th>kg</th><th>Exp</th>'))).append($('<tbody/>').append($('<tr/>').html('<th>1</th><td>Stuart Byrne</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td>'))));
    
    //
    
    /*function getTweet(holdData){*/
                
        $.ajax({
        
            /*url: 'services/twitter_example.json',*/
            url: 'http://localhost/pfai_app_v5/connect.php',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                /*holdData(data);*/
            }
        });
    /*}*/
    
    
                //Ajax request to get current transfer list and append it to table//

/*var tbody = $('#transferlistContent > tbody');*/

/*$.ajax({
            type: "GET",
            url: "services/submit.php",
            dataType: "json"
            }).success(function(data) { 
                    console.log(data);
                    if(data.success === true) {
                        tbody.append('<tr><th></th><td>' + data['name'] + '</td><td>' + data['club'] + '</td><td>' + data['pos'] + '</td><td>' + data['age'] + '</td><td>' + data['dob'] + '</td><td>' + data['weight'] + '</td><td style="background-color: ' + data['exp'] + '"></td></tr>');
                        
                        $('#new-player').each(function(){
                            this.reset();
                            
                        });
                        
                        console.log(json);
                        
                    } else {
                        alert(data.error.join());
                    }
                }).fail(function(data) { 
                alert("Failed to add player to list"); 
            });*/
    
    
		});
=======

/*$('#menuNav').on('click', function(){
    $('#home').attr('data-position', 'fixed');
});*/

////////////////////Create Table for Transfer List///////////////////////

   
$( document ).on( "pageinit", "#transferlist", function() {
    
    var translistContent = $('#transferlistContent');

    translistContent.append($('<table/>', {
        'data-role': 'table',
    }).append($('<thead/>').append($('<tr/>').html('<th>#</th><th>Name</th><th>Club</th><th>Pos</th><th>Age</th><th>dob</th><th>kg</th><th>Exp</th>'))).append($('<tbody/>').append($('<tr/>').html('<th>1</th><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td><td>cell</td>'))));
    
    });
>>>>>>> dca17b9d9242a7eca4f70c2f12e2e4d71eb930b1



/*.append($('<thead/>')).append($('<tr/>')).html('<th></th><th>Player Name</th><th>Pre Club</th><th>Positions</th><th>Age</th><th>Date Of Birth</th><th>Weight kg</th><th>Exp Level</th>')*/

<<<<<<< HEAD
=======

/*<table id="transfer-list" class="table table-striped table-bordered">
            <caption><h4>Current Transfer List Of Availabe Players</h4></caption>
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Player Name</th>
                    <th scope="col">Previous Clubs</th>                            
                    <th scope="col">Positions</th>
                    <th scope="col">Age</th>
                    <th scope="col">Date Of Birth</th>
                    <th scope="col">Weight(kg)</th>
                    <th scope="col">Experience Level</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>*/
>>>>>>> dca17b9d9242a7eca4f70c2f12e2e4d71eb930b1


	







