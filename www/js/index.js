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
                
                        console.log(pagelist);
            
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
                                                                        'class': 'ui-nodisc-icon ui-alt-icon',
                                                                        'id': 'listLeft'
                                                                        })))
                                            }))
                                        }));
            
////////////////////Create List navigation in left panel on home page///////////////////////
            
            homeList.append(
                $('<li />', {
                    'data-theme': 'c'
                }).html('<a href="#' + pageid + '"><span>' + pagetitle + '</span></a>'));
            

            

        });//////End of Section Loop//////
    
//////////////////Apply class "app" to news section for responsive css/////////////////////
    var newspage = $('#news');
    newspage.attr('class', 'app');
    
    
///////////////////Add list of current articles to news page/////////////////////////////// 
    var newsContent = $('#newsContent');
    
    
    $(article).each(function(i){
                
                var num = i + 1,
                    articleid = $(this).attr('id')
                    headline = $(this).attr('headline'),
                    desc = $(this).attr('description'),
                    story = $(this).attr('story');
                    
                console.log(articleid);
                
                newsContent.append($('<ul/>', {
                    'data-role': 'listview',
                    'class': 'ui-nodisc-icon ui-alt-icon'
                
                        }).append(
                        $('<li />', {
                            'data-theme': 'c',
                            'class': 'ui-icon-alt ui-icon-nodisc'
                        }).html('<a href="#' + articleid + '"><img src="images/news/news_' + num + '.png"><h2>' + headline + '</h2><p>' + desc +'</p><p class="ui-li-aside">click for more...</p></a>')));
            
            });
    
    
////////////////////Left Panel List of sections/////////////////////
    
                    $(pagelist).each(function(i){
                           
                            $('[data-role="panel"] ul:not(#homeList)').append(
                                        $('<li />', {
                                            'data-theme': 'c'
                                        }).html('<a href="#' + pageidlist[i] +'"><span>' + this + '</span></a>'));
                               
                    });
               
                    /*$('head').append('<link rel="stylesheet" href="css/index.css"/>');*/
                    /*$('head').append('<link rel="stylesheet" href="js/jquery.mobile-1.4.0-beta.1.min.css" />');
                    $('head').append('<link rel="stylesheet" href="js/jquery.mobile.structure-1.4.0-beta.1.min.css" />');*/
                
                    /*$('head').append('<script src="js/jquery.mobile-1.4.0-beta.1.min.js"></script>');*/
                    $('head').append('<script src="js/jquery.mobile-1.3.2.min.js"></script>');
                    /*$('#home').attr('id', 'home');*/
        
        
    });///End jsonTitles Function///
    
//////////////////////Initiate Maps///////////////////
    
        $( document ).on( "pageinit", "#maps", function() {
       
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
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
            title: "Greetings!"
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




    
/////////////////////////////////////////////////////////////////////




	


	







