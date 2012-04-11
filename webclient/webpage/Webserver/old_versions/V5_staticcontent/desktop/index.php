
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<html>
 <head>
  <title>Arduino</title>

     <script type="text/javascript">
     var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
     if ( mobile || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (screen.width <= 480) || (screen.height <= 480)) {
         document.location = "/mobile";
     }
     </script>



     <meta name="viewport" content="user-scalable=no,width=device-width" />

     <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>

     <script type="text/javascript">

       function requestArduino(Pin, Status) {
            $.get("arduinorequest.php", { p: Pin, s: Status }, function(data){
                var dataenzo = data;
                console.log("Repsone: " + data);
            });
        }

     </script>
 </head>
 <body>
 
<h1>Arduino</h1>



<script>

        $("<div/>", {
            id: 'dynamic_leds',
            'class': 'ledDiv'
        }).appendTo("body");

        $.get("arduinostatusrequest.php",{ ip: '84.26.183.241' , port: '80' }, function(data){
            arduinoObjects = data.devices.length;
            for (var i=0; i<arduinoObjects; i++)
            {
                device = i;
                status = data.devices[i].status;
                out = data.devices[i].out;
                console.log('device  ' + i + ' >> status ' + status + ' && out ' + out );

                $("<button/>", {
                    id: 'button' + (out-1) + 'on',
                    'class': 'led_button',
                    'value': out,
                    text: 'led' + (out-1) + 'on'
                }).appendTo("#dynamic_leds").click(function(){
                    requestArduino($(this).val(), '1' );
                });

                $("<button/>", {
                    id: 'button' + (out-1) + 'off',
                    'class': 'led_button',
                    'value': out,
                    text: 'led' + (out-1) + 'off'
                }).appendTo("#dynamic_leds").click(function(){
                    requestArduino($(this).val(), '0' );
                });

                $("<br>", {}).appendTo("#dynamic_leds");

            }
        }, 'json');



</script>

<div class="log">

</div>

</body>
</html>




