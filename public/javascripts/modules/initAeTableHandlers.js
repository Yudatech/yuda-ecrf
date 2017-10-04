function initAeTableHandlers() {
  $('#deleteAeConfirmModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const caseid = button.data('caseid');
    const aeid = button.data('aeid');
    const confirmBtn = $('#deleteAeConfirmModalConfirmBtn');
    const link = '/remove/ae/' + caseid + '/' + aeid;
    confirmBtn.attr('href', link);
  });
}

export default initAeTableHandlers;
