function initCMHandlers() {
  $('#cmstdtc').datepicker().on('changeDate', function(e){
    setEndDateRange(e);
  });
  $('#cmeddtc').datepicker().on('changeDate', function(e){
    setStartDateRange(e);
  });
  $('#cmstdtc').datepicker('setEndDate', new Date());

  $('#cmstdtc>input').attr('data-customvalidator', true);
  $('#cmeddtc>input').attr('data-customvalidator', true);


  $('#cm-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customvalidator: function($el){
        const elementId = $el.parent().attr('id');
        const realStartElementId = '#cmstdtcReal';
        const realEndElementId = '#cmeddtcReal';
        const currentStartDate = $(realStartElementId).val();
        const currentEndDate = $(realEndElementId).val();
        if (elementId === 'cmstdtc' || elementId === 'cmeddtc') {
          if (new Date(currentStartDate).valueOf() > new Date(currentEndDate).valueOf()) {
            return 'wrong date setting';
          }
        }
      }
    }
  });
  $('#cm-form').validator('validate');
}

function setStartDateRange(e) {
  const targetId = e.target.id;
  const realId = `#${targetId}Real`;
  const currentEndDate = $(realId).val();
  $('#cmstdtc').datepicker('setEndDate', currentEndDate);
}

function setEndDateRange(e) {
  const targetId = e.target.id;
  const realId = `#${targetId}Real`;
  const currentStartDate = $(realId).val();
  $('#cmeddtc').datepicker('setStartDate', currentStartDate);
}

export default initCMHandlers;
