function initEvacuationHandlers() {
  const extra = $('#evacuationdtc').data('extra');
  $('.input-group.date').datepicker('setEndDate', new Date());
  if (extra.start) {
    $('.input-group.date').datepicker('setStartDate', extra.start);
  }
}

export default initEvacuationHandlers;
