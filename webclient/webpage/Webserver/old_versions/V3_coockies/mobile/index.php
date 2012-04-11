
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">

<html> 
	<head> 
	<title>Arduino</title> 
    <link rel="stylesheet" type="text/css" href="style.css" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />

	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.1.0-rc.1/jquery.mobile-1.1.0-rc.1.min.css" />
	<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.1.0-rc.1/jquery.mobile-1.1.0-rc.1.min.js"></script>
    
    <!-- iphone hide and icon stuff -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    
    <link rel="apple-touch-startup-image" sizes="640x960" href="img/splash-screen-640x960.png" /> 
    <link rel="apple-touch-startup-image" href="img/splash-screen-320x460.png" /> <!-- 320x480 PNG --> 
	<link rel="apple-touch-startup-image" sizes="768x1004" href="img/splash-screen-768x1004.png" />
    <link rel="apple-touch-startup-image" sizes="1024x748" href="img/splash-screen-1024x748.png" />

    <link rel="apple-touch-icon" href="img/touch-icon-iphone.png" />  <!-- 57x57 PNG -->
	<link rel="apple-touch-icon" sizes="72x72" href="img/touch-icon-ipad.png" />  <!-- 72x72 PNG -->
	<link rel="apple-touch-icon" sizes="114x114" href="img/touch-icon-iphone4.png" />  <!-- 114x114 PNG -->
    		
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script src="js/jquery.cookie.js"></script>
    <script type="text/javascript">

		$(document).ready(function(){
            $('#iptext').val($.cookie("iptext"))
            $('#porttext').val($.cookie("porttext"))
            $('#passwordtext').val($.cookie("passwordtext"))

            console.log($.cookie("iptext"));
            console.log($.cookie("porttext"));
            console.log($.cookie("passwordtext"));


            var arduinoObjects;
            var device;
            var out;
            var status;
            $.get("arduinostatusrequest.php", function(data){
                arduinoObjects = data.devices.length;

                for (var i=0; i<arduinoObjects; i++)
                {
                      device = i;
                      status = data.devices[i].status;
                      out = data.devices[i].out;
                      console.log('device  ' + i + ' >> status ' + status + ' && out ' + out );
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
        
        <div data-role="collapsible" data-theme="a" data-content-theme="b">
            <h3>Lights</h3>
            <div data-role="fieldcontain">
                 <label for="light1">light 1: </label>
                <select name="light1" id="light1" data-role="slider" onChange="requestLight('2', value )" data-theme="d">
                    <option value="0" data-theme="d">Off</option>
                    <option value="1" data-theme="d">On</option>
                </select>
                <br>
                <label for="light2">light 2: </label>
                <select name="light2" id="light2" data-role="slider" onChange="requestLight('3', value )" data-theme="d">
                    <option value="0" data-theme="d">Off</option>
                    <option value="1" data-theme="d">On</option>
                </select>
                <br>
                <label for="light3">light 3: </label>
                <select name="light3" id="light3" data-role="slider" onChange="requestLight('4', value )" data-theme="d">
                    <option value="0" data-theme="d">Off</option>
                    <option value="1" data-theme="d">On</option>
                </select> 
                <br><br>
                <div data-role="controlgroup" data-type="horizontal" data-mini="true">
                <label for="button_on">all lights: </label>
                <a href="#" id="button_on" data-role="button" onClick="requestLight('a', 1 )" data-theme="d">On</a>
                <a href="#" id="button_off" data-role="button" onClick="requestLight('a', 0 )" data-theme="d">Off</a>
                </div>
            </div>
        </div>

        <div data-role="collapsible" data-theme="a" data-content-theme="b">
            <h3>RGB Lamp</h3>
                <label for="slider-red">Red:</label>
                <input type="range" name="slider" id="slider-red" value="125" min="0" max="250" data-highlight="true" data-theme="d"/>

                <label for="slider-green">Green:</label>
                <input type="range" name="slider" id="slider-green" value="125" min="0" max="250" data-highlight="true" data-theme="d"/>

                <label for="slider-blue">Blue:</label>
                <input type="range" name="slider" id="slider-blue" value="125" min="0" max="250" data-highlight="true" data-theme="d"/>
                <br>
                <input type="submit" value="Submit" data-theme="a" />
        </div>

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
        <input type="text" name="iptext" id="iptext" value=""/>

        <label for="porttext">Arduino Port:</label>
        <input type="text" name="porttext" id="porttext" value=""/>

        <label for="passwordtext">Arduino Password:</label>
        <input type="text" name="passwordtext" id="passwordtext" value=""/>
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

</body>
    <script type="text/javascript">

        function setFlipSwitch(Device, Status) {
            var toggleSwitch = $('select');
            toggleSwitch.val('1');
            toggleSwitch.slider('refresh');
        }

        $("#setting_button").click( function() {
            console.log("submit");
            $.cookie("iptext", $('#iptext').val());
            $.cookie("porttext", $('#porttext').val());
            $.cookie("passwordtext", $('#passwordtext').val());
        });

        function requestLight(Pin, Status) {
            var out;
            var status;
            $.get("arduinolightrequest.php", { p: Pin, s: Status }, function(data){
                out = data.out;
                status = data.status;
                console.log('status ' + status + ' && pin ' + out);
            }, 'json');
         }

	</script>
</html>


