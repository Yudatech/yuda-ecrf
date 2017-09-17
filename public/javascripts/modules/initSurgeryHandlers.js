import requireValidator from './validators/requireValidator';
import setFieldVisibility from './helpers/setFieldVisibility';
import setWarningStyle from './helpers/setWarningStyle';

function initSurgeryHandlers() {
  $('#surgery_14').change(function(){
    setErrorElementVisibility();
    setWarningStyle('surgery_14');
  });
  setWarningStyle('surgery_14');
  setErrorElementVisibility();

  setSurgeryDateRange();

  $('#surgery-form').validator({
    delay: 100,
    disable: false,
    custom: {
      customrequired: requireValidator
    }
  });
  $('#surgery-form').validator('validate');
}

function setErrorElementVisibility() {
  const error1El = $('#surgery-error-1');
  const surgery_14Value = $('#surgery_14').is(':checked');

  if (surgery_14Value) {
    error1El.removeClass('hidden');
  }
  else {
    error1El.addClass('hidden');
  }
}

function setSurgeryDateRange() {
  const subjAcceptDate = $('#surgerydtc').data('extra').subjAcceptDate
  $('#surgerydtc').datepicker('setStartDate', subjAcceptDate);
  $('#surgerydtc').datepicker('setEndDate', new Date());
}

export default initSurgeryHandlers;
