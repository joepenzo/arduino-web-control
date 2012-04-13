/**
 * @author Joep Suijkerbuijk
 */



var totalCode = '';
var close = '\n}\n';
var ligthName = '';
var ligthPin = '';


$(document).ready(function(){


    $("#generate_button").click(function () {
        generateFullCode();
        console.log(totalCode);

    });

});

function generateVariables (){
    var totalVariables = '';
    var mac = 'byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };\n';
    var gateway = 'byte gateway[] = { ' + $("#gateway_text").val().replace( /\./g,', ') + ' };\n';
    var subnet = 'byte subnet[] = { ' + $("#subnet_text").val().replace( /\./g,', ') + ' };\n';
    var ip = 'byte subnet[] = { ' +  $("#ip_text").val().replace( /\./g,', ') + ' }; \n';
    var port = 'EthernetServer server(' + $("#port_text").val() + ') \n';
    var readString = 'String readString = String(30);\n';
    var ligths = '\n';
    var actions = '\n';
    var actionNumber = -1;
    var getCommands = '\n';


    actions +=
        '#define action_none ' + (actionNumber) + '\n' +
        '#define action_status ' + (actionNumber += 1) + '\n';

    getCommands +=
            'String r_allOn = "GET /?p=a&s=1"; \n' +
            'String r_allOff = "GET /?p=a&s=0"; \n';

    for( i=0; i < allLights.length; i++){
        var ligth = allLights[i];
        var ligthSubstring = ligth.split('_');
        ligthName = ligthSubstring[0];
        ligthPin = ligthSubstring[1]
        ligths += 'int ' + ligthName + ' = ' + ligthPin + ';\n';
        //#define action_on_led1 1
       // #define action_off_led1 2
        actions +=
            '#define action_on_' + ligthName + ' ' + (actionNumber += 1) + '\n' +
            '#define action_off_'+ ligthName + ' ' + (actionNumber += 1) + '\n';

        getCommands +=
            'String r_' + ligthName + 'On = "GET /?p=' + ligthPin + '&s=1 \n'+
            'String r_'+ ligthName + 'Off = "GET /?p=' + ligthPin + '&s=0 \n';
    }

    actions += '\nint current_action; \n';

    totalVariables = '\n' + mac + ip + gateway + subnet + port + readString + actions + ligths + getCommands;
    return totalVariables;
}

function generateSetup() {
    var setupFunction = '\nvoid setup () { \n';
    setupFunction +=
        '\tSerial.begin(9600);\n' +
        '\tEthernet.begin(mac, ip, gateway, subnet);\n' +
        '\tserver.begin();\n' +
        '\tcurrent_action = -1;\n'  ;

    var pinModes = '\n';

    for( i=0; i < allLights.length; i++){
        var ligth = allLights[i];
        var ligthSubstring = ligth.split('_');
        ligthName = ligthSubstring[0];
        pinModes += '\tpinMode(' + ligthName + ',OUTPUT);\n';
    }

    return setupFunction + pinModes + close;
}

function generateLoop() {
    var loopFunction = '\nvoid loop () {\n';

    loopFunction +=
        '\t// Create a client connection\n' +
        '\tClient client = server.available();\n' +
        '\tif (client) {\n' +
        '\t\twhile (client.connected()) {\n' +
        '\t\tif (client.available()) {\n' +
        '\t\t\tchar c = client.read();\n' +
        '\t\t\t//read char by char HTTP request\n' +
        '\t\t\tif (readString.length() < 30)\n' +
        '\t\t\t{\n' +
        '\t\t\t//store characters to string\n' +
        '\t\t\treadString = readString + c;\n' +
        '\t\t\t}\n' +
        '\t\t\t//output chars to serial port\n' +
        '\t\t\tSerial.print(c);\n' +
        '\t\t\t//if HTTP request has ended\n' +
        '\t\t\t\tif (c == ' + "'\\" + "n'"  +' ) {\n' +
        '\t\t\t\t\tSerial.print(readString);\n';

    return loopFunction + close;

}

function generateFullCode() {

    totalCode = '#include <SPI.h> \n' +
                '#include <Ethernet.h> \n';

    totalCode += generateVariables() + generateSetup() + generateLoop();

}



