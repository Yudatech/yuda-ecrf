import requireValidator from './validators/requireValidator';
import setFieldVisibility from './helpers/setFieldVisibility';
import setWarningStyle from './helpers/setWarningStyle';

function initVisitHandlers() {
  $('#visittype').change(function(){
    setFormFieldsVisibility();
  });
  setFormFieldsVisibility();

  const param_16El = $('#param_16');
  
  param_16El.change(function(){
    setParam17Visibility();
  });

  $('#param_19').change(function(){
    setParam2021Visibility();
  });

  $('#param_18').change(function(){
    setErrorElementVisibility();
    setWarningStyle('param_18');
  });
  setWarningStyle('param_18');
  setErrorElementVisibility();

  $('#param_22').change(function(){
    setErrorElementVisibility();
    setWarningStyle('param_22');
  });
  setWarningStyle('param_22');

  setErrorElementVisibility();

  $('#visitnum').change(function(){
    setSubmitBtnStatus();
  });
  setSubmitBtnStatus();

  // “短期植入环”排出方式为单选,自然排出 或者人工排出
  $('#param_20').change(function(){
    if ($('#param_20').is(':checked') && $('#param_21').is(':checked')) {
      $('#param_21').prop('checked', false);
      $('#param_21Real').val(false);
    }
  });
  $('#param_21').change(function(){
    if ($('#param_20').is(':checked') && $('#param_21').is(':checked')) {
      $('#param_20').prop('checked', false);
      $('#param_20Real').val(false);
    }
  });

  $('#visit-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#visit-form').validator('validate');

  const units = $('.yuda-input-unit');
  units.each(function (index) {
    const text = $(this).text();
    const pattern = new RegExp(/(.*)\^(\d*)(\/.*)/);
    //console.log(pattern.exec(text));

    const match = pattern.exec(text);

    if (match && match.length > 3) {
      $(this).html(match[1] + '<sup>' + match[2] + '</sup>' + match[3]);
    }

  });
}

function setSubmitBtnStatus(){
  const value = $('#visitnum').val();
  if (value === '') {
    $('#visit-submit-btn').addClass('disabled');
    $('#visit-submit-btn').attr('disabled', true);
  }
  else {
    $('#visit-submit-btn').removeClass('disabled');
    $('#visit-submit-btn').attr('disabled', false);
  }
}

function setErrorElementVisibility() {
  const errorEl1 = $('#visit-error-1');
  const errorEl2 = $('#visit-error-2');
  const param_18Value = $('#param_18').is(':checked');
  const param_22Value = $('#param_22').is(':checked');
  if (param_18Value) {
    errorEl1.removeClass('hidden');
  }
  else {
    errorEl1.addClass('hidden');
  }

  if (param_22Value) {
    errorEl2.removeClass('hidden');
  }
  else {
    errorEl2.addClass('hidden');
  }
}

function setParam17Visibility() {
  const checked = $('#param_16').is(':checked');
  setFieldVisibility('param_17', checked);
  if (checked === false) {
    $('#param_17').val('');
  }
}

function setParam2021Visibility() {
  const checked = $('#param_19').is(':checked');
  setFieldVisibility('param_20', checked);
  setFieldVisibility('param_21', checked);
}

function setFormFieldsVisibility() {
  const visittypeValue = $('#visittype').val();
  const allIds = ['visitnum', 'visitdtc', 'visitreason', 'visittreat', 'visitres', 'param_1', 'param_2', 'param_3', 'param_4', 'param_5', 'param_6', 'param_7', 'param_8', 'param_9', 'param_10', 'param_11', 'param_12', 'param_13', 'param_14', 'param_15', 'param_16', 'param_17', 'param_18', 'param_19', 'param_20', 'param_21', 'param_22'];
  const ids_0 = ['visitnum', 'visitdtc', 'param_1', 'param_2', 'param_3', 'param_4', 'param_5', 'param_6', 'param_7', 'param_8', 'param_9', 'param_10', 'param_11', 'param_12', 'param_13', 'param_14', 'param_15', 'param_16', 'param_17', 'param_18', 'param_19', 'param_20', 'param_21', 'param_22'];
  const ids_1 = ['visitnum', 'visitdtc', 'visitreason', 'visittreat', 'visitres', 'param_7', 'param_9', 'param_10', 'param_11', 'param_12', 'param_13', 'param_18', 'param_19', 'param_20', 'param_21', 'param_22'];
  const ids_2 = ['visitnum', 'visitdtc', 'visitreason', 'visittreat', 'visitres', 'param_1', 'param_2', 'param_3', 'param_4', 'param_5', 'param_6', 'param_7', 'param_8', 'param_9', 'param_10', 'param_11', 'param_12', 'param_13', 'param_14', 'param_15', 'param_16', 'param_17', 'param_18', 'param_19', 'param_20', 'param_21', 'param_22'];

  if (visittypeValue === '0') {
    showRelevantFields(ids_0, allIds);
    setParam17Visibility();
    setParam2021Visibility();
    showFieldsets([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  }
  else if (visittypeValue === '1') {
    showRelevantFields(ids_1, allIds);
    setParam2021Visibility();
    showFieldsets([0, 3, 5, 6, 9, 10, 11]);
  }
  else if (visittypeValue === '2') {
    showRelevantFields(ids_2, allIds);
    setParam17Visibility();
    setParam2021Visibility();
    showFieldsets([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  }
  else {
    showRelevantFields([], allIds);
    showFieldsets([0]);
  }
}

function showRelevantFields(idsToShow, allIds) {
  allIds.forEach((id) => {
    if (idsToShow.includes(id)) {
      setFieldVisibility(id, true);
    }
    else {
      setFieldVisibility(id, false);
    }
  });
}

function showFieldsets(visibleIndexList) {
  const fieldsets = $('#visit-form>fieldset');
  fieldsets.each(function(index, fieldset){
    if (visibleIndexList.includes(index)) {
      $(fieldset).removeClass('hidden');
    }
    else {
      $(fieldset).addClass('hidden');
    }
  });
}

export default initVisitHandlers;
