<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin', "*");

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
	if (isset($_GET['id']))
	{
		$select .= " WHERE a.game = " . $_GET['id'];
		if ($debug == 1) echo '<li>id : ', $_GET['id'], '</li>';
	}
	else
	{
		$select .= " WHERE a.game = " . rand(1,3970);
	}
	//$select .= " AND round < 3 ";
	$select .= " ORDER BY c.id";
	//$select .= " ORDER BY cat.id";
	return $select;
}

function getCategory($db)
{
	$select = 'SELECT clueid, catid, category, clue, answer, value FROM (
					SELECT * FROM classifications
					NATURAL JOIN (
						SELECT catid
						FROM classifications AS class 
						WHERE class.catid IN (
						     SELECT id as catid 
						     FROM categories AS cat
						     ORDER BY random()
						     LIMIT 15
						) 
						GROUP BY catid
						HAVING COUNT(catid) = 5
						LIMIT 6
					)
				) a
				JOIN clues AS c ON a.clueid = c.id
				JOIN documents AS d ON c.id = d.id
				JOIN categories AS cat ON cat.id = catid
				ORDER BY catid, clueid';
	if (isset($_GET['id']))
	{
		$select .= " WHERE catid = " . $_GET['id'];
	}
	else
	{
	}
	//$select .= " AND round < 3 ";
	//$select .= " ORDER BY class.catid, c.id";
	//$select .= " ORDER BY cat.id";
	$results = $db->query($select);
	while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
	    $question[] = $row;
	}
	if ($question[4] == 0)
		getCategory($db);
	$jsonthing = json_encode($question);
	echo $jsonthing;
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

if (isset($_GET['category']))
{
	$db = dbConnect();
	getCategory($db);
} 
else
{
	$database = dbConnect();
	echo doQuery($selectshit, $database);
}

?>

