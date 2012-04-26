#include <SPI.h>
#include <Ethernet.h>
#include <dht11.h>


byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xBE };      //physical mac address 
byte ip[] = { 192, 168, 1, 100 };			  // ip address
byte gateway[] = { 192, 168, 1, 1 };			  // internet access via router // mama
//byte gateway[] = { 192, 168, 1, 254 };			  // internet access via router // papa
byte subnet[] = { 255, 255, 255, 0 };			  //subnet mask
Server server(80);				          //server port
String readString = String(30); //string for fetching data from address

dht11 DHT11;
#define DHT11PIN A3

#define action_none -1
#define action_status 0

#define action_on_led1 1
#define action_off_led1 2
#define action_on_led2 3
#define action_off_led2 4
#define action_on_led3 5
#define action_off_led3 6
#define action_on_all 7
#define action_off_all 8
#define change_rbg 9

// arduino out
int led1 = 2;
int led2 = 3;
int led3 = 4;

int redPin = A0;
int greenPin = A1;
int bluePin = A2;

int redVal; 
int greenVal;
int blueVal;



// incoming GET command
String r_led1On = "GET /?p=2&s=1"; 
String r_led1Off = "GET /?p=2&s=0"; 
String r_led2On = "GET /?p=3&s=1"; 
String r_led2Off = "GET /?p=3&s=0"; 
String r_led3On = "GET /?p=4&s=1"; 
String r_led3Off = "GET /?p=4&s=0"; 
String r_allOn = "GET /?p=a&s=1"; 
String r_allOff = "GET /?p=a&s=0"; 
String r_rgb = "GET /?r="; 
String r_status = "GET /?p=status"; 

// current action
int current_action;

void setup(){
  Serial.begin(9600);
  //start Ethernet
  Ethernet.begin(mac, ip, gateway, subnet);
 
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(redPin, OUTPUT);     
  pinMode(greenPin, OUTPUT);     
  pinMode(bluePin, OUTPUT);   
   
  current_action = -1;              
}

void loop(){
  
  current_action = -1;

  // Create a client connection
  Client client = server.available();
    if (client) {
	while (client.connected()) {
	 if (client.available()) {
	  char c = client.read();
	  //read char by char HTTP request
	  if (readString.length() < 30)
	  {
	    //store characters to string
	    readString = readString + c;
	  }
	  //output chars to serial port
	  Serial.print(c);
	  //if HTTP request has ended
	  if (c == '\n') {

	   Serial.print(readString);
	    if(readString.startsWith(r_led1On)) {
	      Serial.print("\nON LED1\n");
	      current_action = action_on_led1;
	    } else if(readString.startsWith(r_led1Off)) {
	      Serial.print("\nOFF LED1\n");
	      current_action = action_off_led1;
	    } else if(readString.startsWith(r_led2On)) {
	      Serial.print("\nON LED2\n");
	      current_action = action_on_led2;
	    } else if(readString.startsWith(r_led2Off)) {
	      Serial.print("\nOFF LED2\n");
	      current_action = action_off_led2;
	    } else if(readString.startsWith(r_led3On)) {
	      Serial.print("\nON LED3\n");
	      current_action = action_on_led3;
	    } else if(readString.startsWith(r_led3Off)) {
	      Serial.print("\nOFF LED3\n");
	      current_action = action_off_led3;
	    } else if(readString.startsWith(r_allOn)) {
	      Serial.print("\nALL ON\n");
	      current_action = action_on_all;
	    } else if(readString.startsWith(r_allOff)) {
	      Serial.print("\nALL OFF\n");
	      current_action = action_off_all;
	    } else if(readString.startsWith(r_rgb)) {
	      Serial.print("\nCHANGE RGB\n");
	      current_action = change_rbg;
	    } else if(readString.startsWith(r_status)) {
	      Serial.print("\nALL STATUS\n");
	      current_action = action_status;
	    } 

	    else {
		Serial.print("\nNone\n");
		current_action = action_none;
	    }
	    // now output HTML data starting with standart header
	   client.println("HTTP/1.1 200 OK");
	   client.println("Content-Type: application/json");
	   client.println();
	   char buf[12];
	   switch(current_action)
	   {
	   case action_status:
              DHT11.read(DHT11PIN); // read temp sensor
	      client.print("{\"ip\" : \"192.168.1.100\", \"lights\" : [{ \"status\" : \"");
              client.print(digitalRead(led1));
              client.print("\", \"out\" : \"");
              client.print(led1);
	      client.print("\"},");
              client.print("{\"status\" : \"");
              client.print(digitalRead(led2));
              client.print("\" , \"out\" : \"");
              client.print(led2);
              client.print("\"},");
              client.print("{\"status\" : \"");
              client.print(digitalRead(led3));
              client.print("\" , \"out\" : \"");
              client.print(led3);
              client.print("\"}] , \"temperature\" : [{ \"temp\" : \"");
              client.print((float)DHT11.temperature, 1);
              client.print("\"}, {\"humidity\" : \"");
              client.print((float)DHT11.humidity, 0);     
	      client.print("\"}]}");
	     break;
	   case action_on_led1:
	     returnJsonLight(led1, HIGH, client);
	     break;
	   case action_off_led1:
	     returnJsonLight(led1, LOW, client);
	     break;
	   case action_on_led2:
	     returnJsonLight(led2, HIGH, client);
	     break;
	   case action_off_led2:
	     returnJsonLight(led2, LOW, client);
	     break;
	   case action_on_led3:
	     returnJsonLight(led3, HIGH, client);
	     break;
	   case action_off_led3:
	     returnJsonLight(led3, LOW, client);
	     break;
          case action_on_all:
             returnJsonAllLights(HIGH, client);
	     break;
           case action_off_all:
              returnJsonAllLights(LOW ,client);
	     break;
           case change_rbg:
             getRGBValue(readString, client);
             break;
	   default:
	     current_action = action_none;
	   }
	   //clearing string for next read
	   readString="";
	   //stopping client
	   client.stop();
	  }
	}
    }
  }
}

  void returnJsonLight (int Pin, int Status, Client client) {
    digitalWrite(Pin, Status);
    client.print("{\"status\" : \"");
    client.print(digitalRead(Pin));
    client.print("\" , \"out\" : \"");
    client.print(Pin);
    client.print("\"}");
  } 
  
  void returnJsonAllLights (int Status, Client client) { 
    digitalWrite(led1, Status);
    digitalWrite(led2, Status);
    digitalWrite(led3, Status);    
    client.print("{\"lights\" : [{ \"status\" : \"");
    client.print(digitalRead(led1));
    client.print("\", \"out\" : \"");
    client.print(led1);     
    client.print("\"},");
    client.print("{\"status\" : \"");
    client.print(digitalRead(led2));
    client.print("\" , \"out\" : \"");
    client.print(led2);
    client.print("\"},");
    client.print("{\"status\" : \"");
    client.print(digitalRead(led3));
    client.print("\" , \"out\" : \"");
    client.print(led3);
    client.print("\"}");
    client.print("]}");
  } 
  
  void getRGBValue(String request, Client client){
    Serial.println("rgb shit enzo " + request);
//  exmaple string :  GET /?r=125&g=125&b=208 HTTP/1
    int rStart =  request.indexOf('r');
    int rEnd =  request.indexOf('&g');
    String rVal = request.substring(rStart+2, rEnd-1);
    int gStart =  request.indexOf('g');
    int gEnd =  request.indexOf('&b');
    String gVal = request.substring(gStart+2, gEnd-1);
    int bStart =  request.indexOf('b');
    int bEnd =  request.indexOf('HTTP');
    String bVal = request.substring(bStart+2, bEnd-4);
    Serial.println("\n R-" + rVal +"-");
    Serial.println("\n G-" + gVal +"-");
    Serial.println("\n B-" + bVal +"-");   
    
    // string to char to int - needs to be fixed!)
    char redCharBuf[3];
    char greenCharBuf[3];
    char blueCharBuf[3];
    rVal.toCharArray(redCharBuf, 3);
    gVal.toCharArray(greenCharBuf, 3);
    bVal.toCharArray(blueCharBuf, 3);  
    
    int rValInt = charToInt(redCharBuf);
    int gValInt =charToInt(greenCharBuf);
    int bValInt =charToInt(blueCharBuf);
    
    writeRGBValue(rValInt, gValInt, bValInt);
  }  
  
int8_t charToInt( char *str ){  
  Serial.println("\n input : "); 
  Serial.print(str);
  int8_t r = 0;  
  int len = strlen(str);  
  for(int i=0; i<len; i++){  
   //Check if this is a number  
   if ( str[i] < 0x3a && str[i] > 0x2f){  
     // is a ASCII number, return it  
     r = r * 10;  
   r += (str[i]-0x30);  
   }else{  
    i = len; //exit!  
    r = -1;  
    break;  
   }    
  }  
  Serial.println("\n output : "); 
  Serial.print(r);
  return r;   
 }  
 
  
 

void writeRGBValue(int red, int green, int blue){
    analogWrite(redPin, red*10);   // set the LED on
    analogWrite(greenPin, green*10);   // set the LED on
    analogWrite(bluePin, blue*10);   // set the LED on
}  
