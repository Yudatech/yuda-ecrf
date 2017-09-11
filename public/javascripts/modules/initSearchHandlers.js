function initSearchHandlers() {
  $('#search-case-table').DataTable({
    "dom": 'lrtip',
    "paging": false,
    "info": false,
    "columnDefs": [
      { "orderable": false, "targets": 5 }
    ]
  });
}

export default initSearchHandlers;
