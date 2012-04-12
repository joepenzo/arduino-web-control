
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">

<html>
	<head>
	<title>Arduino</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />

    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.1.0-rc.1/jquery.mobile-1.1.0-rc.1.min.css" />
    <link rel="stylesheet" type="text/css" href="style.css" />

    <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
	<script src="http://code.jquery.com/mobile/1.1.0-rc.1/jquery.mobile-1.1.0-rc.1.min.js"></script>

    <!-- iphone hide and icon stuff -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />

    <link rel="apple-touch-icon" href="img/touch-icon-iphone.png" />  <!-- 57x57 PNG -->
	<link rel="apple-touch-icon" sizes="72x72" href="img/touch-icon-ipad.png" />  <!-- 72x72 PNG -->
	<link rel="apple-touch-icon" sizes="114x114" href="img/touch-icon-iphone4-3.png" />  <!-- 114x114 PNG -->


    <script src="js/start_script.js"></script>
 </head>

</head> 
<body> 

<!-- Page 1 -->
<div data-role="page" id="page1">

    <div data-role="header">
        <h1>Control</h1>
    </div><!-- /header -->
    
    <div data-role="content" id="content_page1">

        <div data-role="collapsible" data-theme="a" data-content-theme="c" id="colorpick">
            <h3>COLOR</h3>

            <canvas id="canvas_picker"></canvas>
            <div id='picked_color'> </div>
            <div id='picked_color_preview'> </div>
            <div id='rgb_submitbutton_holder'>
                <input id="rbg_colorpicker_button" type="submit" value="Submit" data-theme="a"/>
            </div>
        </div>

        <div data-role="collapsible" data-theme="a" data-content-theme="c" id="test">
            <h3>test</h3>

            <fieldset class="ui-grid-b">
                <div class="ui-block-a"><button type="submit" data-theme="a">on</button></div>
                <div class="ui-block-b"></div>
                <div class="ui-block-c"><button type="submit" data-theme="a">off</button></div>

<!--                <div class="ui-block-a"><button type="submit" data-theme="a">1</button></div>-->
<!--                <div class="ui-block-b"><button type="submit" data-theme="a">2</button></div>-->
<!--                <div class="ui-block-c"><button type="submit" data-theme="a">3</button></div>-->
<!--                <div class="ui-block-a"><button type="submit" data-theme="a">4</button></div>-->
<!--                <div class="ui-block-b"><button type="submit" data-theme="a">5</button></div>-->
<!--                <div class="ui-block-c"><button type="submit" data-theme="a">6</button></div>-->
<!--                <div class="ui-block-a"><button type="submit" data-theme="a">7</button></div>-->
<!--                <div class="ui-block-b"><button type="submit" data-theme="a">8</button></div>-->
<!--                <div class="ui-block-c"><button type="submit" data-theme="a">9</button></div>-->
<!--                <div class="ui-block-a"></div>-->
<!--                <div class="ui-block-b"><button type="submit" data-theme="a">0</button></div>-->
<!--                <div class="ui-block-c"></div>-->
            </fieldset>
            <fieldset class="ui-grid-a">
                <div class="ui-block-a">Channel</div>
                <div class="ui-block-b">Volume</div>
                <div class="ui-block-a"><button type="submit" data-theme="a">+</button></div>
                <div class="ui-block-b"><button type="submit" data-theme="a">+</button></div>
                <div class="ui-block-a"><button type="submit" data-theme="a">-</button></div>
                <div class="ui-block-b"><button type="submit" data-theme="a">-</button></div>
            </fieldset>
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

    <div data-role="content" data-content-theme="a">

        <div data-role="collapsible" id="arduino_setting_collapsible" data-theme="a" data-content-theme="c">
            <h3>Arduino Settings</h3>
            <label for="iptext">Arduino IP:</label>
            <input type="text" name="arduino_ip" id="iptext" value=""/>

            <label for="porttext">Arduino Port:</label>
            <input type="text" name="arduino_port" id="porttext" value=""/>

            <label for="passwordtext">Arduino Password:</label>
            <input type="password" name="arduino_password" id="passwordtext" value=""/>
            <br>
            <input id="setting_button" type="submit" value="Submit" data-theme="a"/>
        </div>

        <div data-role="collapsible" id="interface_setting_collapsible" data-theme="a" data-content-theme="c">
            <h3>Interface Settings</h3>

            <label for="rgb_picker_switch">RGB Color picker:</label>
            <select name="slider" id="rgb_picker_switch" data-role="slider">
                <option value="off">Off</option>
                <option value="on">On</option>
            </select>

            <label for="rgb_sliders_switch">RGB Color sliders:</label>
            <select name="slider" id="rgb_sliders_switch" data-role="slider">
                <option value="off">Off</option>
                <option value="on">On</option>
            </select>

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


<!-- Dialog box-settings -->
<div data-role="dialog" id="dialog_settings_succes">

    <div data-role="header">
        <h1>Setting</h1>
    </div><!-- /header -->

    <div data-role="content" data-content-theme="b">
        <h1>Succesfull</h1>
        <p>Your data is stored succesfull<br></p>
        <a href="#page1" data-role="button"  onclick="getArduinoStatusAndBuildDom();">Start now</a>
    </div><!-- /content -->

<!--    <div data-role="footer" data-position="fixed">-->
<!--    </div><!-- /footer -->
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

<!--    <div data-role="footer" data-position="fixed">-->
<!--    </div><!-- /footer -->
</div><!-- /DialogBox -->

<!-- Dialog box-settings -->
<div data-role="dialog" id="dialog_settings_empty">
    <div data-role="header">
        <h1>Setting</h1>
    </div><!-- /header -->

    <div data-role="content" data-content-theme="b">
        <h1>Hi!</h1>
        <p>Your setting are empty.<br>Please fill the setting from your arduino in to the setting panal before you can use this application</p>

        <a href="#page2" data-role="button"  >Settings</a>
    </div><!-- /content -->

<!--    <div data-role="footer" data-position="fixed">-->
<!--    </div><!-- /footer -->
</div><!-- /DialogBox -->

</body>

    <script type="text/javascript">
	</script>

    <script src="js/end_script.js"></script>

</html>


