<?php
	header("content-type: text/plain");
    if (isset($_GET['r'])){
		$rInput = $_GET['r'];
        if ($rInput.strlen == 1){
            $r = '0';
        } else if ($rInput.strlen == 2){
            $r = '00';
        }
        $r += $rInput;
	}

    if (isset($_GET['g'])){
		$gInput = $_GET['g'];
        if ($gInput.strlen == 1){
            $g = '0';
        } else if ($gInput.strlen == 2){
            $g = '00';
        }
        $g += $gInput;
	}

    if (isset($_GET['b'])){
		$bInput = $_GET['b'];
        if ($bInput.strlen == 1){
            $b = '0';
        } else if ($bInput.strlen == 2){
            $b = '00';
        }
        $b += $bInput;
}
	
	if (isset($_GET['r']) && isset($_GET['g']) && isset($_GET['b'])){
		$return = file_get_contents("http://84.26.183.241:80/?r=".$r."&g=".$g."&b=".$b);
		echo $return;
	}

?>