import requireValidator from './validators/requireValidator';
import setFieldVisibility from './helpers/setFieldVisibility';
import setWarningStyle from './helpers/setWarningStyle';

function initVisitHandlers() {
  const postoperative_2El = $('#postoperative_2');

  postoperative_2El.change(function () {
    setPostoperative_2_1Visibility();
  });

  $('#postoperative_2_1').change(function () {
    setErrorElementVisibility();
  });
  setErrorElementVisibility();

  const extra = $('#assessmentdtc').data('extra');
  $('.input-group.date').datepicker('setEndDate', new Date());
  if (extra.start) {
    $('.input-group.date').datepicker('setStartDate', extra.start);
  }

  $('#visit-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#visit-form').validator('validate');
}

function setErrorElementVisibility() {
  const errorEl1 = $('#visit-error-1');
  const errorEl2 = $('#visit-error-2');
  const postoperative_2_1Value = $('#postoperative_2_1').val();
  if (postoperative_2_1Value === '0' || postoperative_2_1Value === '1' || postoperative_2_1Value === '2') {
    errorEl1.removeClass('hidden');
    errorEl2.addClass('hidden');
  }
  else if (postoperative_2_1Value === '3' || postoperative_2_1Value === '4') {
    errorEl2.removeClass('hidden');
    errorEl1.addClass('hidden');
  }
  else {
    errorEl1.addClass('hidden');
    errorEl2.addClass('hidden');
  }
}

function setPostoperative_2_1Visibility() {
  const checked = $('#postoperative_2').is(':checked');
  setFieldVisibility('postoperative_2_1', checked);
}

export default initVisitHandlers;
