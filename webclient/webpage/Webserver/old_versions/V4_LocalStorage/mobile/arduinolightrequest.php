<?php
	header("content-type: text/plain");
	if (isset($_GET['p'])){
		$p = $_GET['p'];
	}
	
	if (isset($_GET['s'])){
		$s = $_GET['s'];
	}
	
	if (isset($_GET['p']) && isset($_GET['s'])){
		$return = file_get_contents("http://84.26.183.241:80/?p=".$p."&s=".$s);
		echo $return;
	}

?>