<?php
include "login.php";

$tables = ["pbs", "generic", "corrective", "preventive", "external", "renewal", "repair" ];
$json = json_decode($_POST["json"]);
$json2 = [];

foreach ($json as $key => $value) {
	if (in_array(strtolower($key), $tables)) {
		$json2[$key] = $value;
	}
}
$json = $json2;

foreach ($json as $key => $value) {
	foreach ($value as $key2 => $value2) {
		var_dump($value2);
		break;
	}
}
