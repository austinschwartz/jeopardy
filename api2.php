<?php  
header('Content-Type: application/json');
// Config  
function dbConnect() {
	$dbhost = 'localhost';  
	$dbname = 'jeopardy';  
	  
	$params = '';

	// Connect to test database  
	$m = new Mongo("mongodb://$dbhost");  
	$db = $m->$dbname;  
	$c = $db->questions;  
	return $c;
}

$c = dbConnect();
$cursor = '';
if (isset($_GET['id'])) 
{
	if (isset($_GET['question']))
	{
		$cursor = $c->find(array('id' => intval($_GET['id'])));		
	}
	else if (isset($_GET['game']))
	{
		$cursor = $c->find(array('gameid' => intval($_GET['id'])));
	}
	else 
	{
		break;
	}
	$return = array();

	for ($i = 0; $i < $cursor->count(); $i++)
	{
	    $return[$i] = $cursor->getNext();
	}
	echo json_encode($return);
}

?>  