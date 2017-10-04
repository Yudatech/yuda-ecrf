function initVisitTableHandlers() {
  $('#deleteVisitConfirmModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const caseid = button.data('caseid');
    const visitid = button.data('visitid');
    const confirmBtn = $('#deleteVisitConfirmModalConfirmBtn');
    const link = '/remove/visit/' + caseid + '/' + visitid;
    confirmBtn.attr('href', link);
  });
}

export default initVisitTableHandlers;
