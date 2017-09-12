function initSearchHandlers() {
  $('#search-case-table').DataTable({
    "dom": 'lrtip',
    "paging": false,
    "info": false,
    "columnDefs": [
      { "orderable": false, "targets": 5 },
      { "visible": false, "targets": 6 },
      { "visible": false, "targets": 7 },
      { "visible": false, "targets": 8 },
      { "visible": false, "targets": 9 }
    ]
  });

  $('#search-question-table').DataTable({
    "dom": 'lrtip',
    "paging": false,
    "info": false,
    "columnDefs": [
      { "orderable": false, "targets": 5 }
    ]
  });

  window.searchBtnClickHandler = function(){
    const searchInputValue = $('#searchinput').val();
    const craValue = $('#cra').val();
    const siteValue = $('#site').val();
    const caseStatusValue = $('#status').val() === 'all' ? '' : $('#status').val();
    const table = $('#search-case-table').DataTable();
    const questionTable = $('#search-question-table').DataTable();
    table.column(7).search(searchInputValue, false, true);
    table.column(6).search(siteValue, false, true);
    table.column(8).search(craValue, false, true);
    table.column(9).search(caseStatusValue, false, true);
    table.draw();
    const filterForQuestions = [];
    table.rows({filter: 'applied'}).data().each(function(record){
      filterForQuestions.push(record[0]);
    });
    questionTable.column(0).search(filterForQuestions.join('|')).draw();
    const foundRecordNum = table.rows({filter: 'applied'}).data().length;
    const foundQuestionNum = questionTable.rows({filter: 'applied'}).data().length;
    $('#found-case-number').text(foundRecordNum);
    $('#found-question-number').text(foundQuestionNum);
  };

  window.searchBtnClickHandler();
}

export default initSearchHandlers;
