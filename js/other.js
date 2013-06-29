
//$('table.jeopardyboard td').attr("ng-click", 'open()');

/*
$('table.jeopardyboard tr').each(function ()
{
    var $row = $(this);
    if ($row.attr('id') != 'head')
    {
        $row.children().each(function ()
        {
            var $cell = $(this);

            $cell.text('catqs[{{roundnum - 1}}][' + $cell.index() + '][' + ($row.index() - 1) + '][\'clue\']');
            var x = 0;
            var y = $cell.index();
            var z = ($row.index() - 1);
            //$cell.attr("ng-click", "open(" + "(roundnum - 1)" + ", " + y + ", " + z + ")");
            //$cell.attr('ng-click', 'open()');
            //$cell.attr('question-open', 'test');
            
            //$cell.attr('x', 0);
            //$cell.attr('y', y);
            //$cell.attr('z', z);
            
        });
    }
});
*/


var $table = $("#maintest2"),
$headerCells = $table.find("thead th");
$rows = $table.find("tbody tr");

var headers = [];
rows = [];

$headerCells.each(function(k,v) {
    //$(this).text('{{ questions[' + (1 + (k * 5)) + ']["category"] }}');
    $(this).text('{{ categories[' + k + '] }}');
});

$rows.each(function(row,v) {
    $(this).find("td").each(function(cell,v) {
        if (typeof rows[cell] === 'undefined') rows[cell] = [];
        $(this).attr('ng-click', 'openAnswer(' + (row + (cell * 5)) + ')');
        $(this).attr('qid', row + (cell * 5));
        $(this).text('{{ ' + 'questions[' + (row + (cell * 5)) + ']["clue"] }}');
    });
});


// $('table.jeopardyboard th').each(function ()
// {
//  var $cell = $(this);
//  $cell.text(' {{ ' + 'categories[(roundnum)][' + $cell.index() + '] }}');
// });
