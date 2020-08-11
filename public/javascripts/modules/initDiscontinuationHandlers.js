import setFieldVisibility from './helpers/setFieldVisibility';
import requireValidator from './validators/requireValidator';
import requireTrueValueValidator from './validators/requireTrueValueValidator';

function initDiscontinuationHandlers() {
  // 退出阶段
  $('#discontinuebeforesurgery').change(function () {
    setDateRange();
  });
  setDateRange();

  $('#discontinuersn_2').change(function () {
    setDiscontinueReason_2Visibility();
  });

  $('#discontinuersn_3').change(function () {
    setDiscontinueReason_3Visibility();
  });

  $('#discontinuersn_4').change(function () {
    setDiscontinueReason_4Visibility();
  });

  $('#discontinuersn_5').change(function () {
    setDiscontinueReason_5Visibility();
  });

  $('#discontinuersn_6').change(function () {
    setDiscontinueReason_6Visibility();
  });

  $('#discontinuation-form').validator({
    delay: 100,
    disable: true,
    custom: {
      customrequired: requireValidator,
      customrequiretrue: requireTrueValueValidator
    }
  });
  $('#discontinuation-form').validator('validate');
}

function setDateRange() {
  const isBeforeSurgery = $('#discontinuebeforesurgery').is(':checked');
  const surgerydate = $('#discontinuedt').data('extra').surgerydate
  if (isBeforeSurgery === true) {
    $('#discontinuedt').datepicker('setEndDate', surgerydate);
  }
  else {
    $('#discontinuedt').datepicker('setStartDate', surgerydate);
  }
}

function setDiscontinueReason_2Visibility() {
  const checked = $('#discontinuersn_2').is(':checked');
  setFieldVisibility('discontinuersn_2_1', checked);
  setFieldVisibility('discontinuersn_2_2', checked);
  setFieldVisibility('discontinuersn_2_3', checked);
  setFieldVisibility('discontinuersn_2_4', checked);
  setFieldVisibility('discontinuersn_2_5', checked);
  $('#discontinuation-form').validator('update');
}

function setDiscontinueReason_3Visibility() {
  const checked = $('#discontinuersn_3').is(':checked');
  setFieldVisibility('discontinuersn_3_1', checked);
  $('#discontinuation-form').validator('update');
}

function setDiscontinueReason_4Visibility() {
  const checked = $('#discontinuersn_4').is(':checked');
  setFieldVisibility('discontinuersn_4_1', checked);
  $('#discontinuation-form').validator('update');
}

function setDiscontinueReason_5Visibility() {
  const checked = $('#discontinuersn_5').is(':checked');
  setFieldVisibility('discontinuersn_5_1', checked);
  $('#discontinuation-form').validator('update');
}

function setDiscontinueReason_6Visibility() {
  const checked = $('#discontinuersn_6').is(':checked');
  setFieldVisibility('discontinuersn_6_1', checked);
  $('#discontinuation-form').validator('update');
}

export default initDiscontinuationHandlers;
