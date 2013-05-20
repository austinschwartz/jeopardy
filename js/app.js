function SimpleController($scope) {
	$scope.customers = [
							{'name' : 'bob', 'city' : 'illinois'}, 
							{'name' : 'fuckface', 'city' : 'alabama'}, 
							{'name' : 'gerg', 'city' : 'aasdasdasd'}
						];


$scope.questions = [
{
	"id": 192137,
	"categoryid": 1,
	"gameid": 3441,
	"text": "Oh, thank heaven for this largest chain of convenience stores where you can get a Big Gulp day or night",
	"answer": "7-Eleven",
	"amount": 200	
},
{
	"id": 192138,
	"categoryid": 1,
	"gameid": 3441,
	"text": "Ante up the money & you can have one of these hardware stores; it's 'the helpful place'",
	"answer": "Ace",
	"amount": 400	
},
{
	"id": 192139,
	"categoryid": 1,
	"gameid": 3441,
	"text": "'Grill & chill' with this franchise that's been serving up its soft-serve ice cream since 1940",
	"answer": "Dairy Queen",
	"amount": 600	
},
{
	"id": 236094,
	"categoryid": 25,
	"gameid": 4173,
	"text": "There's this University in Oxford, Ohio as well as the University of this in Coral Gables, Florida",
	"answer": "Miami",
	"amount": 200	
},
{
	"id": 236095,
	"categoryid": 25,
	"gameid": 4173,
	"text": "The fight song of this New Orleans school begins, 'Green wave green wave, hats off to thee'",
	"answer": "Tulane",
	"amount": 400	
}
];


$scope.games = [
{
	"id": 4176,
	"show": 6603,
	"date": "05/08/2013"
},
{
	"id": 4173,
	"show": 6602,
	"date": "05/07/2013"
},
{
	"id": 3441,
	"show": 5967,
	"date": "07/20/2010"
}
];


$scope.categories =[
{
	"id": 1,
	"name": "TOP U.S. FRANCHISES"
},
{
	"id": 2,
	"name": "CREATURES OF NATURE"
},
{
	"id": 25,
	"name": "COLLEGES & UNIVERSITIES"
},
{
	"id": 99,
	"name": "WHAT DEGREE ARE YOU GETTING?"
}
];
}
