import setErrorStyle from './helpers/setErrorStyle';
import requireValidator from './validators/requireValidator';

function initReviewChecklistHandlers() {
  // 复诊日期不能早于首诊日期
  setReviewcheckDateRange();

  // 其他疾病 checkbox
  $('#reviewcheck_2').change(function () {
    setErrorElementVisibility();
  });

  $('#reviewcheck_3').change(function () {
    setErrorElementVisibility();
  });

  $('#reviewcheck_4').change(function () {
    setErrorElementVisibility();
  });

  setErrorElementVisibility();

  $('#reviewchecklist-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#reviewchecklist-form').validator('validate');
}

function setReviewcheckDateRange() {
  const subjAcceptDate = $('#reviewcheckdate').data('extra').subjAcceptDate;
  if (subjAcceptDate !== '') {
    $('#reviewcheckdate').datepicker('setStartDate', subjAcceptDate);
  }
}

function setErrorElementVisibility() {
  const error1El = $('#reviewchecklist-error-1');

  const reviewcheck_2Value = $('#reviewcheck_2').is(':checked');
  const reviewcheck_3Value = $('#reviewcheck_3').is(':checked');
  const reviewcheck_4Value = $('#reviewcheck_4').is(':checked');

  setErrorStyle('reviewcheck_2', !reviewcheck_2Value);
  setErrorStyle('reviewcheck_3', !reviewcheck_3Value);
  setErrorStyle('reviewcheck_4', !reviewcheck_4Value);

  if (reviewcheck_2Value && reviewcheck_3Value && reviewcheck_4Value) {
    error1El.addClass('hidden');
  }
  else {
    error1El.removeClass('hidden');
  }
}

export default initReviewChecklistHandlers;
