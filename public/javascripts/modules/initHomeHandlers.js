function initHomeHandlers() {
  $('#deleteConfirmModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const removeType = button.data('removetype');
    const removeId = button.data('removeid');
    const confirmBtn = $('#deleteConfirmModalConfirmBtn');
    if (removeType && removeId) {
      const link = '/remove/' + removeType + '/' + removeId;
      confirmBtn.attr('href', link);
    }
    else {
      confirmBtn.attr('href', '/');
    }
  });

  window.handleFilterChange = function(el) {
    let user = $('#userFilterSelect').val();
    if (user === undefined) {
      user = 'all';
    }
    const status = $('#questionStatusFilterSelect').val();
    doQuestionTableFilter(user, status);
  }
}

function doQuestionTableFilter(user, status){
  const elements = $('#question-table>tbody>tr');
  elements.each(function(index, element){
    const el = $(element);
    const idArray = el.attr('id').split('-');
    if ((user === 'all' || user === idArray[1]) && (status === 'all' || status === idArray[2])) {
      el.show();
    }
    else {
      el.hide();
    }
  });
}

export default initHomeHandlers;
