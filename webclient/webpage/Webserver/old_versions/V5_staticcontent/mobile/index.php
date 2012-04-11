
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">

<html>
	<head>
	<title>Arduino</title>
    <link rel="stylesheet" type="text/css" href="style.css" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />

	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.1.0-rc.1/jquery.mobile-1.1.0-rc.1.min.css" />
	<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.1.0-rc.1/jquery.mobile-1.1.0-rc.1.min.js"></script>
<!--    <script src="js/jquery.cookie.js"></script>-->

    <!-- iphone hide and icon stuff -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />

    <link rel="apple-touch-icon" href="img/touch-icon-iphone.png" />  <!-- 57x57 PNG -->
	<link rel="apple-touch-icon" sizes="72x72" href="img/touch-icon-ipad.png" />  <!-- 72x72 PNG -->
	<link rel="apple-touch-icon" sizes="114x114" href="img/touch-icon-iphone4.png" />  <!-- 114x114 PNG -->

    <script type="text/javascript">

		$(document).ready(function(){
            if ( (localStorage.getItem("arduino_ip") == "") || (localStorage.getItem("arduino_ip") == null) ){
                $.mobile.changePage('#dialog_settings_empty', 'pop', true, true);
            }

            $('#iptext').val(localStorage.getItem("arduino_ip"));
            $('#porttext').val(localStorage.getItem("arduino_port"));
            $('#passwordtext').val(localStorage.getItem("arduino_password"));

            console.log('ip  ' + localStorage.getItem("arduino_ip") + ' && port ' + localStorage.getItem("arduino_port") + ' && password ' + localStorage.getItem("arduino_password") );

            var arduinoObjects;
            var device;
            var out;
            var status;
            $.get("arduinostatusrequest.php",{ ip: localStorage.getItem("arduino_ip") , port: localStorage.getItem("arduino_port") }, function(data){
                arduinoObjects = data.devices.length;
                for (var i=0; i<arduinoObjects; i++)
                {
                      device = i;
                      status = data.devices[i].status;
                      out = data.devices[i].out;
                      console.log('device  ' + i + ' >> status ' + status + ' && out ' + out );
                      updateSwitch(device, status);
                }
            }, 'json');
        });

     </script>

 </head>

</head> 
<body> 

<!-- Page 1 -->
<div data-role="page" id="page1">

    <div data-role="header">
        <h1>Control</h1>
    </div><!-- /header -->
    
    <div data-role="content">	
        <!--<div data-role="collapsible-set" >-->

        <div data-role="collapsible" data-theme="a" data-content-theme="c">
            <h3>Lights</h3>
                <label for="light1">light 1: </label>
                <select name="light1" id="light1" data-role="slider" onChange="requestLight('2', value )">
                    <option value="0">Off</option>
                    <option value="1">On</option>
                </select>
                <br>
                <label for="light2">light 2: </label>
                <select name="light2" id="light2" data-role="slider" onChange="requestLight('3', value )">
                    <option value="0">Off</option>
                    <option value="1">On</option>
                </select>
                <br>
                <label for="light3">light 3: </label>
                <select name="light3" id="light3" data-role="slider" onChange="requestLight('4', value )">
                    <option value="0">Off</option>
                    <option value="1">On</option>
                </select> 
                <br><br>
                <div data-role="controlgroup" data-type="horizontal" data-mini="true">
                <label for="button_on">all lights: </label>
                <a href="#" id="button_on" data-role="button" onClick="requestLight('a', '1' )" >On</a>
                <a href="#" id="button_off" data-role="button" onClick="requestLight('a', '0' )" >Off</a>
                </div>
        </div>

        <div data-role="collapsible" data-theme="a" data-content-theme="c" id="rgb_collapsible">
            <h3>RGB Lamp</h3>
                <label for="slider_red">Red:</label>
                <input type="range" name="slider" id="slider_red" value="125" min="0" max="250" data-highlight="true" data-theme="d" onchange="updateColor()" />

                <label for="slider_green">Green:</label>
                <input type="range" name="slider" id="slider_green" value="125" min="0" max="250" data-highlight="true" data-theme="d" onchange="updateColor()"/>

                <label for="slider_blue">Blue:</label>
                <input type="range" name="slider" id="slider_blue" value="125" min="0" max="250" data-highlight="true" data-theme="d" onchange="updateColor()"/>
                <br>
                <div id="color_block"></div>
                <input id="rgb_button" type="submit" value="Submit" data-theme="a"/>
        </div>
        <!--</div> --> <!-- /collapsible-set -->
    </div><!-- /content -->
    
    <div data-role="footer" data-position="fixed">		
        <div data-role="navbar">
            <ul>
                <li><a href="#page1" data-icon="home"></a></li>
                <li><a href="#page2" data-icon="gear"></a></li>
            </ul>
        </div><!-- /navbar -->
    </div><!-- /footer -->

</div><!-- /page -->


<!-- Page 2 -->
<div data-role="page" id="page2">

    <div data-role="header">
        <h1>Settings</h1>
    </div><!-- /header -->

    <div data-role="content" data-content-theme="b">

        <label for="iptext">Arduino IP:</label>
        <input type="text" name="arduino_ip" id="iptext" value=""/>

        <label for="porttext">Arduino Port:</label>
        <input type="text" name="arduino_port" id="porttext" value=""/>

        <label for="passwordtext">Arduino Password:</label>
        <input type="password" name="arduino_password" id="passwordtext" value=""/>
        <br>
        <input id="setting_button" type="submit" value="Submit" data-theme="a"/>

    </div><!-- /content -->

    <div data-role="footer" data-position="fixed">
        <div data-role="navbar">
            <ul>
                <li><a href="#page1" data-icon="home"></a></li>
                <li><a href="#page2" data-icon="gear"></a></li>
            </ul>
        </div><!-- /navbar -->
    </div><!-- /footer -->

</div><!-- /page -->


<!-- Dialog box-settings -->
<div data-role="dialog" id="dialog_settings_succes">

    <div data-role="header">
        <h1>Setting</h1>
    </div><!-- /header -->

    <div data-role="content" data-content-theme="b">
        <h1>Succesfull</h1>
        <p>Your data is stored succesfull<br></p>
    </div><!-- /content -->

    <div data-role="footer" data-position="fixed">
    </div><!-- /footer -->
</div><!-- /DialogBox -->


<!-- Dialog box-settings -->
<div data-role="dialog" id="dialog_settings_error">
    <div data-role="header">
        <h1>Setting</h1>
    </div><!-- /header -->

    <div data-role="content" data-content-theme="b">
        <h1>Error</h1>
        <p>Something went wrong, <br>the storage couldn't be filled.<br> Try it agian later<br></p>
    </div><!-- /content -->

    <div data-role="footer" data-position="fixed">
    </div><!-- /footer -->
</div><!-- /DialogBox -->

<!-- Dialog box-settings -->
<div data-role="dialog" id="dialog_settings_empty">
    <div data-role="header">
        <h1>Setting</h1>
    </div><!-- /header -->

    <div data-role="content" data-content-theme="b">
        <h1>Empty</h1>
        <p>The setting are empty.<br>Please fill them in first before you can use this application</p>

        <a href="#page2" data-role="button"  >Settings</a>
    </div><!-- /content -->

    <div data-role="footer" data-position="fixed">
    </div><!-- /footer -->
</div><!-- /DialogBox -->

</body>


    <script type="text/javascript">

        function updateColor(){
            var red;
            var green;
            var blue;
            red = $('#slider_red').val();
            green = $('#slider_green').val();
            blue = $('#slider_blue').val();
            console.log('red ' + red + ' && green ' + green + ' && blue ' + blue);
            $("#color_block").css("background-color", "rgb(" + red + "," +  green + "," + blue + ")");
        }

        function updateSwitch(Device, Status) {
            if (Device == 0){
                $('#light1').val(Status).slider("refresh");
            } else if (Device == 1){
                $('#light2').val(Status).slider("refresh");
            } else if (Device == 2){
                $('#light3').val(Status).slider("refresh");
            }
        }

        $("#setting_button").click( function() {
            localStorage.setItem("arduino_ip", $('#iptext').val());
            localStorage.setItem("arduino_port", $('#porttext').val());
            localStorage.setItem("arduino_password", $('#passwordtext').val());
            if ( (localStorage.getItem("arduino_ip") != "") && (localStorage.getItem("arduino_port") != "") && (localStorage.getItem("arduino_password") != "") ){
                // storage filled
                $.mobile.changePage('#dialog_settings_succes', 'pop', true, true);
            } else if ( (localStorage.getItem("arduino_ip") == "") && (localStorage.getItem("arduino_port") == "") && (localStorage.getItem("arduino_password") == "") ) {
                // something went wrong, the storage couldn't be filled. Try again
                $.mobile.changePage('#dialog_settings_error', 'pop', true, true);
            }
        });

        function requestLight(Pin, Status) {
            console.log('Pin ' + Pin + ' && Status ' + Status );
            var out;
            var status;
            $.get("arduinolightrequest.php", { ip: localStorage.getItem("arduino_ip") , port: localStorage.getItem("arduino_port"), p: Pin, s: Status }, function(data){
                console.log('raw data ' + data);
                out = data.out;
                status = data.status;
                console.log('status ' + status + ' && pin ' + out);
                // todo - updateSwitch(device, status); - when al light where set on of set off at once - by the json respsone
            }, 'json');

            if (Pin == 'a'){
                if (Status == '1'){
                    for (var i=0; i<3; i++) {
                        updateSwitch(i,'1');
                    }
                } else if (Status == '0'){
                    for (var i=0; i<3; i++){
                        updateSwitch(i,'0');
                    }
                }
            }
         }

        $("#rgb_button").click( function() {
            var red;
            var green;
            var blue;
            $.get("arduinorgbrequest.php", { ip: localStorage.getItem("arduino_ip") , port: localStorage.getItem("arduino_port") ,r: $('#slider-red').val(), g: $('#slider-green').val(), b: $('#slider-blue').val() }, function(data){
                red = data.red;
                green = data.green;
                blue = data.blue;
                console.log('red ' + red + ' && green ' + green + ' && blue ' + blue);
            }, 'json');
        });

	</script>

</html>


