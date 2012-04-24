/**
 * @author Joep Suijkerbuijk
 */


var allLights = new Array();
var allSensors = new Array();
var totalCode = '';
var close = '\n}\n';
var ligthName = '';
var ligthPin = '';


$(document).ready(function(){


    $("#generate_button").click(function () {
        getAddedItems();
        generateFullCode();
        console.log(totalCode);
    });

});


function getAddedItems (){
    // check for items in dom to fill array
    allLights.length = 0; // empty array before filling it again
    allSensors.length = 0;
    // loop trough al drop pin elements
    $('.drop_pin').each(function(index, object) {
        if ( $(this).children()[1] ) {
            var pin = $(this).attr("value");
            if (pin.toString().search('99') != -1){
                pin = pin.toString().replace('99', 'A');
            }
            var itemType = $(this).find('div:first').attr('value');
            if (itemType == 'light') {
                var itemId =  $(this).find('div:first').attr('id');
                allLights.push(itemId + "_" + pin);
            }
            if (itemType == 'sensor') {
                var itemId =  $(this).find('div:first').attr('id');
                allSensors.push(itemId + "_" + pin);
                console.log(allSensors);
            }

        }
    });

}

function generateVariables (){
    var totalVariables = '';
    var mac = 'byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };\n';
    var gateway = 'byte gateway[] = { ' + $("#gateway_text").val().replace( /\./g,', ') + ' };\n';
    var subnet = 'byte subnet[] = { ' + $("#subnet_text").val().replace( /\./g,', ') + ' };\n';
    var ip = 'byte ip[] = { ' +  $("#ip_text").val().replace( /\./g,', ') + ' }; \n';
    var port = 'Server server(' + $("#port_text").val() + '); \n';
    var readString = 'String readString = String(30);\n';
    var ligths = '\n';
    var actions = '\n';
    var actionNumber = -1;
    var getCommands = '\n';


    actions +=
        '#define action_none ' + (actionNumber) + '\n' +
        '#define action_status ' + (actionNumber += 1) + '\n' +
        '#define action_on_all ' + (actionNumber += 1) + '\n' +
        '#define action_off_all ' + (actionNumber += 1) + '\n\n';

    getCommands +=
            'String r_status = "GET /?p=status"; \n'+
            'String r_allOn = "GET /?p=a&s=1"; \n' +
            'String r_allOff = "GET /?p=a&s=0"; \n';

    for( i=0; i < allLights.length; i++){
        var ligth = allLights[i];
        var ligthSubstring = ligth.split('_');
        ligthName = ligthSubstring[0];
        ligthPin = ligthSubstring[1]
        ligths += 'int ' + ligthName + ' = ' + ligthPin + ';\n';

        actions +=
            '#define action_on_' + ligthName + ' ' + (actionNumber += 1) + '\n' +
            '#define action_off_'+ ligthName + ' ' + (actionNumber += 1) + '\n';

        getCommands +=
            'String r_' + ligthName + 'On = "GET /?p=' + ligthPin + '&s=1"; \n'+
            'String r_'+ ligthName + 'Off = "GET /?p=' + ligthPin + '&s=0"; \n';
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

    var currentActions = '\t\t\t\t\tif(readString.startsWith(r_allOn)) { \n' +
        '\t\t\t\t\t current_action = action_on_all; \n' +
        '\t\t\t\t\t} else if(readString.startsWith(r_allOff)) { \n' +
        '\t\t\t\t\t current_action = action_off_all;\n' +
        '\t\t\t\t\t}';

    var htmlOutput = '\n\n\t\t\t\t\t// now output HTML data starting with standart header  \n' +
    	   '\t\t\t\t\tclient.println("HTTP/1.1 200 OK");  \n' +
    	   '\t\t\t\t\tclient.println("Content-Type: application/json");  \n' +
    	   '\t\t\t\t\tclient.println();  \n' +
    	   '\t\t\t\t\tchar buf[12];  \n' +
    	   '\t\t\t\t\tswitch(current_action)  \n' +
    	   '\t\t\t\t\t{ \n'  +
           '\t\t\t\t\tcase action_status: \n' +
           '\t\t\t\t\t  client.print("{\\"ip\\" : \\"192.168.1.100\\", \\"lights\\" : [{ \\"status\\" : \\""); \n';

    var tempHtmlOuput  = '';

    for( i=0; i < allLights.length; i++){
        var ligth = allLights[i];
        var ligthSubstring = ligth.split('_');
        ligthName = ligthSubstring[0];

        currentActions += ' else if(readString.startsWith(r_' + ligthName + 'On)){ \n' +
        '\t\t\t\t\tcurrent_action = action_on_' + ligthName +';\n' +
        '\t\t\t\t\t} else if(readString.startsWith(r_' + ligthName + 'Off)){ \n' +
        '\t\t\t\t\t current_action = action_off_' + ligthName +';\n' +
        '\t\t\t\t\t}';

        htmlOutput += '\t\t\t\t\t  client.print(digitalRead(' + ligthName + ')); \n' +
        '\t\t\t\t\t  client.print("\\", \\"out\\" : \\""); \n' +
        '\t\t\t\t\t  client.print(' + ligthName + '); \n' +
        '\t\t\t\t\t  client.print("\\"},"); \n' +
        '\t\t\t\t\t  client.print("{\\"status\\" : \\"");\n';

        tempHtmlOuput += '\n\t\t\t\t\tcase action_on_' + ligthName + ': \n' +
            '\t\t\t\t\t  returnJsonLight(' + ligthName +', HIGH, client); \n' +
            '\t\t\t\t\t   break;' +
            '\n\t\t\t\t\tcase action_off_' + ligthName + ': \n' +
            '\t\t\t\t\t  returnJsonLight(' + ligthName +', LOW, client); \n' +
            '\t\t\t\t\t   break;';

    }

    htmlOutput += '\t\t\t\t\t  client.print("\\"}]}"); \n' +
    	     '\t\t\t\t\t break;';

    htmlOutput += tempHtmlOuput +
        '\n\t\t\t\t\tcase action_on_all:\n' +
        '\t\t\t\t\t  returnJsonAllLights(HIGH, client); \n' +
        '\t\t\t\t\t break; \n' +
        '\t\t\t\t\tcase action_off_all: \n' +
        '\t\t\t\t\t  returnJsonAllLights(LOW ,client); \n' +
        '\t\t\t\t\t break; \n' +
        '\t\t\t\t\tdefault: \n' +
        '\t\t\t\t\t  current_action = action_none;\n' +
        '\t\t\t\t\t}; \n' +
        '\t\t\t\t\t//clearing string for next read \n' +
        '\t\t\t\t\treadString=""; \n' +
        '\t\t\t\t\t//stopping client \n' +
        '\t\t\t\t\tclient.stop(); \n' +
        '\t\t\t\t} \n' +
        '\t\t\t} \n' +
        '\t\t} \n' +
        '\t} \n';

    currentActions += ' else { \n' +
        '\t\t\t\t\t current_action = action_none; \n' +
        '\t\t\t\t\t} \n';

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
        '\t\t\t\t\tSerial.print(readString);\n' +
        currentActions +
        htmlOutput;

    return loopFunction + '\n\n' + close;

}

function generateJsonReturner() {
    var returnJsonLightFunction = '\n\n';

    returnJsonLightFunction += 'void returnJsonLight (int Pin, int Status, Client client) { \n' +
        '\tdigitalWrite(Pin, Status); \n' +
        '\tclient.print("{\\"status\\" : \\""); \n' +
        '\tclient.print(digitalRead(Pin)); \n' +
        '\tclient.print("\\" , \\"out\\" : \\""); \n' +
        '\tclient.print(Pin); \n' +
        '\tclient.print("\\"}"); \n' +
        '} \n';

    return returnJsonLightFunction;
}

function generateJsonAllLightReturner() {
    var returnJsonAllLightFunction = '\n\nvoid returnJsonAllLights (int Status, Client client) {';
    var writes = '\n';
    var clientprints = '\n\tclient.print("{\\"lights\\" : [{ \\"status\\" : \\"");\n';

    returnJsonAllLightFunction += '';

    for( i=0; i < allLights.length; i++){
        var ligth = allLights[i];
        var ligthSubstring = ligth.split('_');
        ligthName = ligthSubstring[0];

        writes += '\tdigitalWrite(' + ligthName + ', Status); \n';

        clientprints += '\tclient.print(digitalRead(' + ligthName + ')); \n' +
               '\tclient.print("\\", \\"out\\" : \\""); \n' +
               '\tclient.print(' + ligthName + '); \n' +
               '\tclient.print("\\"},"); \n';
                if (i != allLights.length -1) {
                    clientprints += '\tclient.print("{\\"status\\" : \\""); \n'
                }
    }

    returnJsonAllLightFunction += writes + clientprints + '\tclient.print("]}");' + close;

    return returnJsonAllLightFunction;
}


function generateFullCode() {

    totalCode = '#include <SPI.h> \n' +
                '#include <Ethernet.h> \n';

    totalCode += generateVariables() + generateSetup() + generateLoop() + generateJsonReturner() + generateJsonAllLightReturner();

}



