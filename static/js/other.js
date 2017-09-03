var $table = $("#maingrid"),
$headerCells = $table.find("thead th");
$rows = $table.find("tbody tr");

var headers = [];
rows = [];

$headerCells.each(function(k,v) {
  $(this).text("{{ questions[" + (k * 5) + "]['category'] }}");
});

window.generateCurlies = function(values) {
  $rows.each(function(row,v) {
    $(this).find("td").each(function(cell,v) {
      if (typeof rows[cell] === 'undefined') rows[cell] = [];
      $(this).attr('ng-click', 'openAnswer(' + (row + (cell * 5)) + ')');
      $(this).attr('qid', row + (cell * 5));
      if (location.search.indexOf('values')>=0) {
        $(this).html('<h1 class="value">{{ ' + 'questions[' + (row + (cell * 5)) + ']["value"] }}</span>');
      } else {
        $(this).text('{{ ' + 'questions[' + (row + (cell * 5)) + ']["clue"] }}');
      }
    });
  });
}

window.generateCurlies(false);
