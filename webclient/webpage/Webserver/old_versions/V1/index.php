
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<html>
 <head>
  <title>Arduino</title>

     <meta name="viewport" content="user-scalable=no,width=device-width" />

     <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>

     <script type="text/javascript">

         $(function() {
             $.getJSON("http://188.204.45.169?callback=?", { p: 'all' }, function(data){
              alert("Data Loaded: " + data);
              });
         });

        function requestArduino(Pin, Status) {
            $.getJSON("http://188.204.45.169?callback=?", { p: Pin, s: Status }, function(data){
            alert("Data Loaded: " + data);
            console.log("Json Repsone: " + json.response);
            console.log("Data : " + data);
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



</body>
</html>




