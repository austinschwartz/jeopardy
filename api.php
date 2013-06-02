<?php

header('Content-Type: application/json');

function dbConnect()
{	
	$db = new SQLite3('clues.db');
	return $db;
}

function doQuery($inputQuery, $db)
{
	$results = $db->query($inputQuery);
	while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
	    $question[] = $row;
	}
	return json_encode($question);
}

function getQuestion($debug)
{
	$select = 'SELECT d.id, d.clue, d.answer, c.catid, cat.category FROM documents AS d ' .
				'JOIN classifications AS c ON d.id = c.clueid ' .
				'JOIN categories as cat ON cat.id = c.catid ';
	if ($debug == 1) echo '<li>question : ', $_GET['question'], '</li>';
	if ($debug == 1) echo  '<ul>';
	if (isset($_GET['id']))
	{
		if ($_GET['id'] == 'random')
		{
			$select .= " WHERE d.id = " . rand(1,215916);
		} 
		else 
		{
			if ($debug == 1) echo '<li>id : ', $_GET['id'], '</li>';
			$select .= " WHERE d.id = " . $_GET['id'];
		}
	} else
	{
		$select .= " WHERE d.id = " . rand(1,215916);
	}
	if ($debug == 1) echo '</ul>';
	return $select;
}

function getGame($debug)
{
	$select = "SELECT a.game, airdate, c.id, d.clue, d.answer, value, round, class.catid, cat.category
				FROM airdates AS a  
				JOIN clues AS c ON a.game = c.game  
				JOIN documents AS d ON c.id = d.id 
				JOIN classifications AS class ON class.clueid = c.id
				JOIN categories AS cat ON class.catid = cat.id ";
	if ($debug == 1) echo '<li>game : ', $_GET['game'], '</li>';
	if ($debug == 1) echo '<ul>';
	if (isset($_GET['id']))
	{
		$select .= " WHERE a.game = " . $_GET['id'];
		if ($debug == 1) echo '<li>id : ', $_GET['id'], '</li>';
	}
	else
	{
		$select .= " WHERE a.game = " . rand(1,3970);
	}
	$select .= " AND round < 3 ";
	if ($debug == 1) echo '</ul>';
	$select .= " ORDER BY c.id";
	//$select .= " ORDER BY cat.id";
	return $select;
}

function getCategory($debug)
{
	$select = 'fuck';
	return $select;
}

$debug = 0;
if (isset($_GET['debug'])) $debug = 1;

if (isset($_GET['question']))
{
	$selectshit = getQuestion($debug);
}
else if (isset($_GET['game']))
{
	$selectshit = getGame($debug);
}
else if (isset($_GET['category']))
{
	$selectshit = getCategory($debug);
}
if ($debug == 1) echo "</ul>";
if ($debug == 1) echo $selectshit, "</br></br>";
$database = dbConnect();
echo doQuery($selectshit, $database);


?>

