function ConvertFormToJSON(form){
			var array = $(form).serializeArray();
			var json = {};
			
			$.each(array, function() {
				json[this.name] = this.value || '';
			});
			
			return json;
		}

$(function(){
    
	console.log('jQuery Loaded');
    
/*    $('form#new-player').bind('submit', function(e){
        e.preventDefault();
       
        var tbody = $('#transfer-list > tbody');
        tbody.append('<tr><th></th><td>' + this['new-player-name'].value + '</td><td>' + this['new-player-club'].value + '</td><td>' + this['new-player-pos'].value + '</td><td>' + this['new-player-age'].value + '</td><td>' + this['new-player-dob'].value + '</td><td>' + this['new-player-weight'].value + '</td><td style="background-color: ' + this['new-player-exp'].value + '"></td></tr>');
        
        return false;
        
    });*/
    
    
    
    $('form#new-player').bind('submit', function(event){
        event.preventDefault();
        
        var form = this;
        var json = ConvertFormToJSON(form);
        var tbody = $('#transfer-list > tbody');
        
        $.ajax({
            type: "POST",
            url: "submit.php",
            data: json,
            dataType: "json"
            }).success(function(state) { 
            console.log(state);
                    if(state.success === true) {
                        tbody.append('<tr><th></th><td>' + state['name'] + '</td><td>' + state['club'] + '</td><td>' + state['pos'] + '</td><td>' + state['age'] + '</td><td>' + state['dob'] + '</td><td>' + state['weight'] + '</td><td style="background-color: ' + state['exp'] + '"></td></tr>');
                        
                        $('#new-player').each(function(){
                            this.reset();
                            
                        });
                        
                        console.log(json);
                        
                    } else {
                        alert(state.error.join());
                    }
                }).fail(function(state) { 
                alert("Failed to add player to list"); 
            });
        
        
        
    });
    
    
    
});


        
  
    






	


	







