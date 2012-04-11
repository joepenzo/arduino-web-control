<?php
$led1 = rand(0,1);//isset($_GET['led1']) ? $_GET['led1'] : '0';
$led2 = isset($_GET['led2']) ? $_GET['led2'] : '0';

//echo " '<' $input '>' ";
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<html>
 <head>
  <title>Arduino</title>
 </head>
 <body>
 
<h1>Arduino webpage</h1>

<div id="leds">
    <div id="led1">
        <form name="input" action="" method="get">
        <input type="radio" name="led1" value="1"/> on<br>
        <input type="radio" name="led1" value="0"/> off<br>
        <input type="submit" value="Submit"/>
        </form>
    </div>
    <div id="status">

        <p>
        [L1=<?php echo $led1 ?>] <br>
        [L2=<?php echo $led2 ?>] <br>
        [L3=0]
        </p>
    </div>

</div>



</body>
</html>