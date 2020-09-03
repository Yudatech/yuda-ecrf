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

  // 心脏病
  $('#reviewcheck_3').change(function () {
    setErrorElementVisibility();
    setWarningStyle('reviewcheck_3');
  });
  setWarningStyle('reviewcheck_3');

  // 较大腹部手术史
  $('#reviewcheck_4').change(function () {
    setErrorElementVisibility();
    setWarningStyle('reviewcheck_4');
  });
  setWarningStyle('reviewcheck_4');

  $('#reviewcheck_5').change(function () {
    setErrorElementVisibility();
    setWarningStyle('reviewcheck_5');
  });
  setWarningStyle('reviewcheck_4');

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
  const error2El = $('#reviewchecklist-error-2');
  const error3El = $('#reviewchecklist-error-3');
  const error4El = $('#reviewchecklist-error-4');

  const reviewcheck_2Value = $('#reviewcheck_2').is(':checked');
  const reviewcheck_3Value = $('#reviewcheck_3').is(':checked');
  const reviewcheck_4Value = $('#reviewcheck_4').is(':checked');
  const reviewcheck_5Value = $('#reviewcheck_5').is(':checked');
  if (reviewcheck_3Value) {
    error2El.removeClass('hidden');
  }
  else {
    error2El.addClass('hidden');
  }

  if (reviewcheck_4Value) {
    error3El.removeClass('hidden');
  }
  else {
    error3El.addClass('hidden');
  }

  if (!reviewcheck_2Value) {
    error1El.removeClass('hidden');
  }
  else {
    error1El.addClass('hidden');
  }

  if (reviewcheck_5Value) {
    error1El.removeClass('hidden');
  }
  else {
    error1El.addClass('hidden');
  }
}

export default initReviewChecklistHandlers;
