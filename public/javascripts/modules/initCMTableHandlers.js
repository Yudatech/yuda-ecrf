function initCMTableHandlers() {
  $('#deleteCmConfirmModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const caseid = button.data('caseid');
    const cmid = button.data('cmid');
    const confirmBtn = $('#deleteCmConfirmModalConfirmBtn');
    const link = '/remove/cm/' + caseid + '/' + cmid;
    confirmBtn.attr('href', link);
  });
}

export default initCMTableHandlers;
