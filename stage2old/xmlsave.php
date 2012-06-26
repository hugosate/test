<?php
$path=$_POST['savepath'];
$array=$_POST['array'];

$dom = new DOMDocument('1.0', 'utf-8');
$root = $dom->createElement('root');
$dom->appendChild($root);

for ($i = 0; $i < count($array); $i++){
		$line = $dom->createElement('line');
		$root->appendChild($line);
		
		$point = $dom->createElement('point');
		$line->appendChild($point);
		
		
		$x = $dom->createElement('x');
		$point->appendChild($x);
		$x_value = $dom->createTextNode($array[$i][0]);
		$x->appendChild($x_value);
		
		$y = $dom->createElement('y');
		$point->appendChild($y);
		$y_value = $dom->createTextNode($array[$i][1]);
		$y->appendChild($y_value);
		
		$point = $dom->createElement('point');
		$line->appendChild($point);
		
		$x = $dom->createElement('x');
		$point->appendChild($x);
		$x_value = $dom->createTextNode($array[$i][2]);
		$x->appendChild($x_value);
		
		$y = $dom->createElement('y');
		$point->appendChild($y);
		$y_value = $dom->createTextNode($array[$i][3]);
		$y->appendChild($y_value);
		
		$width = $dom->createElement('width');
		$line->appendChild($width);
		$w_value = $dom->createTextNode(0.1);
		$width->appendChild($w_value);
		
		$height = $dom->createElement('height');
		$line->appendChild($height);
		$h_value = $dom->createTextNode(5);
		$height->appendChild($h_value);
		
	}

echo "ok";
$dom->save($path);

?>