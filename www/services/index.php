<?php
require_once('authenticate.php');
?>

<!doctype html>
<html lang="en">
    
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PFAI Tansfer List</title>
        <link rel="stylesheet" href="css/index.css"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="css/bootstrap-responsive.css" rel="stylesheet">
    
    </head>
    
    <body>
    
        
        <form id="new-player" class="form-horizontal">
            
            <div class="control-group">
                <label class="control-label" for="new-player-name">Player Name</label>
                <div class="controls">
                    <input id="new-player-name" name="new-player-name" type="text" placeholder="Player Name" required>
                </div>
            </div>
            
            <div class="control-group">
                <label class="control-label" for="new-player-club">Previous Clubs</label>
                <div class="controls">
                    <input id="new-player-club" name="new-player-club" type="text" placeholder="Previous Clubs" required>
                </div>
            </div>
            
            <div class="control-group">
                <label class="control-label" for="new-player-pos">Positions</label>
                <div class="controls">
                    <input id="new-player-pos" name="new-player-pos" type="text" placeholder="Positions" required>
                </div>
            </div>
            
            <div class="control-group">        
                <label class="control-label" for="new-player-age">Age</label>
                <div class="controls">
                    <input id="new-player-age" name="new-player-age"  type="number" min="0" max="50" step="1" value="0">
                </div>
            </div>
            
            <div class="control-group"> 
                <label class="control-label" for="new-player-dob">Date Of Birth</label>
                <div class="controls">
                    <input id="new-player-dob" name="new-player-dob" type="datetime" placeholder="dd/mm/yyyy" required>
                </div>
            </div>
            
            <div class="control-group">        
                <label class="control-label" for="new-player-weight">Weight</label>
                <div class="controls">
                    <div class="input-append">
                        <input id="new-player-weight" name="new-player-weight" type="number" placeholder="kg" min="0" max="120" step="1">
                        <span class="add-on">kg</span>
                    </div>
                </div>
            </div>
                
            <div class="control-group"> 
                <label class="control-label" for="new-player-exp">Experience Level</label>
                <div class="controls"> 
                    <input id="new-player-exp" name="new-player-exp" type="color">
                </div>
            </div>
            
            
            <!--<input type="submit" value="Add new player">-->
            <div type="submit" class="control-group">
                <div class="controls">
                    <button type="submit" class="btn"><i class="icon-user"></i> Add New Player</button>
                </div>
            </div>
            
        </form>
        
        <table id="transfer-list" class="table table-striped table-bordered">
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
                
<?php
global $user_id;
$query = $connection->prepare("SELECT `task_id`, `task_name`, `task_club`, `task_pos`, `task_age`, `task_dob`, `task_weight`, `task_exp` FROM `tasks` WHERE `user_id` = ?");
$query->bind_param("i", $user_id);
$query->execute();

$query->bind_result($id, $name, $club, $pos, $age, $dob, $weight, $exp);
while ($query->fetch()) {
	echo '<tr id="task-' . $id . '"><th></th><td>' . $name . '</td><td>' . $club . '</td><td>' . $pos . '</td><td>' . $age . '</td><td>' . $dob . '</td><td>' . $weight . '</td><td style="background-color: ' . $exp . '"></td></tr>';
}

$query->close();
?>
            </tbody>
        </table>
    
    <script src="js/jq.js" type="text/javascript"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/index.js" type="text/javascript"></script>
    
    </body>


</html>