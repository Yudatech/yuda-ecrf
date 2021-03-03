import requireValidator from './validators/requireValidator';

function initEvacuationFollowupHandler() {
  const extra = $('#assessmentdtc').data('extra');
  $('.input-group.date').datepicker('setEndDate', new Date());
  if (extra.start) {
    $('.input-group.date').datepicker('setStartDate', extra.start);
  }
  $('.input-group.date')
    .datepicker()
    .on('changeDate', function (e) {
      const newDateStringArray = e.format('yyyy/mm/dd').split('/');
      const newDate = new Date(
        newDateStringArray[0],
        parseInt(newDateStringArray[1], 10) - 1,
        newDateStringArray[2],
        0,
        0,
        0
      );
      const surgeryDateStringArray = extra.start.split('/');
      const surgeryDate = new Date(
        surgeryDateStringArray[0],
        parseInt(surgeryDateStringArray[1], 10) - 1,
        surgeryDateStringArray[2],
        0,
        0,
        0
      );
      const days = Math.floor((newDate.getTime() - surgeryDate.getTime()) / 24 / 60 / 60 / 1000);
      $('#postoperativeday').val('Postoperative day (POD) ' + days);
    });

  $('#evacuation-followup-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator,
    },
  });
  $('#evacuation-followup-form').validator('validate');
}

export default initEvacuationFollowupHandler;
