<?php 
header('Content-Type:application/xml; charset=utf-8');
$xml = "";
$xmlpath = $_POST["xmlpath"];

//read xml

//if ($returnValue == 0){
$xmlRelativePath = $xmlpath;
$xmlHandle = fopen($xmlRelativePath, 'r');
while(!feof($xmlHandle)){
$xml .= fgets($xmlHandle, 1024);
}
fclose($xmlHandle);
//}

echo $xml; 
?> 