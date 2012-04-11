
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<html>
 <head>
  <title>Arduino</title>

     <script type="text/javascript">
     if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || screen.width <= 699) {
         document.location = "/mobile";
     }
     </script>



     <meta name="viewport" content="user-scalable=no,width=device-width" />

     <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>

     <script type="text/javascript">

       function requestArduino(Pin, Status) {
            $.get("arduinorequest.php", { p: Pin, s: Status }, function(data){
                console.log("Repsone: " + data);
            });
        }

     </script>
 </head>
 <body>
 
<h1>Arduino</h1>

<div id="leds">
    <button id="button1on" class="button" onclick="requestArduino('2', '1' )">led1 on</button>
    <button id="button1off" class="button" onclick="requestArduino('2', '0' )">led1 off</button>
    <br><br>
    <button id="button2on" class="button" onclick="requestArduino('3', '1' )">led2 on</button>
    <button id="button2off" class="button" onclick="requestArduino('3', '0' )">led2 off</button>
    <br><br>
    <button id="button3on" class="button" onclick="requestArduino('4', '1' )">led3 on</button>
    <button id="button3off" class="button" onclick="requestArduino('4', '0' )">led3 off</button>
</div>

<div class="log">

</div>

</body>
</html>




