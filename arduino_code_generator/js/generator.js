/**
 * @author Joep Suijkerbuijk
 */



var totalCode = '';
var close = '\n}\n';

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


    totalVariables = '\n' + mac + ip + gateway + subnet + port;
    return totalVariables;
}

function generateSetup() {
    var setupFunction = '\nvoid setup () { \n';
    setupFunction +=
        '\tSerial.begin(9600);\n' +
        '\tEthernet.begin(mac, ip, gateway, subnet);\n' +
        '\tserver.begin();\n';

    return setupFunction + close;
}

function generateLoop() {
    var loopFunction = '\nvoid loop () {';
    return loopFunction + close;
}

function generateFullCode() {

    totalCode = '#include <SPI.h> \n' +
                '#include <Ethernet.h> \n';

    totalCode += generateVariables() + generateSetup() + generateLoop();

}



