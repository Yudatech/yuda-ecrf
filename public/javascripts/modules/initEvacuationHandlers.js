function initEvacuationHandlers() {
  const extra = $('#evacuationdtc').data('extra');
  $('.input-group.date').datepicker('setEndDate', new Date());
  if (extra.start) {
    $('.input-group.date').datepicker('setStartDate', extra.start);
  }

  console.log(extra);

  $('.input-group.date')
    .datepicker()
    .on('changeDate', function (e) {
      const current = e.format('yyyy/mm/dd');
      setErrorElementVisibility(current, extra.lock);
    });
  setErrorElementVisibility(extra.current, extra.lock);

  $('#deleteFollowupConfirmModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    const caseid = button.data('caseid');
    const followupid = button.data('followupid');
    const confirmBtn = $('#deleteFollowupConfirmModalConfirmBtn');
    const link = '/remove/evacuationfollowup/' + caseid + '/' + followupid;
    confirmBtn.attr('href', link);
  });
}

function setErrorElementVisibility(current, lock) {
  const errorEl1 = $('#evacuation-error-1');
  let displayError = false;
  if (current === '' || lock === '') {
    displayError = false;
  } else {
    const currentArray = current.split('/');
    const currentDate = new Date(
      currentArray[0],
      parseInt(currentArray[1], 10) - 1,
      currentArray[2],
      0,
      0,
      0
    ).getTime();
    const lockArray = lock.split('/');
    const lockDate = new Date(lockArray[0], parseInt(lockArray[1], 10) - 1, lockArray[2], 0, 0, 0).getTime();
    displayError = currentDate <= lockDate;
  }

  if (displayError) {
    errorEl1.removeClass('hidden');
  } else {
    errorEl1.addClass('hidden');
  }
}

export default initEvacuationHandlers;
