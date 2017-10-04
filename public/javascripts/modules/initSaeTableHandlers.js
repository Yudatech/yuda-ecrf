function initSaeTableHandlers() {
  $('#deleteSaeConfirmModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const caseid = button.data('caseid');
    const saeid = button.data('saeid');
    const confirmBtn = $('#deleteSaeConfirmModalConfirmBtn');
    const link = '/remove/sae/' + caseid + '/' + saeid;
    confirmBtn.attr('href', link);
  });
}

export default initSaeTableHandlers;
