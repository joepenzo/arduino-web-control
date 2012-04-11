<?php
	header("content-type: text/plain");
    if (isset($_GET['ip'])){
    $ip = $_GET['ip'];
    }

    if (isset($_GET['port'])){
    $port = $_GET['port'];
    }

	if (isset($_GET['p'])){
		$p = $_GET['p'];
	}
	
	if (isset($_GET['s'])){
		$s = $_GET['s'];
	}
	
	if (isset($_GET['p']) && isset($_GET['s'])){
            $return = file_get_contents("http://".$ip."/?p=".$p."&s=".$s);
            echo $return;
	}

?>