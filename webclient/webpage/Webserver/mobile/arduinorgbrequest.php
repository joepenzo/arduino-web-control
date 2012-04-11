<?php
	header("content-type: text/plain");

    if (isset($_GET['ip'])){
    $ip = $_GET['ip'];
    }

    if (isset($_GET['port'])){
    $port = $_GET['port'];
    }

    if (isset($_GET['r'])){
		$r = $_GET['r'];
	}

    if (isset($_GET['g'])){
		$g = $_GET['g'];
	}

    if (isset($_GET['b'])){
		$b = $_GET['b'];
    }

	if (isset($_GET['r']) && isset($_GET['g']) && isset($_GET['b'])){
        $return = file_get_contents("http://".$ip.":".$port."/?r=".$r."&g=".$g."&b=".$b);
        echo $return;

	}

?>