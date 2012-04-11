<?php
	header("content-type: text/plain");
			
	$return = file_get_contents("http://84.26.183.241:80/?p=status");
	echo $return;
?>