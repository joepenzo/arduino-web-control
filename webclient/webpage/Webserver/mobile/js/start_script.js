/**
 * @author Joep Suijkerbuijk
 */

var isSwitchCreated = '';
var isRGBcreated = '';
var isTemperaturecreated = '';
var lightsAmount;

$(document).ready(function(){
    checkStoredArduinoSettings();
    getArduinoStatusAndBuildDom();
});

function getArduinoStatusAndBuildDom(){
    var arduinoObjects;
    var light;
    var out;
    var status;

    $.get("arduinostatusrequest.php",{ ip: localStorage.getItem("arduino_ip") , port: localStorage.getItem("arduino_port") }, function(data){
       arduinoObjects = data.lights.length;
       for (var i=0; i<arduinoObjects; i++)
       {
           light = i;
           status = data.lights[i].status;
           out = data.lights[i].out;
           console.log('light  ' + i + ' >> status ' + status + ' && out ' + out );
       }
       // build dom elements on what the arduino returns in Json
        if (!isSwitchCreated){
            createSwitch(data);
        }
        if (!isRGBcreated){
            createRGB(data);
        }
        if (!isTemperaturecreated){
            createTemperature(data);
        }
    }, 'json');
}

function checkStoredArduinoSettings(){
    if ( (localStorage.getItem("arduino_ip") == "") || (localStorage.getItem("arduino_ip") == null) ){
           $.mobile.changePage('#dialog_settings_empty', 'pop', true, true);
    }
   $('#iptext').val(localStorage.getItem("arduino_ip"));
   $('#porttext').val(localStorage.getItem("arduino_port"));
   $('#passwordtext').val(localStorage.getItem("arduino_password"));
   console.log('ip  ' + localStorage.getItem("arduino_ip") + ' && port ' + localStorage.getItem("arduino_port") + ' && password ' + localStorage.getItem("arduino_password") );
}