function initEvacuationHandlers() {
  const extra = $('#evacuationdtc').data('extra');
  $('.input-group.date').datepicker('setEndDate', new Date());
  if (extra.start) {
    $('.input-group.date').datepicker('setStartDate', extra.start);
  }

  $('#deleteFollowupConfirmModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    const caseid = button.data('caseid');
    const followupid = button.data('followupid');
    const confirmBtn = $('#deleteFollowupConfirmModalConfirmBtn');
    const link = '/remove/evacuationfollowup/' + caseid + '/' + followupid;
    confirmBtn.attr('href', link);
  });
}

export default initEvacuationHandlers;
