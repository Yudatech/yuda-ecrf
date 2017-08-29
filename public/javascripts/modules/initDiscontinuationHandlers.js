import setFieldVisibility from './helpers/setFieldVisibility';

function initDiscontinuationHandlers() {
  // 退出阶段
  $('#discontinuetype').change(function(){
    setFormFieldsVisibility();
    setDateRange();
  });
  setFormFieldsVisibility();
  setDateRange();

  // 临床研究者认为受试者应被排除或受试者自己认为应被排除
  $('#discontinuersn_3').change(function(){
    setDiscontinueRsn4Visibility();
  });
  setDiscontinueRsn4Visibility();

  // 其他原因
  $('#discontinuersn_6').change(function(){
    setDiscontinueRsn7Visibility();
  });
  setDiscontinueRsn7Visibility();

  $('#discontinuation-form').validator({
    delay: 100,
    disable: false
  });
  $('#discontinuation-form').validator('validate');
}

function setDateRange() {
  const discontinuetypeValue = $('#discontinuetype').val();
  const surgerydate = $('#discontinuedt').data('extra').surgerydate
  if (discontinuetypeValue === '0') {
    $('#discontinuedt').datepicker('setEndDate', surgerydate);
  }
  else if (discontinuetypeValue === '1') {
    $('#discontinuedt').datepicker('setStartDate', surgerydate);
    $('#discontinuedt').datepicker('setEndDate', surgerydate);
  }
  else if (discontinuetypeValue === '2') {
    $('#discontinuedt').datepicker('setStartDate', surgerydate);
  }
  else {
    $('#discontinuedt').datepicker('setStartDate', new Date());
  }
}

function setDiscontinueRsn4Visibility() {
  const checked = $('#discontinuersn_3').is(':checked');
  setFieldVisibility('discontinuersn_4', checked);
}

function setDiscontinueRsn7Visibility() {
  const checked = $('#discontinuersn_6').is(':checked');
  setFieldVisibility('discontinuersn_7', checked);
}

function setFormFieldsVisibility() {
  const discontinuetypeValue = $('#discontinuetype').val();
  const allIds = ['discontinuedt', 'discontinuersn_1', 'discontinuersn_2', 'discontinuersn_3', 'discontinuersn_4', 'discontinuersn_5', 'discontinuersn_6', 'discontinuersn_7', 'discontinuersn_8', 'discontinuersn_9'];
  const ids_0 = ['discontinuedt', 'discontinuersn_1', 'discontinuersn_3', 'discontinuersn_4', 'discontinuersn_5', 'discontinuersn_6', 'discontinuersn_7'];
  const ids_1 = ['discontinuedt', 'discontinuersn_6', 'discontinuersn_7', 'discontinuersn_8', 'discontinuersn_9'];
  const ids_2 = ['discontinuedt', 'discontinuersn_2', 'discontinuersn_4', 'discontinuersn_6', 'discontinuersn_7'];

  console.log(typeof discontinuetypeValue);
  if (discontinuetypeValue === '0') {
    showRelevantFields(ids_0, allIds);
  }
  else if (discontinuetypeValue === '1') {
    showRelevantFields(ids_1, allIds);
  }
  else if (discontinuetypeValue === '2') {
    showRelevantFields(ids_2, allIds);
  }
  else {
    showRelevantFields([], allIds);
  }
}

function showRelevantFields(idsToShow, allIds) {
  allIds.forEach((id) => {
    const containerEl = $(`#${id}-container`);
    const questionBtnEl = $(`#${id}-question-btn`);
    if (idsToShow.includes(id)) {
      containerEl.removeClass('hidden');
      questionBtnEl.removeClass('hidden');
    }
    else {
      containerEl.addClass('hidden');
      questionBtnEl.addClass('hidden');
    }
  });
}

export default initDiscontinuationHandlers;
