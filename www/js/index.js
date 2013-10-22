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
            
            /*$('body').remove('#loader');*/
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
            /*sectionTitle = $(content.app.section.news.title),
            story = content.app.section.news.story,*/
            newsList = $('#newsList'),
            collapseList = $('#collapseList'),
            homeList = $('#homeList'),
            logLeft = $('#loglistLeft'),/*
            menuLeft = $('#menulistLeft'),*/
            /*news = $(content.app.section.news),*/
            /*article = $(content.app.section.news.article),*/
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
                        }).html('<a href="#left-panel" id="menuNav" class="ui-nodisc-icon" data-role="none"><img src="images/menu_g.png"/></a><h1 id="sectionTitle">'+ pagetitle +'</h1><a href="#home" id="homeNav" class="ui-icon-nodisc" data-role="none"><img src="images/home_g.png"/></a>')).each(function(){
                        
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
                        }).html('<a href="#left-panel" id="menuNav" class="ui-nodisc-icon" data-role="none"><img src="images/menu_g.png"/></a><h1 id="sectionTitle">Latest News</h1><h2 id="subTitle">'+ headline +'</h2><a href="#home" id="homeNav" class="ui-icon-nodisc" data-role="none"><img src="images/home_g.png"/></a>')).each(function(){
                        
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
    
   /* $('#logo').click(function(){
        window.open('http://www.skillpad.com', '_blank');
    
    });*/
    
/*    $( document ).on( "pagecreate", "#home", function() {
    $( document ).on( "swipeleft swiperight", "#home", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft"  ) {
                $( "#right-panel" ).panel( "open" );
            } else if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
})*/;
    
/*    $( document ).on( "pageinit", "body", function() {
    $( document ).on( "swipeleft swiperight", "body", function( e ) {
        // We check if there is no open panel on the page because otherwise
        // a swipe to close the left panel would also open the right panel (and v.v.).
        // We do this by checking the data that the framework stores on the page element (panel: open).
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swipeleft"  ) {
                $( "#right-panel" ).panel( "open" );
            } else if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});*/
  
    
});///End jQuery Function///

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

$('#menuNav').on('click', function(){
    $('#home').attr('data-position', 'fixed');
});


	







