import setWarningStyle from './helpers/setWarningStyle';
import requireValidator from './validators/requireValidator';

function initReviewChecklistHandlers() {
  // 复诊日期不能早于首诊日期
  setReviewcheckDateRange();

  // 其他疾病 checkbox
  $('#reviewcheck_2').change(function () {
    setErrorElementVisibility();
    setWarningStyle('reviewcheck_2', true);
  });
  setWarningStyle('reviewcheck_2', true);

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

  if (!reviewcheck_2Value) {
    error1El.removeClass('hidden');
  }
  else {
    error1El.addClass('hidden');
  }
}

export default initReviewChecklistHandlers;
