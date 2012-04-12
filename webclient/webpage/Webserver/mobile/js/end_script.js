/**
 * @author Joep Suijkerbuijk
 */
var lightsArray = [];
var sliderStartVal = 125;
var red = sliderStartVal;
var green = sliderStartVal;
var blue= sliderStartVal;


function updateColor(){

   red = zeroPad(($('#slider_red').val()), 3);
   green = zeroPad(($('#slider_green').val()), 3);
   blue = zeroPad(($('#slider_blue').val()), 3);
   //console.log('red ' + red + ' && green ' + green + ' && blue ' + blue);
   $("#color_block").css("background-color", "rgb(" + red + "," +  green + "," + blue + ")");
}

function updateSwitchesOnStartup(jSonData) {
    var arduinoObjects = jSonData.lights.length;
    var togglesOn = 0;
    for (var i=0; i<arduinoObjects; i++) {
        light = i;
        status = jSonData.lights[i].status;
        out = jSonData.lights[i].out;
        var toggleId = 'light' + (out-1);
        $('#' + toggleId).val(status).slider("refresh");
        if ($('#' + toggleId).val() == '1'){
            togglesOn += 1;
            if (togglesOn == arduinoObjects){
                console.log('all switches are on!');
                $('#all_lights').val(status).slider("refresh");
            }
        }
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


function requestRGB() {
    $.get("arduinorgbrequest.php", { ip: localStorage.getItem("arduino_ip") , port: localStorage.getItem("arduino_port"), r: red , g: green, b: blue  }, function(data){
      //  red = data.red;
      //  green = data.green;
      //  blue = data.blue;
      //  console.log('red ' + red + ' && green ' + green + ' && blue ' + blue);
    }, 'json');
}

function zeroPad(num,count) {
    var numZeropad = num + '';
    while(numZeropad.length < count) {
        numZeropad = "0" + numZeropad;
    }
    return numZeropad;
}


function requestLight(Pin, Status) {
    var arduinoObjects;
    var light;
    var out;
    var status;
    var togglesOn = 0;
    var togglesOff = 0;
    $.get("arduinolightrequest.php", { ip: localStorage.getItem("arduino_ip") , port: localStorage.getItem("arduino_port"), p: Pin, s: Status }, function(data){
       if (data.lights != null){ // all lights
           arduinoObjects = data.lights.length;
           for (var i=0; i<arduinoObjects; i++)
           {
               light = i;
               status = data.lights[i].status;
               out = data.lights[i].out;
               console.log('light  ' + i + ' >> status ' + status + ' && out ' + out );
           }
       } else { // single light
           out = data.out;
           status = data.status;
           console.log('status ' + status + ' && pin ' + out);
       }

    }, 'json');

    lightsAmount = lightsArray.length;
    for  (var i=0; i<lightsAmount; i++) {
        if ($(lightsArray[i]).val() == '1'){
            togglesOn += 1;
            if (togglesOn == lightsAmount){
                $('#all_lights').val('1').slider("refresh");
            }
        }
        if ($(lightsArray[i]).val() == '0'){
            $('#all_lights').val('0').slider("refresh");
        }
    }

    if (Pin == 'a'){
       var totalSwitchElements = $('select').size();
       if (Status == '1'){
           for (var i=0; i<totalSwitchElements; i++) {
               $('select').val(Status).slider("refresh");
           }
       } else if (Status == '0'){
           for (var i=0; i<totalSwitchElements; i++){
               $('select').val(Status).slider("refresh");
           }
       }
   }

}



function createSwitch(jSonData) {
    var type = 'light';
    createCollapsibleContent(type);
    arduinoObjects = jSonData.lights.length;

    // single light switches
    for (var i=0; i<arduinoObjects; i++)
    {
       light = i;
       status = jSonData.lights[i].status;
       out = jSonData.lights[i].out;
       var toggleId = 'light' + (out-1);

        $("<label/>", {
           'for': toggleId,
           'id': 'label_lights',
           text: 'Light ' + (out-1) + ':'
        }).appendTo("#light_collapsible_content");

       $("<select/>", {
           name: 'light_normal',
           id: toggleId,
           'data-role': 'slider',
           'onChange': 'requestLight(' +  out +',' + 'value' + ')'
       }).appendTo("#light_collapsible_content");

       $('#' + toggleId).append(new Option('Off', '0'));
       $('#' + toggleId).append(new Option('On', '1'));
       lightsArray.push('#' + toggleId);
    } // single light switches -end

    // switch for all the lights
    $("<label/>", {
      'for': 'all_lights',
      'class': 'label_lights',
      text: 'All lights:'
    }).appendTo("#light_collapsible_content");

    $("<select/>", {
      name: 'light_normal',
      id: 'all_lights',
      'data-role': 'slider',
      'onChange': 'requestLight(' +  '\'a\'' +',' + 'value' + ')'
    }).appendTo("#light_collapsible_content");

    $('#all_lights').append(new Option('Off', '0'));
    $('#all_lights').append(new Option('On', '1'));
    // switch for all the lights - end

    $('#light_collapsible_content').trigger('create');
    $("#all_lights-label").css("margin", "100px  100px 100px");
    $("#all_lights-label").css("display", "none");
    isSwitchCreated = '1';
    updateSwitchesOnStartup(jSonData);
}

function createRGB(jSonData) {
    var type = 'rgb';
    createCollapsibleContent(type);
    var colorArray = ['red','green','blue'];

    for (var i=0; i<colorArray.length; i++) {
        $("<label/>", {
            'for': 'slider_' + colorArray[i],
            text: colorArray[i].capitalize() + ':'
        }).appendTo("#rgb_collapsible_content");

        $("<input/>", {
            name: 'slider',
            id: 'slider_' + colorArray[i],
            'type': 'range',
            'value': sliderStartVal,
            'min': '0',
            'max': '250',
            'data-highlight': 'true',
            'data-theme': 'd',
            'onChange': 'updateColor()'
        }).appendTo("#rgb_collapsible_content");
    }

    $("<div/>", {
        id: 'color_block'
    }).appendTo("#rgb_collapsible_content");

    $("<input/>", {
        id: 'rgb_button',
        'type': 'submit',
        'value': 'Submit',
        'onclick': 'requestRGB()',
        'data-theme': 'a'
    }).appendTo("#rgb_collapsible_content");

    $('#rgb_collapsible_content').trigger('create');
    isRGBcreated = '1';
}

function createTemperature(jSonData) {
    var type = 'temperature';
    var tempStatus = '19';
    var humStatus = '60';
    createCollapsibleContent(type);

    $("<h3/>", {
        'text': type.capitalize() + ':'
    }).appendTo("#temperature_collapsible_content");

    $("<h1/>", {
        'text': tempStatus + '\u00B0' + 'C'
    }).appendTo("#temperature_collapsible_content");

    $("<h3/>", {
            'text': 'Humidity:'
        }).appendTo("#temperature_collapsible_content");

    $("<h1/>", {
            'text': humStatus + '%'
        }).appendTo("#temperature_collapsible_content");

    $('#temperature_collapsible_content').trigger('create');
    isTemperaturecreated = '1';
}

function createCollapsibleContent(Type) {
    var titel;
    if (Type == 'light'){
        titel = 'Lights';
    } else if (Type == 'rgb'){
        titel = 'RGB Light';
    } else if (Type == 'temperature'){
        titel = 'Temperature';
    }

    $("<div/>", {
        name: Type + '_normal',
        'data-role': 'collapsible',
        id: Type + '_collapsible',
        'data-theme': 'a',
        'data-content-theme': 'c'
    }).appendTo("#content_page1");

    $("<h3/>", {
        'text': titel
    }).appendTo("#" + Type + "_collapsible");

    $("<div/>", {
        name: 'collapsible_content',
        //'data-role': 'fieldcontain',
        id: Type + '_collapsible_content'
    }).appendTo("#" + Type + "_collapsible");

    $('#content_page1').trigger('create');
}

// capitalize first letter of a string.. >> var string = 'test';   string.capitalize();
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



function checkRGBmode (){
    var picker = $("#rgb_picker_switch").val();
    var sliders = $("#rgb_sliders_switch").val();

    if (picker == 'on' ){
        console.log('1');
        $('#rgb_sliders_switch').val('off').slider("refresh");
        rgbMode = 'colorPicker';
        localStorage.setItem("rgb_mode", rgbMode);
    }
    if (sliders == 'on') {
        console.log('2');
        $('#rgb_picker_switch').val('off').slider("refresh");
        rgbMode = 'rgbSliders';
        localStorage.setItem("rgb_mode", $('#iptext').val());
    }
}



var img = new Image();
img.src = "./img/color-picker-spectrum-small.png";
var rgb;
// Copy image (img) to canvas
img.onload = function() {
    var c = document.getElementById('canvas_picker');
    var ctx = c.getContext('2d');
    c.width  = img.width;
    c.height = img.height;
    ctx.drawImage(img,0,0);
}

$('#canvas_picker').bind('mousemove', function(event){
    var x = event.pageX - event.currentTarget.offsetLeft;
    var y = event.pageY - event.currentTarget.offsetTop;
    var ctx = document.getElementById('canvas_picker').getContext('2d');
    var img_data = ctx.getImageData(x, y, 1, 1).data;
    var R = img_data[0];
    var G = img_data[1];
    var B = img_data[2];
    rgb = 'rgb('+R+','+G+','+B+')';
    $('#picked_color_preview').css('background-color', rgb);
});

$('#canvas_picker').bind('click', function(event){
    $('#picked_color').css('background-color', rgb);
});