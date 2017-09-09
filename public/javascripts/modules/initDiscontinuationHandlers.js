import setFieldVisibility from './helpers/setFieldVisibility';
import requireValidator from './validators/requireValidator';
import requireTrueValueValidator from './validators/requireTrueValueValidator';

function initDiscontinuationHandlers() {
  // 退出阶段
  $('#discontinuetype').change(function(){
    setFormFieldsVisibility();
    setDateRange();
    updateFormValidationCondition();
  });
  setFormFieldsVisibility();
  setDateRange();
  

  $('#discontinuation-form').find(':checkbox').change(function(){
    updateFormValidationCondition();
  });

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
    disable: true,
    custom: {
      customrequired: requireValidator,
      customrequiretrue: requireTrueValueValidator
    }
  });
  $('#discontinuation-form').validator('validate');
  updateFormValidationCondition();
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

function updateCheckboxValidationCondition(checkboxIdList) {
  const checkedList = checkboxIdList.filter((id) => {
    return $(`#${id}`).is(':checked') === true;
  });
  if (checkedList.length > 0){
    checkboxIdList.forEach((id) => {
      $(`#${id}`).removeAttr('data-customrequiretrue');
    });
  }
  else {
    checkboxIdList.forEach((id) => {
      $(`#${id}`).attr('data-customrequiretrue', true);
    });
  }
  $('#discontinuation-form').find(':checkbox').each(function(el){
    if (!checkboxIdList.includes($(el).attr('id'))) {
      $(el).removeAttr('data-customrequiretrue');
    }
  });
}

function updateTextareaValidationCondition(textareaIdList) {
  const discontinuetypeValue = $('#discontinuetype').val();
  textareaIdList.forEach((id) => {
    if (id === 'discontinuersn_4') {
      if ($('#discontinuersn_3').is(':checked') === true) {
        $('#discontinuersn_4').attr('data-customrequired', true);
      }
      else {
        $('#discontinuersn_4').removeAttr('data-customrequired');
      }
    }
    else if (id === 'discontinuersn_7') {
      if ($('#discontinuersn_6').is(':checked') === true) {
        $('#discontinuersn_7').attr('data-customrequired', true);
      }
      else {
        $('#discontinuersn_7').removeAttr('data-customrequired');
      }
    }
  }); 
  $('#discontinuation-form').find('textarea').each(function(el){
    if (!textareaIdList.includes($(el).attr('id'))) {
      $(el).removeAttr('data-customrequired');
    }
  }); 
}

function updateFormValidationCondition() {
  const discontinuetypeValue = $('#discontinuetype').val();
  if (discontinuetypeValue === '0') {
    const checkboxIdList = ['discontinuersn_1', 'discontinuersn_3', 'discontinuersn_5', 'discontinuersn_6'];
    const textareaIdList = ['discontinuersn_4', 'discontinuersn_7'];

    updateCheckboxValidationCondition(checkboxIdList);
    updateTextareaValidationCondition(textareaIdList);
  }
  else if (discontinuetypeValue === '1') {
    const checkboxIdList = ['discontinuersn_6', 'discontinuersn_8', 'discontinuersn_9'];
    const textareaIdList = ['discontinuersn_7'];
    updateCheckboxValidationCondition(checkboxIdList);
    updateTextareaValidationCondition(textareaIdList);
  }
  else if (discontinuetypeValue === '2') {
    const checkboxIdList = ['discontinuersn_2', 'discontinuersn_6'];
    const textareaIdList = ['discontinuersn_7'];
    updateCheckboxValidationCondition(checkboxIdList);
    updateTextareaValidationCondition(textareaIdList);
  }
  else {
    updateCheckboxValidationCondition([]);
    updateTextareaValidationCondition([]);
  }
  $('#discontinuation-form').validator('update');
  $('#discontinuation-form').validator('validate');
}

function setFormFieldsVisibility() {
  const discontinuetypeValue = $('#discontinuetype').val();
  const allIds = ['discontinuedt', 'discontinuersn_1', 'discontinuersn_2', 'discontinuersn_3', 'discontinuersn_4', 'discontinuersn_5', 'discontinuersn_6', 'discontinuersn_7', 'discontinuersn_8', 'discontinuersn_9'];
  const ids_0 = ['discontinuedt', 'discontinuersn_1', 'discontinuersn_3', 'discontinuersn_4', 'discontinuersn_5', 'discontinuersn_6', 'discontinuersn_7'];
  const ids_1 = ['discontinuedt', 'discontinuersn_6', 'discontinuersn_7', 'discontinuersn_8', 'discontinuersn_9'];
  const ids_2 = ['discontinuedt', 'discontinuersn_2', 'discontinuersn_6', 'discontinuersn_7'];

  if (discontinuetypeValue === '0') {
    showRelevantFields(ids_0, allIds);
    setDiscontinueRsn4Visibility();
    setDiscontinueRsn7Visibility();
  }
  else if (discontinuetypeValue === '1') {
    showRelevantFields(ids_1, allIds);
    setDiscontinueRsn7Visibility();
  }
  else if (discontinuetypeValue === '2') {
    showRelevantFields(ids_2, allIds);
    setDiscontinueRsn7Visibility();
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
