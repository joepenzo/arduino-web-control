<?php
	header("content-type: text/plain");

    if (isset($_GET['ip'])){
		$ip = $_GET['ip'];
	}

	if (isset($_GET['port'])){
		$port = $_GET['port'];
	}

	$return = file_get_contents("http://".$ip.":".$port."/?p=status");
	echo $return;
?>