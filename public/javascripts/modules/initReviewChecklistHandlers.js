import setWarningStyle from './helpers/setWarningStyle';

function initReviewChecklistHandlers() {
  // 其他疾病 checkbox
  $('#reviewcheck_2').change(function(){
    setErrorElementVisibility();
    setWarningStyle('reviewcheck_2');
  });
  setWarningStyle('reviewcheck_2');

  // 心脏病
  $('#reviewcheck_3').change(function(){
    setErrorElementVisibility();
    setWarningStyle('reviewcheck_3');
  });
  setWarningStyle('reviewcheck_3');

  // 较大腹部手术史
  $('#reviewcheck_4').change(function(){
    setErrorElementVisibility();
    setWarningStyle('reviewcheck_4');
  });
  setWarningStyle('reviewcheck_4');

  setErrorElementVisibility();
}

function setErrorElementVisibility() {
  const error1El = $('#reviewchecklist-error-1');
  const error2El = $('#reviewchecklist-error-2');
  const reviewcheck_2Value = $('#reviewcheck_2').is(':checked');
  const reviewcheck_3Value = $('#reviewcheck_3').is(':checked');
  const reviewcheck_4Value = $('#reviewcheck_4').is(':checked');
  if (reviewcheck_3Value || reviewcheck_4Value) {
    error2El.removeClass('hidden');
  }
  else {
    error2El.addClass('hidden');
  }

  if (!reviewcheck_2Value) {
    error1El.removeClass('hidden');
  }
  else {
    error1El.addClass('hidden');
  }
}

export default initReviewChecklistHandlers;
